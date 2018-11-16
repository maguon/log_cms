var login_router=angular.module("login_router",[]);
login_router.config(['$stateProvider',"$urlRouterProvider",function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when("","/login");
    $stateProvider
        .state("login", {  //路由状态
            url: "/login",  //路由路径
            templateUrl: "/js/views/login.html",  //路由填充的模板
            controller:'loginController'
        })
}]);