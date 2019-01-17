app_admin_module.controller("setting_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {

    function getList(){
        _basic.get($host.api_url + "/style").then(function (data) {
            if (data.success == true) {
                $scope.styleList = data.result[0];
            }
        })
    }


    // 提交新增
    $scope.postStyle = function () {
        if ($scope.styleList.title == ''||$scope.styleList.css_link==undefined||$scope.styleList.js_link==undefined) {
            swal('请录入完整信息!', "", "error")
        } else {
            $scope.styleList.css_link=$scope.styleList.css_link.split(',');
            $scope.styleList.js_link=$scope.styleList.js_link.split(',');
            console.log($scope.styleList.js_link, $scope.styleList.css_link)
            var obj = {
                title: $scope.styleList.title,
                cssLink:$scope.styleList.css_link,
                jsLink:$scope.styleList.js_link
            };
            _basic.post($host.api_url + "/sid/0/style", obj).then(function (data) {
                if (data.success == true) {
                    swal("新增成功", "", "success");
                    getList();
                } else {
                    swal(data.msg, "", "error");
                }
            })
        }
    }


    getList()
}])