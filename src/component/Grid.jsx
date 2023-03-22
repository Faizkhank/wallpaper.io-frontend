import React, { useEffect, useState } from "react";
import { UserAuth } from "../component/services/ContextAuth";
import "./collage.css";
import Card from "./Card";

export default function Collage() {
  const { Data } = UserAuth();
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
