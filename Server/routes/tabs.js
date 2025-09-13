const express = require('express');
const router = express.Router();
const tabController = require('../controller/tabsController');
const verifyAdmin = require("../middleware/verifyAdmin");

router.post('/', tabController.createTab);
router.get('/', tabController.getAllTabs);
router.get('/:id', tabController.getTabById);
router.put('/:id', tabController.updateTab);

router.delete("/:id", verifyAdmin, tabController.deleteTab);

module.exports = router;
