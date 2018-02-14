var mongoose = require('mongoose');


var client_thacking = new mongoose.Schema({
	order:{type:String},
        price:{type:String},
        quantity : {type:String},
        status:{type:String},
        assigned_to:{ type: String},
        description:{type:String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

var client_service = new mongoose.Schema({
	service:{type:String},
        status:{type:String},
        price:{type:String},
        assigned_to:{ type: String},
        description:{type:String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

var room_booked = new mongoose.Schema({
	room_type: { type: String},
        room_number: { type: String},
        price:{ type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});


var customerSchema = new mongoose.Schema({
	name: { type: String, required: '{PATH} is required!'},
        govt_id: { type: String},
        govt_id_image: { type: String},
        email: { type: String},
        dob: { type: Date},
        adults: { type: String},
        children: { type: String},
        phone: { type: Number},
        address: { type: String},
        description : { type: String },
        arrival_date: { type: Date},
        departure_date: { type: Date},
        total_days: { type: String },
        status: { type: String },
        assigned_by:{ type: String},
        payment: { type: String},
        payment_method: { type: String},
        tax: { type: String},
        discount: { type: String},
        total: { type: String},
        room_booked:[room_booked],
        client_thacking:[client_thacking],
        client_service:[client_service],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

customerSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Customer', customerSchema);