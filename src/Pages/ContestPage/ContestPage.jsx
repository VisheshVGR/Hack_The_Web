import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";

const ContestPage = ({ notify }) => {
    const navigate = useNavigate()
    const { contestId } = useParams()

    const [contestData, setContestData] = useState({})

    // USE EFFECT
    useEffect(() => {

        const getContestDataFromDb = async () => {
            const docRef = doc(db, `hacktheweb-contests/${contestId}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                setContestData(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setContestData({ exist: false })
            }

        }
        getContestDataFromDb()

    }, [contestId])
    console.log(contestData)


    return (
        <>
            <div className="box py-5 my-3">
                <h2 className="text-center"><i className="fas fa-users"></i> {contestData.contestName}</h2>
                contest page for contest - {contestId}
                {/* <Row xs={1} sm={2} lg={3} className="g-4">
                    {liveContests && liveContests.map((msg) => <ContestCard key={msg.key} data={msg} />)}
                </Row> */}
            </div>
        </>
    )
}

export default ContestPage