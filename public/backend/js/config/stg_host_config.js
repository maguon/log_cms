/**
 * Created by ASUS on 2017/3/14.
 */
var hostService = angular.module("hostService", []);
hostService.factory("$host", function () {
    var _this = {
        api_url: "http://192.168.191.138:8100/api",
        host_name:"大连顺通圣世后台管理系统"

    };
    return _this;
});
