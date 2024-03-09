export type participantType = {
    firstName: string
    lastName: string
    dateOfBirth: Date
    gender: "MALE" | "FEMALE" | "NON-BINARY"
    phoneNumber: number
    patientNotes: string
    diagnoses: string[]
    id: number
}