function AppointmentTable(props) {
    let TrueFalse = false
    let AppointmentNo = 1880
    let inWhat = "completed"
    // let inWhat = "notcompleted"
    // let inWhat = "inprogress"
    
    return (
        <div className="appointmentTable container">
            <div className="appoitmentLists">
                <table>
                    <thead>
                        {props.baseView == TrueFalse? <th>Doctor Name </th> : <th>Appointment No.</th> }
                        {props.baseView == TrueFalse? <th>Speciality</th> : <th>Patient Name</th> }
                        {props.baseView == TrueFalse? <th>Appointment Date</th> : <th>Appointment Date</th> }
                        {props.baseView == TrueFalse? <th>Appointment Day</th> : <th>Appointment Time</th> }
                        {props.baseView == TrueFalse? <th>Available Time</th> : <th>Appointment Day</th> }
                        {props.baseView == TrueFalse? <th>Action</th> : <th>Appointment Status</th> }
                    </thead>

                    <tbody>

                        <tr>
                        {props.baseView == TrueFalse? <td>Dr. Peter Parker</td> : <td>{AppointmentNo}</td> }                            
                            <td>Sergen</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>10:00 - 14:00</td>                            
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>

                        <tr>
                        {props.baseView == TrueFalse? <td>12</td> : <td>{AppointmentNo}</td> }                            
                            <td>2</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>11:28 - 11:55</td>
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>                       
                        <tr>
                        {props.baseView == TrueFalse? <td>Dr. Peter Parker</td> : <td>{AppointmentNo}</td> }                            
                            <td>Sergen</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>10:00 - 14:00</td>                            
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>

                        <tr>
                        {props.baseView == TrueFalse? <td>12</td> : <td>{AppointmentNo}</td> }                            
                            <td>2</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>11:28 - 11:55</td>
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>                       
                        <tr>
                        {props.baseView == TrueFalse? <td>Dr. Peter Parker</td> : <td>{AppointmentNo}</td> }                            
                            <td>Sergen</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>10:00 - 14:00</td>                            
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>

                        <tr>
                        {props.baseView == TrueFalse? <td>12</td> : <td>{AppointmentNo}</td> }                            
                            <td>2</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>11:28 - 11:55</td>
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>                       
                        <tr>
                        {props.baseView == TrueFalse? <td>Dr. Peter Parker</td> : <td>{AppointmentNo}</td> }                            
                            <td>Sergen</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>10:00 - 14:00</td>                            
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>

                        <tr>
                        {props.baseView == TrueFalse? <td>12</td> : <td>{AppointmentNo}</td> }                            
                            <td>2</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>11:28 - 11:55</td>
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>                       
                        <tr>
                        {props.baseView == TrueFalse? <td>Dr. Peter Parker</td> : <td>{AppointmentNo}</td> }                            
                            <td>Sergen</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>10:00 - 14:00</td>                            
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>

                        <tr>
                        {props.baseView == TrueFalse? <td>12</td> : <td>{AppointmentNo}</td> }                            
                            <td>2</td>
                            <td>2022-06-17</td>
                            <td>Friday</td>
                            <td>11:28 - 11:55</td>
                        {props.baseView == TrueFalse? <td><button>Get Appointment</button></td> : <td><span className={inWhat}>{inWhat}</span></td> }
                        </tr>                       

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppointmentTable;