import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";
export default function Nav() {
    return (
        <header className="header">
            <input type="checkbox" id="checkbox1"/>
            <nav className="container">
                <label htmlFor="checkbox1" className="checkbox1"></label>
                <Link role="logo" to="/" title="ODAMS Arthur Javis university Logo" aria-label="Online Doctor Appointment Management System Web Logo" style={{padding: 0}}><img src={logo} alt="Arthur Javis university" width={100} height={50}/></Link>
                <Link to="/doctordashboard/appointment" title="ODAMS link" aria-label="Online Doctor Appointment Management System link">Online Doctor Appointment Management System</Link>
                <Link to="/login" title="ODAMS login" aria-label="Online Doctor Appointment Management System Web Login">Login</Link>
            </nav>
        </header>
    );
}