import styles from './NavBar.module.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return(
        <>
            <Navbar bg="dark" variant="dark" sticky="top" className="square bg-primary rounded me-auto">
                <Container>
                    <Navbar.Brand className="me-auto">Waiter App</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                        <Nav.Link
                            to="/"
                            as={NavLink}
                            bsPrefix={styles.active}
                        >
                            Home
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;