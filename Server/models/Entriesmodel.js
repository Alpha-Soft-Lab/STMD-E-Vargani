const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const entrySchema = new mongoose.Schema({
  Entryno: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'upi'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'fulfilled'],
    default: 'fulfilled',
  },
  tabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tab',
    required: true,
  },
  creatorName: {
    type: String,
    required: true,
  },
  creatorRole: {
    type: String,
    required: true,
  }
});

entrySchema.plugin(AutoIncrement, { 
  inc_field: 'Entryno', 
  id: 'entry_counter', 
  start_seq: 1,
  reference_fields: ['tabId']  
});

entrySchema.index({ tabId: 1, Entryno: 1 }, { unique: true });

module.exports = mongoose.model('Entry', entrySchema);
