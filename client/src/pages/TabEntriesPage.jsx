import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExportToExcelButton from "../components/others/ExportToExcelButton";
import EntryFilter from "../components/Entries/EntryFilter";
import DeleteConfirmPopup from "../components/Entries/DeleteConfirmPopup";
import { showSuccess, showError } from "../utils/toastService";
import axios from "../services/axios";
import { useAuth } from "../context/AuthContext";
import EditEntryPopup from "../components/Entries/EditEntryPopup";
import ReceiptPopup from "../components/others/ReceiptPopup";

const EntryCard = ({ entry, isAdmin, onDelete, onEdit, onViewPavti }) => {
  return (
    <div className="bg-gradient-to-br from-white/80 to-slate-50/50 rounded-2xl shadow-md p-4 border border-gray-200 transition hover:shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-600">{entry.name}</h2>
          <p className="text-xs text-gray-500">Entry No: {entry.Entryno}</p>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(entry.date).toLocaleDateString("en-IN")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div>
          <span className="font-medium">Amount :</span> ₹{entry.amount}
        </div>
        <div>
          <span className="font-medium">Payment :</span>{" "}
          <span className="uppercase">{entry.paymentMethod}</span>
        </div>
        <div>
          <span className="font-medium">Status :</span>{" "}
          <span
            className={`inline-block px-3 py-1 rounded-full uppercase text-white text-xs font-medium ${entry.status === "fulfilled" ? "bg-green-500" : "bg-yellow-500"
              }`}
          >
            {entry.status}
          </span>
        </div>
        <div>
          <span className="font-medium">Created by :</span>{" "}
          <span className="capitalize">{entry.creatorName}</span>
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(entry)}
              className="text-blue-600 text-sm hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(entry._id)}
              className="text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </>
        )}

        <button
          onClick={() => onViewPavti(entry)}
          className="text-green-600 text-sm hover:underline"
        >
          View Receipt
        </button>
      </div>
    </div>
  );
};


const TabAllEntriesPage = () => {
  const { tabId } = useParams();
  const { isAdmin } = useAuth();
  const [tab, setTab] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    paymentMethod: "",
    status: "",
  });

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);


  const [pavtiOpen, setPavtiOpen] = useState(false);
  const [pavtiEntry, setPavtiEntry] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get(`/entries/tab/${tabId}`);
        setEntries(res.data.entries || []);
      } catch {
        setError("Failed to load entries");
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [tabId]);

  useEffect(() => {
    const fetchTab = async () => {
      try {
        const res = await axios.get(`/tabs/${tabId}`);
        setTab(res.data);
      } catch { }
    };
    fetchTab();
  }, [tabId]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const openDeletePopup = (entryId) => {
    setEntryToDelete(entryId);
    setDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    if (!entryToDelete) return;
    try {
      await axios.delete(`/entries/${entryToDelete}`);
      setEntries((prev) => prev.filter((e) => e._id !== entryToDelete));
      showSuccess("Entry deleted successfully");
    } catch {
      showError("Failed to delete entry");
    } finally {
      setDeletePopupOpen(false);
      setEntryToDelete(null);
    }
  };

  const openEditPopup = (entry) => {
    setEntryToEdit(entry);
    setEditPopupOpen(true);
  };

  const confirmEdit = async (updatedData) => {
    try {
      const res = await axios.put(`/entries/${entryToEdit._id}`, updatedData);
      setEntries((prev) =>
        prev.map((e) =>
          e._id === entryToEdit._id ? { ...e, ...res.data } : e
        )
      );
      showSuccess("Entry updated successfully");
    } catch {
      showError("Failed to update entry");
    } finally {
      setEditPopupOpen(false);
      setEntryToEdit(null);
    }
  };

  const openPavtiPopup = (entry) => {
    setPavtiEntry(entry);
    setPavtiOpen(true);
  };

  const closePavtiPopup = () => {
    setPavtiOpen(false);
    setPavtiEntry(null);
  };

  const filteredEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date).toISOString().split("T")[0];
    const fromDate = filters.fromDate || null;
    const toDate = filters.toDate || null;
    const specificDate = filters.specificDate || null;

    const matchDate =
      specificDate
        ? entryDate === specificDate
        : (!fromDate || entryDate >= fromDate) && (!toDate || entryDate <= toDate);

    const matchPayment =
      !filters.paymentMethod || entry.paymentMethod === filters.paymentMethod;

    const matchStatus = !filters.status || entry.status === filters.status;

    const matchMinAmount =
      !filters.minAmount || entry.amount >= Number(filters.minAmount);

    const matchMaxAmount =
      !filters.maxAmount || entry.amount <= Number(filters.maxAmount);

    return matchDate && matchPayment && matchStatus && matchMinAmount && matchMaxAmount;
  });


  const totalCollected = filteredEntries.reduce(
    (sum, entry) => sum + Number(entry.amount),
    0
  );


  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading entries...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 max-w-10xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-2 gap-2 sm:gap-4">
          <EntryFilter filters={filters} onFilterChange={handleFilterChange} />

          <div className="bg-slate-50/80 backdrop-blur-md shadow-md rounded-xl px-3 sm:px-4 py-2 flex-shrink-0">
            <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Total Collected: <span className="text-green-600">₹{totalCollected}</span>
            </p>
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <p className="text-center text-gray-500">No entries found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEntries.map((entry) => (
              <EntryCard
                key={entry._id}
                entry={entry}
                isAdmin={isAdmin}
                onDelete={openDeletePopup}
                onEdit={openEditPopup}
                onViewPavti={openPavtiPopup}
              />
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-6 right-5">
        <ExportToExcelButton
          data={filteredEntries}
          fileName={`Collection-of-${tab?.name || "Tab"}`}
        />
      </div>

      <DeleteConfirmPopup
        isOpen={deletePopupOpen}
        onConfirm={confirmDelete}
        onCancel={() => setDeletePopupOpen(false)}
      />

      <EditEntryPopup
        isOpen={editPopupOpen}
        entry={entryToEdit}
        onConfirm={confirmEdit}
        onCancel={() => setEditPopupOpen(false)}
      />

      <ReceiptPopup isOpen={pavtiOpen} entry={pavtiEntry} onClose={closePavtiPopup} />
    </>
  );
};

export default TabAllEntriesPage;
