import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate(); 

    const signin = () => {
        console.log(username); 
        console.log(password); 
        navigate('/profile')
    }

    return (
        <div id="signin-screen">
            <h3>Sign in</h3>
            <Form.Control defaultValue="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username" id="username" className="mb-2 w-25" />

            <Form.Control defaultValue="password" type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password" id="password" className="mb-2 w-25" />

            <Button onClick={signin} id="signin-btn" className="btn w-25 mb-2">Sign In</Button> <br /> 
            <Link to="/signup" className="btn btn-primary w-25 mb-2">Sign Up</Link>
        </div>
    )
}