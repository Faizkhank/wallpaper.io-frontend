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

  const logout = () => {
    window.open("https://api-wallpaper-io.onrender.com/logout", "_self");
  };
  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api-wallpaper-io.onrender.com/data?page=${pageNumber}`,
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
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
        },
      }
    );
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
              "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
            },
          }
        );
      } catch (err) {}
    }
  };
  const Handlesearch = async () => {
    setissearchquery(true);
    try {
      axios
        .get(
          `https://api-wallpaper-io.onrender.com/api/search?q=${searchquery}&page?p=${pageNumber}`,
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
    axios
      .get("https://api-wallpaper-io.onrender.com/home", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
        },
      })
      .then((data) => {
        if (data.data !== null) {
          setissearchquery(false);
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
        Handlesearch,
        fetchData,
        isLoading,
        setIsLoading,
        issearchquery,
        setissearchquery,
        setuniquery,
        fetchDataquery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
