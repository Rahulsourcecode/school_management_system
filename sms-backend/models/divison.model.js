const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'class',
    required: true
  }
});

const Division = mongoose.model('Division', divisionSchema);

module.exports = Division;
