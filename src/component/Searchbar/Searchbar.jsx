import { React, useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { UserAuth } from "../services/ContextAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Searchbar() {
  const { HandleData, setuniquery } = UserAuth();
  const [isFocus, setIsFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchquery, setquery] = useState("");
  const [suggest, setsuggest] = useState(false);
  const suggestions = ["jack", "faiz", "tree", "food"];
  const navigate = useNavigate();
  const inputRef = useRef();
  const search = (e) => {
    navigate(`/photo/${searchquery}`);
  };
  return (
    <div>
      <div className="lg:w-[1000px] md:w-[320px] sm:w-[320px] xs:w-[240px] flex justify-center sm:mr-0 mr-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
          className="w-full"
        >
          <input
            type="text"
            onBlur={() => {
              if (!isHovered) {
                setIsFocus(false);
              }
            }}
            value={searchquery}
            onFocus={() => setIsFocus(true)}
            onChange={(e) => {
              setuniquery(e.target.value);
              setquery(e.target.value);
            }}
            className={`relative font-semibold outline-none bg-gray-300 focus:outline-none rounded-t-md focus:border-white focus:ring-0 ${
              isFocus ? "null" : "rounded-b-md"
            } border-0 w-full p-3 mt-4  text-base text-black placeholder-gray-400  focus:shadow-outline h-12 mr-2`}
            placeholder="Search for photos"
            onClick={() => {
              setsuggest(!suggest);
            }}
            ref={inputRef}
          />
        </form>
        <Link to={`/photo/${searchquery}`} className="mt-[21px]">
          <MagnifyingGlassIcon className="w-9 fill-gray-400 relative right-11" />
        </Link>
      </div>
      {isFocus && (
        <div
          className="shadow-lg relative w-full  rounded-b-md bg-white lg:w-[956px] md:w-[276px] sm:w-[278px] xs:w-[204px]"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          {suggestions.map((suggestion, index) => {
            const isMatch =
              suggestion.toLowerCase().indexOf(searchquery.toLowerCase()) > -1;
            return (
              <div key={index}>
                {isMatch && (
                  <div
                    className="p-3 pl-5 cursor-pointer font-bold text-gray-400 hover:text-black relative z-50 bg-white"
                    onClick={() => {
                      setquery(suggestion);
                      setuniquery(suggestion);

                      setIsFocus(false);

                      inputRef.current.focus();
                    }}
                  >
                    <Link
                      to={`/photo/${suggestion}`}
                      onClick={() => {
                        HandleData(searchquery);
                      }}
                    >
                      {suggestion}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
