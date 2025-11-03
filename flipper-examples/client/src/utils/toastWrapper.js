import { toast } from "react-hot-toast";

export const toastError = (message) => {
  return toast.error(message, {
    position: "top-left",
  });
};

export const toastSuccess = (message) => {
  return toast.success(message, {
    position: "top-left",
    duration: "200",
  });
};

export const toastInfo = (message) => {
  toast(message, {
    position: "top-left",
  });
};
