import {
  BatteryCharging,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  CircleChevronLeft,
  CircleChevronRight,
  Flame,
  ToggleLeft,
  ToggleRight,
  User,
  Wifi,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import room from "/image/room.jpg";
import room1 from "/image/room1.avif";
import GetLocation from "./GetLocation";
import { Link } from "react-router-dom";

const Scrollbar = () => {
  const [location, setlocation] = useState({ latitude: "", longitude: "" });
  const getLocation = () => {
    if (navigator.geolocation) {
      // Requesting current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update state with latitude and longitude

          setlocation({ ...location, latitude: position.coords.latitude });
          setlocation({ ...location, longitude: position.coords.longitude });
        },
        (err) => {
          // Handle error
          setError("Error fetching location: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Call getLocation function when component is mounted
    getLocation();
  }, []);
  const checkboxData = [
    {
      checked: false,
      title: "Family oyos",
    },

    {
      checked: false,
      title: "For Group Travellers",
    },

    {
      checked: false,
      title: "Local IDs accepted",
    },

    {
      checked: false,
      title: "OYOs Welcomes couples",
    },

    {
      checked: false,
      title: "Internation Guests",
    },

    {
      checked: false,
      title: "Business travellers",
    },

    {
      checked: false,
      title: "OYO Recommended",
    },
  ];

  const categoriesData = [
    {
      checked: false,
      title: "OYO Rooms",
      dis: "Super affordable Stays with essential amenities",
    },
    {
      checked: false,
      title: "Premium",
      dis: "Hotels at prime location and premium amenities",
    },
    {
      checked: false,
      title: "Townhouse",
      dis: "your friendly, premium neighbourhood hotel- serviced by OYO",
    },
    {
      checked: false,
      title: "Flagship",
      dis: "Affordable hotels at prime locations- serviced by OYO",
    },
    {
      checked: false,
      title: "Home",
      dis: "Villas and apartments with extra space and privacy",
    },
    {
      checked: false,
      title: "Capital O",
      dis: "Premium hotels with spacious rooms for business travellers & families",
    },
    {
      checked: false,
      title: "Collection O",
      dis: "A space for new-age travellers & Serviced by OYO",
    },
    {
      checked: false,
      title: "Spot On",
      dis: "Budget stay wit Comfortable bed and Clean washroom",
    },
    {
      checked: false,
      title: "Townhouse Oak",
      dis: "A touch of luxury for Leisure and Business Traveller",
    },
  ];
  const [view, setview] = useState(false);

  const [collection, setcollection] = useState(5);

  const [Categouries, setcategouries] = useState(5);

  useEffect(() => {
    console.log(view);
  }, [view]);
  const [index, setIndex] = useState(0);

  const imageData = [room, room1, room, room, room];

  const [slid, setslid] = useState(0);

  return (
    <div className="w-full flex   h-screen ">
      <div className="left w-[25%] px-8 overflow-y-scroll border-r scr">
        <div className="flex justify-between items-center  pt-10">
          <div className="flex flex-col  ">
            <p className="text-3xl font-bold">Filters</p>
            <p className="text-base font-medium text-black"> Price</p>
          </div>
          <div className="text-red-600 flex  ">
            <p className="text-sm font-bold">Clear All </p>
          </div>
        </div>
        <div className="border-b py-4">
          <input className="w-56  webkit" type="range" name="" id="" />
        </div>
        <div className="flex flex-col py-6 border-b">
          <p className="text-base font-bold pb-4">Collections</p>
          <div className="cursor-pointer gap-2 flex flex-col  ">
            {checkboxData
              .filter((item, idx) => idx < collection)
              .map((item, idx) => {
                return (
                  <div className="flex items-center text-[#313131] gap-4 cursor-pointer ">
                    <input
                      className="size-4 hover:bg-lime-500 cursor-pointer"
                      type="checkbox"
                      checked={item.checked}
                    />
                    <p className="">{item.title}</p>
                  </div>
                );
              })}
            <div className="flex pt-4">
              {collection == 5 ? (
                <p
                  className="text-red-500 font-bold text-sm"
                  onClick={() => setcollection(checkboxData.length)}
                >
                  + View More
                </p>
              ) : (
                <p
                  className="text-red-500 font-bold text-sm"
                  onClick={() => setcollection(5)}
                >
                  - View Less
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 border-b gap-4 justify-center">
          <p className="text-base font-bold ">Categouries</p>
          <div className="cursor-pointer gap-4 flex flex-col  ">
            {categoriesData
              .filter((item, idx) => idx < Categouries)
              .map((item, idx) => {
                return (
                  <div className="flex  text-[#313131] gap-4 cursor-pointer ">
                    <input
                      className="size-6  hover:bg-lime-500 cursor-pointer"
                      type="checkbox"
                      checked={item.checked}
                    />
                    <p>
                      {item.title} - <span>{item.dis}</span>
                    </p>
                  </div>
                );
              })}
            <div className="flex pt-4">
              {Categouries == 5 ? (
                <p
                  className="text-red-500 font-bold text-sm"
                  onClick={() => setcategouries(categoriesData.length)}
                >
                  + View More
                </p>
              ) : (
                <p
                  className="text-red-500 font-bold text-sm"
                  onClick={() => setcategouries(5)}
                >
                  - View Less
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="right w-[75%] px-8 relative  overflow-y-scroll ">
        <div className="flex flex-col   py-4 border-b ">
          <div>
            <p className="text-xs text-blue-400">
              india bangalore Hotels koramangala Hotels
            </p>
          </div>
          <div className="flex justify-between   ">
            <div className="flex justify-center  items-center">
              <p className="text-xl font-bold">
                Hotels in Koramangala, Bangalore (124 OYOs)
              </p>
            </div>
            <div className="flex justify-between w-1/2   ">
              <div className="flex items-center  pl-20  ">
                <p>Map View</p>
                {view ? (
                  <ToggleRight
                    className="rounded-full w-[100px] text-blue-400  overflow-hidden h-[50px] b-red-600"
                    onClick={() => setview(!view)}
                  />
                ) : (
                  <ToggleLeft
                    className="rounded-full text-blue-400 w-[100px] h-[50px]"
                    onClick={() => setview(!view)}
                  />
                )}
              </div>
              <div className="items-center flex gap-3 ">
                <p>Sort By</p>
                <div className="border border-gray-400 px-2">
                  <select className="p-2" name="text" id="">
                    <option value="">Popularity</option>
                    <option value="">Guest Rating</option>
                    <option value="">price Low to High</option>
                    <option value="">Serviced</option>
                    <option value="">Serviced</option>
                    <option value="">Serviced</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[600px]">
          <div className={` ${!view ? "w-full" : "w-2/4 overflow-y-scroll"} `}>
            {[1, 2, 3, 4, 5, 6].map((item, idx) => (
              <div className="flex flex-col relative">
                <div className="flex rounded items-center text-xs px-2 py-1 gap-1  bg-white absolute top-14 left-2 z-10">
                  <User className="size-4" />
                  <div className="flex">
                    <p className="font-medium">Company-</p>
                    <p className="text-black font-bold">Serviced</p>
                  </div>
                </div>

                <div className="flex w-full gap-4 cursor-pointer select-none  py-12">
                  <div className="w-[800px] flex  ">
                    {!view ? (
                      <div className="relative text-white group ">
                        <div className="hidden group-hover:block  bg-[rgb(0,0,0,0.32)] absolute rounded-full  left-4 top-28 p-4">
                          <ChevronLeft
                            size={20}
                            onClick={() =>
                              imageData.length > index &&
                              index > 0 &&
                              setIndex(index - 1)
                            }
                          />
                        </div>

                        <img src={imageData[index]} className="duration-700 " />
                        <div className="  hidden group-hover:block bg-[rgb(0,0,0,0.32)] absolute rounded-full  right-4 top-28 p-4">
                          <ChevronRight
                            size={20}
                            className=" "
                            onClick={() =>
                              imageData.length - 1 > index &&
                              setIndex(index + 1)
                            }
                          />
                        </div>

                        {/* {imageData
                    .filter((item, idx) => idx == slid)
                    .map((item, idx) => (
                      <img className=" " src={item} alt="room" />
                    ))} */}
                      </div>
                    ) : (
                      <div className="relative text-white group w-[250px]">
                        <div className="hidden group-hover:block  bg-[rgb(0,0,0,0.32)] absolute rounded-full  left-4 top-20 p-4">
                          <ChevronLeft
                            size={20}
                            onClick={() =>
                              imageData.length > index &&
                              index > 0 &&
                              setIndex(index - 1)
                            }
                          />
                        </div>

                        <img src={imageData[index]} className="duration-700 " />
                        <div className="  hidden group-hover:block bg-[rgb(0,0,0,0.32)] absolute rounded-full  right-4 top-20 p-4">
                          <ChevronRight
                            size={20}
                            className=" "
                            onClick={() =>
                              imageData.length - 1 > index &&
                              setIndex(index + 1)
                            }
                          />
                        </div>

                        {/* {imageData
                    .filter((item, idx) => idx == slid)
                    .map((item, idx) => (
                      <img className=" " src={item} alt="room" />
                    ))} */}
                      </div>
                    )}
                    {!view ? (
                      <div className="flex flex-col w-1/5  ">
                        {imageData.map((item, idx) => (
                          <img
                            className=" h-1/4  mx-1 pb-1"
                            src={item}
                            alt="room"
                            onClick={() => setIndex(idx)}
                          />
                        ))}
                      </div>
                    ) : (
                      " "
                    )}
                  </div>
                  <div className="flex flex-col gap-12  w-full relative ">
                    <div>
                      <p className="text-xl font-bold">
                        Super Hotel O Koramangala Near Sony Signal
                      </p>
                      <p>Near Eat Street, Kormangala, Bangalore · 1.4 km</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-4 items-center">
                        <button className="bg-green-700 px-2 rounded text-white font-semibold">
                          4.1 *
                        </button>
                        <p className="text-xs ">(864 Ratings) . Very Good</p>
                      </div>
                      {!view ? (
                        <div className="flex gap-6 text-sm">
                          <div className="flex gap-1">
                            <CheckCheck className="rounded" />
                            <p>Reception</p>={" "}
                          </div>
                          <div className="flex gap-1">
                            <Wifi className=" " />
                            <p>Free Wifi</p>
                          </div>
                          <div className="flex gap-1">
                            <BatteryCharging className="" />
                            <p>Power backup</p>
                          </div>
                          <div>
                            <p>+ 13 more</p>
                          </div>
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                    <div className="flex  justify-between">
                      <div className="flex flex-col ">
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold text-black"> ₹782</p>
                          <p className="text-gray-500"> ₹3497</p>
                          <p className="text-sm text-orange-400 font-medium">
                            72% off
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            + ₹185 taxes & fees · per room per night
                          </p>
                        </div>
                      </div>
                      {!view ? (
                        <div className="flex gap-4 items-center ">
                          <Link to="/ViewDtail">
                            <p className="text-black font-bold border border-black px-5 py-2 ">
                              View Details
                            </p>
                          </Link>
                          <p className="text-white font-bold text-base px-5 bg-[#1AB64F] py-2">
                            Book Now
                          </p>
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                  {!view ? (
                    <div className="flex gap-1 w-[130px] absolute text-red-500 text-xs font-medium  right-4">
                      <Flame className="pt-0 h-4 size-10 " />
                      <p>11 people booked this hotel in last 6 hours</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>

          {view && (
            <div className="flex justify-center items-start p-4">
              {/* <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119027.77494938963!2d${location?.longitude}!3d${location?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a29216d6fed47e7%3A0x4f4f4d0a88e9ea85!2sCharoda%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1736157589283!5m2!1sen!2sin`}
                width="540"
                height="600"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border rounded shadow-lg"
              ></iframe> */}

              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d92263.37885920503!2d${location.latitude}!3d${location.longitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1736407815231!5m2!1sen!2sin`}
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scrollbar;
