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
      .get("/user/" + param.id, {
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
      <div className="flex justify-center mt-36">
        <div className="flex">
          <div>
            {param ? (
              <img
                src={user.photos}
                className="lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] sm:w-[100px] rounded-full xs:w-[100px] xs:h-[100px]"
              />
            ) : null}
            <div className="flex justify-center">
              <h1 className="lg:text-5xl sm:text-2xl sm:mt-3 lg:mt-11 font-bold mb-2">
                {user.displayName}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Minicard user={user} />
      </div>
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
