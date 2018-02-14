var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
	room_type: { type: String, required: '{PATH} is required!'},
        room_number: { type: String},
        price:{ type: String},
        description : { type: String },
        quantity: { type: String },
        status:{ type: String },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

roomSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Room', roomSchema);