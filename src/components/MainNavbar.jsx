import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MainNavbar = () => {
    return (
        <>
            <Navbar expand="md" className="mb-3" data-bs-theme="dark" sticky='top'>
                <Container id='container'>
                    <Navbar.Brand><Link to={'/'}>YAYVV YMANII</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-center flex-grow-1 pe-3 gap-3">
                            <Link to={'/'}>HOME</Link>
                            <Link to={'/work'}>WORK</Link>
                            {/* <Link to={'/diary'}>DIARY</Link> */}
                            <Link to={'/biography'}>BIOGRAPHY</Link>
                            <Link to={'/contact'}>CONTACT</Link>
                        </Nav>
                        <div className='sidebar'>
                            <Link to={'/allReels'} className='text-effect light-effect'>REELS</Link>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default MainNavbar
