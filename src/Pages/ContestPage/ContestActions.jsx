import React, { useEffect, useState } from "react"
import { Form, Row, Button, Col } from "react-bootstrap"

const ContestActions = ({ contestData, candidateDetails, setCandidateDetails, StartContest }) => {
    const [toDisplay, setToDisplay] = useState(1)
    useEffect(() => {
        let currDate = new Date()
        if (new Date(contestData.startingDateTime) > currDate) {
            setToDisplay(1)
        } else if (new Date(contestData.endingDateTime) < currDate) {
            setToDisplay(2)
        } else {
            setToDisplay(3)
        }
    }, [contestData.endingDateTime, contestData.startingDateTime])
    console.log(toDisplay)

    return (
        <>
            {
                toDisplay === 1 &&
                <>
                    <div className="box mt-5 p-4">
                        <h3 className="text-center"><i className="fas fa-users"></i> Contest Hasn't Started Yet!</h3>
                    </div>
                </>
            }
            {
                toDisplay === 2 &&
                <>

                    <div className="box mt-5 p-4">
                        <h3 className="text-center"><i className="fas fa-users"></i> Contest Has Ended!</h3>
                    </div>
                </>
            }
            {
                toDisplay === 3 &&
                <>

                    <div className="box mt-5 p-4">

                        <h3 className="text-center mb-4"><i className="fas fa-users"></i> Enter below details to start the quiz:</h3>
                        <Form >
                            <Row>
                                <Col className="mb-3" xs={12} md={6}>
                                    <Form.Group md="4" controlId="validationCustom01">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={candidateDetails.candidateName}
                                            onChange={(e) => setCandidateDetails({ ...candidateDetails, candidateName: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" xs={12} md={6}>
                                    <Form.Group md="4" controlId="validationCustom01">
                                        <Form.Label>Email Id</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Enter your Email Id"
                                            value={candidateDetails.candidateEmail}
                                            onChange={(e) => setCandidateDetails({ ...candidateDetails, candidateEmail: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button onClick={StartContest} variant="success" className="text-white px-5">Start Contest</Button>
                        </Form>
                    </div>

                </>
            }
        </>
    )
}

export default ContestActions