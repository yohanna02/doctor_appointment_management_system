import AppointmentForm from "../components/AppointmentForm";

function PatientAppointment() {
  return (
    <div className="creatAppointments container">
      <AppointmentForm doctorsView={true} publicView={true} />
    </div>
  )
}

export default PatientAppointment;