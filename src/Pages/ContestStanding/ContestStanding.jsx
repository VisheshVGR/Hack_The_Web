import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ContestScore = ({ notify }) => {
    const navigate = useNavigate()
    const { contestId, userName } = useParams()


    // USE EFFECT
    // useEffect(() => {
    //     // if (!currUser) {
    //     //     navigate('/')
    //     //     notify("You must be Signed In to Host contests!!!", "warning")
    //     //     return
    //     // }

    // }, [currUser, navigate, notify])

    return (
        <>
            contest page for contest - {contestId}
            contest score for user - {userName}

        </>
    )
}

export default ContestScore