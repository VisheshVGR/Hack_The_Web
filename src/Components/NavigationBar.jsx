import React from "react"
import { NavLink } from "react-router-dom"
import { auth } from "../Firebase/firebase-config"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Container, Button, Navbar } from "react-bootstrap";

const NavigationBar = ({ currUser }) => {
    const provider = new GoogleAuthProvider();

    let activeStyle = {
        fontWeight: "bolder",
        backgroundColor:"#ffffff33"
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider)
            // console.log("SUCCESFULLY LOGGED IN")
        } catch (e) {
            console.log("LOG IN ERROR", e)
        }
    }

    const signOutWithGoogle = () => {
        signOut(auth).then(() => {
            // console.log("SUCCESSFULLY LOGGED OUT")
        }).catch((error) => {
            console.log("LOG OUT ERROR", error)
        });
    }

    return (
        <>
            <Navbar className="bg-danger" expand="md">
                <Container fluid="xxl">
                    <Navbar.Brand className="text-light my-2"><i className="fas fa-code"></i> Hack The Web</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">

                        <NavLink className="d-block px-4 py-2 my-2" style={({ isActive }) => isActive ? activeStyle : undefined} to="/">Home</NavLink>
                        <NavLink className="d-block px-4 py-2 my-2" style={({ isActive }) => isActive ? activeStyle : undefined} to="/all-contests">Contests</NavLink>
                        <NavLink className="d-block px-4 py-2 my-2" style={({ isActive }) => isActive ? activeStyle : undefined} to="/host">Host</NavLink>

                        {currUser ?
                            <NavLink className="d-block px-4 py-2 my-2" style={({ isActive }) => isActive ? activeStyle : undefined} to="/profile">Profile</NavLink>
                            :
                            <></>
                        }

                        <Button variant="outline-light ms-4 my-2 button-bounce" onClick={currUser ? signOutWithGoogle : signInWithGoogle}>
                            {currUser ?
                                <i className="fas fa-sign-out-alt sign-in-out-btn"> Sign Out</i>
                                :
                                <i className="fas fa-sign-in-alt sign-in-out-btn"> Sign In</i>
                            }
                        </Button>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </>
    )
}

export default NavigationBar