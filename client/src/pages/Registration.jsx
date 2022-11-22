import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function Registeration(props) {
  const { auth, getUserData } = useAuth();
  const navigate = useNavigate();
  const userData = getUserData();
  const [daysList, setDaysList] = useState([
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]);
  const [formValue, setFormValue] = useState({
    name: auth ? userData.name : "",
    speciality: auth ? userData.speciality : "",
    appointmentDays: auth ? userData.appointmentDays : [],
    availableTimeStart: auth ? userData.availableTimeStart : "",
    availableTimeEnd: auth ? userData.availableTimeEnd : "",
    email: auth ? userData.email : "",
    password: "",
  });

  function handleChange(e) {
    const { name, value, attributes, checked } = e.target;

    if (attributes.type.value !== "checkbox") {
      setFormValue((preFormValue) => {
        return {
          ...preFormValue,
          [name]: value,
        };
      });

      return;
    }

    let updatedList = [...formValue.appointmentDays];

    if (checked) {
      updatedList = [...updatedList, value];
    } else {
      updatedList.splice(formValue.appointmentDays.indexOf(value), 1);
    }
    setFormValue((preFormValue) => {
      return {
        ...preFormValue,
        appointmentDays: updatedList,
      };
    });
  }

  function isChecked(item) {
    return formValue.appointmentDays.includes(item);
  }

  function registerDoctor(e) {
    e.preventDefault();

    console.log(formValue);

    axios
      .post("https://doctor-appointment-management-system-client.vercel.app/api/v1/doctor/sign-up", {
        ...formValue,
        availableTimeStart: `2022-06-25T${formValue.availableTimeStart}:00`,
        availableTimeEnd: `2022-06-25T${formValue.availableTimeEnd}:00`,
      })
      .then(({ data }) => {
        alert(data.msg);

        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="Registeration container">
      <h1>{props.headerValue}</h1>
      <form
        action="/"
        className={props.isFullParentWidthAllowed}
        onSubmit={registerDoctor}
      >
        <div>
          <label htmlFor="Name">Name </label>
          <input
            id="Name"
            type="text"
            title="Name"
            name="name"
            value={formValue.name}
            onChange={handleChange}
            aria-label="Register Name input"
            autoComplete="name"
            required
            disabled={auth}
          />
        </div>
        <div className="timeWrap">
          <div>
            <label htmlFor="specialty">Speciality </label>
            <input
              id="specialty"
              type="text"
              title="speciality"
              name="speciality"
              value={formValue.speciality}
              onChange={handleChange}
              aria-label="Register specialty input"
              autoComplete="organization-title"
              required
              disabled={auth}
            />
          </div>
        </div>
        <p htmlFor="wrapCheckersID" className="wrapCheckersIDCls">
          Select Appointment Day
        </p>
        <div className="wrapCheckers" id="wrapCheckersID">
          {daysList.map((day, index) => (
            <>
              <input
                type="checkbox"
                value={day}
                id={day}
                onChange={handleChange}
                checked={isChecked(day)}
                disabled={auth}
              />
              <label htmlFor={day}>{day}</label>
            </>
          ))}
        </div>
        <div className="timeWrap">
          <div>
            <label htmlFor="AvailabeleStartTime">Availabele StartTime</label>
            <input
              type="time"
              id="AvailabeleStartTime"
              value={formValue.availableTimeStart}
              name="availableTimeStart"
              onChange={handleChange}
              required
              disabled={auth}
            />
          </div>
          <div>
            <label htmlFor="AvailabeleEndTime">Availabele EndTime</label>
            <input
              type="time"
              id="AvailabeleEndTime"
              value={formValue.availableTimeEnd}
              name="availableTimeEnd"
              onChange={handleChange}
              required
              disabled={auth}
            />
          </div>
        </div>
        <div>
          <label htmlFor="Email">Email </label>
          <input
            id="Email"
            type="text"
            title="Email"
            value={formValue.email}
            name="email"
            onChange={handleChange}
            required
            aria-label="Register email input"
            autoComplete="email"
            disabled={auth}
          />
        </div>
        {!auth && <div>
          <label htmlFor="password">Password </label>
          <input
            id="password"
            type="password"
            title="Password"
            value={formValue.password}
            name="password"
            onChange={handleChange}
            required
            autoComplete="new-password"
            aria-label="Register password input"
          />
        </div>}
        {props.isShowAllowed && (
          <div>
            <button type="submit">Register</button>
          </div>
        )}
      </form>
      {props.isShowAllowed && (
        <p>
          Already Registered, <Link to="/login">Login here.</Link>
        </p>
      )}
    </div>
  );
}

export default Registeration;
