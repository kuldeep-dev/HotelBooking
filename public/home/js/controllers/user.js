/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */

 app.controller('ForgetCtrl', function($scope, $timeout, Users,$rootScope) {
    $scope.user = {};
   
       $scope.resetpass = function(user) {
            console.log("salt->>>>>>>>",$rootScope.salt);
           console.log(user);

//        console.log(user);
//        return false;
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
        $scope.user.salt=$rootScope.salt;
        console.log($scope.user);
        console.log("harman");
//        console.log(user);
        //return false
        Users.changepass(user).then(function(res) {
            
            if (res) {
                //console.log(res.message);
                $rootScope.message = res.message;
                alert('Password reset Successfully');
                window.location = '/';
            } else {
                $rootScope.message = res.message;
                window.location = '/';
            }
        });
    }
   });
   
   
   
   