import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserAuth } from "../component/services/ContextAuth";
import Card from "./Card";
import Minicard from "./Minicard";
export default function UserProfile() {
  const param = useParams();
  const [userpic, setuserpic] = useState([]);
  const [user, setUser] = useState("");

  const { follows, setfollow, follow } = UserAuth();
  useEffect(() => {
    axios
      .get(`https://api-wallpaper-io.onrender.com/user/${param.id}`, {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
        },
      })
      .then((data) => {
        setuserpic(data.data);
      });

    axios
      .get(`https://api-wallpaper-io.onrender.com/users/info/${param.id}`, {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
    if (user) {
      axios
        .get(
          `https://api-wallpaper-io.onrender.com/checkfollow/${user.id}/${user.user.id}`,
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": true,
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
            },
          }
        )
        .then((response) => {
          setfollow(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          <button
            className=" w-28 h-12 bg-violet-500 rounded-lg duration-200 hover:scale-95"
            type="button"
            onClick={() => {
              follow(user.id);
            }}
          >
            {follows ? (
              <span className=" font-bold text-md text-white">Following</span>
            ) : (
              <span className=" font-bold text-md text-white">follow</span>
            )}
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
      <Minicard
        user={user}
        total={userpic ? userpic.length : 0}
        setuserpic={setuserpic}
      />
      <div className="flex justify-center mt-4">
        <div className="lg:columns-3 sm:columns-1 md:columns-2 container">
          {userpic.map((item, index) => (
            <Card
              key={index}
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
