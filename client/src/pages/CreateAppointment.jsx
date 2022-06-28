import { Link } from "react-router-dom";
function CreateAppointment() {

    return (
        <div className="creatAppointments container">
            <h1>Create Appointment</h1>
            <form action="/">
                <div>
                    <label htmlFor="Name">Name </label>
                    <input id="Name" type="text" title="Name" aria-label="Appointment name" />
                </div>
                <div>
                    <label htmlFor="Email">Email </label>
                    <input id="Email" type="email" title="Email" aria-label="Appointment email" />
                </div>
                <div>
                    <label htmlFor="PhoneNumber">Phone Number </label>
                    <input id="PhoneNumber" type="tel" title="Phone Number" aria-label="Appointment Phone Number" />
                </div>

                <div>
                    <label htmlFor="Date">Date and Time </label>
                    <input id="Date" type="datetime-local" title="datetime" aria-label="Appointment date and time Number" />
                </div>
                <div>
                    <label htmlFor="reseaon">Reseaon of Appointment </label>
                    <textarea id="reseaon" cols="30" rows="10"></textarea>
                </div>

                <div><button type="submit">Login</button></div>
            </form>
        </div>
    );
}

export default CreateAppointment;