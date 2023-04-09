import React from "react";
import toast from "react-simple-toasts";

export type ToastLevel = "info" | "warning" | "error" | "success";

interface ToastProps {
  toastMsg: string;
  toastLevel: ToastLevel;
}

const alertClassGen = (alertClassSuffix: ToastLevel) => {
  switch (alertClassSuffix) {
    case "error":
      return "alert-error";
    case "warning":
      return "alert-warning";
    case "success":
      return "alert-success";
    case "info":
    default:
      return "alert-info";
  }
};
const alertIconGen = (alertClassSuffix: ToastLevel): JSX.Element => {
  switch (alertClassSuffix) {
    case "error":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "warning":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    case "success":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "info":
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 flex-shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      );
  }
};

const Toast: React.FC<ToastProps> = ({ toastMsg, toastLevel }) => (
  <div className={`} alert ${alertClassGen(toastLevel)} shadow-lg`}>
    <div>
      {alertIconGen(toastLevel)}
      <span>{toastMsg}</span>
    </div>
  </div>
);

export const generateToast = (
  toastStr: string,
  toastLevel: ToastLevel = "info"
): void => {
  toast(toastStr, {
    time: 2500,
    clickable: false,
    clickClosable: false,
    position: "bottom-right",
    maxVisibleToasts: 5,
    render: () => <Toast toastMsg={toastStr} toastLevel={toastLevel} />,
  });
};

export default Toast;
