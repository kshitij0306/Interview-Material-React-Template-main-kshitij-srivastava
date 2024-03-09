import { Link, useLoaderData, useParams } from "react-router-dom"
import "./styles.scss"
import { ChevronLeft } from 'react-bootstrap-icons'

export default function ParticipantCard({ }) {
    const { diagnoses, firstName, lastName } = useLoaderData() as { diagnoses: { code: string, description: string }[], firstName: string, lastName: string }

    return (
        <div>
            <Link className="btn btn-lg back-button btn-primary d-inline-flex align-items-center" to={"/"}>
                <ChevronLeft color="white" size={20} />
                <h3 className="m-2">Back</h3>
            </Link>
            <div className="custom-card participant-hover-card p-4">
                <h2 className="participant-name pb-2 mb-2">{firstName} {lastName}</h2>
                <div>
                    <p className="body label">ICD Codes ({diagnoses.length})</p>
                </div>
                <div className="">
                    {diagnoses.map((data, i) => <Diagnosis {...data} key={i} />)}
                </div>
            </div>
        </div>
    )
}

function Diagnosis({ code, description }) {
    return (
        <div className="py-3 px-4 diagnoses d-flex justify-content-between mb-4">
            <p className="description">{description}</p>
            <p className="code">{code}</p>
        </div>
    )
}