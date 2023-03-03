import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const logout = () => {
    window.open("https://api-wallpaper-io.onrender.com/logout", "_self");
  };
  useEffect(() => {
    axios
      .get("https://api-wallpaper-io.onrender.com/login/success", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
