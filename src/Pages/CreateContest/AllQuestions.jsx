import React, { useState } from "react"
import { Form, Row, Button, Card, Col, ListGroup } from "react-bootstrap"

const AllQuestions = ({ questionsList, setQuestionsList, notify }) => {

    const handleDelete = (idx) => {
        console.log(idx)
        console.log(questionsList)

        let newQuestionsList = (questionsList.filter((item, index) => {
            return (idx !== index)
        }))

        setQuestionsList(newQuestionsList)
        // console.log(questionsList)
    }
    return (
        <>
            {
                questionsList.lenght !== 0 ?
                    <>
                        <ListGroup className="mt-4">
                            {questionsList.map((item, idx) => {
                                return (
                                    <>
                                        <ListGroup.Item >
                                            <p className="fw-bold">
                                                <Button variant="outline-danger" onClick={() => handleDelete(idx)}>X</Button>
                                                {` Q${idx+1}. ${item.questionDescription}`}
                                            </p>
                                            <p style={{ margin: 0, padding: "5px", borderRadius: "12px", backgroundColor: Number(item.correctOption) === 1 ? "#57A64B" : "white" }}>(A). {item.optionOne}</p>
                                            <p style={{ margin: 0, padding: "5px", borderRadius: "12px", backgroundColor: Number(item.correctOption) === 2 ? "#57A64B" : "white" }}>(B). {item.optionTwo}</p>
                                            <p style={{ margin: 0, padding: "5px", borderRadius: "12px", backgroundColor: Number(item.correctOption) === 3 ? "#57A64B" : "white" }}>(C). {item.optionThree}</p>
                                            <p style={{ margin: 0, padding: "5px", borderRadius: "12px", backgroundColor: Number(item.correctOption) === 4 ? "#57A64B" : "white" }}>(D). {item.optionFour}</p>

                                        </ListGroup.Item>
                                    </>

                                )
                            })}
                        </ListGroup>
                    </>
                    :
                    <></>
            }

        </>
    )
}

export default AllQuestions