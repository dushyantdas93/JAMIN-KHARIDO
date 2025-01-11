import React from "react";
import Navbar from "./Navbar";
import Bottombar from "./Bottombar";
import Searchbar from "./Searchbar";
import Banner from "./Banner";
import Destination from "./Destination";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Bottombar />
      <Searchbar />
      <Banner />
      <Destination />
    </div>
  );
};

export default Home;
