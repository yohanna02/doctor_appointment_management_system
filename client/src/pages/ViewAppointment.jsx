import AppointmentForm from "../components/AppointmentForm"

function ViewAppointment() {
  return (
    <div className="creatAppointments container">
      <AppointmentForm doctorsView={true} />
    </div>
  )
}

export default ViewAppointment