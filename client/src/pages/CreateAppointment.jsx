import AppointmentForm from "../components/AppointmentForm";

function CreateAppointment() {
  return (
    <div className="creatAppointments container">
      <AppointmentForm doctorsView={false} />
    </div>
  );
}

export default CreateAppointment;
