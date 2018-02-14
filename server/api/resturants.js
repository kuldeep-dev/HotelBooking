/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Resturant = require('../models/resturant');

module.exports = function(apiRouter){
    
    apiRouter.get('/allresturant', function(req, res){
		Resturant.find({}, function(err, resturant){
			if (err) res.send(err);

			res.json({error : 0 , data : resturant});
		}).sort({created_at : -1});
	});
    
    
    apiRouter.post('/addresturant', function(req, res) {
        var resturant = Resturant();
        resturant.name = req.body.name;
        resturant.order_no = req.body.order_no;
        resturant.order_detail = req.body.order_detail;
        resturant.tax = req.body.tax;
        resturant.discount = req.body.discount;
        resturant.table_no = req.body.table_no;
        resturant.save({}, function(err, resturant) {
            if (err)
                res.send(err);
                res.json({error: 0, data: resturant});
        });
        
    });
   
     apiRouter.post('/deleteorder', function(req, res) {
        Resturant.remove({
            _id: req.body.id
        }, function(err, room) {
            if (err)
                res.send(err);
            res.json({message: 'Order deleted!'});
        })
    });
   
   
   
   apiRouter.post('/editorder', function(req, res) {
        Resturant.findById({'_id': req.body.id}, function(err, order) {
            if (err){
                res.send(err);
            }else{
            order.name = req.body.name;
            order.order_no = req.body.order_no;
            order.order = req.body.order;
            order.table_no = req.body.table_no;
            order.description = req.body.description;
            order.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit order data"});
                }else{
                res.json({"error":0,"message":'Order data updated successfully','data':order});
            }
            })
        }
        });
    });
            
};



