import React, { useState } from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import { auth } from "./Firebase/firebase-config"
import { onAuthStateChanged } from "firebase/auth";
import { Container } from "react-bootstrap";

// toast message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Style/custom.scss';
import './App.css';

// pages
import NavigationBar from "./Components/NavigationBar"
import Footer from "./Components/Footer"
import Home from "./Pages/Home/Home"
import AllContests from "./Pages/AllContests/AllContests"
import CreateContest from "./Pages/CreateContest/CreateContest";
import Host from "./Pages/Host/Host"
import Profile from "./Pages/Profile/Profile";
import ContestPage from "./Pages/ContestPage/ContestPage";
import ContestStanding from "./Pages/ContestStanding/ContestStanding"

const App = () => {

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

  const WithNav = () => {
    return (
      <>
        <NavigationBar currUser={currUser} />
        <Container fluid="xxl" className="py-5">
          <Outlet />
        </Container>
        <Footer />
      </>
    );
  };

  const WithoutNav = () => {
    return (
      <>
        <div style={{ color: "white" }}>
          <Outlet />
        </div>
      </>
    );
  };

  return (
    <>
      <Routes>
        <Route element={<WithNav />}>
          <Route exact path="/" element={<Home notify={notify} />} />
          <Route exact path="/all-contests" element={<AllContests currUser={currUser} notify={notify} />} />

          <Route exact path="/contest-page/:contestId" element={<ContestPage notify={notify} />} />
          <Route exact path="/contest-page/:contestId/standing/:userName" element={<ContestStanding notify={notify} />} n />
          {/* require login */}
          <Route exact path="/host" element={<Host currUser={currUser} notify={notify} />} />
          <Route exact path="/profile" element={<Profile currUser={currUser} notify={notify} />} />
          <Route exact path="/create-contest" element={<CreateContest currUser={currUser} notify={notify} />} />
        </Route>

        <Route element={<WithoutNav />}>
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
    </>
  );
}

export default App;
