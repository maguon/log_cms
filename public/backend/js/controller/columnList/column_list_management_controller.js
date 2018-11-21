app_admin_module.controller("column_list_management_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    $scope.size =11;
    $scope.start = 0;

    //获取菜单
    function getMenu(){

        _basic.get($host.api_url + "/menu").then(function (data) {
            if (data.success == true) {
                $scope.columnList = data.result;
            }
        })
    }

    //查询
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

    /*新增按钮*/
    $scope.newOperator = function () {
        $scope.submitted = false;
        $scope.newRealName = "";
        $scope.newUserName = "";
        $scope.newUserSex = "";
        $scope.newUserPassword = "";
        $(".modal").modal();
        $("#newOperator").modal("open");

    };

    // 提交新增
    $scope.submitForm = function (isValid) {
        $scope.submitted = true;
        var sex_id = $(".sex").attr("sex");
        $scope.menuStatus = sex_id;
        if (isValid) {
            var obj = {
                menuPid: $scope.addColumn,
                menuName: $scope.addMenuName,
                menuNum:$scope.addnum,
                menuStatus:$scope.menuStatus
            };
            _basic.post($host.api_url + "/menu", obj).then(function (data) {
                if (data.success == true) {
                    swal("新增成功", "", "success");
                    $('#newOperator').modal('close');
                    getColumnList()
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
                if( $scope.look_operation.menu_status==1){
                    $("#hideOut ").removeClass("sex");
                    $("#showOut").addClass("sex");
                }
                else{
                    $("#showOut ").removeClass("sex");
                    $("#hideOut").addClass("sex");
                }

            } else {
                swal(data.msg, "", "error");
            }

        })
    };


    // 修改
    $scope.changeOperatorForm = function (isValid, id) {
        $scope.submitted = true;
        if (isValid) {
            var sex_id = $(".sex").attr("sex");
            $scope.newUserSex = sex_id;
            var obj = {
                menuPid:$scope.look_operation.menu_pid,
                menuName: $scope.look_operation.menu_name,
                menuNum: $scope.look_operation.menu_num,
                menuStatus: $scope.newUserSex,
                menuLink: $scope.look_operation.menu_link
            };
            _basic.put($host.api_url + "/menu/" + id, obj).then(function (data) {
                if (data.success == true) {
                    swal("修改成功", "", "success");
                    $('#look_Operator').modal('close');
                    getColumnList()
                } else {
                    swal(data.msg, "", "error");
                }

            })
        }
        else {
            swal('请录入完整的用户信息！', "", "error")
        }

    };


    //删除当前信息
    $scope.delete = function (id){
        _basic.delete($host.api_url + "/menu/" +id).then(function (data) {
            if (data.success === true) {
                getColumnList();
            }
            else {
                swal(data.msg, "", "error");
            }
        });

    }

    getMenu();
    getColumnList();
}]);