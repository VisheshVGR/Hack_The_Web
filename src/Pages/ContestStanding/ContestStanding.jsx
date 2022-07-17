import React, { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
import { Form, Row, Button, Card, Col, Table } from "react-bootstrap"

import { query, collection, where, onSnapshot, addDoc, orderBy, serverTimestamp, deleteDoc } from "firebase/firestore";

const ContestScore = ({ notify }) => {
    const navigate = useNavigate()
    const { contestId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [partifipatedUsers, setParticipatedUsers] = useState([])

    const [contestData, setContestData] = useState({})

    // USE EFFECT
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "hacktheweb-contests", contestId), (doc) => {
            if (doc.exists()) {
                const data = { ...doc.data(), key: doc.id }
                console.log(data)
                setContestData(data)
                let participatedUserScore = data.participated
                participatedUserScore.sort(function (a, b) {
                    let keyA = a.candidateScore,
                        keyB = b.candidateScore;
                    // Compare the 2 dates
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });
                setParticipatedUsers(participatedUserScore)

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setContestData({ exist: false })

            }
        });

        return (() => {
            unsubscribe()
        })
    }, [contestId])



    return (
        <>
            <div className="box p-0 rounded-0  bg-white" style={{ minHeight: "100vh" }}>
                {
                    contestData.contestName === undefined ?
                        <>
                            {
                                contestData.exist === false ? <>
                                    <h2 className="text-center">Contest Doesn't Exists</h2>
                                </> : <>
                                    <h2 className="text-center">Loading...</h2>
                                </>
                            }
                        </> :
                        <>
                            <div className="bg-primary p-4 fw-bold text-white">

                                <h2 className="text-center mb-5 fw-bolder text-decoration-underline"><i className="fas fa-users"></i> {contestData.contestName}</h2>
                                <Row>
                                    <Col xs={12} md={6}>
                                        Start Date/ Time : {contestData.startingDateTime}
                                    </Col>
                                    <Col xs={12} md={6}>
                                        End Date/ Time : {contestData.endingDateTime}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Organized By : {contestData.organizerName} | {contestData.organizerEmailId}
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-3 pb-5">

                                {searchParams.get("email")}
                                <h3 className="my-5 text-decoration-underline text-center"><i className="fas fa-users"></i> Standings:</h3>

                                <Table responsive="xl">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            partifipatedUsers.map((data, idx) => {

                                                return (<>
                                                    <tr key={data.candidateEmail}>
                                                        <td>{idx + 1}</td>
                                                        <td>{data.candidateName}</td>
                                                        <td>{data.candidateEmail}</td>
                                                        <td>{data.candidateScore}</td>
                                                    </tr>
                                                </>)
                                            })
                                        }
                                    </tbody>
                                </Table>



                            </div>

                        </>
                }
            </div>


        </>
    )
}

export default ContestScore