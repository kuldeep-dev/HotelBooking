/**
 * NavCtrl
 * @param {type} param1
 * @param {type} param2
 */
var total = 0;
adminApp.controller('NavCtrl', function($scope, $state) {
    $scope.active = $state;
    $scope.isActive = function(viewLocation) {
        var active = (viewLocation === $state.current.name);
        return active;
    };
})
/*
* Dashboard controller
*/

adminApp.controller('NavbarCtrl', function($scope,$rootScope,Customers,Rooms) {
    
            var start_rdate = new Date();
                var start_rday = moment(start_rdate,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'00:00:00.000').toString()+'Z';
                
                var end_rdate = new Date();
                var end_rday = moment(end_rdate,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'23:59:59.999').toString()+'Z';
                var getroombook = {
                    start:start_rday,
                    end:end_rday
                                }
           Customers.currentdate(getroombook).then(function(res) {
                    if(res){
                        $scope.ccurrentbook = res.data;
                    }else{
                        $scope.message = res;
                    }
                });   
        
        
                Customers.weakcurrentdate().then(function(res) {
                    if(res){
                        $scope.weakcurrentbook = res.data;
                    }else{
                        $scope.message = res;
                    }
                });   
                
                
          Customers.monthcurrentdate().then(function(res) {
                    if(res){
                        $scope.monthcurrentbook = res.data;
                    }else{
                        $scope.message = res;
                    }
                });   
          Rooms.all().then(function(data){
           $scope.room = data.data; 
           for(var i=0 ; i<$scope.room.length; i++)
           {
               total += parseInt($scope.room[i].quantity);
           }
    });
    
    setTimeout(function(){
     $('#day').circleProgress({
    value: $scope.ccurrentbook/total,
    size: 200,
    fill: {
      gradient: ["green", "orange"]
    }
  })}, 2000); 
  
    setTimeout(function(){
     $('#weak').circleProgress({
    value: $scope.weakcurrentbook/(total*7),
    size: 200,
    fill: {
      gradient: ["green", "orange"]
    }
  })}, 2000); 
  
  setTimeout(function(){
     $('#month').circleProgress({
    value: $scope.monthcurrentbook/(total*30),
    size: 200,
    fill: {
      gradient: ["green", "orange"]
    }
  })}, 2000); 
                
    
})

adminApp.controller('dashboardCtrl', function($scope,$rootScope,Customers,Rooms) { 
   
    $rootScope.today = new Date(); 
    
     var start_ddate = new Date();
                var start_dday = moment(start_ddate,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'00:00:00.000').toString()+'Z';
                
                var end_ddate = new Date();
                var end_dday = moment(end_ddate,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'23:59:59.999').toString()+'Z';
                var getdashboard = {
                    start:start_dday,
                    end:end_dday
                                }  
   
    Customers.allgetdash(getdashboard).then(function(data){
           $scope.customer = data.data;  
    })
    
    $scope.setActive = function(custom) {
        $scope.active = 1;
       $scope.activeCustomer = custom;
    }
    
   
        Customers.pendingroom().then(function(res) {
                    if(res){
                        $scope.pendingroom = res.data;
                    }else{
                        $scope.message = res;
                    }
                });   
    
                var start_date = new Date();
                var start_day = moment(start_date,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'00:00:00.000').toString()+'Z';
                
                var end_date = new Date();
                var end_day = moment(end_date,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'23:59:59.999').toString()+'Z';
                var getcurrentbook = {
                    start:start_day,
                    end:end_day
                                }
        Customers.currentdate(getcurrentbook).then(function(res) {
                    if(res){
                        $scope.currentbook = res.data;
                    }else{
                        $scope.message = res;
                    }
                });           
                
        var start_cdate = new Date();
                var start_cday = moment(start_cdate,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'00:00:00.000').toString()+'Z';
                
                var end_cdate = new Date();
                var end_cday = moment(end_cdate,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'23:59:59.999').toString()+'Z';
                var getadultchildbook = {
                    start:start_cday,
                    end:end_cday
                                }        
           Rooms.allroomdata(getadultchildbook).then(function(data){
           $scope.roomdataall = data.data;
    })    
               
               
    // Staying tonight
    var  start_staadult = new Date();
                var start_stacadult = moment(start_staadult,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'00:00:00.000').toString()+'Z';
                
                var end_staadult = new Date();
                var end_stacadult = moment(end_staadult,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'23:59:59.999').toString()+'Z';
                var getadultdata = {
                    start:start_stacadult,
                   // end:end_stacadult
                                }               
               var staadults = 0;
               var stachildren =0;
                Customers.findstayingadult(getadultdata).then(function(res) {
                    if(res){
                        for(var i=0; i<res.data.length; i++)
                        {
                             staadults = staadults+parseInt(res.data[i].adults);
                             stachildren = stachildren+parseInt(res.data[i].children);
                        }
                         $scope.staadults = staadults;
                         $scope.stachildren = stachildren;
                    }else{
                        $scope.message = res;
                    }
                });      
                
            // Staying tonight    
                
            // Arriving Today
    var  start_arradult = new Date();
                var start_arrcadult = moment(start_arradult,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'00:00:00.000').toString()+'Z';
                
                var end_arradult = new Date();
                var end_arrcadult = moment(end_arradult,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'23:59:59.999').toString()+'Z';
                var getarradultdata = {
                    start:start_arrcadult,
                    end:end_arrcadult
                                }     
               var arradults = 0;
               var arrchildren =0;
                Customers.findarradult(getarradultdata).then(function(res) {
                    if(res){
                        for(var i=0; i<res.data.length; i++)
                        {
                             arradults = arradults+parseInt(res.data[i].adults);
                             arrchildren = arrchildren+parseInt(res.data[i].children);
                        }
                         $scope.arradults = arradults;
                         $scope.arrchildren = arrchildren;
                    }else{
                        $scope.message = res;
                    }
                });      
                
            // Arriving Today  
                
                
                
                
                 var start_ldate = new Date();
                var start_lday = moment(start_ldate,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'00:00:00.000').toString()+'Z';
                
                var end_ldate = new Date();
                var end_lday = moment(end_ldate,'DD/MM/YYYY').format('YYYY-MM-DD'+'T'+'23:59:59.999').toString()+'Z';
                var getleavebook = {
                    start:start_lday,
                    end:end_lday
                                }     
                Customers.checkoutcurrentdate(getleavebook).then(function(res) {
                    if(res){
                        $scope.leavingtoday = res.data;
                    }else{
                        $scope.message = res;
                    }
                });         
                
                
    
});

