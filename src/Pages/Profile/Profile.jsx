import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Profile = ({ currUser, notify }) => {
    const navigate = useNavigate()

    // USE EFFECT
    useEffect(() => {
        if (!currUser) {
            navigate('/')
            notify("You must be Signed In to Host contests!!!", "warning")
            return
        }

    }, [currUser, navigate, notify])
    return (
        <>
            profile page
        </>
    )
}

export default Profile