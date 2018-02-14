/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Hotel_staff = require('../models/hotel_staff'),


module.exports = function(apiRouter,userupload){
    
    apiRouter.get('/allstaff', function(req, res){
		Hotel_staff.find({}, function(err, staff){
			if (err) res.send(err);
			res.json({error : 0 , data : staff});
		}).sort({created_at : -1});
	});
    
    
    apiRouter.post('/addstaff_data', function(req, res) {
                var hotel_staff = Hotel_staff();
                hotel_staff.name = req.body.name;
                hotel_staff.id_card = req.body.id_card;
                hotel_staff.staff_image = req.body.image;
                hotel_staff.email = req.body.email;
                hotel_staff.gender = req.body.gender;
                hotel_staff.dob = req.body.dob;
                hotel_staff.position = req.body.position;
                hotel_staff.joining_date = req.body.joining_date;
                hotel_staff.salary = req.body.salary;
                hotel_staff.phone = req.body.phone;
                hotel_staff.address = req.body.address;
                hotel_staff.description = req.body.description;
                hotel_staff.status = req.body.status;

                hotel_staff.save(function(err,rom) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to add staff"});
                }else{
                res.json({"error":0,"message":'New staff added successfully','data':rom});
            }
            })
        
    });
    
    apiRouter.post('/delete_staff', function(req, res) {
        Hotel_staff.remove({
            _id: req.body.id
        }, function(err, staff) {
            if (err)
                res.send(err);
            res.json({message: 'Staff deleted!'});
        })
    });
   
   
   
   apiRouter.post('/edithotelstaff_detail', function(req, res) {
        Hotel_staff.findById({'_id': req.body.id}, function(err, staff) {
            if (err){
                res.send(err);
            }else{
                staff.name = req.body.name;
                staff.id_card = req.body.id_card;
                staff.staff_image = req.body.image;
                staff.email = req.body.email;
                staff.gender = req.body.gender;
                staff.dob = req.body.dob;
                staff.position = req.body.position;
                staff.joining_date = req.body.joining_date;
                staff.salary = req.body.salary;
                staff.phone = req.body.phone;
                staff.address = req.body.address;
                staff.description = req.body.description;
            staff.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit staff data"});
                }else{
                res.json({"error":0,"message":'Staff data updated successfully','data':staff});
            }
            })
        }
        });
     
    });


    apiRouter.post('/uploadstaffimage',userupload.array('file',3), function(req, res, next) {
        res.json(req.files);
        
    });

        
    apiRouter.post('/leaving_status', function(req, res) {
        Hotel_staff.findById({'_id': req.body.id}, function(err, staff) {
            if (err){
                res.send(err);
            }else{
                
                staff.status = req.body.status;
                staff.leaving_date = req.body.leaving_date;
            staff.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit staff data"});
                }else{
                res.json({"error":0,"message":'Staff data updated successfully','data':staff});
            }
            })
        }
        });
     
    });

};



