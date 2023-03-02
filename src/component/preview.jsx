import axios from "axios";
import { useEffect, useState } from "react";
import { UserAuth } from "../component/services/ContextAuth";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./collage.css";
export default function Preview(props) {
  const { user } = UserAuth();
  const [zoom, setzoom] = useState(false);
  const [x, setx] = useState("20%");
  const [y, sety] = useState("20%");
  const [like, setlike] = useState(false);
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
  const HandleLike = async () => {
    if (user) {
      setlike(!like);
      try {
        axios.post("/Likes/wallpaper/" + props._id, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
          },
        });
      } catch (err) {}
    }
  };
  useEffect(() => {
    window.history.pushState("", "", "/photo/" + props.Filename.split(".")[0]);
    if (user) {
      checklike();
      async function checklike() {
        const check = await axios.get("/checklike/" + props._id, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
          },
        });
        setlike(check.data);
      }
    }
  }, []);
  return (
    <div className="w-full block">
      <a onClick={setclose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-11 h-11 mt-2 absolute z-40 text-slate-50 sm:top-0 top-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </a>
      <div className="h-full w-full lg:flex justify-center sm:block">
        <div className="lg:max-w-[90vw] h-[90vh] relative z-50 bg-white shadow-lg border-1 block justify-between rounded-lg md:m-11 sm:m-16 lg:m-7 sm:mt-0 mt-14">
          <div className="flex lg:ml-4 rounded-lg lg:mr-4 sm:m-2 bg-white justify-between">
            <div className="flex">
              <Link to={"/user/" + props.UploaderID}>
                <img
                  className="rounded-full w-14 h-14 m-4 sm:ml-0 lg:ml-1"
                  id="zoom"
                  src={props.photoURL}
                  alt="user"
                />
              </Link>
              <h1 className="mt-7 font-sans">{props.name}</h1>
            </div>
            <div className="flex">
              <button className="pr-2 pl-2 h-14 hover:border-1 border-2 rounded-xl mt-4 mr-4 flex p-3 hover:border-black justify-center">
                <svg className="m-0" viewBox="0 0 24 24" width="24" height="24">
                  <path
                    id="collection_border-75c45573e9363c7b32ebea7827cfee9f_Path_2324"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                  <path
                    id="collection_border-75c45573e9363c7b32ebea7827cfee9f_Path_2325"
                    d="M15,7V19.97l-4.21-1.81L10,17.82l-.79.34L5,19.97V7H15m4-6H8.99A2,2,0,0,0,7,3H17a2.006,2.006,0,0,1,2,2V18l2,1V3A2.006,2.006,0,0,0,19,1ZM15,5H5A2.006,2.006,0,0,0,3,7V23l7-3,7,3V7A2.006,2.006,0,0,0,15,5Z"
                  ></path>
                </svg>
                <span className="sm:block hidden">Collect</span>
              </button>
              <button
                className="pr-2 pl-2 h-14 hover:border-1 border-2 rounded-xl mt-4 mr-4 flex p-3 hover:border-black justify-center"
                onClick={HandleLike}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${like ? "red" : "white"}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={`${like ? "red" : "grey"}`}
                  className={`w-6 h-6 mr-1 ${like ? "likes" : "null"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="sm:block hidden">
                  Like {props.Likes.length}
                </span>
              </button>
              <a
                href={props.Image}
                className="w-44 h-14 mr-1 hover:border-1 border-2 rounded-xl mt-4 flex bg-violet-600 text-stone-50 p-3 justify-center hover:border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                Download
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
                className="w-4 h-4 p-1 bg-gray-400 rounded-full text-white mr-3 mt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="font-bold text-sm text-slate-400">
                Free to use
              </span>
            </p>
            <p className="flex ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="grey"
                className="w-5 h-5 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="font-bold text-sm text-slate-400">
                Free to use
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
