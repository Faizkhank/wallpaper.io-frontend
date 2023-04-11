import { React, useState } from "react";
import axios from "axios";
import { UserAuth } from "../component/services/ContextAuth";
import uploading from "./images/image-.gif";
export default function Upload() {
  const { user } = UserAuth() || {};
  const [file, setfile] = useState("");
  const [Bar, setbar] = useState(0);
  const [res, setres] = useState("");
  const [Name, setName] = useState(0);
  const [Location, setLocation] = useState(0);
  const [tags, settags] = useState(0);
  const [preview, setpreview] = useState("");
  const config = {
    onUploadProgress: (progressEvent) =>
      setbar((progressEvent.loaded / file[0].size) * 100),
  };
  const handleFileInputChange = (e) => {
    const files = e.target.files[0];
    const blobURL = URL.createObjectURL(files);
    setfile(files);
    setpreview(blobURL);
  };
  async function Upload() {
    setbar(!Bar);
    Name;
    const form = document.querySelector("form");
    let formData = new FormData(form);
    formData.append("Image", file);
    formData.append("UserName", user.user.displayName);
    formData.append("UserIMG", user.user.photos);
    formData.append("ImageName", Name);
    formData.append("Location", Location);
    formData.append("tags", tags);
    formData.append("UploaderID", user.user.id);
    console.log(formData.get("Image"));
    axios
      .post(
        "https://api-wallpaper-io.onrender.com/file/upload",
        formData,
        config,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689",
          },
        }
      )
      .then((res) => {
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
            className={`flex flex-col items-center justify-center w-full h-auto border-4 ${
              file ? "border-white" : "border-purple-700"
            } border-dashed border-6 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-">
              {preview ? (
                <img
                  src={preview}
                  className="w-[20vw] h-[20hv] ease-in duration-200 rounded-lg mb-6 scale-100 hover:scale-125"
                  alt="image"
                />
              ) : (
                <div className=" pb-7">
                  <div className="w-full h-[200px] flex justify-center">
                    <img src={uploading} className=" w-36" alt="Preview" />
                  </div>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    JPG or MP4
                  </p>
                </div>
              )}
            </div>
            <form>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                name="Image"
                accept=".png, .jpg, .jpeg, .mp4,.webp"
                onChange={(e) => {
                  handleFileInputChange(e);
                  setres("");
                }}
              />
            </form>
          </label>
        </div>
      </div>
      <div className="flex justify-center mt-7">
        {file ? (
          <div>
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
            <div class="relative z-0 w-full mb-6 group right-0">
              <input
                type="Name"
                name="Name"
                id="Name"
                className="block py-2.5 px-0 w-[400px] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                placeholder=" "
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Name
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group right-0">
              <input
                type="tag"
                name="tag"
                id="tag"
                className="block py-2.5 px-0 w-[180px] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                placeholder=" "
                onChange={(e) => {
                  settags(e.target.value);
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Tag
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group right-0">
              <input
                type="location"
                name="location"
                id="location"
                className="block py-2.5 px-0 w-[180px] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                placeholder=" "
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                location
              </label>
            </div>
            <button
              className="bg-purple-700 align-middle text-white h-7 w-20 rounded-2xl"
              onClick={Upload}
            >
              Upload
            </button>
          </div>
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
