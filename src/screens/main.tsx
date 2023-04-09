import React from "react";
import { useNavigate } from "react-router-dom";

import {
  CalculationData,
  useCalculationStore,
} from "../store/calculationStore";

import LogoNoBG from "../../assets/logo/svg/logo-no-background.svg";

const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const menuClick = () => {
    navigate("/newcalc");
  };
  const { loadCalcData } = useCalculationStore();

  const loadFile = async () => {
    try {
      const configData: CalculationData | null | undefined = await (
        window as any
      ).channels.loadConfig();
      if (configData) {
        const parsedData = configData;
        loadCalcData(parsedData);
        menuClick();
      }
    } catch (e) {
      console.error("Unable to load file");
      console.error(e);
    }
  };

  return (
    <div className="hero min-h-screen bg-gray-300">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <img
            src={LogoNoBG}
            alt="Amortization Calculator Logo"
            className="mb-8"
          />
          <div className="grid w-full grid-cols-1 grid-rows-2 justify-center gap-8">
            <button onClick={menuClick} className="btn-primary btn">
              Create New Amortization Schedule
            </button>
            <button onClick={loadFile} className="btn-primary btn">
              Load Existing Calculation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
