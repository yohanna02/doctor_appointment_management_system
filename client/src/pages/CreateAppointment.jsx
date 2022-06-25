import { Link } from "react-router-dom";
function CreateAppointment() {

    return (
        <div className="loginPage container">
            <h1>Login to account</h1>
            <form action="/">
                <div>
                    <label htmlFor="Email">Email </label>
                    <input id="Email" type="text" title="Email" aria-label="Login email input" />
                </div>

                <div>
                    <label htmlFor="password">Password </label>
                    <input id="password" type="password" title="Password" aria-label="Login password input" />
                </div>

                <div><button type="submit">Login</button></div>
            </form>
            <p>Not Registered yet, <Link to="/register">Register here.</Link></p>
        </div>
    );
}

export default CreateAppointment;