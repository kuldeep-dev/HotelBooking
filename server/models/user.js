

var mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');
//var bcrypt = require('bcrypt-nodejs');



var User = new mongoose.Schema({
	email: {type: String,required: '{PATH} is required!'},
	name:{type:String},
        dob:{type:Date},
        phone:{type:String},
        image: { type: String},
        resetPasswordToken: { type: String},
        resetPasswordExpires: { type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
            
            
        
	
});



User.plugin(passportLocalMongoose, { usernameField: 'email' });
    User.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});
module.exports = mongoose.model('User', User);


