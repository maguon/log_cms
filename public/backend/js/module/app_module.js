var app_module = angular.module("login_module", ['ui.router',"ngCookies","login_controller","baseService","hostService",'publicDirective']);

app_module.config(['$httpProvider',"$cookiesProvider",function($httpProvider, $cookiesProvider) {
    $cookiesProvider.defaults = {
        path: "/",
        domain: "",//cookie 作用域， cookies只在这个域和其子域有效
        expires:new Date(new Date().getTime()+5000),//有效时间
        secure: true//该cookie只在安全连接中被提供
    };
}]);
