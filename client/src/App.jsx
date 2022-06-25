import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/App.scss";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Registeration from "./pages/Registration";
import DoctorDashBoard from "./pages/DoctorsDashboard";
import Appointment from "./pages/Appoinment";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registeration isShowAllowed={true} isFullParentWidthAllowed="" headerValue="Registerer" />} />
          <Route exact path="/doctordashboard" element={<DoctorDashBoard />} />
          <Route exact path="/doctordashboard/appointment" element={<Appointment />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
