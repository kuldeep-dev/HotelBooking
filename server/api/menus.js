/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Menu = require('../models/menu');


module.exports = function(apiRouter,userupload){
    
    apiRouter.get('/allmenu', function(req, res){
		Menu.find({}, function(err, menu){
			if (err) res.send(err);

			res.json({error : 0 , data : menu});
		}).sort({created_at : -1});
	});
    
    
     apiRouter.post('/addmenu', function(req, res) {
           Menu.find({menu_name: req.body.menu_name}, function(err, menu_name) {
            if (menu_name.length){
                res.json({"error":1,"message":'Room type Alredy Exist','data':menu_name});
            }else{
                var menu_name = Menu();
                menu_name.menu_name = req.body.menu_name;
                menu_name.description = req.body.description;
                menu_name.save(function(err,menu_name) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to add new menu"});
                }else{
                res.json({"error":0,"message":'New menu added successfully','data':menu_name});
            }
            })
        }
        }); 
    });
    
    
    
    apiRouter.post('/deletemenu', function(req, res) {
        Menu.remove({
            _id: req.body.id
        }, function(err, menu) {
            if (err)
                res.send(err);
            res.json({message: 'Menu deleted!'});
        })
    });
   
   
   
   apiRouter.post('/editmenu', function(req, res) {
        Menu.findById({'_id': req.body.id}, function(err, menu) {
            if (err){
                res.send(err);
            }else{
            menu.menu_name = req.body.menu_name;
            menu.description = req.body.description;
            menu.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit menu"});
                }else{
                res.json({"error":0,"message":'Menu updated successfully','data':menu});
            }
            })
        }
        });
     
    });
    
    
    apiRouter.post('/add_menu_item', function(req, res) {
        Menu.findById({'_id': req.body.id}, function(err, menu) {
            if (err){
                res.send(err);}
            menu.menu_item.push({   
                                            name:req.body.name,
                                            price:req.body.price,
                                            item_image:req.body.item_image,
                                            description:req.body.description
                                       });        
            menu.save(function(err) {
                if (err){
                    res.json({"error" : 1,"messageservice" : "Unable to add menu"});
                }else{
                res.json({"error":0,"messageservice":'You have successfully added menu items!','data':menu});
            }
            });
        });
    
    });
    
    
    apiRouter.post('/edit_menu_item', function(req, res) {
            Menu.update({ 'menu_item._id': req.body.menuitem_id }, {
            '$set': {
                'menu_item.$.name': req.body.name,
                'menu_item.$.price': req.body.price,
                'menu_item.$.item_image': req.body.item_image,
                'menu_item.$.description': req.body.description,
            }
        },  function(err, item) {
            if (err)
                res.send(err);
            res.json({message: 'Menu Item Updated!'});
    });
    });
   
   
   apiRouter.post('/delete_menu_item', function(req, res) {
            Menu.findByIdAndUpdate({'_id' : req.body.menu_id}, {
                    $pull: {menu_item: {
                        _id: req.body.id  
                    }}
    },  function(err, menu) {
            if (err)
                res.send(err);
            res.json({message: 'Menu item deleted!'});
    });
    });
    
    
    apiRouter.post('/uploadmenuimage',userupload.array('file',3), function(req, res, next) {
        res.json(req.files);
    });

};



