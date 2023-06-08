import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "./Grid";
import { UserAuth } from "../component/services/ContextAuth";
import img from "./images/background.jpg";
import Searchbar from "./Searchbar/Searchbar";

export default function Home() {
  const [Image, setImage] = useState("");
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const { HandleData, Data } = UserAuth();

  useEffect(() => {
    const generateRandomImage = () => {
      if (Data && Data.length > 0) {
        const randomIndex = Math.floor(Math.random() * Data.length);
        setImage(Data[randomIndex]?.Url);
      }
    };

    if (!isImageGenerated && Data) {
      generateRandomImage();
      setIsImageGenerated(true);
    }
  }, [isImageGenerated, Data]);
  useEffect(() => {
    HandleData("");
  }, []);
  return (
    <div>
      <div className="h-[420px]">
        <div>
          <div className=" absolute -z-10 object-contain overflow-hidden w-full top-0 h-[420px]">
            <img src={Image || img} className="w-full" />
          </div>
          <div className="flex justify-center p-11 mt-10">
            <h1 className="text-5xl mr-1 text-white">Discover Your picture</h1>
          </div>
        </div>

        <div className="flex justify-center xs:null mt-1 mb-6">
          <div className="flex space-x-5">
            <Link
              to={"/"}
              className="text-lg mr-3 font-semibold cursor-pointer bg-black  text-white rounded-2xl duration-200 hover:w-[100px] w-[80px] h-[35px] flex justify-center pl-2 pr-2 pt-1"
            >
              <p>Home</p>
            </Link>
            <Link
              to={`/photo/AI`}
              className="text-lg w-[100px] mr-3 text-white font-semibold cursor-pointer rounded-2xl hover:bg-black duration-200 hover:w-[120px]  h-[35px] flex justify-center pl-2 pr-2 pt-1"
            >
              <p>AI images</p>
            </Link>
            <Link className="text-lg  mr-3  text-white font-semibold cursor-pointer rounded-2xl  hover:bg-black duration-200 hover:w-[120px]  h-[35px] flex justify-center pl-2 pr-2 pt-1">
              Activity
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Searchbar />
        </div>
      </div>
      <Grid />
    </div>
  );
}
