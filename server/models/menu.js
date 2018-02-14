var mongoose = require('mongoose');



var menu_item = new mongoose.Schema({
	name:{type:String},
        price:{type:String},
        item_image :{type:String},
        description:{type:String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});



var menuSchema = new mongoose.Schema({
	menu_name: { type: String, required: '{PATH} is required!'},
        menu_item: [menu_item],
        description : { type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

menuSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Menu', menuSchema);