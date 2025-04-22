import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import * as client from "./client"; 
import { setCurrentUser } from "./reducer";

export default function SignIn() {
    const [credentials, setCredentials] = useState<any>({}); 

    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    const signin = async () => {
        const user = await client.signin(credentials); 
        if (!user) return; 
        dispatch(setCurrentUser(user)); 
        navigate('/home'); 
    }

    return (
        <div id="signin-screen">
            <h3>Sign in</h3>
            <Form.Control defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value})}
                placeholder="username" id="username" className="mb-2 w-25" />

            <Form.Control defaultValue={credentials.password} type="password"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value})}
                placeholder="password" id="password" className="mb-2 w-25" />

            <Button onClick={signin} id="signin-btn" className="btn w-25 mb-2">Sign In</Button> <br /> 
            <Link to="/signup" className="btn btn-primary w-25 mb-2">Sign Up</Link>
        </div>
    )
}