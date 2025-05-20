const mongoose = require('mongoose');

const MapaSchema = new mongoose.Schema({
  titulo: String,
  estrutura: Object, // aqui você armazena os dados do React Flow (nodes, edges)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("MapaMental", MapaSchema);
