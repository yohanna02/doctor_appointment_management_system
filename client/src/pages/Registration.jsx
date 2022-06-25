import { Link } from "react-router-dom";
function Registeration(props) {

    return (
        <div className="Registeration container">
            <h1>{props.headerValue}</h1>
            <form action="/" className={props.isFullParentWidthAllowed}>
                <div>
                    <label htmlFor="Name">Name </label>
                    <input id="Name" type="text" title="Name" aria-label="Register Name input" />
                </div>
                <div className="timeWrap">
                    <div>
                        <label htmlFor="specialty">Specialty </label>
                        <input id="specialty" type="text" title="specialty" aria-label="Register specialty input" />
                    </div>
                </div>
                <p htmlFor="wrapCheckersID" className="wrapCheckersIDCls">Select Appointment Day</p>
                <div className="wrapCheckers" id="wrapCheckersID">
                    <input type="checkbox" value="1" id="Sunday" />
                    <label htmlFor="Sunday">Sunday</label>

                    <input type="checkbox" value="2" id="Monday" />
                    <label htmlFor="Monday">Monday</label>

                    <input type="checkbox" value="3" id="Tuesday" />
                    <label htmlFor="Tuesday">Tuesday</label>

                    <input type="checkbox" value="4" id="Wednesday" />
                    <label htmlFor="Wednesday">Wednesday</label>

                    <input type="checkbox" value="5" id="Thursday" />
                    <label htmlFor="Thursday">Thursday</label>

                    <input type="checkbox" value="6" id="Friday" />
                    <label htmlFor="Friday">Friday</label>

                    <input type="checkbox" value="7" id="Satuday" />
                    <label htmlFor="Satuday">Satuday</label>
                </div>
                <div className="timeWrap">
                    <div>
                        <label htmlFor="AvailabeleStartTime">Availabele StartTime</label>
                        <input type="time" id="AvailabeleStartTime" />
                    </div>
                    <div>
                        <label htmlFor="AvailabeleEndTime">Availabele EndTime</label>
                        <input type="time" id="AvailabeleEndTime" />
                    </div>
                </div>
                <div>
                    <label htmlFor="Email">Email </label>
                    <input id="Email" type="text" title="Email" aria-label="Register email input" />
                </div>

                <div>
                    <label htmlFor="password">Password </label>
                    <input id="password" type="password" title="Password" aria-label="Register password input" />
                </div>
                {props.isShowAllowed == true && <div ><button type="submit">Login</button></div>}
            </form>
            {props.isShowAllowed == true && <p>Already Registered, login here <Link to="/login">Login here.</Link></p>}
        </div>
    );
}

export default Registeration;