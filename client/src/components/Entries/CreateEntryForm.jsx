import { useState, useEffect } from "react";
import axios from "../../services/axios";
import { QRCodeCanvas } from "qrcode.react";
import defaultAvatar from "../../assets/img/Shree Ram.jpg";
import upiConfig from "../../config/upiConfig";
import { showSuccess, showError } from "../../utils/toastService";

const CreateEntryForm = ({ tabId }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [status, setStatus] = useState("fulfilled");

  const [creatorName, setCreatorName] = useState("");
  const [creatorRole, setCreatorRole] = useState("");
  const [creatorAvatar, setCreatorAvatar] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const upiName = "STMD E - Vargani";
  const [upiId, setUpiId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCreatorName(localStorage.getItem("creatorName") || "Unknown");
    setCreatorRole(localStorage.getItem("creatorRole") || "user");
    setCreatorAvatar(localStorage.getItem("creatorAvatar") || defaultAvatar);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setUpiId(upiConfig.upiId || "");
  }, []);

  const formatCustomDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("/entries/create", {
        tabId,
        name,
        amount: parseFloat(amount),
        paymentMethod,
        status,
        creatorName,
        creatorRole,
        date: new Date(),
      });

      setName("");
      setAmount("");
      setPaymentMethod("cash");
      setStatus("fulfilled");

      showSuccess("Entry Created Successfully");
    } catch {
      showError("Failed to create entry. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateUpiUrl = () => {
    if (!upiId || !amount) return "";
    const idOnly = upiId.includes("pa=")
      ? upiId.split("pa=")[1]?.split("&")[0]
      : upiId.replace("upi://pay?", "").split("&")[0];
    return `upi://pay?pa=${idOnly}&pn=${encodeURIComponent(
      upiName
    )}&am=${amount}&cu=INR`;
  };

  return (
    <div className="relative px-4 pb-4 pt-4">
      <form
        onSubmit={handleSubmit}
        id="create-entry-form"
        className="bg-gradient-to-br from-white to-slate-100 p-5 md:p-8 rounded-xl shadow-md w-full max-w-md md:max-w-3xl mx-auto space-y-4"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2">Create New Entry</h2>

        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          <div>
            <label className="block font-semibold">Name:</label>
            <input
              type="text"
              value={name}
              required
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold">Amount:</label>
            <input
              type="number"
              value={amount}
              required
              min="1"
              step="0.01"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold">Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fulfilled">Fulfilled</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {paymentMethod === "upi" && amount && upiId && (
          <div className="bg-white/50 border rounded-md p-4 mt-4 text-center">
            <p className="font-semibold mb-5">Scan to Pay (STMD)</p>
            <div className="flex justify-center">
              <QRCodeCanvas value={generateUpiUrl()} size={160} />
            </div>
            <p className="text-sm mt-5 break-all text-gray-600">{upiId}</p>
          </div>
        )}

        <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md space-y-1 mt-4">
          <p><strong>Creator:</strong> {creatorName}</p>
          <p><strong>Role:</strong> {creatorRole}</p>
          <p><strong>Date:</strong> {formatCustomDate(currentTime)}</p>

          {creatorAvatar && (
            <p className="flex items-center gap-2">
              <strong>Profile:</strong>
              <img
                src={creatorAvatar}
                alt={creatorName}
                onError={(e) => (e.target.src = defaultAvatar)}
                className="w-8 h-8 rounded-full border object-cover"
              />
            </p>
          )}
        </div>

        <div className="hidden md:block">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-600 text-white px-4 py-2 rounded-full w-full mt-5 ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Entry"}
          </button>
        </div>
      </form>

      <div className="block md:hidden fixed bottom-4 left-0 right-0 px-4">
        <button
          type="submit"
          form="create-entry-form"
          disabled={isSubmitting}
          className={`bg-blue-600 text-white px-4 py-2 rounded-full w-full max-w-md mx-auto block focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Entry"}
        </button>
      </div>
    </div>
  );
};

export default CreateEntryForm;
