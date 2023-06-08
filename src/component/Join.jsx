import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../component/services/ContextAuth";
import { FcGoogle } from "react-icons/fc";
import icon from "./images/icon.png";
import "./App.css";
import Footer from "./Footer/Footer";

const Login = () => {
  const [process, setprocess] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [response, setresponse] = useState("");
  const { setUser } = UserAuth();
  const navigate = useNavigate();

  const googleLogin = () => {
    window.open("https://api-wallpaper-io.onrender.com/google", "_self", {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
  };
  const loginHandle = () => {
    setprocess(true);

    axios
      .post("https://api-wallpaper-io.onrender.com/user/login", {
        email: Email,
        password: Password,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((res) => {
        setprocess(false);
        if (res.data.success === true) {
          setUser(res.data);
          navigate("/");
        } else {
          setresponse(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-gradient-to-tr from-purple-500 via-black to-orange-400 w-full">
      <div className="w-full h-screen">
        <div className="flex">
          <div className="grid lg:grid-cols-2 w-full">
            <div className="flex justify-center mt-[24vh] ">
              <div className="rounded-xl  shadow-lg border bg-white lg:w-[460px] h-[460px] md:w-[400px] sm:w-[300px] xs:w-[350px] duration-150 hover:scale-110 p-7 mb-7">
                <div>
                  <form>
                    <div className="flex justify-center duration-150">
                      <img
                        src={icon}
                        className="w-[45px] h-[45px] rounded-xl mt-4"
                        alt="img"
                      />
                      <h2
                        className={`font-semibold text-lg mt-3  text-black tracking-wid text-center p-3 cursor-pointer `}
                      >
                        Wallpaper.io
                      </h2>
                    </div>
                    <div class="relative z-0 w-full group mt-6">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                        placeholder=" "
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Email
                      </label>
                    </div>
                    {response ? (
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
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                          <span className="font-medium">alert!</span> Wrong
                          Email
                        </div>
                      </div>
                    ) : null}
                    <div className="relative z-0 w-full mt-6 group">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                        placeholder=" "
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Password
                      </label>
                      {response ? (
                        <div
                          className="flex p-2 shake text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
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
                              fill-rule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span className="sr-only">Info</span>
                          <div>
                            <span className="font-medium">alert!</span> Wrong
                            Password
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </form>
                  <div className="flex justify-center mt-4">
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
                          className="inline w-8 h-8 text-gray-200 ml-3 animate-spin dark:text-gray-600 fill-purple-600"
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

                  <div className="flex justify-center">
                    <h2 className="text-sm mt-3 font-semibold">OR</h2>
                  </div>
                  <div
                    className="w-full p-1 pb-2 flex justify-center rounded-lg mt-2  duration-300 hover:-translate-y-2"
                    onClick={googleLogin}
                  >
                    <FcGoogle className="w-11 h-11" />
                    <label className="pt-2 font-bold">
                      Sign in with Google
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:fixed lg:top-20 lg:right-56 sm:block hidden ">
              <div className="flex justify-center overflow-hidden ">
                <div className="grid grid-cols-3 gap-2 lg:w-[34vw] lg:h-[75vh] md:w-[50vw] shadow-xl rounded-lg overflow-hidden bg-transparent">
                  <div className="lg:w-[22vw]  md:w-[32vw] object-contain relative bottom-6 banner1">
                    <img
                      className="rounded-lg hover:scale-110 duration-150"
                      src="https://images.pexels.com/photos/14668285/pexels-photo-14668285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />

                    <img
                      className="rounded-lg mt-2 hover:scale-110 duration-150"
                      src=" https://images.pexels.com/photos/15513809/pexels-photo-15513809.jpeg"
                      alt=""
                    />
                    <img
                      className="rounded-lg mt-2 hover:scale-110 duration-150"
                      src="https://images.pexels.com/photos/15433700/pexels-photo-15433700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                  </div>
                  <div className="lg:w-[22vw]  md:w-[32vw] object-contain relative bottom-20 banner2">
                    <img
                      className="rounded-lg mr-1 hover:scale-110 duration-150"
                      src="https://images.pexels.com/photos/4171211/pexels-photo-4171211.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=484&w=398"
                      alt=""
                    />
                    <img
                      className="rounded-lg mt-2 hover:scale-110 duration-150"
                      src="https://images.pexels.com/photos/15326426/pexels-photo-15326426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                    <img
                      className="rounded-lg mt-2 hover:scale-110 duration-150"
                      src="https://images.pexels.com/photos/14454924/pexels-photo-14454924.jpeg"
                      alt=""
                    />
                  </div>
                  <div className="lg:w-[22vw]  md:w-[32vw] object-contain relative bottom-20 banner3">
                    <img
                      className="rounded-lg mt-2 hover:scale-110 duration-150"
                      src="https://images.pexels.com/photos/6523715/pexels-photo-6523715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                    <img
                      className="rounded-lg mt-2 hover:scale-110 duration-150"
                      src="https://images.pexels.com/photos/6463665/pexels-photo-6463665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                    <img
                      className="rounded-lg mt-2 hover:scale-110 duration-150"
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
      <Footer />
    </div>
  );
};
export default Login;
