const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  id: String,
  type: String,
  position: {
    x: Number,
    y: Number
  },
  data: mongoose.Schema.Types.Mixed
}, { _id: false });

const edgeSchema = new mongoose.Schema({
  id: String,
  source: String,
  target: String,
  type: String,
  label: String
}, { _id: false });

const mapaMentalSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  nodes: [nodeSchema],
  edges: [edgeSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mapa', mapaMentalSchema);
