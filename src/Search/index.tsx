import { Form, InputGroup } from "react-bootstrap";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Search() {
    return (
        <div className="search">
            <h1>Search</h1>
            <InputGroup className="float-start w-50 me-2">
                <InputGroup.Text id="search-icon" className="fs-5">
                    <HiMagnifyingGlass />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Search..." />
            </InputGroup>
        </div>
    ); 
}