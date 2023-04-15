import axios from "axios";
import { useEffect, useState } from "react";
import { UserAuth } from "../component/services/ContextAuth";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./collage.css";
export default function Preview(props) {
  const { user, follows, setfollow, HandleLike, follow, like, setlike } =
    UserAuth();
  const [zoom, setzoom] = useState(false);
  const [x, setx] = useState("20%");
  const [y, sety] = useState("20%");
  const location = useLocation();

  const styleZoom = {
    transform: `translate3d(${50 - (x / window.innerWidth) * 100 + "%"}, ${
      50 - (y / window.innerHeight) * 100 + "%"
    }, 0px) scale(3)`,
    transitionDuration: "0.1s",
    position: "relative",
    transformOrigin: "center",
  };
  function setclose() {
    window.history.pushState("", "", location.pathname);
    props.state(false);
  }

  useEffect(() => {
    window.history.pushState("", "", "/photo/" + props.Filename.split(".")[0]);
    if (user) {
      checklike();
      axios
        .get(
          "https://api-wallpaper-io.onrender.com/checkfollow/" +
            props.UploaderID +
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
        )
        .then((response) => {
          setfollow(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      async function checklike() {
        const check = await axios.get(
          "https://api-wallpaper-io.onrender.com/checklike/" +
            props._id +
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
        setlike(check.data);
      }
    }
  }, []);
  return (
    <div className="w-full block h-[100vh]">
      <a onClick={setclose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 mt-2 absolute z-40 text-slate-50 sm:top-0 top-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </a>
      <div className="h-full w-full lg:flex justify-center sm:block">
        <div className="lg:max-w-[90vw] h-[100vh] relative z-50 bg-white shadow-lg border-1 block justify-between rounded-lg md:m-11 sm:m-16 lg:m-7 sm:mt-0 mt-14">
          <div className="flex lg:ml-4 rounded-lg lg:mr-4 sm:m-2 bg-white justify-between">
            <div className="flex">
              <Link to={"/user/" + props.UploaderID}>
                <img
                  className="rounded-full w-11 h-11 m-4 sm:ml-0 lg:ml-1 duration-150 ease-in hover:scale-125"
                  id="zoom"
                  src={props.photoURL}
                  alt="user"
                />
              </Link>
              <div>
                <h1 className="mt-3 font-semibold text-lg xs:hidden sm:hidden md:block lg:block ">
                  {props.name}
                </h1>
                {follows ? (
                  <h1
                    onClick={() => follow(props.UploaderID)}
                    className=" text-sm font-semibold text-gray-400 p-0 hover:text-slate-500 cursor-pointer xs:hidden sm:hidden md:block lg:block"
                  >
                    following
                  </h1>
                ) : (
                  <h1
                    onClick={() => follow(props.UploaderID)}
                    className=" text-sm font-semibold text-gray-400 p-0 hover:text-slate-500 cursor-pointer xs:hidden sm:hidden md:block lg:block"
                  >
                    follow
                  </h1>
                )}
              </div>
            </div>
            <div className="flex">
              <button
                type="button"
                className="pr-2 pl-2 h-12 border border-gray-300  hover:bg-slate-100 rounded-lg mt-4 mr-4 flex p-2 sm:w-[120px] w-[40px] justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6 xs:mr-0 mr-2 mt-[2px] "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>

                <span className="sm:block hidden rounded-lg mt-[2px]">
                  Collect
                </span>
              </button>
              <button
                type="button"
                className="pr-2 pl-2 h-12 border border-gray-300 hover:bg-slate-100 rounded-lg sm:w-[120px] w-[40px] mt-4 mr-4 flex p-2 justify-center"
                onClick={() => HandleLike(props._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${like ? "red" : "white"}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={`${like ? "red" : "red"}`}
                  className={`w-6 h-6  ${like ? "likes" : "null"} mt-[2px]`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="sm:block hidden mr-2 mt-[2px]">Likes</span>
                <span className="sm:block hidden mt-[3px]">{props.Likes}</span>
              </button>
              <a
                href={props.Image}
                className="sm:w-44 w-14 h-12 mr-5 group rounded-lg mt-4 flex bg-violet-600 duration-200 ease-in hover:bg-violet-500 text-stone-50 p-3 justify-center hover:border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 sm:mr-2 mr-0 group-hover:animate-bounce duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <span className="sm:block hidden">Download</span>
              </a>
            </div>
          </div>
          <div>
            <div className="cards">
              <div className="card">
                <img
                  className="w-[90vw] h-[70vh]"
                  src={props.Image}
                  style={zoom ? styleZoom : null}
                  alt={props.name}
                  onClick={() => {
                    setzoom(!zoom);
                  }}
                  onMouseMove={(e) => {
                    setx(e.clientX);
                    sety(e.clientY);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex mt-11 ml-16">
            <p className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 p-1 bg-gray-300 rounded-full text-white mr-3 mt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="font-bold text-sm text-slate-400  hover:text-slate-500 cursor-pointer">
                Free to use
              </span>
            </p>
            <p className="flex ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="lightgray"
                className="w-5 h-5 mr-2 "
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="font-bold text-sm text-slate-400 hover:text-slate-500 cursor-pointer">
                Free to use
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
