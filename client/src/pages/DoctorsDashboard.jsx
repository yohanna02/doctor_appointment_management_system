import { Link } from "react-router-dom";
import Nav from "../components/HomeNav";
import Registeration from "./Registration";

function DoctorDashBoard(props) {

    return (
        <>
            <Nav />
            <div className="DoctorDashBoard container">
                <div className="sideNav_mainContent_wrapper">
                    <div className="sideNav">
                        <h1>Admin</h1>
                        <nav>
                            <Link to="/doctordashboard">Doctor Profile</Link>
                            <Link to="/doctordashboard/appointment">Appointments</Link>
                        </nav>
                    </div>
                    <div className="main">
                        <Registeration isShowAllowed={false} isFullParentWidthAllowed="fullWidth" headerValue="Doctors' Profile" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorDashBoard;