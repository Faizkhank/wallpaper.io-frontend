import { React, useState } from "react";
import { UserAuth } from "../component/services/ContextAuth";
import { Transition } from "@headlessui/react";
import gif from "./images/teaser.jpeg";
import collage from "./images/collage.jpeg";
import axios from "axios";
import "./collage.css";

const AI_generatation = () => {
  const { user } = UserAuth() || {};
  const [promt, setpromt] = useState("");
  const [process, setprocess] = useState(false);
  const [file, setfile] = useState("");
  const [Image, setImage] = useState("");
  const [Uploadmenu, setuploadmenu] = useState(false);
  console.log(file);
  const uploadImage = () => {
    axios
      .post("https://api-wallpaper-io.onrender.com/gen/upload", { Image: file })
      .then((response) => {
        console.log(response);
      });
  };
  const Handlegenerate = async () => {
    setprocess(!process);
    axios
      .post(
        "https://api-wallpaper-io.onrender.com/gen",
        { prompt: promt },
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
        setImage(res.data.data);
        setprocess(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={`relative w-full h-[100vh] duration-300  ${
        process ? "bg-gradient-to-br" : "bg-gradient-to-tr"
      } from-black to-purple-600 background-animate`}
    >
      <Transition
        as="div"
        show={Uploadmenu}
        enter="transition-all duration-200"
        enterFrom="transform opacity-20 scale-75"
        enterTo="transform opacity-100 scale-100"
        leave="transition-opacity duration-100 "
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-55"
        className="fixed z-50 left-0 right-0 bottom-0 color"
      >
        <div className="flex justify-center mt-24">
          <div className="w-[70vw] h-[70vh] bg-white shadow-md  border rounded-md border-gray-200">
            <div className="flex justify-center ">
              <div className="w-[550px] h-[400px] rounded-md mt-2">
                <img
                  src={Image}
                  className="object-contain rounded-md w-[100vw]"
                />
              </div>
            </div>
            <button onClick={uploadImage}>upload</button>
          </div>

          <a
            className="sm:top-0 relative top-0 right-14"
            onClick={() => {
              setuploadmenu(!Uploadmenu);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 mt-2 text-black hover:scale-105 duration-150"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </a>
        </div>
      </Transition>
      <div className=" lg:mt-22 xs:mt-8 ">
        <div className="p-11 pt-28 flex justify-center flex-wrap">
          <div className=" relative group">
            <div className=" lg:w-[510px] xs:w-[400px] h-auto border-emerald-400  flex justify-center border-2  rounded-md">
              <div className=" hidden group-hover:block absolute rounded-md z-30 left-0 right-0 top-0 bottom-0 h-auto bg-white/30 backdrop-blur-sm">
                <div className=" absolute z-30 hidden group-hover:block left-0 right-0 top-1/2 bottom-0 hover:scale-110 duration-200">
                  <div className="flex justify-center mb-3">
                    <button
                      className=" from-emerald-500 via-purple-500 to-red-600 background-animate bg-gradient-to-r  font-semibold p-2 rounded-md text-white"
                      onClick={() => {
                        setuploadmenu(!Uploadmenu);
                      }}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {Image ? (
                  <img
                    src={Image}
                    value
                    className=" w-[100vw] object-contain rounded-md relative z-0 group-hover:brightness-75"
                    onChange={(e) => {
                      setfile(e.target.value);
                    }}
                  />
                ) : (
                  <div>
                    <div className="lg:w-[510px] xs:w-[380px] h-auto rounded-md p-2">
                      <img
                        src={gif}
                        value
                        className=" w-[100vw] object-contain rounded-md relative z-0"
                      />
                      <img
                        src={collage}
                        value
                        className="  w-[100vw] object-contain rounded-md relative z-0"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-[600px] border-black flex justify-center h-[200px] mt-4">
            <div class="relative z-0 w-3/5 mb-6 group">
              <input
                type="prompt"
                name="prompt"
                id="prompt"
                className="block py-2.5 px-0 w-full text-sm  border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer font-semibold bg-transparent"
                placeholder=" "
                onChange={(e) => {
                  setpromt(e.target.value);
                }}
              />
              <label
                for="prompt"
                className="peer-focus:font-medium absolute text-sm font-semibold text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
              >
                Describe Image here
              </label>
              <div className="flex">
                <button
                  type="button"
                  onClick={Handlegenerate}
                  className=" from-emerald-500 via-purple-500 to-red-600 background-animate text-white bg-gradient-to-r rounded-md font-semibold p-2 mt-4 hover:scale-95 duration-150"
                >
                  Generate
                </button>
                {process ? (
                  <div role="status" className=" mt-[18px] ml-9">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-400"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AI_generatation;
