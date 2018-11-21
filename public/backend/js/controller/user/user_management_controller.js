app_admin_module.controller("user_management_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    $scope.size =11;
    $scope.start = 0;
    function getUserList(){
        _basic.get($host.api_url + "/user?"+ _basic.objToUrl({
            start: $scope.start.toString(),
            size: $scope.size
        })).then(function (data) {
            if (data.success == true) {
                $scope.userBoxArray = data.result;
                $scope.user_info_list = $scope.userBoxArray.slice(0, 10);
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
        if (isValid) {
            var sex_id = $(".sex").attr("sex");
            $scope.newUserSex = sex_id;
            var obj = {
                userName: $scope.newUserName,
                phone: $scope.newRealName,
                sex: $scope.newUserSex,
                password: $scope.newUserPassword
            };
            _basic.post($host.api_url + "/user", obj).then(function (data) {
                if (data.success == true) {
                    swal("新增成功", "", "success");
                    $('#newOperator').modal('close');
                    getUserList()
                } else {
                    swal(data.msg, "", "error");
                }

            })

        }
        else {
            swal('请录入完整的用户信息！', "", "error")
        }
    };

    // 查看详情
    $scope.lookOperation = function (id) {
        $(".modal").modal();
        $("#look_Operator").modal("open");
        _basic.get($host.api_url + "/user?userId=" + id).then(function (data) {
            if (data.success == true) {
                $scope.look_operation = data.result[0];
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
                phone: $scope.look_operation.phone,
                userName: $scope.look_operation.user_name,
                sex: $scope.newUserSex
            };
            _basic.put($host.api_url + "/user/" + id, obj).then(function (data) {
                if (data.success == true) {
                    swal("修改成功", "", "success");
                    $('#look_Operator').modal('close');
                    getUserList()
                } else {
                    swal(data.msg, "", "error");
                }

            })
        }
        else {
            swal('请录入完整的用户信息！', "", "error")
        }

    };



    // 停启用
    $scope.changeStatus = function (st, id) {
        if (st == "1") {
            $scope.changeSt = "0"
        } else if (st == "0") {
            $scope.changeSt = "1"
        }

        _basic.put($host.api_url + "/user/" + id + "/status/" + $scope.changeSt
            , {}).then(function (data) {
            if (data.success == true) {
            } else {
                swal(data.msg, "", "error");
            }

        })
    };


    // 分页
    $scope.getPrePage = function () {
        $scope.start = $scope.start - ($scope.size-1);
        getUserList();
    };
    $scope.getNextPage = function () {
        $scope.start = $scope.start + ($scope.size-1);
        getUserList();
    };
    getUserList();
}])