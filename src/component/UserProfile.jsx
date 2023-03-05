import { React, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Card from "./Card";
import Minicard from "./Minicard";
export default function UserProfile() {
  const param = useParams();
  const [userpic, setuserpic] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get("https://api-wallpaper-io.onrender.com/user/" + param.id, {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
        },
      })
      .then((data) => {
        setuserpic(data.data);
      });
    axios
      .get("https://api-wallpaper-io.onrender.com/users/info/" + param.id, {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, []);
  return (
    <div>
      <div className="flex justify-center mt-32 ">
        <div className="flex">
          <div>
            {param ? (
              <div className="flex justify-center">
                <img
                  src={user.photos}
                  className=" rounded-full lg:w-[125px] lg:h-[125px] md:w-[100px] md:h-[100px] sm:w-[100px] xs:w-[100px] xs:h-[100px]"
                />
              </div>
            ) : null}
            <div className="flex justify-center">
              <h1 className="lg:text-6xl sm:text-2xl sm:mt-3 lg:mt-9 font-bold mb-2">
                {user.displayName}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex justify-between w-[250px]">
          <button className=" w-28 h-12 bg-violet-500 rounded-lg">
            <span className=" font-bold text-md text-white">Follow</span>
          </button>
          <button className=" w-28 h-12 bg-white border rounded-lg">
            <span className=" font-bold text-md">Message</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <p className=" text-gray-400 font-semibold xs:ml-6">
          IT-specialist, film (and sometimes digital) photographer and
          videographer
        </p>
      </div>
      <div></div>
      <Minicard user={user} total={userpic ? userpic.length : 0} />
      <div className="flex justify-center mt-4">
        <div className="lg:columns-3 sm:columns-1 md:columns-2 container">
          {userpic.map((item) => (
            <Card
              Image={item.Url}
              name={item.Name}
              UserURL={item.UserURL}
              UploaderID={item.UploaderID}
              Filename={item.Filename}
              _id={item._id}
              Likes={item.Likes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
