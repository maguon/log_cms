app_admin_module.controller("information_menu_list_controller", ["$scope", "_basic", "_config", "$host","$state", "$stateParams", function ($scope, _basic, _config, $host,$state, $stateParams) {
    var id = $stateParams.id;//跳转过来的id
    // 返回
    $scope.return = function () {
        $state.go($stateParams.from,{from:"information_menu_list"}, {reload: true})
    };

    //获取根列表
    function getRootList(){
        _basic.get($host.api_url + "/news?menuId="+id).then(function (data) {
            if (data.success == true) {
                $scope.rootList = data.result;
            }
        })
    }


    //获取菜单列表
    function getMenuList(){
        _basic.get($host.api_url + "/menu?menuId="+id).then(function (data) {
            if (data.success == true) {
                $scope.menuName = data.result[0];
            }
        })
    }


    // 查看详情
    $scope.lookOperation = function (id) {
        $(".modal").modal();
        $("#look_Operator").modal("open");
        _basic.get($host.api_url + "/menu?menuId=" + id).then(function (data) {
            if (data.success == true) {
                $scope.look_operation = data.result[0];

            } else {
                swal(data.msg, "", "error");
            }

        })
    };


    //删除
    $scope.delete =function(id, imageId){
        swal({
                title: "确定删除当前栏目？",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function () {
                _basic.delete($host.api_url + "/news/" +id).then(function (data) {
                    if (data.success === true) {
                        swal("删除成功", "", "success");
                        getRootList()
                    } else {
                        swal(data.msg, "", "error");
                    }
                });

                // 删除对应图片
                if (imageId !== undefined) {
                    _basic.delete($host.api_url + "/image/" + imageId).then(function (data) {});
                }
            });
    };


    getRootList();
    getMenuList();
}]);