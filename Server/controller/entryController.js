const Entry = require("../models/Entriesmodel");
const Tab = require("../models/Tabmodel");

const createEntry = async (req, res) => {
  try {
    const { name, amount, paymentMethod, tabId, creatorName, date, status, creatorRole } = req.body;

    const newEntry = new Entry({
      name,
      amount,
      paymentMethod,
      tabId,
      creatorName,
      creatorRole,
      status: status || "fulfilled",
      date: date || Date.now(),
    });

    await newEntry.save();

    res
      .status(201)
      .json({ message: "Entry created successfully", entry: newEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEntriesByTab = async (req, res) => {
  try {
    let { tabId } = req.params;
    tabId = tabId.trim();

    const { status, paymentMethod, date } = req.query;

    let filter = { tabId };

    if (status) filter.status = status;
    if (paymentMethod) filter.paymentMethod = paymentMethod;

    if (date) {
      const selectedDate = new Date(date);
      const nextDate = new Date(selectedDate);
      nextDate.setDate(selectedDate.getDate() + 1);
      filter.date = { $gte: selectedDate, $lt: nextDate };
    }

    const entries = await Entry.find(filter).sort({ date: -1 });
    const totalAmount = entries.reduce((sum, e) => sum + e.amount, 0);

    res.status(200).json({ entries, totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnalyticsByTab = async (req, res) => {
  try {
    const { tabId } = req.params;

    const tab = await Tab.findById(tabId);
    if (!tab) return res.status(404).json({ error: 'Tab not found' });

    const entries = await Entry.find({ tabId });

    const totalEntries = entries.length;
    const totalAmount = entries.reduce((sum, e) => sum + (e.amount || 0), 0);

    const totalPending = entries
      .filter(e => e.status === 'pending')
      .reduce((sum, e) => sum + (e.amount || 0), 0);

    const totalCompleted = entries
      .filter(e => e.status === 'fulfilled' || e.status === 'completed')
      .reduce((sum, e) => sum + (e.amount || 0), 0);

    const countByStatus = {
      pending: entries.filter(e => e.status === 'pending').length,
      fulfilled: entries.filter(e => e.status === 'fulfilled').length,
      completed: entries.filter(e => e.status === 'completed').length,
    };

    const countByPaymentMethod = {
      cash: entries.filter(e => e.paymentMethod === 'Cash').length,
      upi: entries.filter(e => e.paymentMethod === 'UPI').length
    };

    res.status(200).json({
      tabName: tab.name,
      createdAt: tab.createdAt,
      totalEntries,
      totalAmount,
      totalPending,
      totalCompleted,
      countByStatus,
      countByPaymentMethod
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    await Entry.findByIdAndDelete(entryId);
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEntry = async (req, res) => {
  try {
    let { entryId } = req.params;
    entryId = entryId.trim();

    const updateData = req.body;

    const updatedEntry = await Entry.findByIdAndUpdate(entryId, updateData, { new: true });

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEntry,
  getAllEntries,
  getEntriesByTab,
  deleteEntry,
  getAnalyticsByTab,
  updateEntry
};
