import React from "react";
const Minicard = (props) => {
  return (
    <div className="w-[40vw] h-[10vh] bg-white shadow-lg rounded-xl">
      <div className="flex p-2 justify-around font-semibold">
        <h1 className="text-black border-b-4">Likes</h1>
        <h1 className="text-black border-b-4">followers</h1>
      </div>
      <div className="flex p-2 justify-around font-semibold">
        <h1 className="text-black">{props.user.Totallikes}</h1>
        <h1 className="text-black">{props.user.followers}</h1>
      </div>
    </div>
  );
};
export default Minicard;
