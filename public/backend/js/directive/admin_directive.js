var adminDirective = angular.module("adminDirective", []);
adminDirective.directive('header', function () {
    return {
        templateUrl: '/backend/js/views/common_header.html',
        replace: true,
        transclude: false,
        restrict: 'E',
        controller: function ($scope, $state, $element, $rootScope, _basic, _config, $host) {

            if (_basic.getSession(_basic.USER_TYPE) == "99") {
                //退出登录
                $scope.logOut = function () {
                    swal({
                        title: "注销账号",
                        text: "是否确认退出登录",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: false
                    }, function () {
                        _basic.removeSession(_basic.COMMON_AUTH_NAME);
                        _basic.removeSession(_basic.USER_ID);
                        _basic.removeSession(_basic.USER_TYPE);
                        _basic.removeSession(_basic.USER_NAME);
                        window.location.href = './admin_login.html';
                    });
                };

                //存储信息到sessionStorage
                _basic.setHeader(_basic.USER_TYPE, _basic.getSession(_basic.USER_TYPE));
                _basic.setHeader(_basic.COMMON_AUTH_NAME, _basic.getSession(_basic.COMMON_AUTH_NAME));
                $scope.qrList = [];
                _basic.get($host.api_url + "/admin/" + _basic.getSession(_basic.USER_ID)).then(function (data) {
                    if (data.success == true) {
                        $scope.userName = data.result[0].user_name;
                        _basic.setSession(_basic.USER_NAME, $scope.userName);
                    } else {
                        swal(data.msg, "", "error");
                    }
                });
                var now = new Date();
                var year = now.getFullYear(); //获取年份
                var month = now.getMonth()+1; //获取月份 月份要+1
                var date = now.getDate(); //获取日期
                $scope.ymd =year+'/'+month+"/"+date;
                var hours = now.getHours(); //获取时
                var minus = now.getMinutes(); //获取分钟
                if(minus<10){
                    minus="0"+minus;
                }
                $scope.hm =hours+':'+minus;
            }


            else {
              window.location = "./backend/admin_login.html"
            }
        }
    };

});

adminDirective.directive("ulTabs", function () {
    return {
        restrict: "A",
        link: function () {
            $('ul.tabs').tabs();
        }
    }
});
adminDirective.directive("collapsible", function () {
    return {
        restrict: "A",
        link: function () {
            $('.collapsible').collapsible();
        }
    }
});
adminDirective.directive("tooltipped", function () {
    return {
        restrict: "A",
        link: function () {
            $('.tooltipped').tooltip({delay: 50});
        }
    }
});
// ng-repeat渲染后的回调
adminDirective.directive('repeatFinish', function () {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                // console.log('ng-repeat执行完毕');
                scope.$eval(attr.repeatFinish)
            }
        }
    }
});
adminDirective.directive("sexChange", function () {
    return {
        restrict: "A",
        link: function () {
            $(".sexBox i").on("click", function () {
                $(".sexBox i").removeClass("sex");
                $(this).addClass("sex");
            })
        }
    }
});
