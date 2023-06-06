import { useState } from "react";
import { UserAuth } from "../services/ContextAuth";
import axios from "axios";
import img from "../images/default.png";
const Profile = () => {
  const { user } = UserAuth();
  console.log(user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [textarea, settext] = useState("");
  const [file, setfile] = useState("");
  const [preview, setpreview] = useState("");
  const handleFormSubmit = () => {
    console.log("called");
    axios
      .put(`http://localhost:4000/users/${user.user.id}/about`, {
        about: textarea,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((res) => {
        console.log(res);
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
      <div className="flex justify-center mt-32">
        <div className="flex w-[200px] h-[300px] justify-center">
          <div className="w-full">
            <label for="dropzone-file">
              <form>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  name="Image"
                  accept=".png, .jpg, .jpeg, .mp4,.webp"
                  onChange={(e) => {
                    handleFileInputChange(e);
                  }}
                />
              </form>
              <div className="relative">
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
            </label>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 p-5 rounded-lg">
        <div className="flex justify-between">
          <label className="font-semibold p-2 text-slate-500">About Me</label>
          {textarea ? (
            <button
              onClick={handleFormSubmit}
              type="button"
              className=" bg-red-600 rounded-xl px-4 py-2 text-white font-semibold"
            >
              Save
            </button>
          ) : null}
        </div>
        <textarea
          onChange={(e) => settext(e.target.value)}
          className={`bg-white mt-3 resize-none  focus:border-white focus:outline-none font-semibold rounded-lg p-4 text-black text-md w-full h-[150px] border-none`}
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
            className=" bg-red-600 duration-300 text-white font-semibold hover:bg-red-400 py-2 px-2 rounded-xl"
          >
            Delete Account
          </button>
          <button
            type="button"
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
