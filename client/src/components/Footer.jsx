import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);
const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={logo} alt="logo" className="w-32" />
      </div>
      <div className="flex flex-1 justify-evenly list-none items-center flex-wrap sm:mt-0 mt-5 w-full">
        {["Home", "Exchanges", "Coins"].map((item, index) => (
          <Link to={`/${item.toLowerCase()}`} key={item + index}>
            <NavBarItem key={item + index} title={item} />
          </Link>
        ))}
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">@Nasar Vali</p>
      <p className="text-white text-sm text-center font-medium mt-2">
        All rights reserved
      </p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />
  </div>
);

export default Footer;
