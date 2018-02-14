/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Customer = require('../models/customer');
var Room = require('../models/room');
var Customer_detail = require('../models/customer_detail');

module.exports = function(apiRouter){
    
    apiRouter.get('/allcustomers', function(req, res){
		Customer.find({}, function(err, customer){
			if (err) res.send(err);

			res.json({error : 0 , data : customer});
		}).sort({created_at : -1});
	});
        
    apiRouter.post('/allgetdash', function(req, res){
		Customer.find({departure_date:{$gte: req.body.start}}, function(err, customer){
			if (err) res.send(err);
			res.json({error : 0 , data : customer});
		}).sort({created_at : -1}).limit(50);
	});
    
    
    apiRouter.post('/addcustomer', function(req, res) {
        var customer = Customer();
        var customer_detail = Customer_detail();
        
        customer_detail.name = req.body.name;
        customer_detail.govt_id = req.body.govt_id;
        customer_detail.govt_id_image = req.body.govt_id_image;
        customer_detail.email = req.body.email;
        customer_detail.dob = req.body.dob;
        customer_detail.phone = req.body.phone;
        customer_detail.address = req.body.address;
        
        customer.name = req.body.name;
        customer.govt_id = req.body.govt_id;
        customer.govt_id_image = req.body.govt_id_image;
        customer.email = req.body.email;
        customer.dob = req.body.dob;
        customer.adults = req.body.adults;
        customer.children = req.body.children;
        customer.phone = req.body.phone;
        customer.address = req.body.address;
        customer.description = req.body.description;
        customer.arrival_date = req.body.arrival_date;
        customer.departure_date = req.body.departure_date;
        customer.total_days = req.body.total_days;
        customer.status = "staying";
        customer.client_service = req.body.services;      
        customer.room_booked = req.body.room_booked;
        customer.payment = req.body.payment;
        customer.payment_method = req.body.payment_method;
        customer.tax = req.body.tax;
        customer.discount = req.body.discount;
        customer.total = req.body.total;
        customer.assigned_by = req.body.assigned_by;
        customer.booking_date = req.body.booking_date;
        customer_detail.save({}, function() {});
        customer.save({}, function(customr, err) {
            if (err){
                res.send(err);
            }else{
              res.json({error: 0, data: customr});  
            }                
        });
        
        
    });
   
        apiRouter.post('/todayroombooked', function(req, res){
             //var start = new Date(); start.setHours(0,0,0,0);
             //var end = new Date(); end.setHours(23,59,59,999);
                 Customer.find({created_at:{$gte: req.body.start, $lt: req.body.end}}, function(err, book){
                   res.json({"error":0,'data':book.length});
                });
            });
   
        apiRouter.post('/findstayingadult', function(req, res){
            
            Customer.find( { $and: [ { arrival_date: { $lte: req.body.start } }, 
                    { departure_date: { $gte: req.body.start } } ] }, function(err, room){
                   res.json({"error":0,'data':room});
                });
            }); 
            
        apiRouter.post('/findarradult', function(req, res){
            Customer.find({arrival_date:{$gte: req.body.start, $lt: req.body.end}}, function(err, room){
                   res.json({"error":0,'data':room});
                });
            });     
            
            
        apiRouter.post('/findcheckout', function(req, res){
//            var start = new Date(); start.setHours(0,0,0,0);
//                var end = new Date(); end.setHours(23,59,59,999);
                 Customer.find({departure_date:{$gte: req.body.start, $lt: req.body.end}}, function(err, book){
                   res.json({"error":0,'data':book.length});
                    
                });
            }); 
            
            
        apiRouter.post('/weakroombooked', function(req, res){
            var myDate = new Date();
        var plusSeven = new Date(myDate.setDate(myDate.getDate() - 7));
        var datecurrent = new Date();    
                          Customer.find({created_at:{
                                                     $gte: plusSeven,
                                                     $lte: datecurrent
                                                 }} , function(err, room){
                                                     res.json({"error":0,'data':room.length});
                                                  });
            }); 
            
        apiRouter.post('/monthroombooked', function(req, res){
            var myDate = new Date();
        var plusSeven = new Date(myDate.setDate(myDate.getDate() - 30));
        var datecurrent = new Date();    
                          Customer.find({created_at:{
                                                     $gte: plusSeven,
                                                     $lte: datecurrent
                                                 }} , function(err, room){
                                                     res.json({"error":0,'data':room.length});
                                                  });
            });  
        
    
    /////// Client thacking //////////////
        apiRouter.post('/addclient_thacking', function(req, res) {
            //console.log(req.body)
        Customer.findById({'_id': req.body.id}, function(err, order) {
            if (err){
                res.send(err);}  
            req.body.client_thacking.forEach(function(element) {
                 console.log("data",element);
                var data = {order:element.order,
                                            price:element.price,
                                            quantity: element.quantity,
                                            status: 'pending',
                                            description:element.description};
                                        console.log("data",data);
  order.client_thacking.push(data);   
});
                 
            order.save(function(err) {
                if (err){
                    res.json({"error" : 1,"messageservice" : "Unable to add order"});
                }else{
                res.json({"error":0,"messageservice":'You have successfully added order!','data':order});
            }
            });
        });
    
    });
    
    /////// Client thacking //////////////
            
            
   /////// delete Client thacking //////////////
       apiRouter.post('/deleteclient_thacking', function(req, res) {
            Customer.findByIdAndUpdate({'_id' : req.body.id}, {
        $pull: {client_thacking: {
            _id: req.body.orderid  
        }}
    },  function(err, order) {
            if (err)
                res.send(err);
            res.json({message: 'Order deleted!'});
    });
    });
    
    /////// delete Client thacking //////////////     
    
     /////// edit Client thacking //////////////
      apiRouter.post('/editclient_thacking', function(req, res) {
            Customer.update({ 'client_thacking._id': req.body.tacking_id }, {
            '$set': {
                'client_thacking.$.status': req.body.status
            }
        },  function(err, order) {
            if (err)
                res.send(err);
            res.json({message: 'Order Updated!'});
    });
    });
    
    /////// edit Client thacking //////////////     
            
            
   /////// Client service //////////////
        apiRouter.post('/addclient_service', function(req, res) {
        Customer.findById({'_id': req.body.id}, function(err, order) {
            if (err){
                res.send(err);}
            order.client_service.push({   
                                            service:req.body.service,
                                            price:req.body.price,
                                            assigned_to:req.body.assigned_to,
                                            status:req.body.status,
                                            description:req.body.description,
                                       });        
            order.save(function(err) {
                if (err){
                    res.json({"error" : 1,"messageservice" : "Unable to add service"});
                }else{
                res.json({"error":0,"messageservice":'You have successfully added service!','data':order});
            }
            });
        });
    
    });
    
    /////// Client service //////////////
            
            
   /////// delete Client service //////////////
       apiRouter.post('/deleteclient_service', function(req, res) {
            Customer.findByIdAndUpdate({'_id' : req.body.id}, {
        $pull: {client_service: {
            _id: req.body.orderid  
        }}
    },  function(err, order) {
            if (err)
                res.send(err);
            res.json({message: 'Service deleted!'});
    });
    });
    
    /////// delete Client service //////////////       
    
     /////// edit Client service //////////////
       apiRouter.post('/editclient_service', function(req, res) {
            Customer.update({ 'client_service._id': req.body.service_id }, {
            '$set': {
                'client_service.$.status': req.body.status
            }
        },  function(err, order) {
            if (err)
                res.send(err);
            res.json({message: 'Service Updated!'});
    });
    });
    
    /////// edit Client service //////////////     
    
    /////////////// invoice//////////////
            
            apiRouter.post('/invoice_customer', function(req, res){
                 Customer.find({}, function(err, book){
                   res.json({"error":0,'data':book});
                    
                }).sort({created_at : -1});
            });       
            
         /////////////// invoice//////////////    
         
      
      ////////// all booking data ///////////
      
        apiRouter.get('/all_booking_data', function(req, res){
		Customer.find({}, function(err, customer){
			if (err) res.send(err);

			res.json({error : 0 , data : customer});
		})
	});
        
       ////////// all booking data ///////////  
       
       
       ////////////// update room status ///////////////
       
                apiRouter.post('/update_room_status', function(req, res) {
                    var arr = req.body.room_booked;
                    var len = arr.length;
                    //return false;
                    for(var i = 0; i< len; i++ ) {
                        Room.update({room_number : arr[i]},{$set : {status : "1"}},function(res,err){
                            if (err){
//                    res.send(err);
                }else{
                res.json({message: 'Room status Updated!'});
                }
                        })
                    }
                
                });
               
    ////////////// update room status ///////////////
    
    
    ////////////// Save bill amount  ///////////////
    
    apiRouter.post('/save_bill_invoice', function(req, res) {
        Customer.findById({'_id': req.body.customer_id}, function(err, customerbill) {
            if (err){
                res.send(err);
            }else{
            customerbill.payment = req.body.payment;    
            customerbill.payment_method = req.body.payment_method;
            customerbill.tax = req.body.tax;
            customerbill.discount = req.body.discount;
            customerbill.total = req.body.total;
            customerbill.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to save invocie"});
                }else{
                res.json({"error":0,"message":'Invoice save','data':customerbill});
            }
            })
        }
        });
    });
    
    ////////////// Save bill amount  ///////////////
    
    
     ////////////// checkout date  ///////////////
    
    apiRouter.post('/change_depaerture_status', function(req, res) {
        var departure_date = new Date();
       // return false;
        Customer.findById({'_id': req.body.customer_id}, function(err, customerbill) {
            if (err){
                res.send(err);
            }else{
            customerbill.departure_date = departure_date;
            customerbill.status = req.body.status;
            customerbill.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to update"});
                }else{
                res.json({"error":0,"message":'Status updated!','data':customerbill});
            }
            })
        }
        });
    });
    
     ////////////// checkout date  ///////////////
    
    
    
     ////////////// update room status after bill pay ///////////////
       
                apiRouter.post('/update_room_status_paybill', function(req, res) {
                    var arr = req.body.room_status;
                    var len = arr.length;
                    //return false;
                    for(var i = 0; i< len; i++ ) {
                        Room.update({room_number : arr[i]},{$set : {status : "0"}},function(res,err){
                            if (err){
//                    res.send(err);
                }else{
                res.json({message: 'Room status Updated!'});
                }
                        })
                    }
                
                });
               
    ////////////// update room status after bill pay ///////////////
    
    
     /////////////// pending room  //////////////
            
            apiRouter.post('/pendingrooms', function(req, res){
              Room.find({'status': "0"}, function(err, room){
			if (err) res.send(err);

			res.json({error : 0 , data : room.length});
		}).sort({created_at : -1});
	});     
       /////////////// pending room  ////////////// 
       
       /////////////// customer detail /////////////
    
       apiRouter.get('/allcustomers_details', function(req, res){
            Customer_detail.find({}, function(err, customer_detail){
			if (err) res.send(err);
			res.json({error : 0 , data : customer_detail});
		}).sort({created_at : -1});
	});
    
    /////////////// customer detail /////////////
    
    
    
};



