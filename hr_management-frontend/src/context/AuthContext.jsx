import React, { createContext, useEffect, useState } from "react";
import http from "../../utlis/http";
import setAuthToken from "../../utlis/setAuthToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);


  useEffect(() => {
    if (token) {
      setAuthToken(token);
      http
        .get("/users")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          setToken(null);
          localStorage.removeItem("token");
          console.log(err);
          setAuthToken(null);
        });
    }
  }, [token]);

  const register = async (name, email, password, role) => {
    try {
      const res = await http.post("/users", { name, email, password, role });
      const newToken = res.data;      
      setToken(newToken);
      localStorage.setItem("token", newToken);
      setAuthToken(newToken);
      const userResponse = await http.get("/users");
      setUser(userResponse.data);
    } catch (err) {
      console.error("Registration Error:", err.response ? err.response.data : err.message);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await http.post("/auth", { email, password });
      const newToken = res.data;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      setAuthToken(newToken);

      const userResponse = await http.get("/users");
      setUser(userResponse.data);
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err.message);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(token);
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


