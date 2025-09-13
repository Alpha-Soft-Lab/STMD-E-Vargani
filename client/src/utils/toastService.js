import toast from "react-hot-toast";

const TOAST_MARGIN_TOP = 72;

export const toasterOptions = {
  position: "top-center",
  toastOptions: {
    style: {
      marginTop: `${TOAST_MARGIN_TOP}px`,
      borderRadius: "9999px",
      padding: "12px 24px",
      fontWeight: "500",
      color: "#1F2937",
      fontFamily: "'Gilroy', sans-serif",
    },
    success: {
      duration: 3000,
      style: {
        background: "#F3F5F8",
      },
    },
    
    error: {
      duration: 3000,
      style: {
        background: "#F3F5F8",
      },
    },
    promise: {
      duration: 3000,
      style: {
        background: "#F3F5F8",
      },
    },
  },
};

export const showSuccess = (msg) => toast.success(msg);
export const showError = (msg) => toast.error(msg);
export const showInfo = (msg) =>
  toast(msg, { style: { background: "#F3F5F8", color: "#1F2937" } });
