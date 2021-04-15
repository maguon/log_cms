app_admin_module.controller("home_page_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    $scope.hostName=$host.host_name;

}])