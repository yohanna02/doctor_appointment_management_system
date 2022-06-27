import AppointmentTable from "./AppointmentTable";
function Banner() {
    return (
        <div className="banner">
            <div className="container">
                <h1>Online Doctor Appointment Management System</h1>
                <p>Set an appointment with your doctor, makes life easier for you and your Doc...</p>
            </div>
            <AppointmentTable baseView={true}/>
        </div>
    );
}
export default Banner;