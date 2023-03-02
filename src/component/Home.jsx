import React from "react";
import { Link } from "react-router-dom";
import Grid from "./Grid";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center mt-36">
        <div className="flex">
          <Link to={"/"} className="text-lg mr-3 font-semibold cursor-pointer">
            Home
          </Link>
          <Link className="text-lg  mr-3 font-semibold cursor-pointer">
            Videos
          </Link>
          <Link className="text-lg  mr-3 font-semibold cursor-pointer">
            Activity
          </Link>
        </div>
      </div>
      <div className="flex justify-center p-11">
        <h1 className="text-5xl mr-1">Discover Your picture</h1>
      </div>
      <Grid />
    </div>
  );
}