adminApp.controller('my_profileCtrl', function($scope,$rootScope,Users) {   
    
    
 ///dob

setTimeout(function(){
 var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
 var checkin = $('#dateofbirthadmin').datepicker({
  onRender: function(date) {
    return date.valueOf() > now.valueOf() ? 'disabled' : '';
  }
})
 },1000);   
    
    
    //image upload/////////
    
     $scope.fileNameChanged = function(input) {
          $scope.loading = true;
        Users.uploadimage(input.files[0]).then(function(res) {
            $scope.loading = false;
            if(res){
             $scope.imgshow = res[0].location;
            }
        });
    }
    
    
    
    
    
    $scope.editUser = function() {
        var datedobadmin = $("#dateofbirthadmin").val();
     var dateFromadmin = moment(datedobadmin,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z';
     $rootScope.currentUser.dob = dateFromadmin;
     
        $scope.newUser = {};
        $scope.newUser.name = $rootScope.currentUser.name;
        $scope.newUser.dob = $rootScope.currentUser.dob;
        $scope.newUser.phone = $rootScope.currentUser.phone;
        $scope.newUser.image = $scope.imgshow;
        $scope.newUser.id = $rootScope.currentUser._id;
        Users.update($scope.newUser).then(function(res) {
            if (res) {
                $scope.update = res.message;
                alert("profile data updated");
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    };
    
    $scope.user = {};
    $scope.user.id = $rootScope.currentUser._id;
    $scope.changepass = function() {
        
        if(this.user.cpassword != this.user.newpassword)
        {
            alert("Password and confirm password do not match.");
        }
        else
        {
        $scope.psd = {};
        $scope.psd.email = $rootScope.currentUser.email;
        $scope.psd.password = this.user.password;
        $scope.psd.newpassword = this.user.newpassword;
        Users.changePassword($scope.psd).then(function(res) {
            if (res.data !== "Unauthorized") {
                if (res) {
                    $scope.message = res.message;
                    alert("Password changed successfully");
                    window.location.reload();
                } else {
                    $scope.message = "error";
                }
            } else {
                $scope.errormsg = 'Please enter correct old password';
                alert($scope.errormsg);
            }
        });
    }
    };
    
    
    
    
    
});


adminApp.controller('add_roomCtrl', function($scope,$rootScope,Rooms) {      
    $rootScope.today = new Date(); 
    
    Rooms.all().then(function(data){
           $scope.room = data.data; 
           for(var i=0 ; i<$scope.room.length; i++)
           {
               total += parseInt($scope.room[i].quantity);
           }
           $(document).ready(function() {
                $('#roomtable').DataTable();
            } );
    });
    
    $scope.setActive = function(hotelroom) {
        $scope.active = 1;
       $scope.activeRoom = hotelroom;
    }

$scope.closemodel=function(){  
     $("#addroom").modal("hide");
     $("#addroom input").val('');
     $("#addroom textarea").val('');
     $("#addroomtype").modal("hide");
     $("#addroomtype input").val('');
}; 

Rooms.allroomtype().then(function(data){
           $scope.roomtypedata = data.data; 
    });

     $scope.newroomdata = function(){
                     var postdata = {
                    room_type:this.room.room_type,
                    room_number:this.room.room_no,
                    price:this.room.price,
                    quantity:"1",
                    status:"0",
                    description:this.room.description
                }
                if(postdata.room_type == null)
                {
                    alert("Please select room type");
                    return false;
                }
                else if(postdata.room_number == null)
                {
                    alert("Please enter room number");
                    return false;
                }
                else if(postdata.price == null  )
                {
                    alert("Please enter room price");
                    return false;
                }
                else{
                Rooms.add(postdata).then(function(res) {
                    if(res.error != 1){
                        alert(res.message);
                        $scope.closemodel();
                        Rooms.all().then(function(data){
                            $scope.room = data.data; 
                            for(var i=0 ; i<$scope.room.length; i++)
                            {
                                total += parseInt($scope.room[i].quantity);
                            }
                            $(document).ready(function() {
                                 $('#roomtable').DataTable();
                             } );
                     });
                    }else{
                        alert(res.message);
                     
                    }
                   
                });   }
            }
    
    $scope.deleteroom = function(id) {
         var postdatadelete = {id:id}
         if(confirm('Are you sure you want to delete this room ?')) {
        Rooms.remove(postdatadelete).then(function(res) {
            if (res) {
                alert(res.message);
                Rooms.all().then(function(data){
                            $scope.room = data.data; 
                            for(var i=0 ; i<$scope.room.length; i++)
                            {
                                total += parseInt($scope.room[i].quantity);
                            }
                            $(document).ready(function() {
                                 $('#roomtable').DataTable();
                             } );
                     });
            } else {
                $scope.update = "error";
            }
        });
    }
    }
    
   
    
    $scope.editroomdata = function() {
         var editpostdata = {
                    room_type:this.activeRoom.room_type,
                    room_number:this.activeRoom.room_number,
                    price:this.activeRoom.price,
                    quantity:this.activeRoom.quantity,
                    status:this.activeRoom.status,
                    description:this.activeRoom.description,
                    id:this.activeRoom._id
                }
        Rooms.update(editpostdata).then(function(res) {
                 if(res.error != 1){
                        alert(res.message);
                         $("#editroom").modal("hide");
                        Rooms.all().then(function(data){
                            $scope.room = data.data; 
                            for(var i=0 ; i<$scope.room.length; i++)
                            {
                                total += parseInt($scope.room[i].quantity);
                            }
                            $(document).ready(function() {
                                 $('#roomtable').DataTable();
                             } );
                     });
                     Rooms.allroomtype().then(function(data){
           $scope.roomtypedata = data.data; 
    });
                    }else{
                        alert(res.message);
                     
                    }
        });
    };
    
    /////////////////////   Room Type /////////////////////
    
     Rooms.allroomtype().then(function(data){
           $scope.roomtype = data.data; 
           $(document).ready(function() {
                $('#roomtypetable').DataTable();
            } );
    });
    
    $scope.setActiveroomtype = function(hotelroomtype) {
        $scope.active = 1;
       $scope.activeRoomtype = hotelroomtype;
    }
    
    
    $scope.addroomtype = function(){
                var addroomtypedata = {
                    room_type:this.roomtype.room_type
                }
                if(addroomtypedata.room_type == null)
                {
                    alert("Please enter room type");
                    return false;
                }
                else{
                Rooms.addroomtype(addroomtypedata).then(function(res) {
                   if(res.error != 1){
                        alert(res.message);
                        $scope.closemodel();
                        Rooms.allroomtype().then(function(data){
                            $scope.roomtype = data.data; 
                            $(document).ready(function() {
                                 $('#roomtypetable').DataTable();
                             } );
                     });
                     Rooms.allroomtype().then(function(data){
           $scope.roomtypedata = data.data; 
    });
                    }else{
                        alert(res.message);
                    }
                });   }
            }
    
    $scope.deleteroomtype = function(id) {
         var posttypedelete = {id:id}
         if(confirm('Are you sure you want to delete this room type ?')) {
        Rooms.removetype(posttypedelete).then(function(res) {
            if (res) {
                alert(res.message);
                Rooms.allroomtype().then(function(data){
                        $scope.roomtype = data.data; 
                        $(document).ready(function() {
                             $('#roomtypetable').DataTable();
                         } );
                 });
                 Rooms.allroomtype().then(function(data){
           $scope.roomtypedata = data.data; 
    });
            } else {
                $scope.update = "error";
            }
        });
    }
    }
    
    
    $scope.editroomtype = function() {
        var editroomtypedata = {
                     room_type: this.activeRoomtype.room_type,
                     id : this.activeRoomtype._id
                }
        Rooms.updateroomtype(editroomtypedata).then(function(res) {
                   if(res.error != 1){
                        alert(res.message);
                        $scope.closemodel();
                        Rooms.allroomtype().then(function(data){
                        $scope.roomtype = data.data; 
                                $(document).ready(function() {
                                     $('#roomtypetable').DataTable();
                                 } );
                         });
                         Rooms.allroomtype().then(function(data){
           $scope.roomtypedata = data.data; 
    });
                    }else{
                        alert(res.message);
                    }
        });
    };
    
    
    
});


adminApp.controller('add_serviceCtrl', function($scope,$rootScope,Services) {      
    $rootScope.today = new Date(); 
    
    Services.all().then(function(data){
           $scope.serivice = data.data; 
            $(document).ready(function() {
                $('#service').DataTable();
            } );
    });
    
    $scope.setActive = function(servicedata) {
        $scope.active = 1;
       $scope.activeservice = servicedata;
    }


    
     $scope.newservicesdata = function(){
            if(this.service == undefined || this.service == 'undefined'){
        alert("Please enter service");
                    return false; 
        }else{
            if(this.service.service == null || this.service.service == undefined || this.service.service == 'undefined' || this.service.service == "")
                {
                    alert("Please enter service");
                    return false;
                }
            else if(this.service.price == null || this.service.price == undefined || this.service.price == 'undefined' || this.service.price == "")
                {
                    alert("Please enter price");
                    return false;    
                }
         else{
             var   addnewservicedata = {
                    service:this.service.service,
                    price:this.service.price,
                    description:this.service.description
                }
                Services.add(addnewservicedata).then(function(res) {
                    if(res){
                        $scope.message = res;
                        $("#addservice").modal("hide");
                        $("#addservice input").val(" ");
                        $("#addservice textarea").val(" ");
                        Services.all().then(function(data){
                        $scope.serivice = data.data; 
                         $(document).ready(function() {
                             $('#service').DataTable();
                         } );
                             });
                        alert("New service added");
                    }else{
                        $scope.message = res;
                    }
                    addnewservicedata = {};
                }); }  }
        this.service = {};
        this.service.service = '';
        this.service.price = null;
            }
    
     $scope.deleteservice = function(id) {
         var deleteservicedata = {id:id }
         if(confirm('Are you sure you want to delete this service ?')) {
        Services.remove(deleteservicedata).then(function(res) {
            if (res) {
                 Services.all().then(function(data){
                        $scope.serivice = data.data; 
                         $(document).ready(function() {
                             $('#service').DataTable();
                         } );
                             });
                alert(res.message);
            } else {
                $scope.update = "error";
            }
        });
    }
    }
    
    
    $scope.editservicedata = function() {
        var neweditservice = {
            service : this.activeservice.service,
            price : this.activeservice.price,
            description : this.activeservice.description,
            id : this.activeservice._id,
        }
        
        Services.update(neweditservice).then(function(res) {
            if (res) {
                $scope.update = res.message;
                 $("#editservice").modal("hide");
                 Services.all().then(function(data){
                        $scope.serivice = data.data; 
                         $(document).ready(function() {
                             $('#service').DataTable();
                         } );
                             });
                alert("Service data updated");
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
    
});

adminApp.controller('bookingCtrl', function($scope,$rootScope,Customers ,Services,Rooms) {      
   $rootScope.today = new Date();
   $scope.booki=[];
    $scope.book=function(){
       $("#calender").removeClass("active");
       $("#addbook").removeClass("active");
       $("#invoice").removeClass("active");
        $("#bookings").addClass("active");
                            
                            $(".tab-content div").removeClass("active");
                            $(".tab-content div").removeClass("in");
                            $(".bokingdtsl-tbl").addClass("active in");
                           
                        } 
    $scope.cal=function(){
       $("#bookings").removeClass("active");
       $("#addbook").removeClass("active");
       $("#invoice").removeClass("active");
   $("#calender").addClass("active");
                            
                            $(".tab-content div").removeClass("active");
                            $(".tab-content div").removeClass("in");
                            $(".cal").addClass("active in");
                        } 
     $scope.addbook=function(){
       $("#bookings").removeClass("active");
       $("#calender").removeClass("active");
       $("#invoice").removeClass("active");
   $("#addbook").addClass("active");
                            
                            $(".tab-content div").removeClass("active");
                            $(".tab-content div").removeClass("in");
                            $(".addbook").addClass("active in");
                        } 
    $scope.invoice=function(){
        $("#bookings").removeClass("active");
        $("#calender").removeClass("active");
        $("#addbook").removeClass("active");
        $("#invoice").addClass("active");
                            
                            $(".tab-content div").removeClass("active");
                            $(".tab-content div").removeClass("in");
                            $(".invoice-amout").addClass("active in");
                        } 

$scope.modelclient=function(){  
     $("#myModal").modal();
};              
 

////calendar  
 $scope.cus_callendar = [];
Customers.all().then(function(data){
           $scope.cust_call = data.data;  
            $scope.cus_callendar= $scope.cust_call;
            
    })
   

setTimeout(function(){
    var event = [];
   // var day = 60 * 60 * 24 * 1000;
   
    for (var i=0; i<$scope.cus_callendar.length; i++)
    {
            var start = new Date($scope.cus_callendar[i].arrival_date);
            var end = new Date($scope.cus_callendar[i].departure_date)+1;
            event.push({title: ($scope.cus_callendar[i].room_booked[0].room_number +" , " + $scope.cus_callendar[i].name +" , " + $scope.cus_callendar[i].total_days +" " +"Days"  + " , " + $scope.cus_callendar[i].email),
            start: start,
            end: end}); 
    }
   
    $('#calendar').fullCalendar({
        
        
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      footer: {
        left: 'prev,next today',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: Date.now(),
      navLinks: true, // can click day/week names to navigate views
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      events: event
    });

  },1000);

  $scope.totalstayingdays =  0;
////calendar
setTimeout(function(){
 var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
 var checkin = $('#checkindate').datepicker({
  onRender: function(date) {
    return date.valueOf() < now.valueOf() ? 'disabled' : '';
  }
}).on('changeDate', function(ev) {
  if (ev.date.valueOf() > checkout.date.valueOf()) {
    var newDate = new Date(ev.date)
    newDate.setDate(newDate.getDate() + 1);
    checkout.setValue(newDate);
  }
  checkin.hide();
  $('#checkoutdate')[0].focus();
}).data('datepicker');
var checkout = $('#checkoutdate').datepicker({
  onRender: function(date) {
    return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
  }
  
}).on('changeDate', function(ev) {
  checkout.hide();
 ////start date
        var start = $("#checkindate").val();
        var fields = start.split('/');
        var date = fields[0];
        var mnth = fields[1];
        var year = fields[2];
        var startdate = (mnth+'/'+date+'/'+year)
        var startD = new Date(startdate);
  //// end date      
        var end = $("#checkoutdate").val();
        var fields1 = end.split('/');
        var date1 = fields1[0];
        var mnth1 = fields1[1];
        var year1 = fields1[2];
        var enddate = (mnth1+'/'+date1+'/'+year1)
        var endD = new Date(enddate);
        var diff = parseInt((endD.getTime()-startD.getTime())/(24*3600*1000));
//        $rootScope.staying = 0;
        $scope.$apply($scope.totalstayingdays =  diff);
}).data('datepicker');
 },1000);


///dob

setTimeout(function(){
 var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
 var checkin = $('#dateofbirth').datepicker({
  autoclose: true,
  onRender: function(date) {
    return date.valueOf() > now.valueOf() ? 'disabled' : '';
  }
})
 },1000);




//// all bookings//////////////


 Customers.all().then(function(data){
           $scope.customer = data.data;  
           $(document).ready(function() {
                $('#room').DataTable();
            } );
    })
    
    $scope.setActive = function(custom) {
        $scope.active = 1;
       $scope.activeCustomer = custom;
       
    }


//// all bookings//////////////


/// govt id upload

$scope.govt_id = function(input) {
          $scope.loading = true;
        Customers.uploadimage(input.files[0]).then(function(res) {
            $scope.loading = false;
            if(res){
             $scope.govt_id_image = res[0].location;
            }
        });
    }

//// govt id uplaod

Customers.allcustomer_detail().then(function(data){
           $scope.customer_data = data.data; 
    })

$scope.changedcustomer = function(cus_item) {
    $scope.booking = JSON.parse(cus_item);
};



        $scope.newbooking = function(){
            
            var datedob = $("#dateofbirth").val();
            var dateFrom = moment(datedob,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z';
            this.booking.dob = dateFrom;
            
                $scope.booki = {};
                $scope.booki.name = this.booking.name;
                $scope.booki.govt_id = this.booking.govt_id;
                $scope.booki.govt_id_image = $scope.govt_id_image;
                $scope.booki.email = this.booking.email;
                $scope.booki.dob = this.booking.dob;
                $scope.booki.adults = this.booking.adults;
                $scope.booki.children = this.booking.children;
                $scope.booki.phone = this.booking.phone;
                $scope.booki.address = this.booking.address;
                $scope.booki.description = this.booking.description;
            }
            $scope.closemodelcustomer=function(){  
                        $("#myModal").modal("hide");
                         };
                
                
             
        
   ////service 
   var selecteddata = [];
   var i = 0;
    $scope.subtotal = 0;
   serviceObj = {service:'',price:''};
   Services.allservice().then(function(data){
           $scope.servicedata = data.data;
           $scope.selectedValue = function(item, checked) {
               serviceObj = {service: item.service ,price: item.price};
            if (checked == true) {
                selecteddata.push(serviceObj);
                $scope.new_service = selecteddata;
                        $scope.subtotal += parseInt(serviceObj.price);
            } else {
                for (i=selecteddata.length-1; i >=0 ; i--) {
                    if (selecteddata[i].service == serviceObj.service) {
                        selecteddata.splice(i, 1);
                        $scope.new_service = selecteddata;
                        $scope.subtotal -= parseInt(serviceObj.price);
                    }
                }
            }
        }           
    });
    
   ////////// service
        
  //////// Add room 
  
   roomObj = {room_type:'',room_number:'',price:''};
  $scope.subtotal = 0;

  Rooms.availableroom().then(function(data){
           $scope.roomavai = data.data; 
            $scope.itemList = [];
            $scope.datalength =[];
            $scope.rowdata = [];
            $scope.blisterPackTemplates = $scope.roomavai;
            var flag = 1;
            $scope.changedValue = function(item) {
                roomObj = {room_type: JSON.parse(item).room_type ,room_number: JSON.parse(item).room_number,price: JSON.parse(item).price};
                $scope.datalength.push(roomObj);
                if($scope.rowdata.length < 1){
                    $scope.rowdata.push(roomObj);
                     $scope.subtotal += parseInt(roomObj.price*$scope.totalstayingdays);
                }else{
                    for(var i=0; i<$scope.rowdata.length; i++){
                        if($scope.rowdata[i].room_number == roomObj.room_number){
                            flag = 0;
                            break;
                        }else{
                            flag = 1;
                        }
                    }
                    if(flag == 1){
                        $scope.rowdata.push(roomObj);
                         $scope.subtotal += parseInt(roomObj.price*$scope.totalstayingdays);
                    }else{
                    }
                }
                
                
               
                 var data;
                   if($scope.datalength.length <= 1)
                   {
                     
                       var len = $scope.datalength.length;
                        var tr = $('#roomdata #'+ $scope.datalength[0].room_number).length; 
                  if(tr == 0){    
                data +="<tr id='"+$scope.datalength[0].room_number+"'>    <td>"+ $scope.datalength[0].room_type +"</td> \n\
                                <td>"+ $scope.datalength[0].room_number +"</td>\n\
                                <td>"+ $scope.datalength[0].price +"</td>  \n\
                                <td><span id="+$scope.datalength[0].room_number+" class='delete'>\n\
                                <i class='fa fa-times delete-icn' aria-hidden='true'></i></span></td></tr>";
                    } }else{
                         
                       var len = $scope.datalength.length;
                       var tr = $('#roomdata #'+ $scope.datalength[len-1].room_number).length;
                        if(tr == 0){
                data +="<tr id='"+$scope.datalength[len-1].room_number+"'>    <td>"+ $scope.datalength[len-1].room_type +"</td>\n\
                                <td>"+ $scope.datalength[len-1].room_number +"</td>\n\
                                <td>"+ $scope.datalength[len-1].price +"</td>\n\
                                <td><span id="+$scope.datalength[len-1].room_number+" class='delete'>\n\
                                <i class='fa fa-times delete-icn' aria-hidden='true'></i></span></td></tr>";
                    } }
                  

                       $('#roomdata').append(data);
                   
        $(".delete").on('click',function(){
            var idtr = $(this).attr('id');
                    for(var i = 0; i < $scope.rowdata.length; i++){
                        if(idtr ==  $scope.rowdata[i].room_number){
                            $scope.$apply($scope.subtotal -= parseInt($scope.rowdata[i].price*$scope.totalstayingdays));
                                 $scope.rowdata.splice(i,1);
                                 $('.sidetr tr').each(function(){
                                     if($(this).hasClass(idtr)){
                                         $(this).remove();
                                     }
                                 });
                                
                            }
                    }
                    
			$(this).parents("tr").remove();
		});
             }    
        });
        
        
  
  /////// Add room
        
            
            $scope.newbookingdata = function(){
                
                var checkin = $("#checkindate").val();
                var datecheckin = moment(checkin,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z';
                this.booking.arrival_date = datecheckin;
                
                var checkout = $("#checkoutdate").val();
                var datecheckout = moment(checkout,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z';
                this.booking.departure_date = datecheckout;
                
                
                $scope.newbookingdat = {};
                $scope.newbookingdat.name = $scope.booki.name;
                $scope.newbookingdat.govt_id = $scope.booki.govt_id;
                $scope.newbookingdat.govt_id_image = $scope.booki.govt_id_image;
                $scope.newbookingdat.email = $scope.booki.email;
                $scope.newbookingdat.dob = $scope.booki.dob;
                $scope.newbookingdat.adults = $scope.booki.adults;
                $scope.newbookingdat.children = $scope.booki.children;
                $scope.newbookingdat.phone = $scope.booki.phone;
                $scope.newbookingdat.address = $scope.booki.address;
                $scope.newbookingdat.description = $scope.booki.description;
                $scope.newbookingdat.arrival_date = this.booking.arrival_date;
                $scope.newbookingdat.departure_date = this.booking.departure_date;
                $scope.newbookingdat.total_days = $scope.totalstayingdays;
                $scope.newbookingdat.payment = "pending";
                $scope.newbookingdat.payment_method = " ";
                $scope.newbookingdat.tax = "0";
                $scope.newbookingdat.discount = "0";
                $scope.newbookingdat.total = "0";
                $scope.newbookingdat.assigned_by = $rootScope.currentUser.name;
                $scope.newbookingdat.services = selecteddata;
                $scope.newbookingdat.room_booked = $scope.rowdata;
                Customers.add($scope.newbookingdat).then(function(res) {
                    if(res){
                        $scope.message = res;
                        alert("New Booking added");
                        Customers.all().then(function(data){
                            $scope.customer = data.data;  
                            $(document).ready(function() {
                                 $('#room').DataTable();
                             } );
                     })
                        window.location.reload();
                    }else{
                        $scope.message = res;
                    }
                });  
           
         var room_len = $scope.rowdata.length;
         $scope.room_num = [];
         for(var r = 0; r < room_len; r++ )
         {
              $scope.room_num.push($scope.rowdata[r].room_number);
         }
           $scope.newroomstatus = {};
           $scope.newroomstatus.room_booked = $scope.room_num;
           Customers.updateroomstatus($scope.newroomstatus).then(function(res) {
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
        });
            }
     
            
    ///////////////////// Invoice //////////////////
    
    Customers.invoice().then(function(data){
         $scope.in_custom = data.data; 
         $(document).ready(function() {
                $('#invoicebill').DataTable();
            } );
    })
    
    $scope.ActiveInvoice = function(list_invoice) {
        $scope.active = 1;
        $scope.invoice.taxpercentage = 0;
        $scope.invoice.discount = 0;
        $scope.activeInvoice = list_invoice;
       var total = 0;
       var lenroom = $scope.activeInvoice.room_booked.length;
       for(var i = 0; i < lenroom ; i++)
       {
           if($scope.activeInvoice.room_booked.length > 0){total +=  parseInt(($scope.activeInvoice.room_booked[i].price * $scope.activeInvoice.total_days));}
         
       }
       var lenthacking = $scope.activeInvoice.client_thacking.length;
       for(var i = 0; i < lenthacking ; i++)
       {
           if($scope.activeInvoice.client_thacking.length > 0){total +=  parseInt(($scope.activeInvoice.client_thacking[i].price * $scope.activeInvoice.client_thacking[i].quantity));}
          
       }
       var lenservice = $scope.activeInvoice.client_service.length;
       for(var i = 0; i < lenservice ; i++)
       {
           if($scope.activeInvoice.client_service.length > 0){total +=  parseInt($scope.activeInvoice.client_service[i].price);}
         
       }
       
      $scope.insubtotal = total;
    }
    
  
    $scope.saveinvoice = function() {
        
        var totalvalue = $("#total").val();
        this.invoice.total = totalvalue;
        var saveinvoicedata  = {
                    payment : "paid",
                    payment_method : this.activeInvoice.payment_method,
                    tax : this.activeInvoice.tax,
                    discount : this.activeInvoice.discount,
                    total : this.invoice.total,
                    customer_id : this.activeInvoice._id
                }
        Customers.savebilldata(saveinvoicedata).then(function(res) {
            if (res) {
                $scope.update = res.message;
                Customers.all().then(function(data){
                            $scope.customer = data.data;  
                            $(document).ready(function() {
                                 $('#room').DataTable();
                             } );
                     })
                Customers.invoice().then(function(data){
                            $scope.in_custom = data.data; 
                            $(document).ready(function() {
                                   $('#invoicebill').DataTable();
                               } );
                       })     
                alert("Invoice save");
            } else {
                $scope.update = "error";
            }
        });
       
    }; 
    
    
    
    /////////////////// Invoice /////////////////
            

    /////////////////// Save as PDF and print /////////////////
    
    var billdate = new Date();
    function convertcbillDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}
var newbilldate = convertcbillDate(billdate);
    
    
      var doc = new jsPDF('p', 'mm', 'a4');
      doc.setFontSize(22);
//doc.text(20, 20, 'This is a title');
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};


$('#cmd').click(function () {
     
    doc.fromHTML($('#content').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save($scope.activeInvoice.name + newbilldate + 'Bill'+'.pdf');
});


setTimeout(function(){
$("#print").click(function(){
    $(this).removeClass("vlauehidden");
})}, 2000); 

$.fn.extend({
	print: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});
    
    
    /////////////////// Save as PDF and print /////////////////
            
            
    
                    
});



adminApp.controller('forgotpasswordCtrl', function($scope,Users,$location,$rootScope) {
     $scope.forgotpass = function() {
        
        if (Object.keys(this.user).length == 0) {
            $scope.message = "Please enter your email!";
            return false;
        }
        Users.adminForgot(this.user).then(function(res) {
            if (res) {
                $scope.message = res.message;
            } else {
                $scope.message = res.message;
            }
        });
    }
    
    $scope.resetpass = function(user) {

        if (!user) {
            $scope.message = "Please enter password && confirm password";
            return false;
        }else if(!user.password){
             $scope.message = "Please enter password!";
            return false;
        }else if(!user.confirmpassword){
             $scope.message = "Please enter confirm password!";
            return false;
        }
        else if(user.password!=user.confirmpassword) {
            $scope.message = "The password and confirm password are not same";
             return false;
        }
        user.salt=$rootScope.salt;
        
        Users.changepass(user).then(function(res) {
            
            if (res) {
                $rootScope.message = res.message;
            } else {
                $rootScope.errormsg = res.message;
            }
        });
    }
})


// checkout control

adminApp.controller('checkoutCtrl', function($scope,$rootScope,Rooms,Customers) {      
    
     Customers.all().then(function(data){
           $scope.customer = data.data;  
           $(document).ready(function() {
                $('#checkout').DataTable();
            } );
           
    })
    
     $scope.setActive = function(custom) {
        $scope.active = 1;
       $scope.activecheckoutcus = custom;
    }  
    
    
    $scope.changestatuscus = function() {
            $scope.savestatus = {};
            $scope.savestatus.status = $scope.activecheckoutcus.status;
            $scope.savestatus.customer_id = this.activecheckoutcus._id;
        Customers.changestatus($scope.savestatus).then(function(res) {
            if (res) {
                $scope.update = res.message;
                alert("Status changed!");
                Customers.all().then(function(data){
           $scope.customer = data.data;  
           $(document).ready(function() {
                $('#checkout').DataTable();
            } );
           
    })
            } else {
                $scope.update = "error";
            }
        });
        var roombook_len = $scope.activecheckoutcus.room_booked.length;
        $scope.roombooki = [];
         for(var rs = 0; rs < roombook_len; rs++ )
         {
              $scope.roombooki.push($scope.activecheckoutcus.room_booked[rs].room_number);
         }
        $scope.roomstatuspaybill = {};
           $scope.roomstatuspaybill.room_status = $scope.roombooki;
           Customers.updateroomstatuspaybill($scope.roomstatuspaybill).then(function(res) {
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
        }); 



       
    }; 
    
    
    
    
});

adminApp.controller('service_ticketsCtrl', function($scope,$rootScope,Rooms,Customers,Hotel_staff) {      
    
     
    Customers.all().then(function(data){
           $scope.customerservice = data.data;  
            $(document).ready(function() {
                $('#serviceclient').DataTable();
            } );
    })
    
    Hotel_staff.allstaff().then(function(data){
            $scope.hotelstaff = data.data; 
        })
    
    
    $scope.setActive = function(clientthcak) {
        $scope.active = 1;
       $scope.activeCustomerservice = clientthcak;
    }  
    $scope.setActiveservice = function(servicenew) {
        $scope.active = 1;
       $scope.activeserice = servicenew;
    } 
    
    
    $scope.closedetails=function(){  
     $("#editserviceticket").modal("hide");
     $("#clientservicedetails").modal("hide");
}; 
    
    
    $scope.addclientservice = function() {
        if(this.client_service == undefined || this.client_service == 'undefined'){
        alert("Please enter service");
                    return false; 
        }else{
            if(this.client_service.service_client == null || this.client_service.service_client == undefined || this.client_service.service_client == 'undefined' )
                {
                    alert("Please enter service");
                    return false;
                }
             if(this.client_service.price == null || this.client_service.price == undefined || this.client_service.price == 'undefined' )
                {
                    alert("Please enter price (if free 0)");
                    return false;    
                }
                 var postdataservice  = {
                    service : this.client_service.service_client,
                    status : 'Pending',
                    price : this.client_service.price,
                    assigned_to : this.client_service.assigned_to,
                    description : this.client_service.description,
                    id : this.activeCustomerservice._id
                }
        Customers.addclientservice(postdataservice).then(function(res) {
            if (res) {
                $scope.update = res.message;
                $("#addclientservice").modal("hide");
                $("#addclientservice input").val('');
                $("#addclientservice textarea").val('');
                Customers.all().then(function(data){
                   $scope.customerservice = data.data;  
                    $(document).ready(function() {
                        $('#serviceclient').DataTable();
                    }); })
                alert("New service added");
            } else {
                $scope.update = "error";
            }
        }); }
    }; 
    
    
     $scope.deleteservice = function(id) {
        $scope.data={};
         $scope.data.id=this.activeCustomerservice._id;
         $scope.data.orderid=id;
         if(confirm('Are you sure you want to delete this service ?')) {
        Customers.deleteclientservice($scope.data).then(function(res) {
            if (res) {
              alert(res.message);
                $scope.del = res.message;  
                 $("#clientservicedetails").modal("hide");
                Customers.all().then(function(data){
                   $scope.customerservice = data.data;  
                    $(document).ready(function() {
                        $('#serviceclient').DataTable();
                    }); })
            } else {
                $scope.update = "error";
            }
        });
        
    }
    else
    { 
     $scope.update = "error";
        }
        
    }
    
    $scope.editclientservice = function() {
        $scope.editclientservice = {};
        $scope.editclientservice.status = this.editclient_service.status;
        $scope.editclientservice.service_id = this.activeserice._id;
        Customers.editclientservice($scope.editclientservice).then(function(res) {
            if (res) {
                $scope.update = res.message;
                alert("Service status updated");
                Customers.all().then(function(data){
                   $scope.customerservice = data.data;  
                    $(document).ready(function() {
                        $('#serviceclient').DataTable();
                    }); })
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
    
    
});

adminApp.controller('resturant_ordersCtrl', function($scope,$rootScope,Resturant,Menus) {      
     
    
    
     Resturant.all().then(function(data){
           $scope.resturant = data.data;
            $(document).ready(function() {
                $('#resturantorder').DataTable();
            } );
    });
    
    $scope.setActive = function(resturantdata) {
        $scope.active = 1;
       $scope.resturantservice = resturantdata;
        var total = 0;
       var lenorder = $scope.resturantservice.order_detail.length;
       for(var i = 0; i < lenorder ; i++)
       {
           if($scope.resturantservice.order_detail.length > 0){total +=  parseInt(($scope.resturantservice.order_detail[i].price * $scope.resturantservice.order_detail[i].quantity));}
         
       }
      $scope.insubtotal = total;
    }
    

$scope.closemodelorder=function(){  
     $("#addneworder").modal("hide");
     $("#addneworder input").val('');
     $("#addneworder textarea").val('');
}; 

Menus.all().then(function(data){
            $scope.menudatarestur = data.data;
        })

$("#selectedresturantValue").on("change", function () {        
    $modal = $('#itemreturvalue');
    $modal.modal('show');
    });    
    
    $scope.selectedmenurestuValue = function(selectemenurestu) {
        $scope.active = 1;
       $scope.activemenurestucat = JSON.parse(selectemenurestu);
    }
    
    var selectedmenuitem = [];
   var i = 0;
    $scope.itemtotal = 0;
   menuitemObj = {order:'',price:'',quantity:'',description:''};
   Menus.all().then(function(data){
           $scope.menuitemdata = data.data;
           $scope.selectedmenuItem = function(item, checked) {
               menuitemObj = {order: item.name ,price: item.price ,quantity:1,description: item.description};
            if (checked == true) {
                selectedmenuitem.push(menuitemObj);
                $scope.new_menuitem = selectedmenuitem;
                        $scope.total += parseInt(menuitemObj.price);
            } else {
                for (i=selectedmenuitem.length-1; i >=0 ; i--) {
                    if (selectedmenuitem[i].service == menuitemObj.service) {
                        selectedmenuitem.splice(i, 1);
                        $scope.new_menuitem = selectedmenuitem;
                        $scope.total -= parseInt(menuitemObj.price);
                    }
                }
            }
        }
        $scope.updateTotal = function(){
	  var total = 0;
	  angular.forEach($scope.new_menuitem, function(itemsdata){
	    total += (itemsdata.quantity)*parseInt(itemsdata.price);
	  });
	  $scope.total = total;
	};
	
	$scope.updateTotal();
        $scope.remove = function(item) { 
        var index = $scope.new_menuitem.indexOf(item);
         for (i=selectedmenuitem.length-1; i >=0 ; i--) {
                    if (i == index) {
                        selectedmenuitem.splice(i, 1);
                        $scope.total -= (item.quantity)*parseInt(item.price);
                    }
                }     
      }
        
    });
    
    
    
var currentdate = new Date(); 
var datetime = currentdate.getDate()+""
                + (currentdate.getMonth()+1)  +""
                + currentdate.getFullYear() + ""  
                + currentdate.getHours() + ""  
                + currentdate.getMinutes() + "" 
                + currentdate.getSeconds();
$rootScope.order_no = datetime; 

     $scope.newresturantdatadata = function(){
                var newresturantdatadata = {
                name : this.resturant.name,
                order_no : $rootScope.order_no,
                table_no : this.resturant.table_no,
                tax : this.resturant.tax,
                discount : this.resturant.discount,
                order_detail : selectedmenuitem
            }
                console.log(newresturantdatadata)
                Resturant.add(newresturantdatadata).then(function(res) {
                    if(res){
                        $scope.message = res;
                        Resturant.all().then(function(data){
                        $scope.resturant = data.data;
                         $(document).ready(function() {
                             $('#resturantorder').DataTable();
                         } );});
                        $scope.new_menuitem = [];
                        $scope.new_menuitem.length = 0;
                        $scope.total = 0;
                        selectedmenuitem = [];
                        selectedmenuitem.length = 0;
                        alert("New order added");
                    }else{
                        $scope.message = res;
                    }
                });   
            }
    
     $scope.deleteorder = function(id) {
         $scope.data={};
         $scope.data.id=id;
         if(confirm('Are you sure you want to delete this order ?')) {
        Resturant.remove($scope.data).then(function(res) {
            if (res) {
                Resturant.all().then(function(data){
                        $scope.resturant = data.data;
                         $(document).ready(function() {
                             $('#resturantorder').DataTable();
                         } );});
                alert(res.message);
            } else {
                $scope.update = "error";
            }
        });
    }
    }
    
    
    $scope.editResturantdata = function() {
        $scope.editResturantdata = {};
        $scope.editResturantdata.name = this.resturantservice.name;
        $scope.editResturantdata.order_no = this.resturantservice.order_no;
        $scope.editResturantdata.order = this.resturantservice.order;
        $scope.editResturantdata.table_no = this.resturantservice.table_no;
        $scope.editResturantdata.description = this.resturantservice.description;
        $scope.editResturantdata.id = this.resturantservice._id;
        Resturant.update($scope.editResturantdata).then(function(res) {
            if (res) {
                $scope.update = res.message;
                alert("Order data updated");
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
   /////////////////// Save as PDF and print /////////////////
    
    var billdate = new Date();
    function convertcbillDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}
var newbilldate = convertcbillDate(billdate);
    
    
      var doc = new jsPDF('p', 'mm', 'a4');
      doc.setFontSize(22);
//doc.text(20, 20, 'This is a title');
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};


$('#cmd').click(function () {
     
    doc.fromHTML($('#printcontent').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save($scope.resturantservice.name + newbilldate + 'Bill'+'.pdf');
});



setTimeout(function(){
$("#print").click(function(){
    $(this).removeClass("vlauehidden");
})}, 2000); 

$.fn.extend({
	print: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});
    
    
    /////////////////// Save as PDF and print ///////////////// 
    
    
    
    
    
});

adminApp.controller('client_thackingCtrl', function($scope,$rootScope,Rooms,Customers,Menus) {      
    
   Customers.all().then(function(data){
           $scope.customerthacking = data.data;  
           $(document).ready(function() {
                $('#clientthacking').DataTable();
            } );
           
    })
    
    $scope.setActive = function(clientthcak) {
        $scope.active = 1;
       $scope.activeCustomerthacking = clientthcak;
    }  
    $scope.setActiveOrder = function(clientthcakorder) {
        $scope.active = 1;
       $scope.activeorder = clientthcakorder;
    } 
    
    
    $scope.closedetails=function(){  
     $("#editclientthacking").modal("hide");
     $("#clientthackingdetails").modal("hide");
     
}; 
    
    
    Menus.all().then(function(data){
            $scope.menudatathcki = data.data;
        })
        
    $("#selectedmenuValue").on("change", function () {        
    $modal = $('#itemvalue');
    $modal.modal('show');
    });    
    
    $scope.selectedmenuValue = function(selectemenu) {
        $scope.active = 1;
       $scope.activemenucat = JSON.parse(selectemenu);
    }
    
//    add menu data 

   var selectedmenuitem = [];
   var i = 0;
    $scope.itemtotal = 0;
   menuitemObj = {order:'',price:'',quantity:'',description:''};
   Menus.all().then(function(data){
           $scope.menuitemdata = data.data;
           $scope.selectedmenuItem = function(item, checked) {
               menuitemObj = {order: item.name ,price: item.price ,quantity:1,description: item.description};
            if (checked == true) {
                selectedmenuitem.push(menuitemObj);
                $scope.new_menuitem = selectedmenuitem;
                        $scope.total += parseInt(menuitemObj.price);
            } else {
                for (i=selectedmenuitem.length-1; i >=0 ; i--) {
                    if (selectedmenuitem[i].service == menuitemObj.service) {
                        selectedmenuitem.splice(i, 1);
                        $scope.new_menuitem = selectedmenuitem;
                        $scope.total -= parseInt(menuitemObj.price);
                    }
                }
            }
        }
        $scope.updateTotal = function(){
	  var total = 0;
	  angular.forEach($scope.new_menuitem, function(itemsdata){
	    total += (itemsdata.quantity)*parseInt(itemsdata.price);
	  });
	  $scope.total = total;
	};
	
	$scope.updateTotal();
        $scope.remove = function(item) { 
        var index = $scope.new_menuitem.indexOf(item);
         for (i=selectedmenuitem.length-1; i >=0 ; i--) {
                    if (i == index) {
                        selectedmenuitem.splice(i, 1);
                        $scope.total -= (item.quantity)*parseInt(item.price);
                    }
                }     
      }
        
    });

// add menu data
    
    
    $scope.addclientthacking = function() {
        var newthackdata = {
                client_thacking : selectedmenuitem,
                id : this.activeCustomerthacking._id
        }
        Customers.addclientthacking(newthackdata).then(function(res) {
            if (res) {
                $scope.update = res.message;
                Customers.all().then(function(data){
           $scope.customerthacking = data.data;  
            $(document).ready(function() {
                 $('#clientthacking').DataTable();
             } ); })
                $("#addclientthacking").modal("hide");
                $scope.new_menuitem = [];
                $scope.new_menuitem.length = 0;
                $scope.total = 0;
                selectedmenuitem = [];
                selectedmenuitem.length = 0;
                alert("New order added");
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
  
  
  
     $scope.deletethackingorder = function(id) {
        $scope.data={};
         $scope.data.id=this.activeCustomerthacking._id;
         $scope.data.orderid=id;
         if(confirm('Are you sure you want to delete this order ?')) {
        Customers.deleteclientthacking($scope.data).then(function(res) {
            if (res) {
                Customers.all().then(function(data){
           $scope.customerthacking = data.data;  
           $(document).ready(function() {
                $('#clientthacking').DataTable();
            } );
    })
              alert(res.message);
              
                $scope.del = res.message; 
            } else {
                $scope.update = "error";
            }
        });
        
    }
    else
    { 
     $scope.update = "error";
        }
        
    }
    
    
    $scope.editclientthacking = function() {
        $scope.editclientthacking = {};
        $scope.editclientthacking.status = this.editclient_thacking.status;
        $scope.editclientthacking.tacking_id = this.activeorder._id;
        Customers.editclientthacking($scope.editclientthacking).then(function(res) {
            if (res) {
                $scope.update = res.message;
                Customers.all().then(function(data){
           $scope.customerthacking = data.data;  
           $(document).ready(function() {
                $('#clientthacking').DataTable();
            } );})
                alert("Order status updated");
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
    
});


adminApp.controller('add_staffCtrl', function($scope,$rootScope,Hotel_staff) {      
    

    Hotel_staff.allstaff().then(function(data){
            $scope.hotelstaff = data.data;  
            $(document).ready(function() {
                $('#staffdata').DataTable();
            } );
            
        })
 
        $scope.setActive = function(staff) {
            $scope.active = 1;
            $scope.activestaff = staff;
        } 


    $('#staffdateofbirth').datepicker({autoclose: true})
    $('#joiningdate').datepicker({autoclose: true})

    $scope.staff_image = function(input) {
          $scope.loading = true;
        Hotel_staff.uploadimagestaff(input.files[0]).then(function(res) {
            $scope.loading = false;
            if(res){
             $scope.hotel_staff_image = res[0].location;
            }
        });
    }
    
    $scope.addhotelstaff = function() {

            var staffdatedob = $("#staffdateofbirth").val();
            var staffdateFrom = moment(staffdatedob,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z';
            this.staff.dob = staffdateFrom;

            var staffjoiningdate = $("#joiningdate").val();
            var staffjoiningdateFrom = moment(staffjoiningdate,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z';
            this.staff.joining_date = staffjoiningdateFrom;  


          var staffnewdata = {

                name : this.staff.name,
                id_card: this.staff.idcard,
                image: $scope.hotel_staff_image,
                email: this.staff.email,
                gender: this.staff.gender,
                dob: this.staff.dob,
                position : this.staff.position,
                joining_date : this.staff.joining_date,
                salary : this.staff.salary,
                phone: this.staff.phone,
                address: this.staff.address,
                description : this.staff.description,
                status: "working",
          }
        Hotel_staff.addstaffdata(staffnewdata).then(function(res) {
            if (res) {
                $scope.update = res.message;
                $("#addstaff").modal("hide");
                $("#addstaff input").val('');
                $("#addstaff textarea").val('');
                Hotel_staff.allstaff().then(function(data){
                    $scope.hotelstaff = data.data;  
                    $(document).ready(function() {
                        $('#staffdata').DataTable();
                    } );
                         })
                alert("New staff added");
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
    
    
    $('#editstaffdateofbirth').datepicker({autoclose: true})
    $('#editjoiningdate').datepicker({autoclose: true})
    
     $scope.editstaffdata = function() {
         
            var editstaffdatedob = $("#editstaffdateofbirth").val();
            var editstaffdateFrom = moment(editstaffdatedob,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z';
            this.activestaff.dob = editstaffdateFrom;

            var editstaffjoiningdate = $("#editjoiningdate").val();
            var editstaffjoiningdateFrom = moment(editstaffjoiningdate,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z';
            this.activestaff.joining_date = editstaffjoiningdateFrom;  
         
         var editstaffdetail = {
             
                name : this.activestaff.name,
                id_card: this.activestaff.id_card,
                image: $scope.activestaff.staff_image,
                email: this.activestaff.email,
                gender: this.activestaff.gender,
                dob: this.activestaff.dob,
                position : this.activestaff.position,
                joining_date : this.activestaff.joining_date,
                salary : this.activestaff.salary,
                phone: this.activestaff.phone,
                address: this.activestaff.address,
                description : this.activestaff.description,
                id : this.activestaff._id
         }
        Hotel_staff.edithotelstaffdetail(editstaffdetail).then(function(res) {
            if (res) {
                $scope.update = res.message;
                $("#editstaff").modal("hide");
                    Hotel_staff.allstaff().then(function(data){
                        $scope.hotelstaff = data.data;  
                        $(document).ready(function() {
                            $('#staffdata').DataTable();
                        } );

                    })
                alert("Staff detail updated");
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
     
    $('#leaving_date').datepicker({autoclose: true})
    
     $scope.editstatusdata = function() {
         
            var leavingdate = $("#leaving_date").val();
            var leavingdateFrom = moment(leavingdate,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z';
            this.activestaff.leaving_date = leavingdateFrom;
         
         var editleavingstaffdetail = {
             
                status:this.activestaff.status,
                leaving_date: this.activestaff.leaving_date,
                id : this.activestaff._id
         }
         
        Hotel_staff.leavingstatus(editleavingstaffdetail).then(function(res) {
            if (res) {
                $scope.update = res.message;
                $("#editstatus").modal("hide");
                    Hotel_staff.allstaff().then(function(data){
                        $scope.hotelstaff = data.data;  
                        $(document).ready(function() {
                            $('#staffdata').DataTable();
                        } );

                    })
                alert("Staff detail updated");
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
    
    
    
    $scope.deletestaff = function(id) {
         var deletestaffdata = {id:id}
         if(confirm('Are you sure you want to delete this staff ?')) {
        Hotel_staff.deletestaff(deletestaffdata).then(function(res) {
            if (res) {
              alert(res.message);
                $scope.del = res.message;
                Hotel_staff.allstaff().then(function(data){
                    $scope.hotelstaff = data.data;  
                    $(document).ready(function() {
                        $('#staffdata').DataTable();
                    } );
                })
            } else {
                $scope.update = "error";
            }
        });
        
    }
    else
    { 
     $scope.update = "error";
        }
        
    }
    
    
});


adminApp.controller('add_menuCtrl', function($scope,$rootScope,Menus) {      
    
    Menus.all().then(function(data){
            $scope.menudata = data.data;  
            $(document).ready(function() {
                $('#menudata').DataTable();
            } );
            
        })
 
        $scope.setActive = function(menudata) {
            $scope.active = 1;
            $scope.activemenu = menudata;
        }      
    
    $scope.newmenudata = function(){
                var addmenudata = {
                    menu_name:this.menu.menuname,
                    description:this.menu.description
                }
                if(addmenudata.menu_name == null)
                {
                    alert("Please enter menu name");
                    return false;
                }
                else{
                Menus.add(addmenudata).then(function(res) {
                   if(res.error != 1){
                        $("#addmenu").modal("hide");
                        $("#addmenu input").val('');
                        $("#addmenu textarea").val('');
                        alert(res.message);
                         Menus.all().then(function(data){
                        $scope.menudata = data.data;  
                        $(document).ready(function() {
                            $('#menudata').DataTable();
                        } );

                    })
                    }else{
                        alert(res.message);
                    }
                });   }
            this.menuname = {};
            this.menu.menuname = '';
            this.menu.description = '';
            }
            
            
            
     $scope.editmenudata = function() {
         
        var editmenunewdata = {
            menu_name:this.activemenu.menu_name,
            description:this.activemenu.description,
            id : this.activemenu._id,
        }
        
        Menus.update(editmenunewdata).then(function(res) {
            if (res) {
                $scope.update = res.message;
                 $("#editmenu").modal("hide");
                 Menus.all().then(function(data){
                    $scope.menudata = data.data;  
                    $(document).ready(function() {
                        $('#menudata').DataTable();
                    } );})
                alert("Menu data updated");
            } else {
                $scope.update = "error";
            }
        });
    };        
            
            
    $scope.deletemenu = function(id) {
         var deletemenudata = {id:id}
         if(confirm('Are you sure you want to delete this menu ?')) {
        Menus.remove(deletemenudata).then(function(res) {
            if (res) {
              alert(res.message);
                $scope.del = res.message;
                Menus.all().then(function(data){
                    $scope.menudata = data.data;  
                    $(document).ready(function() {
                        $('#menudata').DataTable();
                    } );})
            } else {
                $scope.update = "error";
            }
        });
        
    }
    else
    { 
     $scope.update = "error";
        }
        
    }        
            
    
    $scope.item_image = function(input) {
          $scope.loading = true;
        Menus.uploadimagemenu(input.files[0]).then(function(res) {
            $scope.loading = false;
            if(res){
             $scope.menu_item_image = res[0].location;
            }
        });
    }
    
            
    $scope.addmenuitems = function() {
        
        var menu_items = {
            
            name : this.menuitem.name,
            price : this.menuitem.price,
            item_image: $scope.menu_item_image,
            description : this.menuitem.description,
            id : this.activemenu._id
        }
        Menus.addmenuitems(menu_items).then(function(res) {
            if (res) {
                $scope.update = res.message;
                $("#addmenuitem").modal("hide");
                $("#addmenuitem input").val('');
                $("#addmenuitem textarea").val('');
                 Menus.all().then(function(data){
            $scope.menudata = data.data;  
            $(document).ready(function() {
                $('#menudata').DataTable();
            } );
            
        })
                alert("New menu item added");
            } else {
                $scope.update = "error";
            }
        });
    };    
    
   $scope.setActivemenuitem = function(menusubitem) {
        $scope.active = 1;
       $scope.activemenu_item = menusubitem;
    } 
    
    $scope.editmenuitemsdata = function() {
        var editmenuitems = {
            name : this.activemenu_item.name,
            price : this.activemenu_item.price,
            item_image: $scope.menu_item_image,
            description : this.activemenu_item.description,
            menuitem_id :this.activemenu_item._id
        }
        Menus.editmenuitems(editmenuitems).then(function(res) {
            if (res) {
                $scope.update = res.message;
                $("#editmenuitems").modal("hide");
                $("#addmenuitem").modal("hide");
                 Menus.all().then(function(data){
            $scope.menudata = data.data;  
            $(document).ready(function() {
                $('#menudata').DataTable();
            } );
            
        })
                alert("Item updated");
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
    $scope.deletemenuitems = function(id) {
         var deletemenudata = {
             id: id,
             menu_id: this.activemenu._id
         }
         console.log(deletemenudata)
         if(confirm('Are you sure you want to delete this order ?')) {
        Menus.deletemenusitems(deletemenudata).then(function(res) {
            if (res) {
              alert(res.message);
                $scope.del = res.message;  
                $("#editmenuitems").modal("hide");
                $("#addmenuitem").modal("hide");
                Menus.all().then(function(data){
            $scope.menudata = data.data;  
            $(document).ready(function() {
                $('#menudata').DataTable();
            } );
            
        })
            } else {
                $scope.update = "error";
            }
        });
    }
    else
    { 
     $scope.update = "error";
        }
        
    }
    
    
    
    
    
});