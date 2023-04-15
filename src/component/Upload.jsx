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
  const handleFileInputChange = (e) => {
    const files = e.target.files[0];
    const blobURL = URL.createObjectURL(files);
    setfile(files);
    setpreview(blobURL);
  };
  async function Upload() {
    setbar(!Bar);
    const form = document.querySelector("form");
    let formData = new FormData(form);
    formData.append("Image", file);
    formData.append("UserName", user.user.displayName);
    formData.append("UserIMG", user.user.photos);
    formData.append("ImageName", Name);
    formData.append("Location", Location);
    formData.append("tags", tags);
    formData.append("UploaderID", user.user.id);

    axios
      .post("https://api-wallpaper-io.onrender.com/file/upload", {
        formData,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
        },
        onUploadProgress: (progressEvent) =>
          setbar((progressEvent.loaded / file.size) * 100),
      })
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
      <div className="w-full bg-white flex justify-center lg:mt-16 mt-20">
        <div className="flex flex-wrap items-center justify-center w-full lg:mt-11 md:mt-20 sm:mt-60 ">
          <div className="flex items-center justify-center pt-5 w-full">
            {preview ? (
              <div className="flex w-full justify-center">
                <div className="flex flex-wrap bg-gray-100 rounded-2xl p-4 lg:w-8/12 xs:w-11/12 min-h-fit justify-between  px-7">
                  <div className=" lg:w-[490px] xs:w-full md:m-auto h-auto relative">
                    <div
                      className=" rounded-lg bg-black h-full animate-pulse duration-150 pointer-events-none absolute top-0 left-0 z-50 opacity-30"
                      style={{ width: Bar + "%" }}
                    ></div>
                    <img
                      src={preview}
                      className="ease-in w-full duration-200 rounded-lg scale-100 "
                      alt="image"
                    />
                  </div>
                  <div className="flex xs:w-full lg:w-2/5 justify-center">
                    <div className="xs:w-4/5 lg:w-4/5 sm:w-3/5">
                      <div class="relative z-0 w-full mb-6 group right-0">
                        <label className=" text-gray-400 font-extrabold text-lg">
                          Name
                        </label>
                        <input
                          type="Name"
                          name="Name"
                          id="Name"
                          className="block font-bold rounded-xl py-3.5 px-3 w-full text-sm text-gray-900 border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                          placeholder=" "
                          required
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div class="relative z-0 w-full mb-6 group right-0">
                        <label className=" text-gray-400 font-extrabold text-lg">
                          Tag (optional)
                        </label>
                        <input
                          type="tag"
                          name="tag"
                          id="tag"
                          className="block font-bold rounded-xl py-3.5 px-3 w-full text-sm text-gray-900 border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                          placeholder=" "
                          onChange={(e) => {
                            settags(e.target.value);
                          }}
                        />
                      </div>
                      <div class="relative z-0 w-full mb-6 group right-0">
                        <label className=" text-gray-400 font-extrabold text-lg">
                          location (optional)
                        </label>
                        <input
                          type="location"
                          name="location"
                          id="location"
                          className="block font-bold rounded-xl py-3.5 px-3 w-full text-sm text-gray-900 border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                          placeholder=" "
                          onChange={(e) => {
                            setLocation(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-auto mx-2 xs:hidden lg:block  md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    onClick={(e) => {
                      setpreview("");
                    }}
                    className=" w-20 h-20 stroke-slate-300 bg-slate-100  rounded-full p-3 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <label
                for="dropzone-file"
                className={`flex flex-col items-center justify-center w-8/12 h-[420px] border-4 ${
                  file ? "border-white" : "border-purple-400"
                } border-dashed border-8 rounded-2xl cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
              >
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
                  </p>{" "}
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
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-7">
        {file ? (
          <div>
            <div className="flex justify-center mt-4">
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
