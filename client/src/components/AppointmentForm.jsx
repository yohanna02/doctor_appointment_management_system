import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function AppointmentForm(props) {
  const { token } = useAuth();
  const { doctorsId, appointmentId } = useParams();
  const [formData, setFormData] = useState({
    personName: "",
    email: "",
    phoneNo: "",
    date: "",
    reason: "",
    doctorId: doctorsId,
    doctorsNote: "",
  });

  useEffect(() => {
    if (props.doctorsView) {
      axios
        .get(
          `https://doctor-appointment-management-system-client.vercel.app/api/v1/appointment/get-appointment?appointmentId=${appointmentId}`
        )
        .then(({ data }) => {
          setFormData((prevFormData) => {
            return {
              ...prevFormData,
              ...data,
              date: data.date.slice(0, 19)
            };
          });
        });
    }
  }, []);

  function handleChanges(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function makeAppointment(e) {
    e.preventDefault();

    if (!props.doctorsView) {
      axios
        .post("https://doctor-appointment-management-system-client.vercel.app/api/v1/appointment/make-appointment", {
          personName: formData.personName,
          email: formData.email,
          phoneNo: formData.phoneNo,
          date: formData.date,
          reason: formData.reason,
          doctorId: formData.doctorId,
        })
        .then(({ data }) => {
          setFormData((prevFormData) => {
            return {
              ...prevFormData,
              personName: "",
              email: "",
              phoneNo: "",
              date: "",
              reason: "",
            };
          });

          alert(data.msg);
        })
        .catch((err) => {
          alert("An Error occured");
        });

      return;
    }

    axios
      .post(
        "https://doctor-appointment-management-system-client.vercel.app/api/v1/appointment/update-progress",
        {
          appointmentId: appointmentId,
          doctorsNote: formData.doctorsNote,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(({ data }) => {
        alert(data.msg);
      })
      .catch((err) => {
        alert("An Error occured");
      });
  }

  return (
    <>
      <h1>{props.publicView || props.doctorsView ? `${formData.personName}'s Appointment` : "Create Appointment"}</h1>
      <form onSubmit={makeAppointment}>
        <div>
          <label htmlFor="Name">Name </label>
          <input
            id="Name"
            type="text"
            title="Name"
            aria-label="Appointment name"
            autoComplete="name"
            value={formData.personName}
            onChange={handleChanges}
            name="personName"
            required
            disabled={props.doctorsView}
          />
        </div>
        <div>
          <label htmlFor="Email">Email </label>
          <input
            id="Email"
            type="email"
            title="Email"
            aria-label="Appointment email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChanges}
            name="email"
            required
            disabled={props.doctorsView}
          />
        </div>
        <div>
          <label htmlFor="PhoneNumber">Phone Number </label>
          <input
            id="PhoneNumber"
            type="tel"
            title="Phone Number"
            aria-label="Appointment Phone Number"
            autoComplete="tel"
            value={formData.phoneNo}
            onChange={handleChanges}
            name="phoneNo"
            required
            disabled={props.doctorsView}
          />
        </div>

        <div>
          <label htmlFor="Date">Date and Time </label>
          <input
            id="Date"
            type="datetime-local"
            title="datetime"
            aria-label="Appointment date and time Number"
            autoComplete="off"
            value={formData.date}
            onChange={handleChanges}
            name="date"
            required
            disabled={props.doctorsView}
          />
        </div>
        <div>
          <label htmlFor="reseaon">Reseaon of Appointment </label>
          <textarea
            id="reseaon"
            cols="30"
            rows="10"
            value={formData.reason}
            onChange={handleChanges}
            name="reason"
            required
            disabled={props.doctorsView}
          />
        </div>
        {props.doctorsView && (
          <div>
            <label htmlFor="reseaon">Doctors Note</label>
            <textarea
              id="reseaon"
              cols="30"
              rows="10"
              autoComplete="off"
              value={formData.doctorsNote}
              onChange={handleChanges}
              name="doctorsNote"
              required
              disabled={props.publicView}
            />
          </div>
        )}

        {!props.publicView && <div>
          <button type="submit">
            {props.doctorsView ? "Submit" : "Make Appointment"}
          </button>
        </div>}
      </form>
    </>
  );
}

export default AppointmentForm;
