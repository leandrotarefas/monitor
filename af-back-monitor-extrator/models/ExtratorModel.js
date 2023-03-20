const mongoose = require('mongoose');

const extratorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  dataRecebimento: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Extrator', extratorSchema, 'af-back-monitor-extrator');