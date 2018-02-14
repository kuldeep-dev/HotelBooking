/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var User = require('../models/user');
var uuid = require('node-uuid');
var fs = require('fs');
var nodemailer = require('nodemailer');
smtpTransport = require("nodemailer-smtp-transport");
// var crypto = require('crypto');
// bcrypt = require('bcrypt-nodejs');


var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: '' 
}
});


// Users API
module.exports = function(apiRouter,passport,s3, s31,s32, randomString,randomString1,randomString2,userupload1,userupload,userupload2,createTransport) {
    

///////////// ******** Start service************///////////////////
apiRouter.post('/serviceuser', function(req, res) {
      User.findById({'_id': req.body.id}, function(err, user) {
            console.log("kuldeep");
            console.log(user);
            if (err){
                res.send(err);}
            user.service.push({service:req.body.service,
                               price:req.body.price,
                               photo:req.body.photo,
                               location:req.body.location,
                               book_availability:req.body.availability
                               });        
            console.log("API Service");       
            console.log(user.service);
            //return false;
            user.save(function(err) {
                if (err){
                    res.json({"error" : 1,"messageservice" : "Unable to add service"});
                }else{
                res.json({"error":0,"messageservice":'You have successfully added service!','data':user});
            }
            });
        });
    
    });

///////////// ********End service************///////////////////

apiRouter.post('/users/login', function(req, res, next) {       
             passport.authenticate('local', function(err, user, info) { 
               if (err) {
                 return next(err); // will generate a 500 error
               } 
               if (! user) {             
                 return res.json({ success : false, message : info.message });     
               }  
               req.login(user, function(err){       
                 if(err){
                   return next(err);  
                 }
                  //res.redirect('/admin/dashboard');
                 return res.json({ success : true, message : 'authentication succeeded',info:info,userinfo:user});              
               });
             })(req, res, next);
           });

   
  apiRouter.post('/forgetpassword', function(req, res) {
        
        console.log(req.body);
//        return false;
        User.findOne({ 'email': req.body.email }).select('+salt +hash').exec(function(err, user) {
            console.log("Hii forget pass");
            console.log(user);
                if (user) {
                    console.log(user.email);
                host = req.get('host');//remember the server (i.e host) address
                link = "http://" + req.get('host') + "/admin/resetpassword?id=" + user.salt;//create a url of the host server
                var mailOptions = {
                    from: '',
                    to: user.email,
                    subject: 'Forgot Password',
                    html: "Hello " + user.email + ",<br> Please Click on the link to change password.<br><a href=" + link + ">Click here to Change Password</a>"
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                         res.json({"error" : 1 ,"message" : "Email has not been sent!",data:user});
                    } else {
                        res.json({"error" : 0 ,"message" :"Email has been sent please check your email",data:user});
                    }
                });
            } else {
                res.json({"error" : 2 , "message" :"Email has not been registered!",data:user});
            }

    });

    });  
   
  
    
apiRouter.post('/change_passw', function(req, res) {
        console.log("api");
        console.log(req.body);
     
        User.findOne({'salt': req.body.salt}, function(err, sanitizedUser) {
        console.log(sanitizedUser);
        if (sanitizedUser) {
            sanitizedUser.setPassword(req.body.password, function() {
                sanitizedUser.save();
                res.send({message:"Password reset Successfully"});
            });
        } else {
            res.json({message:"Error"});
        }
    
    });
});        


    apiRouter.post('/uploaduserimage',userupload.array('file',3), function(req, res, next) {
        console.log("upload");
        console.log(req.body);
        console.log(req.files);        
        res.json(req.files);
        
    });



///user data update////////////////

apiRouter.post('/edituserdata', function(req, res) {
        User.findById({'_id': req.body.id}, function(err, user) {
            if (err){
                res.send(err);
            }else{
            user.name = req.body.name;
            user.dob = req.body.dob;
            user.phone = req.body.phone;
            user.image = req.body.image;
            
            user.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit user"});
                }else{
                res.json({"error":0,"message":'Your Account Has been updated successfully','data':user});
            }
            })
        }
        });
    
    });


////////////change password///////////


 apiRouter.post('/changePassword', function(req, res){
 passport.authenticate('local')(req, res, function() {
               User.findOne({"email":req.body.email }, function (err, user) {
                    if(err) { res.send(err); 
                           res.json({"error" : 1 ,"message" : "Email has not been found!"});
                        return false;
                    } else{
                        user.setPassword(req.body.newpassword,function(err,user) {
			user.save();
                        res.json({"message" : "password changed" ,"error" : 0});
			if(err) {  
                            res.json({"error" : 1 ,"message" : "Password can not be changed!"});
                        }
              });
          }
          });
          });
          });


  apiRouter.post('/upload_banner_image', function(req, res) {
    
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
    console.log(fields);

      var file = files.file[0];
      var contentType = file.headers['content-type'];
      var extension = file.path.substring(file.path.lastIndexOf('.'));
      // var destPath = '/' + user.id + '/profile' + '/' + uuid.v4() + extension;
      // var destPath = 'uploads/players/' + uuid.v4() + extension;
      var imageName = uuid.v4() + extension;
      var destPath = fields.upload_dir + imageName;

console.log("destPath");
console.log(destPath);


      var headers = {
        'x-amz-acl': 'public-read',
        'Content-Length': file.size,
        'Content-Type': contentType
      };

        copyFile(file.path, destPath, function(error) {
          if (error)
          {
            console.log("error in file uploading..");
            console.error(error);
          }
                Hospital.findById({'_id': fields._id}, function(err, hospital) {
                    if (err)
                        res.send(err);
                    Hospital.bannerimage = imageName;
                    Hospital.save(function(err) {
                        if (err)
                            res.send(err);

                        if(fields.action == 'update')
                        res.json("You have successfully updated hospital");
                        else                        
                        res.json("You have successfully added hospital");
                    })
                    
                });
          // return destPath;
          console.log('File was copied!');
        });


console.log(fields._id);


        Hospital.findById({'_id': fields._id}, function(err, hospital) {
            if (err)
                res.send(err);

            console.log(imageName);
            hospital.bannerimage = imageName;
            hospital.save(function(err) {
                if (err)
                    res.send(err);


                console.log("yes image saved..");
                if(fields.action == 'update')
                res.send("You have successfully updated hospital");
                else
                res.send("You have successfully update added hospital");
            })
            
        });
        console.log("outside yes image saved..");
      // return false;

      // var uploader = s3Client.upload(file.path, destPath, headers);
      // uploader.on('error', function(err) {
      //   //TODO handle this
      // });
      // uploader.on('end', function(url) {
      //   //TODO do something with the url
      //   console.log('file opened:', url);
      // });
    });
  });


    
}