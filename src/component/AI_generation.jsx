import { React, useState } from "react";
import { UserAuth } from "../component/services/ContextAuth";
import { Transition } from "@headlessui/react";
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
      .post("http://localhost:4000/gen/upload", { Image: file })
      .then((response) => {
        console.log(response);
      });
  };
  const Handlegenerate = async () => {
    setprocess(!process);
    axios
      .post(
        "http://localhost:4000/gen",
        { prompt: promt },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
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
    <div className="relative top-24">
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
        <div className="flex justify-center mt-11">
          <div className="w-[60vw] h-[70vh] bg-white shadow-md  border rounded-md border-gray-200">
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
      <div className="flex justify-center lg:mt-10 xs:mt-8 ">
        <div className=" lg:columns-2 sm:columns-1  p-11">
          <div className=" relative group">
            <div className=" hidden group-hover:block absolute rounded-md z-30  w-[600px] h-[600px] bg-white/30 backdrop-blur-sm"></div>{" "}
            <div className=" absolute z-30 hidden group-hover:block left-64 top-64 hover:scale-110 duration-200">
              <div className="flex justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
              </div>
              <button
                className=" bg-emerald-400 font-semibold p-2 rounded-md"
                onClick={() => {
                  setuploadmenu(!Uploadmenu);
                }}
              >
                Upload
              </button>
            </div>
            <div className=" w-[600px] border-emerald-400  flex justify-center border-2 h-[600px] rounded-md">
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
                  <p className=" font-semibold text-emerald-400">
                    Image generated here
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-[600px] border-black flex justify-center h-[600px] ">
            <div class="relative z-0 w-3/5 mb-6 group">
              <input
                type="prompt"
                name="prompt"
                id="prompt"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-400urple-500 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
                placeholder=" "
                onChange={(e) => {
                  setpromt(e.target.value);
                }}
              />
              <label
                for="prompt"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
              >
                Describe Image here
              </label>
              <div className="flex">
                <button
                  type="button"
                  onClick={Handlegenerate}
                  className=" bg-emerald-400 rounded-md font-semibold p-2 mt-4 hover:scale-95 duration-150"
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