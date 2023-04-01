import React from "react";
import * as ReactDOM from "react-dom";
import { createHashRouter, RouterProvider } from "react-router-dom";

import CalculationScreen from "./screens/calculation";
import MainScreen from "./screens/main";

import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <MainScreen />,
  },
  {
    path: "/newcalc",
    element: <CalculationScreen />,
  },
]);

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
    document.body
  );
}

render();
