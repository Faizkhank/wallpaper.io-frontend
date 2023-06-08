import { useEffect, useState } from "react";
import { UserAuth } from "../services/ContextAuth";
const Notification = () => {
  const { setnotification, notification } = UserAuth();
  useEffect(() => {
    setTimeout(() => {
      setnotification("");
    }, 1500);
  }, [notification]);
  return (
    <div>
      <div
        className={`w-[200px] h-[80px] rounded-xl bg-black absolute right-3 px-4 py-2
                duration-300 ${
                  !notification
                    ? "translate-x-0 opacity-0"
                    : "-translate-x-10 opacity-100"
                }`}
      >
        <p className="text-white font-semibold text-md text-center items-center mt-2">
          {notification}
        </p>
      </div>
    </div>
  );
};
export default Notification;
