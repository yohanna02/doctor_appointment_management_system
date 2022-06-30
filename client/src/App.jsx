import "./styles/App.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Index from "./pages/Index";
import Login from "./pages/Login";
import Registeration from "./pages/Registration";
import DoctorDashBoard from "./pages/DoctorsDashboard";
import DoctorsAppoinment from "./pages/DoctorsAppoinment";
import CreateAppointment from "./pages/CreateAppointment";
import RequireAuth from "./RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import ViewAppointment from "./pages/ViewAppointment";
import PatientAppointment from "./pages/PatientAppointment";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Registeration isShowAllowed={true} isFullParentWidthAllowed="" headerValue="Registerer" />} />
            <Route exact path="/createappointment/:doctorsId" element={<CreateAppointment />} />
            <Route exact path="/appointment/:appointmentId" element={<PatientAppointment />} />

              <Route element={<RequireAuth />}>
                <Route exact path="/createappointment" element={<CreateAppointment />} />
                <Route exact path="/doctordashboard" element={<DoctorDashBoard />} />
                <Route exact path="/doctordashboard/appointment/:appointmentId" element={<ViewAppointment />} />
                <Route exact path="/doctordashboard/appointment" element={<DoctorsAppoinment />} />
              </Route>

            <Route path="*" element={
              <>
                <h1 style={{fontSize: "10rem", textAlign: "center", color: "white"}}>PAGE NOT FOUND</h1> 
                <Link to="/" style={{display: "block", textAlign: "center", fontSize: "3rem", marginTop: "2rem", color: "crimson", textDecoration: "underline"}}>Go Home</Link>
              </>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
