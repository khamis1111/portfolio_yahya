import React from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MainNavbar = () => {
    return (
        <>
            <Navbar key={'md'} expand={'md'} className="mb-3" data-bs-theme="dark" sticky='top' style={{ zIndex: '20' }} >
                <Container id='container'>
                    <Navbar.Brand><Link to={'/'}>YAYVV YMANII</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'md'}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${'md'}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${'md'}`}
                        placement="end"
                        data-bs-theme="dark"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'md'}`}>
                                    
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-center flex-grow-1 pe-3 gap-3">
                                <Link to={'/'}>HOME</Link>
                                <Link to={'/work'}>WORK</Link>
                                <Link to={'/allReels'} className='text-effect light-effect'>REELS</Link>
                                {/* <Link to={'/diary'}>DIARY</Link> */}
                                <Link to={'/biography'}>BIOGRAPHY</Link>
                                <Link to={'/contact'}>CONTACT</Link>
                                
                                {/* <NavDropdown
                                    title="Dropdown"
                                    id={`offcanvasNavbarDropdown-expand-${'md'}`}
                                >
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                            <Link to={'/'}>YAYVV YMANII</Link>
                            {/* <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form> */}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default MainNavbar
