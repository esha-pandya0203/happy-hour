import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as client from "../clients/accountClient";
import { clearCurrentUser, setCurrentUser } from "./reducer";
import DrinkCard from "../Details/DrinkCard";
import { loadSavedDrinks } from "../utils/drinks";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const [savedDrinks, setSavedDrinks] = useState<any[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchProfile = async () => {
        if (!currentUser) return navigate('/signin');
        setProfile(currentUser);

        if (currentUser.savedDrinks?.length) {
            const result = await loadSavedDrinks(currentUser.savedDrinks);
            setSavedDrinks(result); 
        }
    };

    const signout = async () => {
        await client.signout();
        dispatch(clearCurrentUser());
        navigate('/signin');
    }

    const updateProfile = async () => {
        if (profile.age >= 21) {
            setProfile({ ...profile, role: "over21" });
        }
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
        setEditMode(false);
    };

    useEffect(() => { fetchProfile(); }, []);

    return (
        <div className="profile">
            <h3>Profile: </h3>
            <Row>
                <Col>
                    {editMode ? (
                        <>
                            <Form.Control className="mb-2 w-75" placeholder="username" defaultValue={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                            <Form.Control className="mb-2 w-75" placeholder="password" defaultValue={profile.password}
                                onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                            <Form.Control className="mb-2 w-75" placeholder="first name" defaultValue={profile.firstName}
                                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                            <Form.Control className="mb-2 w-75" placeholder="last name" defaultValue={profile.lastName}
                                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                            <Form.Control className="mb-2 w-75" placeholder="email" defaultValue={profile.email} type="email"
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                            <Form.Control className="mb-2 w-75" placeholder="bio" defaultValue={profile.bio} as="textarea"
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
                            <Form.Control className="mb-2 w-75" placeholder="age" defaultValue={profile.age} type="number"
                                onChange={(e) => setProfile({ ...profile, age: e.target.value })} />

                            <Button variant="primary" className="me-2" onClick={updateProfile}>Update Profile</Button>
                            <Button variant="secondary" className="me-2" onClick={() => setEditMode(false)}>Cancel</Button>
                        </>
                    ) : (
                        <>
                            <h1>Hi, {profile.firstName} {profile.lastName}</h1>
                            <p><strong>About Me:</strong> {profile.bio}</p>
                            <br />
                            <p><strong>Username:</strong> {profile.username}</p>
                            <p><strong>Role:</strong> {profile.role}</p>
                            <p><strong>Email:</strong> {profile.email}</p>

                            <Button>
                                <MdOutlineModeEditOutline onClick={() => setEditMode(true)} className="me-2 transparent-icon" />
                                Edit Profile
                            </Button>
                        </>
                    )}
                </Col>
                <Col>
                    <Tabs
                        defaultActiveKey="following"
                        transition={false}
                        className="mb-3"
                    >
                        <Tab eventKey="following" title="Following">
                            Insert list of usernames
                        </Tab>
                        <Tab eventKey="followers" title="Followers">
                            Insert list of usernames
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <br />
            <Row>
                <h2>Saved Drinks:</h2>
                {savedDrinks.map((drink, index: number) => {
                    return (
                        <Col key={index} className="col-2">
                            <DrinkCard drink={drink} onClick={() => navigate(`/drinks/${drink.idDrink}`)} page="profile" />
                        </Col>
                    )
                })}
            </Row>
            <br />
            <Button variant="danger" className="me-2" onClick={signout}>Sign Out</Button>
        </div>
    )
}