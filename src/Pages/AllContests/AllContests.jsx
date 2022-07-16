import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { query, collection, onSnapshot, doc, orderBy, where, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config"
import { Button, Card, Row, Col } from "react-bootstrap";

const Contests = (props) => {
    // USE STATE
    const [upcomingContests, setUpcomingContests] = useState([]);
    const [liveContests, setLiveContests] = useState([]);
    const [expiredContests, setExpiredContests] = useState([]);


    const navigate = useNavigate()
    const currUser = props.currUser

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
    }, [currUser, navigate, props])

    // Enroll current user in selected contest or put them in queue according to regsitered users limit
    // const Enroll = async (data) => {
    //     const docRef = doc(db, "hacktheweb-contests", data.key)

    //     try {
    //         if (data.registered.length === Number(data.contestCapacity)) {
    //             // send user to queue
    //             await updateDoc(docRef, {
    //                 queue: [...data.queue, { uid: currUser.uid, registeredAt: new Date() }]
    //             })
    //             props.notify("You have been added to interested list!!!", "info")
    //         } else {
    //             // register the user
    //             await updateDoc(docRef, {
    //                 registered: [...data.registered, currUser.uid]
    //             })
    //             props.notify("You are successfully registered!!!", "success")
    //         }
    //     } catch (e) {
    //         console.log(e)
    //         props.notify("Error in enrolling!!!", "error")

    //     }


    // }

    // move user from queue to register when user de-registers
    // const updateRegisteredAndQueue = async (data) => {
    //     if (data.queue.length === 0)
    //         return
    //     const docRef = doc(db, "hacktheweb-contests", data.key)

    //     const uidToRemove = currUser.uid
    //     const uidToAdd = data.queue[0].uid

    //     let updatedRegistered = data.registered.filter((e) => e !== uidToRemove)
    //     updatedRegistered = [...updatedRegistered, uidToAdd]

    //     const updatedQueue = data.queue.filter((e) => e.uid !== uidToAdd)
    //     await updateDoc(docRef, {
    //         registered: updatedRegistered,
    //         queue: updatedQueue
    //     })
    // }

    // remover current user from selected contest
    // const RemoveFromRegister = async (data) => {

    //     // cannot de-register if contests starts in less than 30 minutes
    //     if (new Date(data.contestSchedule) - new Date() < 1800000) {
    //         props.notify("Cannot de-register. Contest is starting soon!!!")
    //         return
    //     }

    //     const docRef = doc(db, "hacktheweb-contests", data.key)
    //     const updatedRegistered = data.registered.filter((d) => d !== currUser.uid)

    //     try {
    //         await updateDoc(docRef, {
    //             registered: updatedRegistered
    //         })

    //         // update new registered users and queue if more than 0 user is present in queue
    //         updateRegisteredAndQueue(data)
    //         props.notify("You are successfully de-registered!!!", "success")
    //     } catch (e) {
    //         console.log(e)
    //         props.notify("Error de-registering!!!", "error")
    //     }

    // }

    // remove user from queue (was already in queue)
    // const RemoveFromQueue = async (data) => {
    //     const docRef = doc(db, "hacktheweb-contests", data.key)
    //     const updatedQueue = data.queue.filter((d) => d.uid !== currUser.uid)
    //     // console.log(updatedQueue)
    //     try {
    //         await updateDoc(docRef, {
    //             queue: updatedQueue
    //         })
    //         props.notify("You have been removed from interested list!!!", "info")
    //     } catch (e) {
    //         console.log(e)
    //         props.notify("Error removing from interested list!!!", "error")

    //     }

    // }

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
                        </Card.Body>
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