var mongoose = require('mongoose');


var hotel_staffSchema = new mongoose.Schema({
	name: { type: String, required: '{PATH} is required!'},
        id_card: { type: String},
        staff_image: { type: String},
        email: { type: String},
        gender: { type: String},
        dob: { type: Date},
        position : {type: String},
        joining_date : { type: Date},
        leaving_date : { type: Date},
        salary : { type: String},
        phone: { type: String},
        address: { type: String},
        description : { type: String },
        status: { type: String },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

hotel_staffSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Hotel_staff', hotel_staffSchema);