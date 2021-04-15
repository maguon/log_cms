/**
 * Created by star on 2018/11/13.
 */
var admin_login_controller=angular.module("admin_login_controller",[]);
admin_login_controller.controller("admin_login_controller", ['$rootScope','$scope','$location','$q',"_basic","$host","_config",

    function($rootScope,$scope,$location,$q,_basic,$host,_config){
        $scope.username='';
        $scope.password='';
        $scope.groundNameShengShi=_config.groundNameShengShi;
        $scope.login = function(){
            if($scope.username==''||$scope.password==''){
                swal("账号或密码不能为空", "", "error");
            } else {
                _basic.post($host.api_url+"/adminLogin", {
                    "userName": $scope.username,
                    "password": $scope.password
                }).then(function(data){
                    if(data.success==true){
                        _basic.setSession(_basic.USER_AUTH_NAME,data.result.accessToken);
                        _basic.setSession(_basic.USER_ID,data.result.userId);
                        _basic.setSession(_basic.USER_STATUS,data.result.userStatus);
                        _basic.setSession(_basic.USER_TYPE,"99");
                        _basic.setHeader(_basic.USER_TYPE, "99");
                        _basic.setHeader(_basic.COMMON_AUTH_NAME, data.result.accessToken);
                        window.location.href="./index.html";
                    }else {
                        swal(data.msg,"","error");
                    }
                }).catch(function(error){
                    swal("登录异常", "", "error");
                    console.log(error)
                });
            }

        };
    }]);
