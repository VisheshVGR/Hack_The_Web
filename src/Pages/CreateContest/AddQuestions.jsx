import React, { useState } from "react"

import { Form, Row, Button, Card, Col } from "react-bootstrap"
import AllQuestions from "./AllQuestions"

const QuestionDetailsInitial = {
    questionDescription: "",
    optionOne: "",
    optionTwo: "",
    optionThree: "",
    optionFour: "",
    correctOption: "1",
    marks: "1",
}

const AddQuestions = ({ questionsList, setQuestionsList, notify }) => {

    const [questionDetails, setQuestionsDetails] = useState(QuestionDetailsInitial)

    const InsertQuestion = (e) => {
        e.preventDefault();

        console.log(questionDetails);
        if (!questionDetails.questionDescription ||
            !questionDetails.optionOne ||
            !questionDetails.optionTwo ||
            !questionDetails.optionThree ||
            !questionDetails.optionFour ||
            questionDetails.marks <= 0 ||
            questionDetails.marks > 100
        ) {
            notify("Enter Question details correctly", "info")
            return;
        }

        setQuestionsList([...questionsList, questionDetails])
    }

    return (
        <>
            <div className="box py-5 px-2 my-3">
                <h4 className="text-center"><i className="fa-solid fa-terminal"></i> Add Questions - </h4>
                <Form >
                    <Row className="mb-3">
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>Question Description</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Question to ask"
                                value={questionDetails.questionDescription}
                                onChange={(e) => setQuestionsDetails({ ...questionDetails, questionDescription: e.target.value })}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col className="mb-3" xs={12} md={6}>
                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>Option One</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Option One"
                                    value={questionDetails.optionOne}
                                    onChange={(e) => setQuestionsDetails({ ...questionDetails, optionOne: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                        <Col className="mb-3" xs={12} md={6}>
                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>Option Two</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Option Two"
                                    value={questionDetails.optionTwo}
                                    onChange={(e) => setQuestionsDetails({ ...questionDetails, optionTwo: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3" xs={12} md={6}>
                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>Option Three</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Option Three"
                                    value={questionDetails.optionThree}
                                    onChange={(e) => setQuestionsDetails({ ...questionDetails, optionThree: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                        <Col className="mb-3" xs={12} md={6}>

                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>Option Four</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Option Four"
                                    value={questionDetails.optionFour}
                                    onChange={(e) => setQuestionsDetails({ ...questionDetails, optionFour: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3" xs={12} md={6}>
                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>Correct Option</Form.Label>
                                <Form.Select value={questionDetails.correctOption}
                                    onChange={(e) => setQuestionsDetails({ ...questionDetails, correctOption: e.target.value })}
                                >
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col className="mb-3" xs={12} md={6}>
                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>Question Marks</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    max={100}
                                    min={1}
                                    placeholder="Question marks from 1 to 100"
                                    value={questionDetails.marks}
                                    onChange={(e) => setQuestionsDetails({ ...questionDetails, marks: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center">
                        <Button onClick={InsertQuestion} variant="danger" className="text-white px-5">Add Question</Button>

                    </div>

                </Form>
                <AllQuestions questionsList={questionsList} setQuestionsList={setQuestionsList} notify={notify} />

            </div>
        </>
    )
}

export default AddQuestions
