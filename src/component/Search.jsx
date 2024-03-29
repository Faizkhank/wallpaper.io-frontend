import { React, useEffect } from "react";
import Grid from "./Grid";
import { useParams } from "react-router-dom";
import { UserAuth } from "../component/services/ContextAuth";
import empty from "./images/notfound.gif";
export default function Search() {
  const { HandleData, Data } = UserAuth();
  const query = useParams();
  useEffect(() => {
    HandleData(query.q);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="container ">
        {Data?.length === 0 ? (
          <div className="flex justify-center">
            <div className="m-auto mt-[20%]">
              <img src={empty} className="w-[300px]" alt="Empty" />
              <h2 className="font-bold text-2xl text-purple-400 opacity-50 text-center">
                NOT FOUND
              </h2>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-bold text-5xl text-black mt-28 h-[200px]">
              Free {query.q} Images here
            </p>
            <Grid />
          </div>
        )}
      </div>
    </div>
  );
}
