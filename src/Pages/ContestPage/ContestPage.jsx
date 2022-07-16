import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ContestPage = ({ notify }) => {
    const navigate = useNavigate()
    const { contestId } = useParams()

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
        </>
    )
}

export default ContestPage