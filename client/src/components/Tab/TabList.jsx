import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { useAuth } from "../../context/AuthContext";
import ConfirmPopup from "../motion/Tabdeletepopup";
import { Toaster } from "react-hot-toast";
import {
  toasterOptions,
  showSuccess,
  showError,
} from "../../utils/toastService";
import TabListSkeleton from "./TabListSkeleton";
import TabListRefreshButton from "./TabListRefreshButton";
import TabsSectionLabel from "./TabsSectionLabel";
import { useNavigate } from "react-router-dom"; 

const TabList = ({ reloadTrigger }) => {
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAdmin, authChecked } = useAuth();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigate(); 

  const fetchTabs = async () => {
    try {
      setIsRefreshing(true);
      const res = await axios.get("/tabs");
      setTabs(res.data);
      setError("");
    } catch {
      setError("Failed to load tabs");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (authChecked) {
      fetchTabs();
    }
  }, [reloadTrigger, authChecked]);

  const confirmDelete = async () => {
    if (!selectedTabId) return;

    try {
      await axios.delete(`/tabs/${selectedTabId}`);
      setTabs((prev) => prev.filter((tab) => tab._id !== selectedTabId));
      showSuccess("Tab deleted successfully");
    } catch {
      showError("Failed to delete tab.");
    } finally {
      setShowConfirm(false);
      setSelectedTabId(null);
    }
  };

  const getStatus = (tab) => {
    const createdDate = new Date(tab.createdAt);
    const nextMonthSameDate = new Date(createdDate);
    nextMonthSameDate.setMonth(createdDate.getMonth() + 1);
    return new Date() >= nextMonthSameDate ? "Completed" : "Processing";
  };

  const statusStyles = {
    Processing: "bg-yellow-200 text-yellow-800",
    Completed: "bg-green-200 text-green-800",
  };

  if (loading) return <TabListSkeleton />;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <>
   
      <div>
        <TabListRefreshButton onClick={fetchTabs} isRefreshing={isRefreshing} />
      </div>
      <TabsSectionLabel />
      <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tabs.map((tab) => {
          const status = getStatus(tab);
          return (
            <div
              key={tab._id}
              onClick={(e) => {
                if (e.target.tagName.toLowerCase() === "button") return;
                navigate(`/tab/${tab._id}`); 
              }}
              className="cursor-pointer relative rounded-2xl shadow-lg p-5 flex justify-between items-center transition hover:shadow-xl hover:-translate-y-1 duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-slate-100/50 rounded-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-lg font-medium text-gray-800">
                  {tab.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(tab.createdAt).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setSelectedTabId(tab._id);
                      setShowConfirm(true);
                    }}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>

              <div
                className={`relative z-10 text-sm font-semibold px-3 py-1 rounded-full select-none shadow-sm ${statusStyles[status]}`}
              >
                {status}
              </div>
            </div>
          );
        })}
      </div>

      {showConfirm && (
        <ConfirmPopup
          message="Are you sure you want to delete this tab?"
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirm(false);
            setSelectedTabId(null);
          }}
        />
      )}
    </>
  );
};

export default TabList;
