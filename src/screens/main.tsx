import React from "react";
import { useNavigate } from "react-router-dom";

import LogoNoBG from "../../assets/logo/svg/logo-no-background.svg";

const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const menuClick = () => {
    navigate("/newcalc");
  };

  return (
    <div className="grid h-screen w-screen items-center justify-items-center bg-gray-300 p-8">
      <img src={LogoNoBG} alt="RGMA Logo" />
      <div className="grid w-full grid-cols-2 justify-center gap-8">
        <button
          onClick={menuClick}
          className="h-24 rounded-lg bg-green-700 p-1 text-3xl font-bold uppercase text-white transition hover:bg-green-900 hover:duration-75 hover:ease-in-out"
        >
          Create New Calculation
        </button>
        <button className="h-24  rounded-lg bg-green-700 p-1 text-3xl font-bold uppercase text-white transition hover:bg-green-900 hover:duration-75 hover:ease-in-out">
          Load Existing Calculation
        </button>
      </div>
    </div>
  );
};

export default MainScreen;
