import { Link } from "react-router-dom";
import Nav from "../components/HomeNav";
import AppointmentTable from "../components/AppointmentTable";

function DoctorsAppoinment() {

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
                        <h1>Appointment Management</h1>
                        <AppointmentTable baseView={false}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorsAppoinment;