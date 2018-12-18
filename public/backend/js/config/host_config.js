/**
 * Created by ASUS on 2017/3/14.
 */
var hostService = angular.module("hostService", []);
hostService.factory("$host", function () {
    var _this = {
        api_url: "http://192.168.191.143:8100/api"
    };
    return _this;
});
