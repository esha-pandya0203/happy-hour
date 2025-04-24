import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as client from "../clients/accountClient";
import * as followClient from "../clients/followClient";
import { clearCurrentUser, setCurrentUser } from "./reducer";
import DrinkCard from "../Details/DrinkCard";
import { loadSavedDrinks } from "../utils/drinks";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";

export default function Profile() {
    const { pid } = useParams();

    const [profile, setProfile] = useState<any>({});
    const [savedDrinks, setSavedDrinks] = useState<any[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [followers, setFollowers] = useState<any[]>([]);
    const [followees, setFollowees] = useState<any[]>([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const currentProfile = !pid || pid === currentUser?._id;
    const currentIsFollowing = !currentProfile && !followers.find(currentUser);

    const fetchProfile = async () => {
        if (!pid && !currentUser) return navigate('/signin');

        let userData;

        if (currentProfile) {
            userData = currentUser;
        } else {
            userData = await client.findUserById(pid);
        }

        setProfile(userData);

        if (userData?.savedDrinks?.length) {
            const result = await loadSavedDrinks(userData.savedDrinks);
            setSavedDrinks(result);
        } else {
            setSavedDrinks([]);
        }

        const followerResult = await followClient.getFollowers(userData._id);
        const followeeResult = await followClient.getFollowees(userData._id);

        setFollowees(followeeResult);
        setFollowers(followerResult);
    };

    const signout = async () => {
        await client.signout();
        dispatch(clearCurrentUser());
        navigate('/signin');
    }

    const updateProfile = async () => {
        if (profile.age >= 21) {
            setProfile({ ...profile, role: "over21" });
        } else {
            setProfile({ ...profile, role: "under21" });
        }
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
        setEditMode(false);
    };

    useEffect(() => { fetchProfile(); }, [pid]);

    return (
        <div className="profile">
            <h3>Profile: </h3>
            <Row>
                <Col>
                    {editMode && currentProfile ? (
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
                            {currentProfile && <p><strong>Email:</strong> {profile.email}</p>}

                            {currentProfile ?
                                <Button onClick={() => setEditMode(true)}>
                                    <MdOutlineModeEditOutline className="me-2 transparent-icon" />
                                    Edit Profile
                                </Button> :
                                currentIsFollowing ? <Button onClick={() => followClient.unfollowUser(currentUser?._id, pid)}>
                                                        <RiUserUnfollowFill />
                                                        Unfollow
                                                     </Button>
                                                   : <Button onClick={() => followClient.followUser(currentUser?._id, pid)}>
                                                        <RiUserFollowFill />
                                                        Follow
                                                     </Button>}
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
                            {followees.map((user: any) => (
                                <p key={user._id}>
                                    <Link to={`/profile/${user.followee_id._id}`}>{user.followee_id.username}</Link>
                                </p>
                            ))}
                        </Tab>
                        <Tab eventKey="followers" title="Followers">
                            {followers.map((user: any) => (
                                <p key={user._id}>
                                    <Link to={`/profile/${user.follower_id._id}`}>{user.follower_id.username}</Link>
                                </p>
                            ))}
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
            {currentProfile && (
                <Button variant="danger" className="me-2" onClick={signout}>Sign Out</Button>
            )}
        </div>
    )
}