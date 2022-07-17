import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
import { Form, Row, Button, Card, Col } from "react-bootstrap"

import ContestActions from "./ContestActions"

const ContestPage = ({ notify }) => {
    const navigate = useNavigate()
    const { contestId } = useParams()

    const [contestData, setContestData] = useState({})
    const [candidateDetails, setCandidateDetails] = useState({
        candidateName: "",
        candidateEmail: "",
    })

    // USE EFFECT
    useEffect(() => {

        const getContestDataFromDb = async () => {
            const docRef = doc(db, `hacktheweb-contests/${contestId}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setContestData(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setContestData({ exist: false })
            }

        }
        getContestDataFromDb()

    }, [contestId])


    const StartContest = () => {
        if (!candidateDetails.candidateName || !candidateDetails.candidateEmail) {
            notify("Please Enter your details", "warning")
            return
        }

        if (!candidateDetails.candidateEmail.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            notify("Please Enter valid Email Id", "warning")
            return
        }

        let userExist = false
        contestData.participated.forEach((item) => {
            if (item.candidateEmail === candidateDetails.candidateEmail) {
                userExist = true
            }
        })

        if (userExist) {
            notify("You have already given the contest", "error")
            return
        }

        navigate(`/contest-page/quiz/${contestId}/${candidateDetails.candidateEmail}/${candidateDetails.candidateName}`)
        console.log(contestData.participated)
    }


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


                                <h3 className="mt-5 text-decoration-underline"><i className="fas fa-users"></i> Instructions for the Quiz:</h3>
                                <p>{contestData.contestName} is designed to test the knowledge of the participants. The quiz competition will be held in accordance with these Official Rules of this competition listed hereinafter: </p>
                                <p>REGISTRATION FOR “{contestData.contestName}.” CONSTITUTES YOUR ACCEPTANCE OF THESE OFFICIAL RULES: </p>
                                <ol>
                                    <li>
                                        The Quiz is organized by {contestData.organizerName} in association with Hack the Web.
                                    </li>
                                    <li>
                                        <b>Eligibility:</b> The Quiz is open to people anywhere in the world who have completed the age of 18 years of age as on 01-01-2021.
                                    </li>
                                    <li>
                                        <b>BINDING AGREEMENT:</b> In order to enter the Quiz, entrant must accept the official rules
                                        The Rules consist of:

                                        <ol type="i">
                                            <li>
                                                the terms and conditions on the web page
                                            </li>
                                            <li>
                                                the terms and conditions if any on the Entry Form or the Quiz page. The Participant should read this agreement carefully prior to entry to ensure that he/she understands and agrees, because these Rules form a legally binding agreement with respect to this Quiz.

                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        The Quiz will consist of {contestData.questionsList.length} questions for the participants to answer. Participants can attempt each question only once so participants have no option to change their previous questions answer.
                                    </li>
                                    <li>
                                        In order to be eligible for the rewards, a participant must register for the Quiz and complete the Quiz within the given date slot. The winners will be chosen among these participants based on whoever answers the highest number of questions correctly and highest score.
                                    </li>
                                    <li>
                                        Prize details for each quiz will be announced separately.

                                    </li>

                                </ol>
                                <Button onClick={() => navigate(`/contest-page/${contestId}/standing`)} variant="danger" className="text-white">See Current Standings</Button>
                                <ContestActions contestData={contestData} candidateDetails={candidateDetails} setCandidateDetails={setCandidateDetails} StartContest={StartContest} />
                            </div>



                        </>
                }
            </div>

        </>
    )
}

export default ContestPage