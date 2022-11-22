import { useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState("");

  async function login(formValue) {
    const { data } = await axios.post("https://doctor-appointment-management-system.onrender.com/api/v1/doctor/login", formValue);
    const userRes = await axios.get("https://doctor-appointment-management-system.onrender.com/api/v1/doctor/info", {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    });
    
    setToken(`Bearer ${data.token}`);
    setAuth(true);
    setUserData({
        ...userRes.data,
        availableTimeStart: userRes.data.availableTimeStart.split("T")[1].split(".")[0],
        availableTimeEnd: userRes.data.availableTimeEnd.split("T")[1].split(".")[0],
    });
  }

  function logout() {
    setToken("");
    setUserData({});
    setAuth(false);
  }

  function getUserData() {
    if (!auth) return null;

    return userData;
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, getUserData, token }}>
      {children}
    </AuthContext.Provider>
  );
}
