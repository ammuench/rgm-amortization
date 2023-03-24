import * as ReactDOM from "react-dom";

import MainScreen from "./screens/main";

import "./index.css";
import { createHashRouter, HashRouter, RouterProvider } from "react-router-dom";
import CalculationScreen from "./screens/calculation";

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
  ReactDOM.render(<RouterProvider router={router} />, document.body);
}

render();
