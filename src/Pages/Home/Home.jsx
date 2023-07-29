import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      this is home page
      <h1 className="col-md-6 bg-light p-5 fw-bolder text-dark">
        Hack The Web - A Platform for Aspiring Programmers
      </h1>
      <Link to="/all-contests">
        <Button variant="danger py-2 px-5 my-4 fw-bolder text-light">
          <i className="fas fa-terminal"></i> Compete
        </Button>
      </Link>
      <section className=" text-dark p-4 mt-4 box home-box">
        <h1 className="text-center fw-bolder text-success">
          Become a true programming master
        </h1>
        <h3 className="text-center fw-bolder text-secondary">
          Learn how to code and build efficient algorithms
        </h3>
        <ul>
          <li>Win cool Goodies.</li>
          <li>Dedicated Monthly Hack The Web Contests.</li>
          <li>Huge library of practice problems from beginners to advanced.</li>
          <li>Learn from the Best Coders in India.</li>
          <li>Host your own Contest.</li>
        </ul>
      </section>
      <section className=" text-dark p-4 mt-4 box home-box">
        <h3 className="text-center fw-bolder text-secondary">
          Hack The Web App Features
        </h3>
        <ul>
          <li>Every user can host and participate in contest.</li>
          <li>Users cannot host contest starting earlier than 1hrs.</li>
          <li>
            After contest registered user limit is reached, other users
            registering will be putted in Interested list (queue).
          </li>
          <li>
            When registered user de-registers from contest, user from queue
            automatically gets registered.
          </li>
          <li>
            Users cannot de-register from contest starting in less than 30
            minutes.
          </li>
        </ul>
      </section>
      <section className=" text-dark p-4 mt-4 box home-box">
        <h3 className="text-center fw-bolder text-success">
          Join The Discussion...
        </h3>
        <div
          className="px-2 py-1 rounded-2"
          id="gimme-comments-root"
          data-gimme_comments_website_id="64c3a99758de0fe7fe3d810c"
        ></div>
      </section>
    </>
  );
};

export default Home;
