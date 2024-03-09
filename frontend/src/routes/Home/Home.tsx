import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import '../global_styles.scss'
import "./styles.scss"

export default function Home({  }){
    return (
        <div className="home-container d-flex flex-column">
            <Header />
            <div className="p-5 body-container flex-grow-1">
                <Outlet />
            </div>
        </div>
    )
}