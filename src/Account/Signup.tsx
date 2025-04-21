import { useState } from "react"
import { Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

export default function SignUp() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [verifyPassword, setVerifyPassword] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate();

    const signup = () => {
        console.log(firstName);
        console.log(lastName);
        console.log(username);
        console.log(password);
        console.log(verifyPassword);
        console.log(age);
        console.log(email);
        navigate('/profile')
    }

    return (
        <div id="signup-screen">
            <h3>Sign up</h3>
            <Form.Control defaultValue="first name"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="first name" id="firstName" className="mb-2 w-25" />

            <Form.Control defaultValue="last name"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name" id="lastName" className="mb-2 w-25" />

            <Form.Control defaultValue="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username" id="username" className="mb-2 w-25" />

            <Form.Control defaultValue="password" type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password" id="password" className="mb-2 w-25" />

            <Form.Control defaultValue="verify-password" type="password"
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="verify-password" id="password" className="mb-2 w-25" />

            <Form.Control defaultValue={1} type="number"
                onChange={(e) => setAge(e.target.value)}
                placeholder="age" id="age" className="mb-2 w-25" />

            <Form.Control defaultValue="email" type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email" id="email" className="mb-2 w-25" />

            <Link to="/signup" className="btn btn-primary w-25 mb-2" onClick={signup}>Sign Up</Link> <br />
            <Link to="/signin" className="btn btn-primary w-25 mb-2" onClick={signup}>Sign In</Link>
        </div>
    )
}