import { Link, useLoaderData } from "react-router-dom";
import "./styles.scss"
import { useState } from "react";
import { participantType } from "../../types/participantType";

export default function List({ }){
    const { participants } = useLoaderData() as { participants: participantType[] }
    const [sortCode, setSort] = useState(false)

    // Sort the participants based on the number of diagnoses they have
    let sortedArr = participants.map((data, i) => ({...data, id: i}))
    sortedArr = sortedArr.sort((a, b) => sortCode ? (a.diagnoses.length - b.diagnoses.length) : (b.diagnoses.length - a.diagnoses.length))

    return (
        <div>
            <h2 className="list-heading">Participants</h2>
            <div className="custom-card card-css p-4">
                <div className="row list-header mb-4 pb-2">
                    <div className="col-8">
                        <p className="label body">Participant Name</p>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <p className="label body">ICD Codes</p>
                        <img className="sort-image" onClick={() => setSort(!sortCode)} src={sortCode ? '/orderFilter_Up.png' : '/orderFilter_Down.png'} alt="" />
                    </div>
                </div>
                <div className="p-2">
                    { sortedArr.map((data, i) => <Link key={i} to={`/participants/${data.id}`}><ParticipantCard {...data} /></Link>)}
                </div>
            </div>
        </div>
    )
}

// This function renders a participant card with the participant's first name, last name, and the number of diagnoses they have.
function ParticipantCard({ firstName, lastName, diagnoses }){
    return (
        <div className="custom-card hover-enabled p-3 d-flex justify-content-between mb-4 align-align-items-center ">
            <p className="body">{ firstName } { lastName }</p>
            <p className="body">{ diagnoses.length }</p>
        </div>
    )
}