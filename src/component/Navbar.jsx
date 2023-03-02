import { React, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { UserAuth } from "../component/services/ContextAuth";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Register from "./Register";
import "./collage.css";

export default function Navbar() {
  const [show, setshow] = useState(false);
  const [drop, setdrop] = useState(false);
  const [suggest, setsuggest] = useState(false);
  const { user, logout } = UserAuth();
  return (
    <div>
      <Transition
        as="div"
        show={show}
        enter="transition-all duration-100"
        enterFrom="transform opacity-20 scale-75"
        enterTo="transform opacity-100 scale-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-0"
        className="fixed left-0 right-0 bottom-0 z-50 color"
      >
        <Register state={setshow} show={show} />
      </Transition>
      <div className="top-0 fixed w-[100vw] z-10 bg-white">
        <div>
          <nav className=" bg-transparent  h-14 px-8 flex lg:justify-around sm:justify-between shadow">
            <div className="w-40 h-20 flex">
              <Link to={"/"}>
                <h2 className="font-semibold text-lg  tracking-wid text-center p-3 cursor-pointer">
                  Wallpaper.io
                </h2>
              </Link>
            </div>
            <div>
              <div className="lg:w-[1000px] md:w-[600px] sm:w-[350px] xs:w-[250px] flex justify-center">
                <input
                  type="text"
                  className="relative font-semibold outline-none border-white rounded-lg w-full sm:w-2/3 p-3 mt-1 bg-white shadow text-base text-black placeholder-gray-700  focus:shadow-outline h-12"
                  placeholder="Search"
                  onClick={() => {
                    setsuggest(!suggest);
                  }}
                />
                <MagnifyingGlassIcon className=" w-9 fill-gray-300 relative right-11 " />
              </div>
              {suggest ? (
                <div className="lg:w-[1000px] md:w-[600px] sm:w-[350px] xs:w-[250px] flex justify-center">
                  <div className="relative z-50 top-0 right-0 left-0 bg-white shadow-xl w-2/3 mr-9">
                    <ul>
                      <li className="font-bold">
                        <a>Abstract</a>
                      </li>
                      <li>
                        <a>Abstract</a>
                      </li>
                      <li>
                        <a>Abstract</a>
                      </li>
                      <li>
                        <a>Abstract</a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
            <div>
              <div className="justify-center sm:flex hidden">
                {!user ? (
                  <a
                    onClick={() => setshow(!show)}
                    className="font-semibold decoration-teal-700 h-11 mt-1 cursor-pointer text-base p-2  mr-4 rounded-lg bg-purple-500"
                  >
                    Register
                  </a>
                ) : (
                  <Link
                    to={"/Upload"}
                    className="font-semibold decoration-teal-700 cursor-pointer text-base p-3  mr-4 "
                  >
                    Upload
                  </Link>
                )}
                {user ? (
                  <img
                    className=" w-11 h-11 rounded-full mt-1 hover:border-3 border-0"
                    src={user.user.photos}
                    onClick={() => setdrop(!drop)}
                  />
                ) : (
                  <Link
                    className="font-semibold decoration-teal-700 cursor-pointer text-base bg-violet-500 w-18 h-11 rounded-lg mt-1 mr-2 pt-2 p-2 mb-1 overflow-clip"
                    to={"/login"}
                  >
                    Sign in
                  </Link>
                )}
              </div>
              <Transition
                as="div"
                show={drop}
                enter="transition-all duration-100"
                enterFrom="transform translate-y-0 scale-90"
                enterTo="transform translate-y-2 scale-100"
                className="fixed top-12 right-24 shadow-lg z-50 bg-white w-36 h-auto rounded-lg p-1"
              >
                <div className="w-full m-auto">
                  <ul>
                    <li className="pt-2 pb-2 hover:bg-slate-100  text-center  border-b-2">
                      <Link
                        className=" cursor-pointer font-semibold flex  duration-150 translate-x-0 hover:translate-x-3"
                        to={"/Upload"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-2 ml-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                          />
                        </svg>
                        Upload
                      </Link>
                    </li>
                    <li className="pt-2 pb-2 hover:bg-slate-100 text-center border-b-2 ">
                      <Link
                        className=" cursor-pointer font-semibold flex  duration-150 translate-x-0 hover:translate-x-3"
                        to={"/profile"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-2 mt-1 ml-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                        Profile
                      </Link>
                    </li>
                    <li className="pt-2 pb-2  hover:bg-slate-100 rounded-lg text-center">
                      <p
                        className=" cursor-pointer font-semibold flex duration-150 translate-x-0 hover:translate-x-3"
                        onClick={logout}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-2 mt-1 ml-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                        Log out
                      </p>
                    </li>
                  </ul>
                </div>
              </Transition>
              <div className="sm:hidden flex justify-around">
                <Sidebar />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
