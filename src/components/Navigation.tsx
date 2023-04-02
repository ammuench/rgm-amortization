import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-simple-toasts";
import Toast, { ToastLevel } from "./Toast";

import BrandMarkLogo from "../svgIcons/BrandMarkLogo";
import ExportLogo from "../svgIcons/ExportIcon";
import LogoutIcon from "../svgIcons/LogoutIcon";
import ThreeDotIcon from "../svgIcons/ThreeDotIcon";
import SaveIcon from "../svgIcons/SaveIcon";
import { useCurrentTableStore } from "../store/currentTableStore";

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { tableData } = useCurrentTableStore();

  const generateToast = (
    toastStr: string,
    toastLevel: ToastLevel = "info"
  ): void => {
    toast(toastStr, {
      time: 2500,
      clickClosable: true,
      position: "bottom-right",
      maxVisibleToasts: 5,
      render: () => <Toast toastMsg={toastStr} toastLevel={toastLevel} />,
    });
  };

  const exportTableToCSV = async () => {
    if (tableData.length === 0) {
      generateToast("No Table to Export", "warning");
    } else {
      try {
        await (window as any).channels.saveFile(tableData);
        generateToast("Table Successfully Exported", "success");
      } catch (e) {
        generateToast("Error Exporting Table!", "error");
      }
    }
    toggleMenu();
  };

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">
          <BrandMarkLogo />
          Amortization Calculator
        </a>
      </div>
      <div className="flex-none">
        <button
          onClick={toggleMenu}
          className={`btn-ghost btn-square btn ${
            menuOpen ? "bg-neutral-900 bg-opacity-20" : ""
          }`}
        >
          <ThreeDotIcon />
        </button>
        {menuOpen && (
          <div className="absolute right-4 top-12 z-10">
            <ul className="menu rounded-box w-60 bg-secondary p-2 text-secondary-content">
              <li>
                <a>
                  <SaveIcon />
                  Save
                </a>
              </li>
              <li>
                <a onClick={exportTableToCSV}>
                  <ExportLogo />
                  Export
                </a>
              </li>
              <hr></hr>
              <li>
                <Link to="/">
                  <LogoutIcon />
                  Return to Main Menu
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
