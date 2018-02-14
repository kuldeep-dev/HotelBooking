var mongoose = require('mongoose');


var order_detail = new mongoose.Schema({
	order:{type:String},
        price:{type:String},
        quantity : {type:String},
        description:{type:String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});


var resturantSchema = new mongoose.Schema({
	name: { type: String, required: '{PATH} is required!'},
        order_no: { type: String},
        table_no: { type: String},
        order_detail:[order_detail],
        tax : { type: String},
        discount : { type: String},        
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

resturantSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Resturant', resturantSchema);