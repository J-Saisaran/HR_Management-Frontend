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
          console.error("Failed to fetch user data:", err);
          setToken(null);
          localStorage.removeItem("token");
          setAuthToken(null);
        });
    }
  }, [token]);

  const adminregister = async (name, email, password, role) => {
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
    localStorage.removeItem("token");
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, adminregister }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;




// import React, { createContext, useEffect, useState } from "react";
// import http from "../../utlis/http";
// import setAuthToken from "../../utlis/setAuthToken";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   useEffect(() => {
//     if (token) {
//       setAuthToken(token);
//       http
//         .get("/users")
//         .then((res) => {
//           setUser(res.data);
//         })
//         .catch((err) => {
//           setToken(null);
//           localStorage.removeItem("token");
//           console.log(err);
//           setAuthToken(null);
//         });
//     }
//   }, [token]);


//   const adminregister = async (name, email, password, role) => {
//     const res = await http.post("/users", { name, email, password, role });
//     setToken(res.data);
//     localStorage.setItem("token", res.data);
//     console.log("Token", res.data);
//     setAuthToken(res.data);
//     const userResponse = await http.get("/users");
//     console.log("User", userResponse.data);
//     setUser(userResponse.data);
//   };

//   const login = async (email, password) => {
//     const res = await http.post("/auth", { email, password });
//     setToken(res.data);
//     localStorage.setItem("token", res.data);
//     console.log("Token", res.data);
//     setAuthToken(res.data);
//     const userResponse = await http.get("/users");
//     console.log("User", userResponse.data);
//     setUser(userResponse.data);
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//     setUser(null);
//     setAuthToken(null);
//   };
//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, adminregister}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;