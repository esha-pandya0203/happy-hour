import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { MdOutlineModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import * as drinksClient from "../client";
import { clearCurrentUser, setCurrentUser } from "./reducer";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const [savedDrinks, setSavedDrinks] = useState<any[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchProfile = () => {
        if (!currentUser) return navigate('/signin');
        setProfile(currentUser);
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

    const loadSavedDrinks = async () => {
        if (!profile.savedDrinks) return;

        const drinkPromises = profile.savedDrinks.map((id: string) =>
            drinksClient.fetchById(id).then((res) => res.drinks?.[0])
        ); 
        const drinks = await Promise.all(drinkPromises); 
        setSavedDrinks(drinks.filter(Boolean)); 
    }; 

    useEffect(() => { fetchProfile(); }, []);

    useEffect(() => {
        if (profile.savedDrinks?.length) {
            loadSavedDrinks(); 
        }
    }, [profile]); 

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

                            <MdOutlineModeEdit onClick={() => setEditMode(true)} className="me-2" />
                            <p>Edit Profile</p>
                            <Button variant="danger" className="me-2" onClick={signout}>Sign Out</Button>
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
            <Row>
                <h2>Saved Drinks:</h2>
                {savedDrinks.map((drink, index: number) => {
                    return (
                        <Col key={index}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={drink.strDrinkThumb} />
                                <Card.Body>
                                    <Card.Title>{drink.strDrink}</Card.Title>
                                    <Card.Text>
                                        {Array.from({ length: 15 }).map((_, i) => {
                                            const ingredient = drink[`strIngredient${i+1}`]; 
                                            const measure = drink[`strMeasure${i+1}`]; 
                                            return ingredient ? (
                                                <div key={i}>{measure || ''} {ingredient}</div>
                                            ) : null; 
                                        })}
                                    </Card.Text>
                                    <Button variant="primary">See Recipe</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}