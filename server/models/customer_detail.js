var mongoose = require('mongoose');

var customer_detailSchema = new mongoose.Schema({
	name: { type: String, required: '{PATH} is required!'},
        govt_id: { type: String},
        govt_id_image: { type: String},
        email: { type: String},
        dob: { type: Date},
        phone: { type: Number},
        address: { type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

customer_detailSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Customer_detail', customer_detailSchema);