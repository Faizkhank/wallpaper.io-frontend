import { useState } from "react";
import { UserAuth } from "../services/ContextAuth";
import axios from "axios";
import img from "../images/default.png";
import Notification from "../Notification/Notification";
import "../collage.css";
const Profile = () => {
  const { user, setnotification } = UserAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [textarea, settext] = useState("");
  const [file, setfile] = useState("");
  const [changepass, setchangepass] = useState(false);
  const [preview, setpreview] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  console.log(newPassword);
  console.log(confirmNewPassword);
  const handlepasswordFormSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }
    axios
      .post(
        `https://api-wallpaper-io.onrender.com/check-password/${user.user.id}`,
        { Password: oldPassword },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Credentials": true,
            "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
          },
        }
      )
      .then((data) => {
        console.log(data);
        if (data.data.success) {
          axios
            .post(
              `https://api-wallpaper-io.onrender.com/update-password/${user.user.id}`,
              { Password: newPassword },
              {
                withCredentials: true,
                headers: {
                  "Access-Control-Allow-Origin": true,
                  "Content-Type": "multipart/form-data",
                  "Access-Control-Allow-Credentials": true,
                  "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
                },
              }
            )
            .then((data) => {
              if (data.data.success === true)
                setnotification("Password Updated");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setError("Incorrect password");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  async function Upload() {
    const form = document.querySelector("form");
    let formData = new FormData(form);

    axios
      .post(
        `https://api-wallpaper-io.onrender.com/ProfileUpdate/upload/${user.user.id}`,
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Credentials": true,
            "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
          },
        }
      )
      .then((res) => {
        setnotification(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleFormSubmit = () => {
    axios
      .put(
        `https://api-wallpaper-io.onrender.com/users/${user.user.id}/about`,
        {
          about: textarea,
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setnotification(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleFileInputChange = (e) => {
    const files = e.target.files[0];
    setfile(files);
    const blobURL = URL.createObjectURL(files);
    setpreview(blobURL);
  };
  return (
    <div className="mx-11">
      <Notification />
      {changepass ? (
        <div className="color fixed top-0 right-0 bg-black w-full h-screen flex justify-center items-center">
          <div className="bg-slate-200 slidein  w-[430px] h-auto rounded-lg relative">
            <h2 className=" font-semibold p-2 text-center">Change password</h2>
            <div className="m-2">
              <label className=" font-semibold text-slate-500">
                Old password
                <input
                  name="OldPassword"
                  type="password"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  className="bg-white mt-3 resize-none mb-2  focus:border-white focus:outline-none font-semibold rounded-lg p-1 text-black text-md w-full h-[50px] border-none"
                />
                {error ? (
                  <div
                    className="flex p-2 text-sm shake text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      class="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">alert!</span> {error}
                    </div>
                  </div>
                ) : null}
              </label>
              <label className=" font-semibold text-slate-500">
                New Password
                <input
                  name="newPassword"
                  type="Password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  className="bg-white mt-3 resize-none mb-2  focus:border-white focus:outline-none font-semibold rounded-lg p-1 text-black text-md w-full h-[50px] border-none"
                />
                {error ? (
                  <div
                    className="flex p-2 text-sm shake text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      class="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">alert!</span> {error}
                    </div>
                  </div>
                ) : null}
              </label>
              <label className=" font-semibold text-slate-500">
                Rewrite Password
                <input
                  name="rewritePassword"
                  type="password"
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                  }}
                  className="bg-white mt-3 resize-none mb-2  focus:border-white focus:outline-none font-semibold rounded-lg p-1 text-black text-md w-full h-[50px] border-none"
                />
                {error ? (
                  <div
                    className="flex p-2 text-sm shake text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      class="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">alert!</span> {error}
                    </div>
                  </div>
                ) : null}
              </label>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handlepasswordFormSubmit}
                className="button bg-red-600 hover:scale-110 duration-200 relative z-50 mb-2 rounded-xl px-4 py-2 text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
          <div className="h-[400px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={() => setchangepass(false)}
              className="w-12 h-12 text-white relative top-0 right-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      ) : null}
      <div className="flex justify-center mt-32">
        <div className="flex w-[200px] h-[300px] justify-center">
          <div className="w-full">
            <label htmlFor="dropzone-file">
              <form>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  name="Image"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    handleFileInputChange(e);
                  }}
                />

                <div>
                  <div
                    className={`w-[200px] h-[200px] rounded-full mx-auto duration-700 ${
                      isLoaded
                        ? "ring-4 rounded-full  ring-gradient from-blue-500 to-purple-500 translate-y-3 "
                        : ""
                    }`}
                  >
                    {!preview ? (
                      <img
                        src={user?.user?.photos || img}
                        alt="Profile"
                        className={`w-full h-full object-cover rounded-full duration-600 ${
                          isLoaded
                            ? "opacity-100"
                            : "opacity-0 transition-opacity"
                        }`}
                        onLoad={() => setIsLoaded(true)}
                      />
                    ) : (
                      <img
                        src={preview}
                        alt="Profile"
                        className={`w-full h-full object-cover rounded-full duration-600 ${
                          isLoaded
                            ? "opacity-100"
                            : "opacity-0 transition-opacity"
                        }`}
                        onLoad={() => setIsLoaded(true)}
                      />
                    )}

                    <div className="bg-slate-200 rounded-full px-1 py-1 shadow-xl w-8 h-8 relative m-auto bottom-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </div>
                    <h1 className="w-[200px] h-full font-bold lg:text-4xl xs:text-2xl sm:text-xl text-center my-">
                      {user?.user?.displayName}
                    </h1>
                  </div>
                </div>
              </form>
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        {file ? (
          <div>
            <button
              onClick={Upload}
              className=" bg-red-600 hover:scale-110 duration-200 relative z-50 mb-2 rounded-xl px-4 py-2 text-white font-semibold"
            >
              Save
            </button>
          </div>
        ) : null}
      </div>
      <div className="bg-slate-200 p-5 rounded-lg relative z-20">
        <div className="flex justify-between">
          <label className="font-semibold p-2 text-slate-500">About Me</label>
          {textarea ? (
            <button
              onClick={handleFormSubmit}
              className=" bg-red-600 rounded-xl px-4 py-2 text-white font-semibold"
            >
              Save
            </button>
          ) : null}
        </div>
        <textarea
          onChange={(e) => settext(e.target.value)}
          className={`bg-white mt-3 resize-none  focus:border-white focus:outline-none font-semibold rounded-lg p-4 text-black text-md w-full h-[150px] border-none`}
          defaultValue={`${user?.user?.About ? user?.user?.About : ""}`}
          placeholder="Add something about you"
        />
        <label className="font-semibold p-2 text-slate-500">User Name</label>

        <input
          defaultValue={user?.user?.displayName}
          className={`bg-white mt-3  resize-none  focus:border-white focus:outline-none font-semibold rounded-lg p-4 text-slate-600 text-md w-full h-[45px] border-none`}
        />
        <div className=" mt-10 space-x-4">
          <button
            type="button"
            onClick={() => setchangepass(true)}
            className=" bg-red-600 duration-300 text-white font-semibold hover:bg-red-400 py-2 px-2 rounded-xl"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
