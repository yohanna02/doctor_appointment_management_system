import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/App.scss";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Registeration from "./pages/Registration";
import DoctorDashBoard from "./pages/DoctorsDashboard";
import Appointment from "./pages/Appoinment";
import CreateAppointment from "./pages/CreateAppointment";
import RequireAuth from "./RequireAuth";
import { AuthProvider } from "./context/AuthProvider";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Registeration isShowAllowed={true} isFullParentWidthAllowed="" headerValue="Registerer" />} />
            
              <Route element={<RequireAuth />}>
                <Route exact path="/createappointment" element={<CreateAppointment />} />
                <Route exact path="/doctordashboard" element={<DoctorDashBoard />} />
                {/* <Route exact path="/doctordashboard/appointment/:_id" element={<Appointment />} /> */}
                <Route exact path="/doctordashboard/appointment" element={<Appointment />} />
              </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
