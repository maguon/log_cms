app_admin_module.controller("column_list_management_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    $scope.size =11;
    $scope.start = 0;

    function getColumnList(){
        _basic.get($host.api_url + "/menu?"+ _basic.objToUrl({
            start: $scope.start.toString(),
            size: $scope.size
        })).then(function (data) {
            if (data.success == true) {
                $scope.menuBoxArray = data.result;
                $scope.menu_info_list = $scope.menuBoxArray.slice(0, 10);
                if ($scope.start > 0) {
                    $("#pre").show();
                }
                else {
                    $("#pre").hide();
                }
                if (data.result.length < $scope.size) {
                    $("#next").hide();
                }
                else {
                    $("#next").show();
                }

            }
        })
    }


    getColumnList();
}]);