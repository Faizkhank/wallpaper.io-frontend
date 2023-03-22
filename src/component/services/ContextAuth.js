import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [follows, setfollow] = useState(false);
  const [like, setlike] = useState(false);
  const [Data, setData] = useState([]);
  const logout = () => {
    window.open("https://api-wallpaper-io.onrender.com/logout", "_self");
  };
  async function follow(data) {
    const res = await axios.put(
      "https://api-wallpaper-io.onrender.com/follow/" +
        data +
        "/" +
        user.user.id,

      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
        },
      }
    );
    console.log(res);
    setfollow(!follows);
  }
  const HandleLike = async (data) => {
    if (user) {
      setlike(!like);
      try {
        axios.post(
          "https://api-wallpaper-io.onrender.com/Likes/wallpaper/" +
            data +
            "/" +
            user.user.id,
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": true,
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
            },
          }
        );
      } catch (err) {}
    }
  };
  const Handlesearch = async (data) => {
    try {
      axios
        .get(`https://api-wallpaper-io.onrender.com/api/search?q=${data}`, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
          },
        })
        .then((res) => {
          setData(res.data);
        });
    } catch (err) {}
  };
  useEffect(() => {
    axios
      .get("https://api-wallpaper-io.onrender.com/home", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
        },
      })
      .then((data) => {
        if (data.data !== null) {
          setData(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // home page data request //
    axios
      .get("https://api-wallpaper-io.onrender.com/login/success", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
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
    <AuthContext.Provider
      value={{
        user,
        logout,
        follows,
        setfollow,
        HandleLike,
        follow,
        like,
        setlike,
        Data,
        Handlesearch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
