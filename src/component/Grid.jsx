import React, { useEffect, useState } from "react";
import axios from "axios";
import "./collage.css";
import Card from "./Card";

export default function Collage() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://api-wallpaper-io.onrender.com/home", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
        },
      })
      .then((data) => {
        if (data.data !== null) {
          setData(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mt-36 bg-white">
      <div className="flex justify-center">
        <div className="lg:columns-3 sm:columns-2 md:columns-2 xs:columns-2 container ">
          {Data.map((item) => (
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
