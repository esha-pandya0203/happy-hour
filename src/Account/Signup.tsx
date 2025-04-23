import { useState } from "react"
import { Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import * as client from "../clients/accountClient";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function SignUp() {
    const [verifyPassword, setVerifyPassword] = useState<string>("");
    const [user, setUser] = useState<any>({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signup = async () => {
        if (user.password === verifyPassword) {
            if (user.age >= 21) {
                setUser({ ...user, role: "over21" });
            }
            const currentUser = await client.signup(user);
            dispatch(setCurrentUser(currentUser));
            navigate("/profile");
        }
        navigate('/profile')
    }

    return (
        <div id="signup-screen">
            <h3>Sign up</h3>
            <Form.Control defaultValue="first name"
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                placeholder="first name" id="firstName" className="mb-2 w-25" />

            <Form.Control defaultValue="last name"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                placeholder="last name" id="lastName" className="mb-2 w-25" />

            <Form.Control defaultValue="username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username" id="username" className="mb-2 w-25" />

            <Form.Control defaultValue="password" type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password" id="password" className="mb-2 w-25" />

            <Form.Control defaultValue="verify-password" type="password"
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="verify-password" id="password" className="mb-2 w-25" />

            <Form.Control defaultValue="age" type="number"
                onChange={(e) => setUser({ ...user, age: e.target.value })}
                placeholder="age" id="age" className="mb-2 w-25" />

            <Form.Control defaultValue="email" type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email" id="email" className="mb-2 w-25" />

            <Link to="/profile" className="btn btn-primary w-25 mb-2" onClick={signup}>Sign Up</Link> <br />
            <Link to="/signin" className="btn btn-primary w-25 mb-2" onClick={signup}>Sign In</Link>
        </div>
    )
}