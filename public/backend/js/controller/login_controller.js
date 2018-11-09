
var login_controller=angular.module("login_controller",[]);
login_controller.controller("login_controller", ['$rootScope','$scope','$location','$q',"_basic","$host","_config",

    function($rootScope,$scope,$location,$q,_basic,$host,_config){
        $scope.username='';
        $scope.password='';
        $scope.login = function(){



        };
        console.log('Login Controller Init !');
    }
]);
