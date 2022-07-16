import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Row, Button, Card, Col } from "react-bootstrap"
import { query, collection, where, onSnapshot, addDoc, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config"


const Host = (props) => {

    const [upcomingContests, setUpcomingContests] = useState([]);
    const [liveContests, setLiveContests] = useState([]);
    const [expiredContests, setExpiredContests] = useState([]);

    const navigate = useNavigate()
    const currUser = props.currUser

    // USE EFFECT
    useEffect(() => {
        if (!currUser) {
            navigate('/')
            props.notify("You must be Signed In to Host contests!!!", "warning")
            return
        }

        const q = query(collection(db, "hacktheweb-contests"), where("uid", "==", currUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const uc = []
            const lc = []
            const ec = []
            querySnapshot.forEach((doc) => {
                const data = { ...doc.data(), key: doc.id }
                console.log(data.key)

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const DeleteContest = async (id) => {
        try {
            await deleteDoc(doc(db, "hacktheweb-contests", id))
            props.notify("Contest deleted succesfully!!!", "success")
        } catch (e) {
            console.log(e)
            props.notify("Error deleted contest!!!", "error")

        }


    }

    const ContestCard = (data) => {
        data = data.data
        // console.log(data)
        return (
            <>
                <Col>
                    <Card className="mx-3">
                        <Card.Body>
                            <Card.Title>{data.contestName}</Card.Title>
                            Created By : {data.organizerName}<br />
                            Start At : {data.startingDateTime}<br />
                            Ends At : {data.endingDateTime}<br />
                        </Card.Body>
                        <Button variant="outline-dark w-75 mx-auto mb-3" onClick={() => navigate(`/contest-page/${data.key}`)}>View Contest</Button>
                        <Button variant="outline-danger w-75 mx-auto mb-3" onClick={() => DeleteContest(data.key)}>Delete Contest</Button>
                    </Card>
                </Col>
            </>
        )
    }



    return (
        <>

            <div className="box py-5 px-2 my-3">
                <h2 className="text-center"><i className="fas fa-terminal"></i> Create Contest</h2>
                <Button onClick={() => navigate("/create-contest")}>Create Contest</Button>
            </div>

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

export default Host