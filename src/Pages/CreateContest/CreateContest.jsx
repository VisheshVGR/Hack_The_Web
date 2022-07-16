import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Row, Button, Card, Col } from "react-bootstrap"
import { query, collection, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";

import AddQuestions from "./AddQuestions"

const InitialContestData = {
    contestName: "",
    organizerName: "",
    organizerEmailId: "",
    startingDateTime: "",
    endingDateTime: "",
}

const CreateContest = ({ currUser, notify }) => {
    const navigate = useNavigate()

    const [newContestData, setNewContestData] = useState(InitialContestData)
    const [questionsList, setQuestionsList] = useState([])

    // USE EFFECT
    useEffect(() => {
        if (!currUser) {
            navigate('/')
            notify("You must be Signed In to Create contests!!!", "warning")
            return
        }

        setNewContestData({
            ...newContestData,
            organizerName: currUser.displayName,
            organizerEmailId: currUser.email,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const CreateContest = async (e) => {
        e.preventDefault();

        if (!newContestData.contestName ||
            !newContestData.organizerName ||
            !newContestData.organizerEmailId ||
            !newContestData.startingDateTime ||
            !newContestData.endingDateTime) {
            notify("Please Fill all the Fields!", "info")
            return
        }

        if (questionsList.length === 0) {
            notify("No. of Questions cannot be 0", "info")
            return
        }


        if (new Date(newContestData.startingDateTime) <= new Date() || new Date(newContestData.startingDateTime) >= new Date(newContestData.endingDateTime)) {
            notify("Contest Start/ End time are invalid", "info")
            return
        }

        let DbQuestionsList = questionsList
        DbQuestionsList.forEach((item, idx) => {
            item.questionNo = idx + 1
        })

        let DbContestData = {
            ...newContestData,
            questionsList: DbQuestionsList,
            organizerName: currUser.displayName,
            organizerEmailId: currUser.email,
            uid: currUser.uid,
        }

        console.log(DbContestData)

        // validations completed

        try {
            await addDoc(collection(db, "hacktheweb-contests"),
                {
                    ...DbContestData,
                    createdAt: serverTimestamp(),
                    participated: [],
                });
            // console.log("Document written with ID: ", docRef.id);
            notify("Contest created succesfully!!!", "success")
            navigate("/host")
        } catch (e) {
            console.log(e)
            notify("Error creating contest!!!", "error")
        }



    };

    return (
        <>
            <div className="box py-5 px-2 my-3">
                <h2 className="text-center"><i className="fas fa-terminal"></i> Create Contest</h2>
                <Form>
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
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>Organizer Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                disabled
                                value={newContestData.organizerName}
                                onChange={(e) => setNewContestData({ ...newContestData, organizerName: e.target.value })}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>Organizer E-mail Id</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                disabled
                                value={newContestData.organizerEmailId}
                                onChange={(e) => setNewContestData({ ...newContestData, organizerEmailId: e.target.value })}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>Starting Date/Time</Form.Label>
                            <Form.Control
                                required
                                type="datetime-local"
                                placeholder=""
                                value={newContestData.startingDateTime}
                                onChange={(e) => setNewContestData({ ...newContestData, startingDateTime: e.target.value })}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>Ending Date/Time</Form.Label>
                            <Form.Control
                                required
                                type="datetime-local"
                                placeholder=""
                                value={newContestData.endingDateTime}
                                onChange={(e) => setNewContestData({ ...newContestData, endingDateTime: e.target.value })}
                            />
                        </Form.Group>
                    </Row>

                    <AddQuestions questionsList={questionsList} setQuestionsList={setQuestionsList} notify={notify} />

                    {/* <Row className="mb-3">
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>No. of Questions</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                max={100}
                                min={1}
                                placeholder="Total Number of questions."
                                // value={newContestData.totalQuestions}
                                ref={totalQuestionsRef}
                            // onChange={(e) => setNewContestData({ ...newContestData, totalQuestions: e.target.value })}
                            />
                            <Button className="mt-2" onClick={() => {
                                if (totalQuestionsRef.current.value <= 0 || totalQuestionsRef.current.value > 100) {
                                    notify("Number of Questions should be in the range 1 to 100", "warning")
                                    return;
                                }
                                setNewContestData({
                                    ...newContestData, totalQuestions: totalQuestionsRef.current.value
                                })
                            }
                            } > Add Questions </Button>

                        </Form.Group>
                    </Row> */}

                    {

                    }
                    {/*                     
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
                        </Form.Group>
                    </Row> */}
                    <Button onClick={CreateContest}>Create</Button>
                </Form>
            </div>
        </>
    )
}

export default CreateContest