import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { query, collection, onSnapshot, doc, orderBy, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config"
import { Button, Card, Row, Col } from "react-bootstrap";

const Dashboard = (props) => {
    // USE STATE
    const [upcomingContests, setUpcomingContests] = useState([]);
    const [expiredContests, setExpiredContests] = useState([])
    const [registeredContests, setRegisteredContests] = useState([])
    const [queuedContests, setQueuedContests] = useState([])

    const navigate = useNavigate()
    const currUser = props.currUser

    // USE EFFECT
    useEffect(() => {
        if (!currUser) {
            navigate('/')
            props.notify("You must be Signed In to access Dashboard!!!", "warning")
            return
        }

        const q = query(collection(db, "hacktheweb-contests"), orderBy("contestSchedule"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const uc = []
            const ec = []
            const rc = []
            const qc = []


            querySnapshot.forEach((doc) => {

                const data = { ...doc.data(), key: doc.id }

                // console.log(new Date(doc.data().contestSchedule), new Date(), new Date(doc.data().contestSchedule) < new Date())
                // 1. if doc.data().createdAt < new Data()
                // contest is Expired

                // 2. if doc.data().registered.includes(currUser.uid)
                // user is registered
                // De-register Operation

                // 3. if doc.data().queue.some((e)=> e.uid === currUser.uid)
                // user is in-queue
                // Not-interested Operation

                // 3. Else upcoming contest

                if (new Date(doc.data().contestSchedule) < new Date()) {
                    ec.push(data)
                } else if (doc.data().registered.some((e) => e === currUser.uid)) {
                    rc.push(data)
                } else if (doc.data().queue.some((e) => e.uid === currUser.uid)) {
                    qc.push(data)
                } else {
                    uc.push(data)
                }

            });
            setExpiredContests(ec)
            setRegisteredContests(rc)
            setQueuedContests(qc)
            setUpcomingContests(uc)

        });

        return (() => {
            unsubscribe()
        })

    }, [currUser, navigate, props])

    // Enroll current user in selected contest or put them in queue according to regsitered users limit
    const Enroll = async (data) => {
        const docRef = doc(db, "hacktheweb-contests", data.key)

        try {
            if (data.registered.length === Number(data.contestCapacity)) {
                // send user to queue
                await updateDoc(docRef, {
                    queue: [...data.queue, { uid: currUser.uid, registeredAt: new Date() }]
                })
                props.notify("You have been added to interested list!!!", "info")
            } else {
                // register the user
                await updateDoc(docRef, {
                    registered: [...data.registered, currUser.uid]
                })
                props.notify("You are successfully registered!!!", "success")
            }
        } catch (e) {
            console.log(e)
            props.notify("Error in enrolling!!!", "error")

        }


    }

    // move user from queue to register when user de-registers
    const updateRegisteredAndQueue = async (data) => {
        if (data.queue.length === 0)
            return
        const docRef = doc(db, "hacktheweb-contests", data.key)

        const uidToRemove = currUser.uid
        const uidToAdd = data.queue[0].uid

        let updatedRegistered = data.registered.filter((e) => e !== uidToRemove)
        updatedRegistered = [...updatedRegistered, uidToAdd]

        const updatedQueue = data.queue.filter((e) => e.uid !== uidToAdd)
        await updateDoc(docRef, {
            registered: updatedRegistered,
            queue: updatedQueue
        })
    }

    // remover current user from selected contest
    const RemoveFromRegister = async (data) => {

        // cannot de-register if contests starts in less than 30 minutes
        if (new Date(data.contestSchedule) - new Date() < 1800000) {
            props.notify("Cannot de-register. Contest is starting soon!!!")
            return
        }

        const docRef = doc(db, "hacktheweb-contests", data.key)
        const updatedRegistered = data.registered.filter((d) => d !== currUser.uid)

        try {
            await updateDoc(docRef, {
                registered: updatedRegistered
            })

            // update new registered users and queue if more than 0 user is present in queue
            updateRegisteredAndQueue(data)
            props.notify("You are successfully de-registered!!!", "success")
        } catch (e) {
            console.log(e)
            props.notify("Error de-registering!!!", "error")
        }

    }

    // remove user from queue (was already in queue)
    const RemoveFromQueue = async (data) => {
        const docRef = doc(db, "hacktheweb-contests", data.key)
        const updatedQueue = data.queue.filter((d) => d.uid !== currUser.uid)
        // console.log(updatedQueue)
        try {
            await updateDoc(docRef, {
                queue: updatedQueue
            })
            props.notify("You have been removed from interested list!!!", "info")
        } catch (e) {
            console.log(e)
            props.notify("Error removing from interested list!!!", "error")

        }

    }

    const ContestCard = (props) => {
        const data = props.data

        let Btn
        switch (props.type) {
            case "registered": Btn = () => <Button variant="danger w-75 mx-auto mb-3" onClick={() => RemoveFromRegister(data)} >De-Register</Button>
                break;
            case "queued": Btn = () => <Button variant="info w-75 mx-auto mb-3" onClick={() => RemoveFromQueue(data)} >Not Interested</Button>
                break;
            case "upcoming": Btn = () => <Button variant="success w-75 mx-auto mb-3" onClick={() => Enroll(data)} >Enroll</Button>
                break;
            case "expired": Btn = () => <></>
                break;
            default:
                console.log("Error Detected")

        }
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
                        <Btn />
                    </Card>
                </Col>

            </>
        )
    }

    return (
        <>

            <div className="box py-5 my-3">
                <h2 className="text-center"><i className="fas fa-user-ninja"></i> Registered Contests</h2>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {registeredContests && registeredContests.map((msg) => <ContestCard key={msg.key} data={msg} type={"registered"} />)}
                </Row>
            </div>

            <div className="box py-5 my-3">
                <h2 className="text-center"><i className="fas fa-user-clock"></i> Interested Contests</h2>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {queuedContests && queuedContests.map((msg) => <ContestCard key={msg.key} data={msg} type={"queued"} />)}
                </Row>
            </div>

            <div className="box py-5 my-3">
                <h2 className="text-center"><i className="fas fa-users"></i> Live Contests</h2>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {upcomingContests && upcomingContests.map((msg) => <ContestCard key={msg.key} data={msg} type={"upcoming"} />)}
                </Row>
            </div>

            <div className="box py-5 my-3">
                <h2 className="text-center"><i className="fas fa-users-slash"></i> Expired Contest</h2>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {expiredContests && expiredContests.map((msg) => <ContestCard key={msg.key} data={msg} type={"expired"} />)}
                </Row>
            </div>

        </>
    )
}

export default Dashboard