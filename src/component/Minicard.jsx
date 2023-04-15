import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Minicard = (props) => {
  const [drop, setdrop] = useState(false);
  const param = useParams();
  const filterfollowers = async () => {
    const data = await axios.get(
      "https://api-wallpaper-io.onrender.com/filter/follower",
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.API_KEY_WALLPAPER,
        },
      }
    );
    props.setuserpic(data.data);
  };
  const Gallary = () => {
    axios
      .get("https://api-wallpaper-io.onrender.com/user/" + param.id, {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.API_KEY_WALLPAPER,
        },
      })
      .then((data) => {
        props.setuserpic(data.data);
      });
  };
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="flex justify-between w-[400px] mt-6">
          <div className=" font-semibold w-1/2">
            <p className=" text-gray-500  text-sm text-center">Total views</p>
            <p className="text-gray-600 text-xl text-center">
              {props.user.Totallikes}
            </p>
          </div>
          <div className="font-semibold w-1/2 border-l-2 border-width-2 border-r-2">
            <p className=" text-gray-500 text-sm text-center">Total likes</p>
            <p className="p-1 text-xl text-center">{props.user.Totallikes}</p>
          </div>
          <div className="font-semibold w-1/2">
            <p className=" text-gray-500 text-sm text-center">Followers</p>
            <p className="p-1 text-xl text-center">{props.user.followers}</p>
          </div>
        </div>
      </div>
      <div className="flex mt-16 mb-11  justify-between w-full">
        <div className="flex ml-11">
          <Link onClick={Gallary}>
            <span className=" bg-black text-sm flex text-white w-32 pt-3 pb-3 pr-5 pl-5 font-bold rounded-3xl tracking-widest">
              Gallary
              <p className="ml-4 text-grey-300 text-sm">{props.total}</p>
            </span>
          </Link>
          <Link
            className="mt-2 hover:border-b-2 border-black ml-6"
            onClick={filterfollowers}
          >
            <span className=" text-md text-black w-16 font-bold  hover:tracking-widest tracking-normal duration-200">
              Following
            </span>
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              setdrop(!drop);
            }}
            className="text-black font-semibold bg-white mr-11 border  rounded-lg text-md px-5 py-3 text-center inline-flex items-center"
            type="button"
          >
            <p className="sm:block hidden">photo and videos</p>
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            className={`z-10 ${
              drop ? "null translate-y-1 scale-100" : "hidden"
            } bg-white divide-y divide-gray-100  scale-75 translate-y-0 rounded-lg duration-100 ease-in shadow w-52 dark:bg-gray-700  absolute z-50 xs:right-6`}
          >
            <ul
              className="py-2 text-black font-semibold text-center dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  photo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  videos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Minicard;
