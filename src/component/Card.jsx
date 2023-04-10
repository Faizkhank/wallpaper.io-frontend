import { React, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Preview from "./preview";
import { UserAuth } from "../component/services/ContextAuth";
import "./collage.css";

export default function Card(props) {
  const { user } = UserAuth();

  const [show, setshow] = useState(false);
  const [load, setload] = useState(false);
  const [Delete, setdelete] = useState(false);
  const [button, showbutton] = useState(false);
  function HandleModal() {
    setshow(true);
  }
  return (
    <>
      <Transition
        as="div"
        show={show}
        enter="transition-all duration-100"
        enterFrom="transform opacity-20 scale-75"
        enterTo="transform opacity-100 scale-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-0"
        className="fixed w-screen h-screen right-0 bottom-0 top-14 left-0 color overflow-y-auto z-50"
      >
        <Preview
          Image={props.Image}
          name={props.name}
          state={setshow}
          photoURL={props.UserURL}
          UploaderID={props.UploaderID}
          Filename={props.Filename}
          _id={props._id}
          Likes={props.Likes}
        />
      </Transition>
      <Transition
        as="div"
        show={Delete}
        enter="transition-all duration-200"
        enterFrom="transform opacity-20 scale-75"
        enterTo="transform opacity-100 scale-100"
        leave="transition-opacity duration-100 "
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-55"
        className="fixed z-50 left-0 right-0 bottom-0 top-36 color"
      >
        <div className="flex justify-center">
          <div className="w-[45vw] h-auto bg-white shadow-md  border rounded-md border-gray-200">
            <div className="flex justify-center ">
              <div className="w-[450px] h-auto rounded-md mt-2">
                <img
                  src={props.Image}
                  className="object-contain rounded-md w-[80vw] mr-3"
                />
              </div>
            </div>
            <div className="flex justify-center mt-3 pb-2">
              <label className=" font-semibold space-x-4">
                Do you want to Delete it!
                <button className=" bg-red-600 duration-200 p-2 rounded-xl pr-5 pl-5 ml-3 hover:scale-110">
                  Yes
                </button>
                <button
                  className=" bg-white p-2 rounded-xl pr-5 pl-5 border hover:scale-110 duration-200"
                  onClick={() => {
                    setdelete(false);
                  }}
                >
                  No
                </button>
              </label>
            </div>
          </div>

          <a
            className="sm:top-0 relative top-0 right-14"
            onClick={() => {
              setdelete(!Delete);
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
      <div
        onMouseEnter={() => showbutton(true)}
        onMouseLeave={() => showbutton(false)}
        className={`relative mb-2 ${load ? "null" : "hidden"}`}
      >
        <a>
          <img
            className="rounded-lg w-full h-auto block  hover:brightness-75"
            src={props.Image}
            onClick={HandleModal}
            onLoad={() => {
              setload(true);
            }}
          />
          {button ? (
            <div className="absolute  right-0 left-0 bottom-1">
              <div className="flex justify-between ">
                <img
                  src={props.UserURL}
                  className={`rounded-full h-11 w-11 ml-5 border-2 border-white ${
                    button ? "button" : "hidden"
                  }`}
                />
                {user ? (
                  <div>
                    {user.user.id === props.UploaderID ? (
                      <button
                        type="button"
                        onClick={() => {
                          setdelete(!Delete);
                        }}
                        className={`mr-7 mb-4 bg-red-600 w-14 h-10 hover:scale-105 rounded-lg ${
                          button ? "button" : "hidden"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-6 h-6 m-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`mr-7 mb-4 bg-white w-14 h-10 rounded-lg ${
                          button ? "button" : "hidden"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 m-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </a>
      </div>
    </>
  );
}
