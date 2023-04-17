import { React, useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { UserAuth } from "../component/services/ContextAuth";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Register from "./Register";
import { useLocation } from "react-router-dom";
import "./collage.css";
import img from "./images/default.png";
import icon from "./images/icon.png";
export default function Navbar() {
  const location = useLocation();
  const { user, logout, HandleData, setuniquery, issearchquery } = UserAuth();
  const [show, setshow] = useState(false);
  const [drop, setdrop] = useState(false);
  const [suggest, setsuggest] = useState(false);
  const [offset, setOffset] = useState(false);
  const [searchquery, setquery] = useState("");
  const suggestions = ["jack", "faiz", "tree", "food"];
  const [isFocus, setIsFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    const onScroll = () => {
      if (location.pathname !== "/") {
        setOffset(true);
      } else {
        setOffset(window.pageYOffset >= 400);
      }
    };
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);
  useEffect(() => {
    if (location.pathname !== "/") {
      setOffset(true);
    } else {
      setOffset(false);
    }
  }, [location.pathname]);
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
      <div
        className={`top-0 fixed w-[100vw] z-10 h-[80px] duration-250 ${
          offset ? "bg-white border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div>
          <nav className=" bg-transparent  h-14 px-8 flex lg:justify-around sm:justify-between ">
            <div className="w-40 h-20 flex">
              <Link to={"/"}>
                <div className=" flex">
                  <img
                    src={icon}
                    className="w-[45px] h-[45px] rounded-xl mt-4"
                    alt="img"
                  />{" "}
                  <h2
                    className={`font-semibold text-lg mt-3 sm:block hidden  ${
                      offset ? " text-black" : "text-white"
                    }  tracking-wid text-center p-3 cursor-pointer `}
                  >
                    Wallpaper.io
                  </h2>
                </div>
              </Link>
            </div>
            <div>
              <div className="lg:w-[1000px] md:w-[320px] sm:w-[320px] xs:w-[240px] flex justify-center sm:mr-0 mr-6">
                <input
                  type="text"
                  onBlur={() => {
                    if (!isHovered) {
                      setIsFocus(false);
                    }
                  }}
                  value={searchquery}
                  onFocus={() => setIsFocus(true)}
                  onChange={(e) => {
                    setuniquery(e.target.value);
                    setquery(e.target.value);
                  }}
                  className={`relative font-semibold outline-none bg-gray-300 focus:outline-none rounded-t-md focus:border-white focus:ring-0 ${
                    isFocus ? "null" : "rounded-b-md"
                  } border-0 w-full p-3 mt-4  text-base text-black placeholder-gray-400  focus:shadow-outline h-12 mr-2`}
                  placeholder="Search for photos"
                  onClick={() => {
                    setsuggest(!suggest);
                  }}
                  ref={inputRef}
                />
                <Link to={`/photo/${searchquery}`} className="mt-5">
                  <MagnifyingGlassIcon className="w-9 fill-gray-400 relative right-11" />
                </Link>
              </div>
              {isFocus && (
                <div
                  className="shadow-lg relative w-full  rounded-b-md bg-white lg:w-[956px] md:w-[276px] sm:w-[278px] xs:w-[204px]"
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                >
                  {suggestions.map((suggestion, index) => {
                    const isMatch =
                      suggestion
                        .toLowerCase()
                        .indexOf(searchquery.toLowerCase()) > -1;
                    return (
                      <div key={index}>
                        {isMatch && (
                          <div
                            className="p-3 pl-5 cursor-pointer font-bold text-gray-400 hover:text-black"
                            onClick={() => {
                              setquery(suggestion);
                              setuniquery(suggestion);

                              setIsFocus(false);

                              inputRef.current.focus();
                            }}
                          >
                            <Link
                              to={`/photo/${suggestion}`}
                              onClick={() => {
                                HandleData(searchquery);
                              }}
                            >
                              {suggestion}
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <div className="justify-center sm:flex hidden">
                <div>
                  <div className=" flex space-x-4 mr-2">
                    <Link
                      to={"/AI_generatation"}
                      className={`font-semibold mt-6 cursor-pointer text-base ${
                        offset ? " text-black" : "text-white"
                      }`}
                    >
                      <p className="hover:scale-105 duration-150">AI Image</p>
                    </Link>
                    <Link
                      to={"/Upload"}
                      className={`font-semibold mt-4  cursor-pointer shadow-xl border py-2 rounded-lg px-2 text-base h-[44px]  hover:scale-105 duration-150   ${
                        offset ? " text-black" : "text-white"
                      }`}
                    >
                      Upload
                    </Link>
                    {!user ? (
                      <a
                        onClick={() => setshow(!show)}
                        className="font-semibold text-white duration-150 hover:scale-105 hover:shadow-xl h-11 mt-4 overflow-hidden cursor-pointer text-base p-2  mr-4 rounded-lg bg-purple-500"
                      >
                        Register
                      </a>
                    ) : null}
                  </div>
                </div>

                {user ? (
                  <div className=" hover:scale-125 duration-150 flex justify-center from-emerald-500 via-purple-500 to-red-600 background-animate bg-gradient-to-r mt-4 rounded-full  w-[47px] h-[47px] p-0">
                    <img
                      className=" w-[42px] h-[42px] rounded-full mt-[2px] shadow-2xl"
                      src={user.user.photos || img}
                      alt="img"
                      onClick={() => setdrop(!drop)}
                    />
                  </div>
                ) : (
                  <Link
                    className="font-semibold  text-white duration-150 hover:scale-105 hover:shadow-xl mt-4 decoration-teal-700 cursor-pointer text-base bg-violet-500 w-18 h-11 rounded-lg  mr-2 pt-2 p-2 mb-1 overflow-clip"
                    to={"/login"}
                  >
                    Sign in
                  </Link>
                )}
              </div>
              {drop ? (
                <div
                  className=" bg-transparent w-screen h-screen fixed z-40 left-0"
                  onClick={() => setdrop(!drop)}
                ></div>
              ) : null}

              <Transition
                as="div"
                show={drop}
                enter="transition-all duration-100"
                enterFrom="transform translate-y-0 scale-90"
                enterTo="transform translate-y-2 scale-100"
                className="fixed top-16 right-36 shadow-lg z-50 bg-white w-36 h-auto rounded-lg p-1"
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
                          className="w-5 h-5 mr-2 ml-1"
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
              <div className="sm:hidden  flex justify-around">
                <Sidebar user={user} logout={logout} offset={offset} />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
