import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-simple-toasts";

import Toast, { ToastLevel } from "./Toast";

import { useCurrentTableStore } from "../store/currentTableStore";

import BrandMarkLogo from "../svgIcons/BrandMarkLogo";
import CodeIcon from "../svgIcons/CodeIcon";
import ExportLogo from "../svgIcons/ExportIcon";
import LogoutIcon from "../svgIcons/LogoutIcon";
import ThreeDotIcon from "../svgIcons/ThreeDotIcon";
import SaveIcon from "../svgIcons/SaveIcon";

import * as pjson from "../../package.json";

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);

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
        <a
          onClick={() => {
            setAboutOpen(true);
          }}
          className="btn-ghost btn text-xl normal-case"
        >
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
        <div
          className={`modal ${
            aboutOpen ? "pointer-events-auto visible opacity-100" : ""
          }`}
          id="my-modal-2"
        >
          <div className="modal-box text-base-content">
            <div className="grid h-full w-full grid-cols-[auto_1fr] gap-4">
              <div>
                <BrandMarkLogo className="fill-primary stroke-primary [&>*]:fill-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Amortization Calculator v{pjson.version}
                </h3>
                <p className="py-4 text-lg">
                  <span>
                    &copy;{" "}
                    <a
                      className="link-primary cursor-pointer"
                      onClick={() => {
                        (window as any).channels.openExternalBrowser(
                          "https://alexmuen.ch"
                        );
                      }}
                    >
                      Alex Muench
                    </a>{" "}
                    2023
                  </span>
                  <br />
                  <span className="flex items-center gap-1">
                    <CodeIcon />
                    <a
                      className="link-primary cursor-pointer"
                      onClick={() => {
                        (window as any).channels.openExternalBrowser(
                          "https://github.com/ammuench/rgm-amortization"
                        );
                      }}
                    >
                      Source Code on Github
                    </a>
                  </span>
                </p>
              </div>
            </div>
            <div className="modal-action">
              <button onClick={() => setAboutOpen(false)} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
