var express = require('express'),
	path = require('path'),
	User = require('./models/user'),
        Customer = require('./models/customer'),
        Customer_detail = require('./models/customer_detail'),
        Hotel_staff = require('./models/hotel_staff'),
        Room = require('./models/room'),
        Roomtype = require('./models/room_type'),
        Service = require('./models/service'),
        Resturant = require('./models/resturant'),
        Menu = require('./models/menu'),
        nodemailer = require('nodemailer'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	router = express.Router()
        aws = require('aws-sdk'),
        multer = require('multer'),
        multerS3 = require('multer-s3'),
        dateNow = Date.now(),
        sr = require('simple-random'),
        randomString = sr();
        randomString1 = sr(); 
        randomString2 = sr(); 



//var transporter = nodemailer.createTransport({
//    host: 'email-smtp.us-east-1.amazonaws.com',
//    port: 587,
//    auth: {
//        user: "",
//        pass: ""
//    }
//});


var transporter = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    host: 'localhost',
    auth: {
    user: '',
   pass: ''
    }
});


aws.config.update({
    secretAccessKey: '',
    accessKeyId: ''
});

var key = randomString+".jpg";
var s3 = new aws.S3({
    endpoint: 'https://s3.us-east-2.amazonaws.com',
    region: 'us-east-2',
    signatureVersion: 'v4',
    ACL: 'public-read',
    params: {
        Bucket: '',
        Key: key 
       }   
});
var userupload = multer({
    storage: multerS3({
        s3: s3,
        bucket: '',
        key: function(req, file, cb) {
            //console.log(file);
            var flname = file.originalname;
            cb(null, 'profilepic/' + dateNow + '' + flname); //use Date.now() for unique file keys
        }
    })
});

// added Lic
var keylic = randomString1+ ".jpg";
var s31 = new aws.S3({
    endpoint: 'https://s3.us-east-2.amazonaws.com',
    region: 'us-east-2',
    signatureVersion: 'v4',
    ACL: 'public-read',
    params: {
        Bucket: 'springtv',
        Key: keylic 
       }   
});
var userupload1 = multer({
    storage: multerS3({
        s3: s31,
        bucket: 'springtv',
        key: function(req, file, cb) {
            //console.log(file);
            var flname = file.originalname;
            cb(null, 'licensepic/' + dateNow + '' + flname); //use Date.now() for unique file keys
        }
    })
}); 

// added selfie
var keysel = randomString2+ ".jpg";
var s32 = new aws.S3({
    endpoint: 'https://s3.us-east-2.amazonaws.com',
    region: 'us-east-2',
    signatureVersion: 'v4',
    ACL: 'public-read',
    params: {
        Bucket: 'springtv',
        Key: keysel 
       }   
});
var userupload2 = multer({
    storage: multerS3({
        s3: s32,
        bucket: 'springtv',
        key: function(req, file, cb) {
            //console.log(file);
            var flname = file.originalname;
            cb(null, 'slefiepic/' + dateNow + '' + flname); //use Date.now() for unique file keys
        }
    })
}); 


// 
//var userupload = multer({
//    storage: multerS3({
//        s3: s3,
//        bucket: 'springtv',
//        key: function(req, file, cb) {
//            console.log(file);
//            //var flname = file.originalname;
//            cb(null, 'profilepic/' + dateNow + '' + file); //use Date.now() for unique file keys
//        }
//    })
//});
module.exports = function(app, passport){	
	app.use('/api', apiRouter);
	app.use('/', router);
	// API routes        
        require('./api/users')(apiRouter, passport,transporter,s3,s31,s32,randomString,randomString1,randomString2,userupload,userupload1,userupload2);
        require('./api/customers')(apiRouter);
        require('./api/rooms')(apiRouter);
        require('./api/services')(apiRouter);
        require('./api/resturants')(apiRouter);
        require('./api/hotel_staffs')(apiRouter,userupload);
        require('./api/menus')(apiRouter,userupload);
    // home route
        
    router.get('/', function(req, res) {
        if (req.user) {
            res.render('index', {user: req.user});
        }else {
           res.render('index', {user: ''});    
        }
    });
         router.get('/login', function(req, res) {
         if (req.user) {
            res.render('home/login', {user: req.user});
        }else {
           res.render('home/login', {user: ''});    
        }
    });  
    
     router.get('/forgetpassword', function(req, res) {
        //res.render('home/forgetpassword');
        console.log("here1");
        console.log(req.query);
        console.log("here2");
        User.findOne({'salt': req.query.id}, function(err, user) {
            console.log(user);
            if (user == null) {
                res.render('404');
            } else {
                res.render('home/forgetpassword', {salt: req.query.id});
            }
        });
    });
  
  
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    router.get('/action', function(req, res) {
        if (req.user) {
            res.redirect('/action');
        }else{
            res.redirect('/login');
        }
    });      
	// admin route
	router.get('/admin', function(req, res) {
		res.render('admin/login');
	});
        
         router.get('/admin/logout', function(req, res) {
                req.logout();
                res.redirect('/admin');
        });

	router.get('/admin/register', function(req, res) {
		res.render('admin/register');
	});

	router.get('/admin/dashboard', isAdmin, function(req, res){
		res.render('admin/dashboard', {user: req.user});
	});
         router.get('/admin/forgotpassword', function(req, res) {
        res.render('admin/forgotpassword');
            });
    
        router.get('/admin/resetpassword', function(req, res) {
        //res.render('home/forgetpassword');
        console.log(req.query);
        User.findOne({'salt': req.query.id}, function(err, user) {
            console.log(user);
            if (user == null) {
//                alert("if");
                res.render('404');
            } else {
                res.render('admin/resetpassword', {salt: req.query.id});
            }
        });
    });
    
   


	router.post('/register', function(req, res){

		// passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
		User.register(new User({
			email: req.body.email
		}), req.body.password, function(err, user) {
	        if (err) {
	            console.error(err);
	            return;
	        }
	        // log the user in after it is created
	        passport.authenticate('local')(req, res, function(){
	        	console.log('authenticated by passport');
	        	res.redirect('/admin/dashboard');
	        });
	    });
	});
 

	router.post('/login', passport.authenticate('local'), function(req, res){
		res.redirect('/admin/dashboard');
	});

        
//        // facebook
//          router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
//            router.get('/auth/facebook/callback',
//            passport.authenticate('facebook', {
//                successRedirect: '/',
//                failureRedirect: '/login'
//            }));
//        // for google    
//            router.get('/auth/google', passport.authenticate('google', {scope: ['email']}));
//            router.get('/auth/google/callback',
//            passport.authenticate('google', {
//                successRedirect: '/',
//                failureRedirect: '/login'
//            }));


    
	app.use(function(req, res, next){
		res.status(404);

		res.render('404');
		return;
	});
	
};

function isAdmin(req, res, next){
	if (req.isAuthenticated() && req.user.email === '') {
		console.log('cool you are an admin, carry on your way');
		next();
	} else {
		console.log('You are not an admin');
		res.redirect('/admin');
	}
}