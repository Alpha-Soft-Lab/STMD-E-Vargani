import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/img/LOGO.png";
import config from "../config/appConfig.json";
import CreateEntryButton from "../components/Entries/CreateEntryButton";
import CreateEntryForm from "../components/Entries/CreateEntryForm.Jsx";
import ViewAllEntriesButton from "../components/Entries/ViewAllEntriesButton";
import axios from "../services/axios";

const TabDetailsPage = () => {
  const { tabId } = useParams();
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEntryButtonClick = () => {
    setShowEntryForm((prev) => !prev);
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [analyticsRes, entriesRes] = await Promise.all([
          axios.get(`/entries/analytics/${tabId}`),
          axios.get(`/entries/tab/${tabId}`),
        ]);
        setAnalytics(analyticsRes.data);
        setEntries(entriesRes.data.entries || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [tabId]);

  const entrySummary = {};
  entries.forEach((e) => {
    const date = e.date?.split("T")[0];
    if (date) entrySummary[date] = (entrySummary[date] || 0) + 1;
  });

  const StatCard = ({ label, value, color }) => (
    <div className="bg-gradient-to-br from-white/100 to-slate-50/50 shadow rounded-xl p-4 w-full">
      <h4 className="text-sm text-gray-500 mb-1">{label}</h4>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );

  if (loading || !analytics) {
    return <div className="p-6 text-center text-gray-600">Loading tab details...</div>;
  }

  return (
    <div className="py-6 px-4 font-gilroy space-y-6 min-h-screen bg-gradient-to-br from-white/50 to-slate-200/50">
      <div className="w-full sm:px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-white/90 to-slate-100/50 backdrop-blur-md rounded-3xl p-4 shadow-inner border border-gray-200">
          <div className="bg-white/30 rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={logo} alt={config.appName} className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 leading-tight">{config.appName}</h2>
                <p className="text-sm font-medium text-gray-600 tracking-wide">{config.subtitle}</p>
              </div>
            </div>
            <div className="text-sm sm:text-base">
              <p className="font-medium text-gray-700">
                <span className="text-gray-900 font-semibold">Tab Name:</span> {analytics.tabName}
              </p>
              <p className="font-medium text-gray-700">
                <span className="text-gray-900 font-semibold">Created At:</span>{" "}
                {new Date(analytics.createdAt).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto bg-gradient-to-br from-white/50 to-slate-50/50 p-4 rounded-2xl shadow-md">
        <StatCard label="📋 Total Entries" value={analytics.totalEntries} color="text-gray-800" />
        <StatCard label="💰 Total Amount" value={`₹ ${analytics.totalAmount}`} color="text-gray-800" />
        <StatCard label="✅ Fulfilled" value={analytics.countByStatus.fulfilled || analytics.countByStatus.completed} color="text-green-600" />
        <StatCard label="🕒 Pending" value={analytics.countByStatus.pending} color="text-yellow-600" />
      </div>

      <div className="max-w-6xl mx-auto ">
        <div className="flex justify-between gap-3 sm:static fixed bottom-4 left-4 right-4  sm:flex-row flex-row bg-gradient-to-br from-white/50 to-slate-100/50 sm:bg-none p-3 sm:p-0 rounded-full sm:rounded-none shadow sm:shadow-none">
          <ViewAllEntriesButton tabId={tabId} />
          <CreateEntryButton onClick={handleEntryButtonClick} />
        </div>

        {showEntryForm && (
          <div className="mt-6">
            <CreateEntryForm tabId={tabId} />
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-white/100 to-slate-100/50  rounded-xl p-4 mt-6 max-w-6xl mx-auto shadow-md">
        <h3 className="text-lg font-semibold mb-4">🗓️ Entries by Date</h3>
        <div className="overflow-y-auto max-h-[400px] border rounded-lg scrollbar-hide">
          <table className="w-full text-sm border-collapse min-w-[300px]">
            <thead className="bg-gray-100 sticky top-0 ">
              <tr>
                <th className="text-left p-2 border-b">Date</th>
                <th className="text-center p-2 border-b">Number of Entries</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(entrySummary).map(([dateKey, count]) => {
                const formatted = new Date(dateKey + "T00:00:00Z").toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                return (
                  <tr key={dateKey} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{formatted}</td>
                    <td className="p-2 border-b text-center">{count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TabDetailsPage;
