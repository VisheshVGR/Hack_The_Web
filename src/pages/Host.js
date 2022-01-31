import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Row, Button, Card, Col } from "react-bootstrap"
import { query, collection, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase-config"


const Host = (props) => {

    const [validated, setValidated] = useState(false);
    const [myContests, setMyContests] = useState([]);
    const [expiredContests, setExpiredContests] = useState([])
    const [newContestData, setNewContestData] = useState({
        contestName: "",
        contestCapacity: "",
        contestSchedule: ""
    })

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
            const mc = []
            const ec = []
            querySnapshot.forEach((doc) => {
                const data = { ...doc.data(), key: doc.id }

                if (new Date(doc.data().contestSchedule) < new Date()) {
                    ec.push(data)
                } else {
                    mc.push(data)
                }
            });
            setMyContests(mc)
            setExpiredContests(ec)
        });

        return (() => {
            unsubscribe()
        })

    }, [currUser, navigate, props])

    const CreateContest = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        // valid date check
        const dateValid = new Date(newContestData.contestSchedule) - new Date() > 3600000 ? true : false

        // for creating contest insantly(normally cannot create contest starting before 1hrs)(for testing only)
        // const dateValid = new Date(newContestData.contestSchedule) - new Date() > 0 ? true : false

        if (!dateValid) {
            props.notify("Contest schedule too early!", "warn")
            return
        }

        // validations completed
        const parameteres = {
            displayName: currUser.displayName,
            email: currUser.email,
            photoURL: currUser.photoURL,
            uid: currUser.uid,
            contestName: newContestData.contestName,
            contestCapacity: newContestData.contestCapacity,
            contestSchedule: newContestData.contestSchedule
        }

        try {
            await addDoc(collection(db, "hacktheweb-contests"),
                {
                    ...parameteres,
                    createdAt: serverTimestamp(),
                    registered: [],
                    queue: []
                });
            // console.log("Document written with ID: ", docRef.id);
            props.notify("Contest created succesfully!!!", "success")
        } catch (e) {
            console.log(e)
            props.notify("Error creating contest!!!", "error")
        }



    };

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
                            Created By : {data.displayName}<br />
                            Candidates Registered : {data.registered.length}/{data.contestCapacity}<br />
                            Candidates Interested : {data.queue.length}<br />
                            Start At : {data.contestSchedule}<br />

                        </Card.Body>
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
                <Form noValidate validated={validated} onSubmit={CreateContest} >
                    <Row className="mb-3">
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>Contest Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Contest Name"
                                value={newContestData.contestName}
                                onChange={(e) => setNewContestData({ ...newContestData, contestName: e.target.value })}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>Candidate Limit</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                max={100}
                                min={1}
                                placeholder="Enter number between 1 and 100"
                                value={newContestData.contestCapacity}
                                onChange={(e) => setNewContestData({ ...newContestData, contestCapacity: e.target.value })}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid number of candidates.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>Contest Schedule</Form.Label>
                            <Form.Control
                                required
                                type="datetime-local"
                                placeholder="Enter date on which contest will happen"
                                value={newContestData.contestSchedule}
                                onChange={(e) => setNewContestData({ ...newContestData, contestSchedule: e.target.value })}
                            />
                            <Form.Text className="text-muted">
                                Cannot host contest starting earlier than 1 hour
                            </Form.Text>
                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid start time.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Submit form</Button>
                </Form>
            </div>

            <div className="box py-5 my-3">

                <h2 className="text-center"><i className="fas fa-users"></i> Live Contests</h2>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {myContests && myContests.map((msg) => <ContestCard key={msg.key} data={msg} />)}
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