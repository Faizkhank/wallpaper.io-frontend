import { React, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Preview from "./preview";
import "./collage.css";

export default function Card(props) {
  const [show, setshow] = useState(false);
  const [load, setload] = useState(false);
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
      <div
        onMouseEnter={() => showbutton(true)}
        onMouseLeave={() => showbutton(false)}
        className={`relative mb-2 hover:brightness-75 ${
          load ? "null" : "hidden"
        }`}
      >
        <a>
          <img
            className="rounded-lg w-full h-auto block"
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
              </div>
            </div>
          ) : null}
        </a>
      </div>
    </>
  );
}
