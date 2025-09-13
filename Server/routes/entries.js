const express = require('express');
const router = express.Router();
const {
  createEntry,
  getAllEntries,
  getEntriesByTab,
  deleteEntry,
  getAnalyticsByTab,
  updateEntry
} = require('../controller/entryController');
const isAdminLoggedIn = require('../middleware/isAdminLoggedIn');
const { Parser } = require('json2csv');
const Entry = require('../models/Entriesmodel');

router.post('/create', createEntry);
router.get('/', getAllEntries);
router.get('/tab/:tabId', getEntriesByTab);
router.get('/analytics/:tabId', getAnalyticsByTab);
router.delete('/:entryId', isAdminLoggedIn, deleteEntry);
router.put('/:entryId', isAdminLoggedIn, updateEntry);

router.get('/export/:tabId', async (req, res) => {
  try {
    let { tabId } = req.params;
    tabId = tabId.trim();

    const entries = await Entry.find({ tabId }).lean();

    const fields = ['name', 'amount', 'status', 'paymentMethod', 'date'];
    const parser = new Parser({ fields });
    const csv = parser.parse(entries);

    res.header('Content-Type', 'text/csv');
    res.attachment(`entries_all_tab_${tabId}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { name, tabId } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }
    const filter = {
      name: { $regex: name, $options: 'i' } 
    };
    if (tabId) {
      filter.tabId = tabId.trim();
    }
    const entries = await Entry.find(filter).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
