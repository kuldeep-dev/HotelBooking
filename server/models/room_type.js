var mongoose = require('mongoose');

var roomtypeSchema = new mongoose.Schema({
	room_type: { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

roomtypeSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Roomtype', roomtypeSchema);