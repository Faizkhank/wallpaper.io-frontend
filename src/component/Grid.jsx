import React, { useEffect, useState } from "react";
import axios from "axios";
import "./collage.css";
import Card from "./Card";

export default function Collage() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/home", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
        },
      })
      .then((data) => {
        setData(data.data);
      });
  }, []);
  return (
    <div>
      <div className="flex justify-center">
        <div className="lg:columns-3 sm:columns-1 md:columns-2 container">
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
