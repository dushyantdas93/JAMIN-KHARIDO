import React from "react";

const Searchbar = () => {
  return (
    <div className="flex flex-col w-full justify-center h-[250px] bg-[#575757] ">
      <div className="flex items-center py-10  gap-6  flex-col  ">
        <p className="text-white font-bold text-3xl py-0 ">
          Over 174,000+ hotels and homes across 35+ countries
        </p>
        <div className="flex  cursor-pointer">
          <input
            className="p-4 w-[400px]  rounded-l-md border-r border-gray-500"
            placeholder="Banglore"
            type="text"
          />
          <p className="p-4 border-r font-semibold text-md  border-gray-500 bg-white pr-24 text-black">
            Thu, 26 Dec - Fri, 27 Dec
          </p>
          <p className="p-4 border-r text-lg font-semibold border-gray-500 pr-24 bg-white text-black">
            1 Room, 1 Guest
          </p>
          <p className="p-4 rounded-r-md bg-[#1AB64F] hover:bg-[#128036] text-[#FFFFFF] text-xl font-bold  px-12">
            Search
          </p>
        </div>

        <div className="flex justify-start ">
          <h1>Continue your search</h1>
          <p className="">koramangala· Guests</p>
          <p>bangalore· Guests</p>
          <p>indiranagar· Guests</p>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
