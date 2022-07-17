import React, { useEffect, useState } from "react"
import { useNavigate, useParams, createSearchParams } from "react-router-dom"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
import { Form, Row, Button, Col } from "react-bootstrap"

const QuestionPage = ({ notify }) => {
    const navigate = useNavigate()
    const { contestId, candidateEmail, candidateName } = useParams()

    const [answers, setAnswers] = useState({})
    const [contestData, setContestData] = useState({})

    const [questionIdx, setQuestionIdx] = useState(1);



    useEffect(() => {

        const getContestDataFromDb = async () => {
            const docRef = doc(db, `hacktheweb-contests/${contestId}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setContestData(docSnap.data());

                let alreadyGivenTest = false
                docSnap.data().participated.forEach((user) => {
                    if (user.candidateEmail === candidateEmail) {
                        alreadyGivenTest = true;
                    }
                })
                if (alreadyGivenTest) {
                    notify("You have already given the contest", "error")
                    navigate(`/contest-page/${contestId}`)
                    return
                }

            } else {
                setContestData({ exist: false })
            }

        }
        getContestDataFromDb()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const nextQuestionFunction = () => {
        let noOfQue = contestData.questionsList.length
        console.log(noOfQue, questionIdx)
        if (noOfQue !== (questionIdx)) {
            setQuestionIdx(questionIdx + 1)
        }

    }

    const SubmitQuiz = async () => {
        let candidateScore = 0

        contestData.questionsList.forEach((ques) => {
            console.log(answers[`answerSelectedForQues${ques.questionNo}`])
            if (answers[`answerSelectedForQues${ques.questionNo}`] && Number(answers[`answerSelectedForQues${ques.questionNo}`]) === Number(ques.correctOption)) {
                candidateScore += Number(ques.marks)
            }
        })

        let newUserData = {
            candidateName: candidateName,
            candidateEmail: candidateEmail,
            answers: answers,
            candidateScore: candidateScore,
        }

        console.log(newUserData)
        console.log(contestData)

        await updateDoc(doc(db, "hacktheweb-contests", contestId), {
            participated: [...contestData.participated, newUserData]
        })


        notify("Contest Submitted", "success")
        navigate({
            pathname: `/contest-page/${contestId}/standing/`,
            search: createSearchParams({
                email: candidateEmail
            }).toString()
        });
    }

    return (
        <>
            <div className="box p-0 rounded-0  bg-white" style={{ minHeight: "100vh" }}>
                {
                    contestData.contestName === undefined ?
                        <>
                            <h2 className="text-center">Loading...</h2>
                        </> :
                        <>
                            <div className="bg-primary p-4 fw-bold text-white">

                                <h2 className="text-center mb-5 fw-bolder text-decoration-underline"><i className="fas fa-users"></i> {contestData.contestName}</h2>
                                <Row>
                                    <Col>
                                        Candidate Name : {candidateName}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Candidate EmailID : {candidateEmail}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        No. of Questions : {contestData.questionsList.length}
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-3 pb-5">
                                {
                                    contestData.questionsList.map((ques, idx) => {
                                        if (idx + 1 === questionIdx) {
                                            return (
                                                <>
                                                    <p>Q{idx + 1}. {ques.questionDescription}?</p>
                                                    <Form>
                                                        <Form.Check
                                                            type="radio"
                                                            label={ques.optionOne}
                                                            name={idx}
                                                            onClick={() => setAnswers({ ...answers, [`answerSelectedForQues${ques.questionNo}`]: 1 })}
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label={ques.optionTwo}
                                                            name={idx}
                                                            onClick={() => setAnswers({ ...answers, [`answerSelectedForQues${ques.questionNo}`]: 2 })}
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label={ques.optionThree}
                                                            name={idx}
                                                            onClick={() => setAnswers({ ...answers, [`answerSelectedForQues${ques.questionNo}`]: 3 })}
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label={ques.optionFour}
                                                            name={idx}
                                                            onClick={() => setAnswers({ ...answers, [`answerSelectedForQues${ques.questionNo}`]: 4 })}
                                                        />
                                                    </Form>
                                                    <h6 style={{ color: "grey", fontSize: "14px" }} className="my-4">( marks : {ques.marks} )</h6>
                                                    <div className="d-flex justify-content-end w-100">
                                                        {
                                                            contestData.questionsList.length === idx + 1 ?
                                                                <>
                                                                    <Button onClick={SubmitQuiz} variant="danger" className="text-white px-5">Finish Quiz</Button>
                                                                </> :
                                                                <>
                                                                    <Button onClick={nextQuestionFunction} variant="success">Next Question</Button>
                                                                </>
                                                        }
                                                    </div>


                                                </>
                                            )
                                        }

                                        return <></>
                                    })
                                }
                            </div>

                        </>
                }
            </div>
        </>
    )
}

export default QuestionPage