import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config"
import { Button, Card, Row, Col } from "react-bootstrap";

const Contests = ({ currUser, notify }) => {
    // USE STATE
    const [upcomingContests, setUpcomingContests] = useState([]);
    const [liveContests, setLiveContests] = useState([]);
    const [expiredContests, setExpiredContests] = useState([]);


    const navigate = useNavigate()

    // USE EFFECT
    useEffect(() => {

        const q = query(collection(db, "hacktheweb-contests"), orderBy("startingDateTime"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const uc = []
            const lc = []
            const ec = []
            querySnapshot.forEach((doc) => {
                const data = { ...doc.data(), key: doc.id }

                if (new Date(doc.data().startingDateTime) > new Date()) {
                    uc.push(data)
                } else if (new Date(doc.data().endingDateTime) < new Date()) {
                    ec.push(data)
                } else {
                    lc.push(data)
                }
            });
            setUpcomingContests(uc)
            setLiveContests(lc)
            setExpiredContests(ec)
        });

        return (() => {
            unsubscribe()
        })
    }, [currUser, navigate])

    const ContestCard = (data) => {
        data = data.data
        return (
            <>
                <Col>
                    <Card className="mx-3">
                        <Card.Body>
                            <Card.Title>{data.contestName}</Card.Title>
                            Created By : {data.organizerName}<br />
                            Start At : {data.startingDateTime}<br />
                            Ends At : {data.endingDateTime}<br />
                            No. of Questions : {data.questionsList.length}<br />
                            User Attempted : {data.participated.length}<br />
                        </Card.Body>
                        <Button variant="outline-dark  w-75 mx-auto mb-3" onClick={() => navigate(`/contest-page/${data.key}`)}>View Contest</Button>
                        <Button variant="info w-75 mx-auto mb-3" onClick={() => { navigator.clipboard.writeText(window.location.href.replace("all-contests", `contest-page/${data.key}`)); notify("Link Copied!", "success") }}>Copy Link</Button>
                    </Card>
                </Col>

            </>
        )
    }

    return (
        <>

            <div className="box py-5 my-3">
                <h2 className="text-center"><i className="fas fa-users"></i> Live Contests</h2>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {liveContests && liveContests.map((msg) => <ContestCard key={msg.key} data={msg} />)}
                </Row>
            </div>

            <div className="box py-5 my-3">
                <h2 className="text-center"><i className="fas fa-users"></i> upcoming Contests</h2>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {upcomingContests && upcomingContests.map((msg) => <ContestCard key={msg.key} data={msg} />)}
                </Row>
            </div>

            <div className="box py-5 my-3">
                <h2 className="text-center"><i className="fas fa-users-slash"></i> Expired Contests</h2>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {expiredContests && expiredContests.map((msg) => <ContestCard key={msg.key} data={msg} />)}
                </Row>
            </div>

        </>
    )
}

export default Contests