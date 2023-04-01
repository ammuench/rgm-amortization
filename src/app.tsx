import React from "react";

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

const App = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
