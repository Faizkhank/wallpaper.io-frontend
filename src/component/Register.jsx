import axios from "axios";
import { React, useState } from "react";
import "./collage.css";

const Register = (props) => {
  const [process, setprocess] = useState(false);
  const [response, setresponse] = useState("");
  async function RegisterHandle(e) {
    e.preventDefault();
    setprocess(true);
    const form = document.querySelector("form");
    let formData = new FormData(form);
    axios
      .post("https://api-wallpaper-io.onrender.com/register", formData, {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "x-api-key": process.env.REACT_APP_API_KEY_WALLPAPER,
        },
      })
      .then((res) => {
        console.log(res.data);
        setresponse(res.data);
        setprocess(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function setclose() {
    props.state(false);
  }
  return (
    <div className="flex justify-center mt-36">
      <div className="rounded-xl shadow-lg border-2 bg-white w-[50vh] lg:h-[450px] md:h-[400px] sm:h-[60vh] p-11 mb-7">
        <button className="relative z-30" onClick={setclose}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex justify-center mb-7">
          <h2 className=" text-3xl font-bold">Wallpaper.io</h2>
        </div>
        <form>
          <div>
            <div className="flex justify-between">
              <div class="relative z-0 w-5/6 mb-6 group">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First Name
                </label>
              </div>
              <div class="relative z-0 w-5/6 mb-6 group">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  last Name
                </label>
              </div>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                placeholder=" "
                required
              />
              <label
                for="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="passwordpassword"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                placeholder=" "
                required
              />
              <label
                for="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <div className="flex justify-center">
              {!process ? (
                <button
                  className=" w-20 p-1 bg-purple-500 rounded-xl text-fuchsia-50 ease-in duration-100 hover:scale-125"
                  onClick={RegisterHandle}
                >
                  Register
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
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
