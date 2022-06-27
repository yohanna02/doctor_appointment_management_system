import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/doctordashboard";

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue((preFormValue) => {
      return {
        ...preFormValue,
        [name]: value,
      };
    });
  }

  function loginHandler(e) {
    e.preventDefault();

    login(formValue)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(({ response }) => {
        alert(response.data.msg);
      });
  }

  return (
    <div className="loginPage container">
      <h1>Login to account</h1>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="Email">Email </label>
          <input
            id="Email"
            type="email"
            title="Email"
            aria-label="Login email input"
            value={formValue.email}
            name="email"
            autoComplete="email"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password </label>
          <input
            id="password"
            type="password"
            title="Password"
            aria-label="Login password input"
            value={formValue.password}
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        Not Registered yet, <Link to="/register">Register here.</Link>
      </p>
    </div>
  );
}

export default Login;
