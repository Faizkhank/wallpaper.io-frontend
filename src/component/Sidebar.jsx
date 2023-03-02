import { React, useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div>
      <Bars3Icon
        className="flex w-9 mt-2 ml-4 fill-gray-500 cursor-pointer fixed right-5 top-0 z-50"
        onClick={() => setShowSidebar(!showSidebar)}
      ></Bars3Icon>
      <div
        className={`top-0 right-0 w-[39vw] bg-violet-500 p-10 pl-15 text-white fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <ul>
          <li className="pr-1">
            <a
              href={""}
              className="font-sans decoration-teal-700 cursor-pointer text-base p-3 font-semibold"
            >
              Upload
            </a>
          </li>
          <li className="mt-4">
            <a
              href={""}
              className="font-sans decoration-teal-700 cursor-pointer text-base font-semibold bg-violet-500 w-18 h-11 rounded-lg mt-1 mr-2 pt-2 p-2"
            >
              Sign in
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
