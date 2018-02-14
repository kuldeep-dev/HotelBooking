var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
	service: { type: String, required: '{PATH} is required!'},
        price:{ type: String},
        description : { type: String },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

serviceSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Service', serviceSchema);