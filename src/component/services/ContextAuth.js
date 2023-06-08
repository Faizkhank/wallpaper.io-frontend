import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [follows, setfollow] = useState(false);
  const [like, setlike] = useState(false);
  const [issearchquery, setissearchquery] = useState(false);
  const [Data, setData] = useState(null);
  const [searchquery, setuniquery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(10);
  const [qNumber, setqNumber] = useState(10);
  const [notification, setnotification] = useState();

  const logout = () => {
    window.open("https://api-wallpaper-io.onrender.com/logout", "_self");
  };
  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api-wallpaper-io.onrender.com/api/search?q=&p=${pageNumber}`,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
        },
      }
    );

    const newData = await response.json();
    console.log(pageNumber);
    setData([...Data, ...newData]);
    setPageNumber(pageNumber + 10);
    setIsLoading(false);
  };
  const fetchDataquery = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api-wallpaper-io.onrender.com/api/search?q=${searchquery}&p=${qNumber}`,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
        },
      }
    );
    setqNumber(qNumber + 10);
    const newdata = await response.json();
    setData([...Data, ...newdata]);

    setIsLoading(false);
  };
  const follow = async (data) => {
    const res = await axios.put(
      `https://api-wallpaper-io.onrender.com/follow/${data}/${user.user.id}`,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
        },
      }
    );
    setfollow(!follows);
  };
  const HandleLike = async (data) => {
    if (user) {
      setlike(!like);
      try {
        axios.post(
          `https://api-wallpaper-io.onrender.com/Likes/wallpaper/${data}/${user.user.id}`,
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": true,
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
            },
          }
        );
      } catch (err) {}
    }
  };
  const HandleData = async (query) => {
    setissearchquery(true);
    try {
      axios
        .get(
          `https://api-wallpaper-io.onrender.com/api/search?q=${query}&page?p=${pageNumber}`,
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": true,
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
            },
          }
        )
        .then((res) => {
          setData(res.data);
          setissearchquery(true);
        });
    } catch (err) {}
  };
  useEffect(() => {
    // home page data request //
    axios
      .get("https://api-wallpaper-io.onrender.com/login/success", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
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
        HandleData,
        fetchData,
        isLoading,
        setIsLoading,
        issearchquery,
        setissearchquery,
        searchquery,
        setuniquery,
        fetchDataquery,
        setUser,
        setnotification,
        notification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
