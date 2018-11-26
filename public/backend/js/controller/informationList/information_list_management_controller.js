app_admin_module.controller("information_list_management_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    $scope.showTr2 =false;
    $scope.showTr1 =false;
    $scope.linkList = _config.linkStatus;

    //获取根列表
    function getRootList(){
        _basic.get($host.api_url + "/menu?menuPid=-1").then(function (data) {
            if (data.success == true) {
                $scope.rootList = data.result;
            }
        })
    }

    //获取子一级
    $scope.showLastTr =function (id,index){
        if($scope.showTr1==true){
            $(".load_mission" + index).show();
            $scope.showTr1=false;
            $scope.showTr2=false;
        }
        else{
            $(".load_mission" + index).hide();
            $scope.showTr1=true;
        }
        $(".load_mission" + index).show();
        _basic.get($host.api_url + "/menu?menuPid="+id).then(function (data) {
            if (data.success == true) {
                $scope.firstList = data.result;
            }
        })
    }

    $scope.showLastTr2 =function (id,index){
        if($scope.showTr2==true){
            $(".load1_mission" + index).show();
            $scope.showTr2=false;
        }
        else{
            $(".load1_mission" + index).hide();
            $scope.showTr2=true;
        }
        _basic.get($host.api_url + "/menu?menuPid="+id).then(function (data) {
            if (data.success == true) {
                $scope.scondList = data.result;
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

    getRootList();
}])