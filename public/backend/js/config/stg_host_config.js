/**
 * Created by ASUS on 2017/3/14.
 */
var hostService = angular.module("hostService", []);
hostService.factory("$host", function () {
    var _this = {
        api_url: "http://192.168.191.143:8100/api",
       /* api_url: "http://localhost:8100/api",*/
        //file_url: "http://stg.myxxjs.com:9002/api",
        //record_url: "http://stg.myxxjs.com:9004/api",
        socket_url: "ws://stg.myxxjs.com:9005"

    };
    return _this;
});
