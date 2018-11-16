var app_admin_module = angular.module("app_module", ['ui.router',"ngCookies","baseService","hostService",'adminDirective']);

app_admin_module.config(['$httpProvider',"$cookiesProvider",function($httpProvider, $cookiesProvider) {

}]);
