/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Service = require('../models/service');

module.exports = function(apiRouter){
    
    apiRouter.get('/allServices', function(req, res){
		Service.find({}, function(err, service){
			if (err) res.send(err);

			res.json({error : 0 , data : service});
		}).sort({created_at : -1});
	});
    
    
    apiRouter.post('/addservice', function(req, res) {
        var service = Service();
        service.service = req.body.service;
        service.price = req.body.price;
        service.description = req.body.description;
        service.save({}, function(err, service) {
            if (err)
                res.send(err);
                res.json({error: 0, data: service});
        });
        
    });
   
   
   apiRouter.post('/deleteservice', function(req, res) {
        Service.remove({
            _id: req.body.id
        }, function(err, serivce) {
            if (err)
                res.send(err);
            res.json({message: 'Service deleted!'});
        })
    });
   
   
   
   apiRouter.post('/editservice', function(req, res) {
        Service.findById({'_id': req.body.id}, function(err, service) {
            if (err){
                res.send(err);
            }else{
            service.service = req.body.service;
            service.price = req.body.price;
            service.description = req.body.description;
            service.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit service data"});
                }else{
                res.json({"error":0,"message":'Service data updated successfully','data':service});
            }
            })
        }
        });
    });
    
     apiRouter.get('/allServicesdetails', function(req, res){
		Service.find({}, function(err, service){
			if (err) res.send(err);
			res.json({error : 0 , data : service});
		})
	});
    
    

};



