import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Navigation() {

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <Navbar fixed="top" expand="lg" className="navbar">
      <Container className='navbar'>
        <Navbar.Brand href="#home" className='navbar py-0'>
          <img src="/images/happy-hour-logo.png" width='150' height='150' className='d-inline-block align-top' alt='Happy Hour Logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar'>
          <Nav className="me-auto navbar">
            <Nav.Link href="#search" className='me-2'>
              <FiSearch className='top-react-icons me-2' />
              Search
            </Nav.Link>
            {currentUser ? (
              <Nav.Link href="#profile">
                <FaRegUser className='top-react-icons me-2' />
                Profile
              </Nav.Link>
            ) :
              <>
                <FaRegUser className='top-react-icons me-2' />
                <NavDropdown title="Account" className='top-react-icons'>
                  <NavDropdown.Item href='#signin'>Sign In</NavDropdown.Item>
                  <NavDropdown.Item href='#signup'>Sign Up</NavDropdown.Item>
                </NavDropdown>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}