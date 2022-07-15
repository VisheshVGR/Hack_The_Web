import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { auth } from "./Firebase/firebase-config"
import { onAuthStateChanged } from "firebase/auth";
import { Container } from "react-bootstrap";

// toast message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './Style/custom.scss';
import './App.css';

// pages
import NavigationBar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Home from "./Pages/Home/Home"
import Contests from "./Pages/Contest/Contests"
import Host from "./Pages/Host/Host"



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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrUser(user)
    } else {
      setCurrUser(null)
    }
  });

  return (
    <>

      <NavigationBar currUser={currUser} />
      <Container fluid="xxl" className="py-5">
        <Routes>
          <Route exact path="/host" element={<Host currUser={currUser} notify={notify} />}>
          </Route>
          <Route exact path="/contests" element={<Contests currUser={currUser} notify={notify} />}>
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
