import React from "react";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../component/services/ContextAuth";
import "./App.css";

const login = () => {
  const googleLogin = () => {
    window.open("http://localhost:4000/google", "_self", {
      headers: { "x-api-key": "2974e621-fafb-498e-ba47-1b5b6e433689" },
    });
  };
  return (
    <div className="w-full">
      <div className="mt-40 flex">
        <div className="grid lg:grid-cols-2 w-full">
          <div className="flex justify-center mt-[10vh]">
            <div className="rounded-xl shadow-lg border-2 bg-white w-96 h-[40vh] p-11 mb-7">
              <form>
                <div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      type="email"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      type="password"
                      name="floating_password"
                      id="floating_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>
                  </div>
                  <div className="flex justify-center">
                    <button className=" w-16 p-1 bg-purple-500 rounded-xl text-fuchsia-50 ease-in duration-200 hover:scale-125">
                      Login
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <h2 className="text-sm mt-3">OR</h2>
                  </div>
                  <div
                    className="w-full p-1 pb-2 flex justify-center shadow-md rounded-lg mt-6 "
                    onClick={googleLogin}
                  >
                    <FcGoogle className="w-11 h-11 duration-300 hover:animate-bounce" />
                    <label className="pt-2 font-bold">
                      Sign in with Google
                    </label>
                  </div>
                </div>
              </form>
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
export default login;
