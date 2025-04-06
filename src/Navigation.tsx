import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <Navbar fixed="top" expand="lg" className="navbar">
      <Container className='navbar'>
        <Navbar.Brand href="#home" className='navbar py-0'>
            <img src="./public/images/happy-hour-logo.png" width='150' height='150' className='d-inline-block align-top' alt='Happy Hour Logo'/> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar'>
          <Nav className="me-auto navbar">
            <Nav.Link href="#search">Search</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;