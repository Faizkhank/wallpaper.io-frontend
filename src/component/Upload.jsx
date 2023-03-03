import { React, useState } from "react";
import axios from "axios";
import { UserAuth } from "../component/services/ContextAuth";
import { Transition } from "@headlessui/react";
import uploadimg from "./images/image-.gif";
export default function Upload() {
  const { user } = UserAuth() || {};
  const [file, setfile] = useState("");
  const [Bar, setbar] = useState(0);
  const [res, setres] = useState("");

  const config = {
    onUploadProgress: (progressEvent) =>
      setbar((progressEvent.loaded / file[0].size) * 100),
  };
  function Upload() {
    setbar(!Bar);
    const form = document.querySelector("form");
    let formData = new FormData(form);
    formData.append("Image", file);
    formData.append("Name", user.user.displayName);
    formData.append("UserIMG", user.user.photos);
    formData.append("UploaderID", user.user.id);
    console.log(formData);
    axios
      .post("/file/upload", formData, config, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
        },
      })
      .then((res) => {
        console.log(res);
        setbar(0);
        setres(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="w-full">
      <div className="w-full bg-white flex justify-center lg:mt-40 mt-20">
        <div className="flex items-center justify-center w-4/6 lg:mt-11 md:mt-20 sm:mt-60 ">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-80 border-4 border-purple-700 border-dashed border-6 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-">
              <img src={uploadimg} className=" w-36" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPG or MP4
              </p>
            </div>
            <form>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                name="Image"
                accept=".png, .jpg, .jpeg, .mp4,.webp"
                onChange={(e) => {
                  setfile(e.target.files);
                  setres("");
                }}
              />
            </form>
          </label>
        </div>
      </div>
      <div className="flex justify-center mt-7">
        {file ? (
          <button
            className="bg-purple-700 text-white h-7 w-20 rounded-2xl"
            onClick={Upload}
          >
            Upload
          </button>
        ) : null}
      </div>
      <div className="flex justify-center mt-4">
        {Bar ? (
          <div className="w-2/6 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-purple-700 h-2.5 rounded-full"
              style={{ width: Bar + "%" }}
            ></div>
          </div>
        ) : null}
        {res ? (
          <p className="flex p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 p-1 bg-green-600 rounded-full text-white mr-3 mt-1 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="font-bold">Uploaded</span>
          </p>
        ) : null}
      </div>

      <div className="flex justify-center">
        <div className="w-4/6  mt-5 flex flex-wrap">
          <p className="flex p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 p-1 bg-purple-500 rounded-full text-white mr-3 mt-1 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="font-bold overflow-hidden">
              Upload image should pe oringinal and owned by you
            </span>
          </p>
          <p className="flex p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 p-1 bg-purple-500 rounded-full text-white mr-3 mt-1 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="font-bold">To be free to download</span>
          </p>
          <p className="flex p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 p-1 bg-purple-500 rounded-full text-white mr-3 mt-1 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="font-bold">No nudity,voilence,or hate</span>
          </p>
          <p className="flex p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 p-1 bg-purple-500 rounded-full text-white mr-3 mt-1 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="font-bold">High quality photo and Video</span>
          </p>
        </div>
      </div>
    </div>
  );
}
