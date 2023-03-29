import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0"
            y="0"
            viewBox="5.0095295906066895 4.949999809265137 89.98094177246094 90.05000305175781"
            enableBackground="new 0 0 100 100"
            height="89.41690313182811"
            width="89.34832739044252"
            data-fill-palette-color="accent"
            id="icon-0"
            className="mr-2 h-6 w-6"
          >
            <path
              d="M7.5 52.5H15v40c0 1.4 1.1 2.5 2.5 2.5h65c1.4 0 2.5-1.1 2.5-2.5v-40h7.5c2.2 0 3.3-2.7 1.8-4.3L51.8 5.7c-1-1-2.6-1-3.5 0L5.7 48.2C4.2 49.8 5.3 52.5 7.5 52.5zM50 11l36.5 36.5h-4c-1.4 0-2.5 1.1-2.5 2.5v40H20V50c0-1.4-1.1-2.5-2.5-2.5h-4L50 11z"
              fill="#ffffff"
              data-fill-palette-color="accent"
            ></path>
            <path
              d="M35.7 74.3c0.5 0.5 1.1 0.7 1.8 0.7s1.3-0.2 1.8-0.7l25-25c1-1 1-2.6 0-3.5-1-1-2.6-1-3.5 0l-25 25C34.8 71.7 34.8 73.3 35.7 74.3z"
              fill="#ffffff"
              data-fill-palette-color="accent"
            ></path>
            <path
              d="M52.5 70c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5S52.5 65.9 52.5 70zM62.5 70c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5S62.5 68.6 62.5 70z"
              fill="#ffffff"
              data-fill-palette-color="accent"
            ></path>
            <path
              d="M40 57.5c4.1 0 7.5-3.4 7.5-7.5s-3.4-7.5-7.5-7.5-7.5 3.4-7.5 7.5S35.9 57.5 40 57.5zM40 47.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5S38.6 47.5 40 47.5z"
              fill="#ffffff"
              data-fill-palette-color="accent"
            ></path>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-4 top-12 z-10">
            <ul className="menu rounded-box w-60 bg-secondary p-2 text-secondary-content">
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                    />
                  </svg>
                  Save
                </a>
              </li>
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                    />
                  </svg>
                  Export
                </a>
              </li>
              <hr></hr>
              <li>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
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
