import React from "react";
import { Link } from "react-router-dom";
import Grid from "./Grid";
import img from "./images/background.jpg";

export default function Home() {
  return (
    <div>
      <div>
        <div className=" absolute -z-10 object-contain overflow-hidden w-full top-0 h-[320px]">
          <img src={img} className="w-full" />
        </div>
        <div className="flex justify-center p-11 mt-10">
          <h1 className="text-5xl mr-1 text-white">Discover Your picture</h1>
        </div>
      </div>
      <div className="flex justify-center xs:null mt-1 mb-6">
        <div className="flex">
          <Link
            to={"/"}
            className="text-lg mr-3 font-semibold cursor-pointer bg-black text-white rounded-2xl w-[80px] h-[35px] flex justify-center pl-2 pr-2 pt-1"
          >
            Home
          </Link>
          <Link className="text-lg  mr-3 text-white font-semibold cursor-pointer rounded-2xl w-[80px] h-[35px] flex justify-center pl-2 pr-2 pt-1">
            Videos
          </Link>
          <Link className="text-lg  mr-3  text-white font-semibold cursor-pointer rounded-2xl w-[80px] h-[35px] flex justify-center pl-2 pr-2 pt-1">
            Activity
          </Link>
        </div>
      </div>

      <Grid />
    </div>
  );
}
