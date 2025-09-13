const Tab = require("../models/Tabmodel");

exports.createTab = async (req, res) => {
  try {
    const { name, date } = req.body;

    const newTab = new Tab({
      name,
      date: new Date(date), 
    });

    const savedTab = await newTab.save();
    res.status(201).json(savedTab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTabs = async (req, res) => {
  try {
    const tabs = await Tab.find().sort({ createdDate: -1 });
    res.json(tabs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTabById = async (req, res) => {
  try {
    const tab = await Tab.findById(req.params.id);
    if (!tab) return res.status(404).json({ error: "Tab not found" });
    res.json(tab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTab = async (req, res) => {
  try {
    const updatedTab = await Tab.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTab) return res.status(404).json({ error: "Tab not found" });
    res.json(updatedTab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTab = async (req, res) => {
  try {
    const deletedTab = await Tab.findByIdAndDelete(req.params.id);
    if (!deletedTab) return res.status(404).json({ msg: "Tab not found" });
    res.json({ msg: "Tab deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

