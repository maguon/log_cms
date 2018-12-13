app_admin_module.controller("system_log_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    $(document).ready(function(){
        $('.datepicker').datepicker({
            autoClose:true,
            format: 'yyyy 年 mm 月 dd 日',
            formatSubmit: 'yyyy/mm/dd',
            i18n:{
                weekdaysAbbrev: ['日', '一', '二', '三', '四', '五', '六'],
                done: '确定',
                clear: '清除',
                cancel: '关闭',
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                weekdays: [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
                weekdaysShort: [ '日', '一', '二', '三', '四', '五', '六' ]
            }
        });
    });

    $scope.start = 0;
    $scope.size = 11;
    var createdStart =undefined;
    var createdEnd =undefined;

    // 点击搜索按钮
    $scope.getItem = function () {
        $scope.start = 0;
        getList();
    };

    // 获取列表
    function getList() {
        if($("#start_name").val()==''||$("#last_name").val()==''){
             createdStart =undefined;
             createdEnd =undefined;
        }
        else{
            createdStart = $("#start_name").val().slice(0,4)+'-'+$("#start_name").val().slice(7,9)+'-'+$("#start_name").val().slice(12,14);
            createdEnd = $("#last_name").val().slice(0,4)+'-'+$("#last_name").val().slice(7,9)+'-'+$("#last_name").val().slice(12,14);
        }
        _basic.get($host.api_url + "/sysLog?" + _basic.objToUrl({
            createDateStart: createdStart,
            createDateEnd:createdEnd,
            ip:$scope.ip,
            start:$scope.start.toString(),
            size:$scope.size
        })).then(function (data) {
            if (data.success === true) {
                $scope.boxArray = data.result;
                $scope.rootList = $scope.boxArray.slice(0, 10);
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
            else {
                swal(data.msg, "", "error");
            }
        });
    };
    $scope.deleteOperator = function (){
        swal({
                title: "确认清空所有数据吗？",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: false
            },
            function () {
                _basic.delete($host.api_url + "/sysLogAll").then(function (data) {
                    if (data.success == true) {
                        getList();
                        swal("删除成功!", "", "success");
                    } else {
                        swal(data.msg, "", "error")
                    }
                })
            }
        )

    }

    // 分页
    $scope.getPrePage = function () {
        $scope.start = $scope.start - ($scope.size-1);
        getList()
    };
    $scope.getNextPage = function () {
        $scope.start = $scope.start + ($scope.size-1);
        getList()
    };
    getList();
}])