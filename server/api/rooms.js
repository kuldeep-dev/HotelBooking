/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Room = require('../models/room');
var Roomtype = require('../models/room_type');


module.exports = function(apiRouter){
    
    apiRouter.get('/allrooms', function(req, res){
		Room.find({}, function(err, room){
			if (err) res.send(err);

			res.json({error : 0 , data : room});
		}).sort({created_at : -1});
	});
    
    
    apiRouter.post('/addroom', function(req, res) {
        Room.find({room_number: req.body.room_number}, function(err, room) {
            if (room.length){
                res.json({"error":1,"message":'Room number Alredy Exist','data':room});
            }else{
                var roomss = Room();
                roomss.room_number = req.body.room_number;
                roomss.room_type = req.body.room_type;
                roomss.price = req.body.price;
                roomss.quantity = req.body.quantity;
                roomss.status = req.body.status;
                roomss.description = req.body.description;
                roomss.save(function(err,rom) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to add new room"});
                }else{
                res.json({"error":0,"message":'New Room added successfully','data':rom});
            }
            })
        }
        });
        
    });
    
    apiRouter.post('/deleteroom', function(req, res) {
        Room.remove({
            _id: req.body.id
        }, function(err, room) {
            if (err)
                res.send(err);
            res.json({message: 'Room deleted!'});
        })
    });
   
   
   
   apiRouter.post('/editroom', function(req, res) {
      
        Room.findById({'_id': req.body.id}, function(err, room) {
            if (err){
                res.send(err);
            }else{
            room.room_number = req.body.room_number;
            room.room_type = req.body.room_type;
            room.price = req.body.price;
            room.quantity = req.body.quantity;
            room.status = req.body.status;
            room.description = req.body.description;
            room.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit room data"});
                }else{
                res.json({"error":0,"message":'Room data updated successfully','data':room});
            }
            })
        }
        });
     
    });
    
    apiRouter.post('/getroomdata', function(req, res) {
                   Room.aggregate([
        { $match : { status : "0" } } ,
		{
			$group : { 
				_id : "$room_type",
				"count" :  { $sum : 1 },
                               
                                    
				}
			}
                        
		
	], function(err, room){
			if (err) res.send(err);
			res.json({error : 0 , data : room});
		} )
            });        

        
             
            
   /////////////// available room  //////////////
            
            apiRouter.post('/available_room', function(req, res){
              Room.find({'status': "0"}, function(err, room){
			if (err) res.send(err);

			res.json({error : 0 , data : room});
		}).sort({created_at : -1});
	});     
       /////////////// available room  ////////////// 
       
       
       apiRouter.post('/addroomtype', function(req, res) {
           
           Roomtype.find({room_type: req.body.room_type}, function(err, roomtype) {
            if (roomtype.length){
                res.json({"error":1,"message":'Room type Alredy Exist','data':roomtype});
            }else{
                var roomtype = Roomtype();
                roomtype.room_type = req.body.room_type;
                roomtype.save(function(err,romtype) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to add new room type"});
                }else{
                res.json({"error":0,"message":'New Room type added successfully','data':romtype});
            }
            })
        }
        }); 
    });
    
    
    
     apiRouter.get('/allroomstype', function(req, res){
		Roomtype.find({}, function(err, room){
			if (err) res.send(err);

			res.json({error : 0 , data : room});
		}).sort({created_at : -1});
	});
       
       apiRouter.post('/deleteroomtype', function(req, res) {
        Roomtype.remove({
            _id: req.body.id
        }, function(err, room) {
            if (err)
                res.send(err);
            res.json({message: 'Room type deleted!'});
        })
    });
    
    
    
    apiRouter.post('/editroomtypedata', function(req, res) {
        Roomtype.find({room_type: req.body.room_type}, function(err, roomtype) {
            if (roomtype.length){
                res.json({"error":1,"message":'Room type Alredy Exist','data':roomtype});
            }else{
        Roomtype.findById({'_id': req.body.id}, function(err, roomtype) {
            if (err){
                res.send(err);
            }else{
            roomtype.room_type = req.body.room_type;
            roomtype.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit room type"});
                }else{
                res.json({"error":0,"message":'Room type updated successfully','data':roomtype});
            }
            })
        }
        });
    }
    }); });

};



