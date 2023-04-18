import { React, useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      {showSidebar ? (
        <div
          className=" bg-transparent w-screen h-screen fixed z-40 left-0"
          onClick={() => setShowSidebar(!showSidebar)}
        ></div>
      ) : null}
      <Bars3Icon
        className={`flex w-9 mt-5 ml-4 ${
          props.offset || showSidebar ? "fill-black" : "fill-white"
        }
        } cursor-pointer fixed right-5 top-0 z-50`}
        onClick={() => setShowSidebar(!showSidebar)}
      ></Bars3Icon>
      <div
        className={`top-0 right-0 w-[59vw] bg-black p-10 pl-15 text-white fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        {props.user ? (
          <div className="flex overflow-hidden">
            <img
              src={props.user.user.photos}
              className="w-11 h-11 rounded-full border-2 border-white mr-2"
            />
            <p className="mt-2 ml-2 font-bold">{props.user.user.displayName}</p>
          </div>
        ) : null}
        <ul className="mt-5">
          <li className="pr-1">
            <Link
              to={"/"}
              className="font-bold decoration-teal-700 cursor-pointer text-base"
            >
              Home
            </Link><Link
              to={"/AI_generatation"}
              className="font-bold decoration-teal-700 cursor-pointer text-base"
            >
              AI image
            </Link>
          </li>
          <li className="pr-1 mt-4">
            <Link
              to={"/upload"}
              className="font-bold decoration-teal-700 cursor-pointer text-base"
            >
              Upload
            </Link>
          </li>
          <li className="mt-4">
            {!props.user ? (
              <Link
                to={"/login"}
                className="font-bold cursor-pointer text-base  rounded-lg"
              >
                Sign in
              </Link>
            ) : (
              <p
                className="font-bold cursor-pointer text-base  rounded-lg"
                onClick={() => {
                  props.logout();
                }}
              >
                logout
              </p>
            )}
          </li>
        </ul>
        <div className=" absolute bottom-5 right-3 font-semibold ">
          <p>wallpaper.io</p>
        </div>
      </div>
    </div>
  );
}
