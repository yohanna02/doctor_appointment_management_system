import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function AppointmentTable(props) {
  const navigate = useNavigate();
  const { token, getUserData } = useAuth();
  const doctorsData = getUserData();

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [fetch, setFetch] = useState(false);

  function getWeekDay(day) {
    switch (day) {
      case 0:
        return "sunday";
      case 1:
        return "monday";
      case 2:
        return "tuesday";
      case 3:
        return "wednesday";
      case 4:
        return "thursday";
      case 5:
        return "friday";
      case 6:
        return "saturday";
  }
}

  useEffect(() => {
    if (props.baseView) {
      axios.get("/api/v1/doctor/get-all-doctors").then(({ data }) => {
          const formatted = data.map(d => {
            const startTime = new Date(d.availableTimeStart);
            const endTime = new Date(d.availableTimeEnd);
            // console.log(d);
            // const [hour, minute] = d.availableTimeStart.split("T")[1].split(":");
            // const [hourEnd, minuteEnd] = d.availableTimeEnd.split("T")[1].split(":");

            return {
              ...d,
              time: `${startTime.getHours()}:${startTime.getMinutes()} - ${endTime.getHours()}:${endTime.getMinutes()}`
            }
          });

          setDoctors(formatted);
      });
    } else {
      axios.get(`/api/v1/appointment/get-all-appointments?doctorId=${doctorsData._id}`, {
        headers: {
          Authorization: token
        }
      })
        .then(({data}) => {
          const formatted = data.map(a => {
            const appointmentDate = new Date(a.date);
            const day = getWeekDay(appointmentDate.getDay());
            const time = `${appointmentDate.getHours()}:${appointmentDate.getMinutes()}`;

            return {
              ...a,
              day,
              time
            }
          });

          setAppointments(formatted);
        });

    }
  }, [fetch]);

  const [searchValue, setSearchValue] = useState("");
  function searchHandler(e) {
    if (e.target.value === "") {
      setFetch(preFetchValue => !preFetchValue);
    }
    
    setSearchValue(e.target.value);
  }
  function searchAppointment(e) {
    e.preventDefault();

    if (props.baseView) {
      navigate(`/appointment/${searchValue}`);
      return;
    }

    axios
      .get(`/api/v1/appointment/get-appointment?appointmentId=${searchValue}`, {
        headers: {
          Authorization: token
        }
      })
      .then(({data}) => {
        if (!data) {
          setAppointments([]);

          return;
        }

        const appointmentDate = new Date(data.date);
        const day = getWeekDay(appointmentDate.getDay());
        const time = `${appointmentDate.getHours()}:${appointmentDate.getMinutes()}`;

        setAppointments([{
          ...data,
          day,
          time
        }]);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }

  return (
    <div className="appointmentTable container">
      <div className="appoitmentLists">
        <form onSubmit={searchAppointment} className="search">
          <label htmlFor="search">Search Appointment</label>
          <input 
            type="search"
            name="search"
            id="search" 
            value={searchValue} 
            onChange={searchHandler}
            required
          />
        </form>
        <table>
          <thead>
            {props.baseView ? <th>Doctor Name </th> : <th>Appointment ID</th>}
            {props.baseView ? <th>Speciality</th> : <th>Patient Name</th>}
            {/* {props.baseView? <th>Appointment Date</th> : <th>Appointment Date</th> } */}
            {props.baseView ? (
              <th>Appointment Day</th>
            ) : (
              <th>Appointment Time</th>
            )}
            {props.baseView ? (
              <th>Available Time</th>
            ) : (
              <th>Appointment Day</th>
            )}
            {props.baseView ? <th>Action</th> : <th>Appointment Status</th>}
          </thead>

          {props.baseView && <tbody>{doctors.map((doctor) => (
            <tr key={doctor._id}>
                <td>{doctor.name}</td>                        
                <td>{doctor.speciality}</td>
                {/* <td>2022-06-17</td> */}
                <td>{doctor.appointmentDays.join(", ")}</td>
                <td>{doctor.time}</td>                            
                <td>
                  <button onClick={() => {navigate(`/createappointment/${doctor._id}`)}}>Get Appointment</button>
                </td>
            </tr>   
          ))}</tbody>}
          {!props.baseView &&
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>
                    <Link to={`/doctordashboard/appointment/${appointment.appointmentId}`}>
                      {appointment.appointmentId}
                    </Link>
                  </td>                   
                  <td>{appointment.personName}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.day}</td>                        
                  <td><span className={appointment.done ? "completed" : "notcompleted"}>{appointment.done ? "completed" : "not-completed"}</span></td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  );
}

export default AppointmentTable;
