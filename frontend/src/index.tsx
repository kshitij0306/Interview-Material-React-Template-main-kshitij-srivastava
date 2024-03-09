import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import List from './routes/List/List';
import ParticipantCard from './routes/ParticipantCard/ParticipantCard';
import Home from './routes/Home/Home';

const localhost_url = "http://localhost:5001/participants"

const api_url = (code: string) => 'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=' + code

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <List />,
                loader: async ({ request }) => {
                    const response = await fetch(localhost_url)
                    const participants = await response.json()
                    return { participants }
                },
            },
            {
                path: "participants/:pid",
                element: <ParticipantCard />,
                loader: async ({ request, params }) => {
                    const response = await fetch(localhost_url)
                    const participants = await response.json()
                    const pid = parseInt(params.pid as string)
                    
                    const { diagnoses: codes, firstName, lastName } = participants[pid]

                    const diagnoses = []
                    for(const { icdCode } of codes){
                        const results = (await (await fetch(api_url(icdCode))).json())[3]
                        const description = results.length === 1 ? results[0][1] : "No description found.";
                        diagnoses.push({ code: icdCode, description })
                    }

                    return { diagnoses, firstName, lastName }
                },
            },
        ]
    },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log responseults (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
