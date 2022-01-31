import React, { useState } from "react"
import { Route, Routes, Link } from "react-router-dom"
import { auth } from "./pages/firebase-config.js"
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { Container, Button, Navbar } from "react-bootstrap";

// toast message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './custom.scss';
import './App.css';

// pages
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Host from "./pages/Host"

const provider = new GoogleAuthProvider();


function App() {

  // USE STATE
  const [currUser, setCurrUser] = useState(null);

  // toast message
  const notify = (msg, type) => toast(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: type,
    theme: "colored"
  });;

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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrUser(user)
    } else {
      setCurrUser(null)
    }
  });



  const Nav = () => {
    return (
      <>
        <Navbar className="bg-danger" expand="md">
          <Container fluid="xxl">
            <Navbar.Brand className="text-light my-2"><i className="fas fa-code"></i> Hack The Web</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">

              <Link className="d-block px-4 py-2 my-2" to="/">Home</Link>
              <Link className="d-block px-4 py-2 my-2" to="/dashboard">Dashboard</Link>
              <Link className="d-block px-4 py-2 my-2" to="/host">Host</Link>

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

  const Footer = () => {
    return (
      <>
        <footer className=" bg-primary">
          <Container fluid="xxl" className="p-5 d-flex flex-column justify-content-center align-items-center">
            <div className="wrapper">
              <div className="button-social" onClick={() => window.open("https://www.instagram.com/vishesh22_17/")}>
                <div className="icon">
                  <i className="fab fa-instagram"></i>
                </div>
                <span>Instagram</span>
              </div>

              <div className="button-social" onClick={() => window.open("https://www.linkedin.com/in/vishesh-vgr/")}>
                <div className="icon">
                  <i className="fab fa-linkedin"></i>
                </div>
                <span>Linkedin</span>
              </div>

              <div className="button-social" onClick={() => window.open("https://github.com/VisheshVGR")}>
                <div className="icon">
                  <i className="fab fa-github"></i>
                </div>
                <span>Github</span>
              </div>
            </div>

            <p className="text-white pt-4 text-center">
              <i className="fas fa-code"></i> Hack The Web<br />2022 &#169; All Rights Reserved.
            </p>
          </Container>
        </footer>
      </>
    )
  }

  return (
    <>

      <Nav />
      <Container fluid="xxl" className="py-5">
        <Routes>
          <Route exact path="/host" element={<Host currUser={currUser} notify={notify} />}>
          </Route>
          <Route exact path="/dashboard" element={<Dashboard currUser={currUser} notify={notify} />}>
          </Route>
          <Route exact path="/" element={<Home />} notify={notify}>
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
      <Footer />

    </>
  );
}

export default App;
