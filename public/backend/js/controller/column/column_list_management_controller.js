app_admin_module.controller("column_list_management_controller", ["$scope", "_basic","baseService", "_config", "$host", function ($scope, _basic,baseService, _config, $host) {
    $scope.showTr2 =false;
    $scope.showTr1 =false;
    $scope.linkList = _config.linkStatus;
    //获取菜单
    function getMenu(){
        _basic.get($host.api_url + "/menu").then(function (data) {
            if (data.success == true) {
                $scope.columnList = data.result;
            }
        })
    }

    //获取根列表
    function getRootList(){
        _basic.get($host.api_url + "/menu?menuPid=-1").then(function (data) {
            if (data.success == true) {
                $scope.rootList = data.result;
            }
        })
    }

    // 获取子一级
    $scope.showLastTr =function (id,index){
        // 子一级 全部隐藏
        $(".load_mission").hide();
        // 子一级 点击显示
        $(".load_mission" + index).show();
        // 取得 子一级 数据
        _basic.get($host.api_url + "/menu?menuPid="+id).then(function (data) {
            if (data.success) {
                // 子一级 数据
                $scope.firstList = data.result;
                // 子二级 数据
                $scope.scondList = [];
            }
        })
    };

    // 获取子二级
    $scope.showLastTr2 =function (id,index){
        // 子二级 全部隐藏
        $(".load1_mission").hide();
        // 子二级 点击显示
        $(".load1_mission" + index).show();
        // 取得 子二级 数据
        _basic.get($host.api_url + "/menu?menuPid="+id).then(function (data) {
            if (data.success) {
                $scope.scondList = data.result;
            }
        })
    };

    /*新增按钮*/
    $scope.newOperator = function () {
        $scope.submitted = false;
        $scope.addColumn = "";
        $scope.addnum = "";
        $scope.addMenuName = "";
        $scope.addHeaderShow = "";
        $scope.addLink ="";
        $scope.addMenuStatus ="";
        $scope.addMenuLink ="";
        $(".modal").modal();
        $("#newOperator").modal("open");

    };

    // 提交新增
    $scope.submitForm = function () {
        $scope.submitted = true;
        if($scope.addColumn==''||$scope.addMenuName==''||$scope.addnum==""||$scope.addHeaderShow==null||$scope.addMenuStatus==null||$scope.addLink==""){
            swal('请录入完整信息!',"","error")
        }else{
            var obj = {
                menuPid: $scope.addColumn,
                menuName: $scope.addMenuName,
                menuNum:$scope.addnum,
                menuHeaderShow:$scope.addHeaderShow,
                menuStatus:$scope.addMenuStatus,
                menuType: $scope.addLink,
                menuLink: $scope.addMenuLink
            };
            _basic.post($host.api_url + "/menu", obj).then(function (data) {
                if (data.success == true) {
                    swal("新增成功", "", "success");
                    $('#newOperator').modal('close');
                    getRootList();
                } else {
                    swal(data.msg, "", "error");
                }
            })
        }

    };


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


    // 修改
    $scope.changeOperatorForm = function (id) {
        $scope.submitted = true;
        if($scope.look_operation.menu_pid==''||$scope.look_operation.menu_name==''||$scope.look_operation.menu_num==null
            ||$scope.look_operation.menu_header_show==null||$scope.look_operation.menu_status==null){
            swal('请录入完整信息!',"","error")
        }else {
            var obj = {
                menuPid: $scope.look_operation.menu_pid,
                menuName: $scope.look_operation.menu_name,
                menuNum: $scope.look_operation.menu_num,
                menuHeaderShow: $scope.look_operation.menu_header_show,
                menuStatus: $scope.look_operation.menu_status,
                menuLink: $scope.look_operation.menu_link
            };
            _basic.put($host.api_url + "/menu/" + id, obj).then(function (data) {
                if (data.success == true) {
                    getRootList();
                    swal("修改成功", "", "success");
                    $('#look_Operator').modal('close');

                } else {
                    swal(data.msg, "", "error");
                }
            })
        }
    };


    //删除当前信息
    $scope.delete = function (id){
        swal({
                title: "确定删除当前栏目？",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
            if(isConfirm){
                _basic.delete($host.api_url + "/menu/" +id).then(function (data) {
                    if (data.success == true) {
                        getRootList();
                        swal("删除成功", "", "success");
                    }
                    else {
                        swal(data.msg, "", "error");
                    }
                });
            }
         });
    }


    getMenu();
    getRootList();

}]);