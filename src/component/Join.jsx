import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import "./App.css";

const Login = () => {
  const [process, setprocess] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [response, setresponse] = useState("");
  const navigate = useNavigate();
  const googleLogin = () => {
    window.open("https://api-wallpaper-io.onrender.com/google", "_self", {
      headers: { "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689" },
    });
  };
  const loginHandle = (e) => {
    e.preventDefault();
    setprocess(true);
    axios
      .post(
        "https://api-wallpaper-io.onrender.com/user/login",
        { email: Email, password: Password },
        {
          headers: {
            "Access-Control-Allow-Origin": true,
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setprocess(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      <div className="mt-40 flex">
        <div className="grid lg:grid-cols-2 w-full">
          <div className="flex justify-center mt-[10vh]">
            <div className="rounded-xl shadow-lg border-2 bg-white w-96 h-[40vh] p-11 mb-7">
              <div>
                <form>
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                      placeholder=" "
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Email
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                      placeholder=" "
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Password
                    </label>
                  </div>
                </form>
                <div className="flex justify-center">
                  {!process ? (
                    <button
                      className=" w-16 p-1 bg-purple-500 rounded-xl text-fuchsia-50 ease-in duration-200 hover:scale-125"
                      onClick={loginHandle}
                    >
                      Login
                    </button>
                  ) : (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p
                  className={` text-red-600 text-sm mt-2 flex justify-center ${
                    response ? "shake" : "hidden"
                  }`}
                >
                  {response + " !"}
                </p>
                <div className="flex justify-center">
                  <h2 className="text-sm mt-3">OR</h2>
                </div>
                <div
                  className="w-full p-1 pb-2 flex justify-center shadow-md rounded-lg mt-6 "
                  onClick={googleLogin}
                >
                  <FcGoogle className="w-11 h-11 duration-300 hover:animate-bounce" />
                  <label className="pt-2 font-bold">Sign in with Google</label>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:fixed lg:top-11 lg:right-56 sm:block hidden">
            <div className="flex justify-center overflow-hidden">
              <div className="grid grid-cols-3 gap-2 lg:w-[34vw] lg:h-[75vh] md:w-[50vw] shadow-xl rounded-lg overflow-hidden bg-white">
                <div className="lg:w-[22vw]  md:w-[32vw] object-contain relative bottom-6 banner1">
                  <img
                    className="rounded-lg"
                    src="https://images.pexels.com/photos/14668285/pexels-photo-14668285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />

                  <img
                    className="rounded-lg mt-2"
                    src=" https://images.pexels.com/photos/15513809/pexels-photo-15513809.jpeg"
                    alt=""
                  />
                  <img
                    className="rounded-lg mt-2"
                    src="https://images.pexels.com/photos/15433700/pexels-photo-15433700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </div>
                <div className="lg:w-[22vw]  md:w-[32vw] object-contain relative bottom-20 banner2">
                  <img
                    className="rounded-lg mr-1"
                    src="https://images.pexels.com/photos/4171211/pexels-photo-4171211.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=484&w=398"
                    alt=""
                  />
                  <img
                    className="rounded-lg mt-2"
                    src="https://images.pexels.com/photos/15326426/pexels-photo-15326426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <img
                    className="rounded-lg mt-2"
                    src="https://images.pexels.com/photos/14454924/pexels-photo-14454924.jpeg"
                    alt=""
                  />
                </div>
                <div className="lg:w-[22vw]  md:w-[32vw] object-contain relative bottom-20 banner3">
                  <img
                    className="rounded-lg mt-2"
                    src="https://images.pexels.com/photos/6523715/pexels-photo-6523715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <img
                    className="rounded-lg mt-2"
                    src="https://images.pexels.com/photos/6463665/pexels-photo-6463665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <img
                    className="rounded-lg mt-2"
                    src="https://images.pexels.com/photos/15047428/pexels-photo-15047428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
