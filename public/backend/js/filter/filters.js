/**
 * Created by ASUS on 2017/3/7.
 */
var CommonFilter = angular.module("CommonFilter", []);

// 用户部门过滤器
CommonFilter.filter("department", function () {
    return function (input) {
        var user;
        switch (input) {
            case 99:
                user = "超级管理员";
                break;
            case 10:
                user = "司机";
                break;
            case 69:
                user = "结算管理员";
                break;
            case 61:
                user = "结算操作员";
                break;
            case 59:
                user = "财务管理员";
                break;
            case 51:
                user = "财务操作员";
                break;
            case 49:
                user = "质损管理员";
                break;
            case 41:
                user = "质损操作员";
                break;
            case 39:
                user = "调度管理员";
                break;
            case 31:
                user = "调度操作员";
                break;
            case 29:
                user = "仓储部管理员";
                break;
            case 21:
                user = "仓储部操作员";
                break;
            case 19:
                user = "车管部管理员";
                break;
            case 11:
                user = "车管部操作员";
                break;
            default:
                user = "未知";
        }
        return user;
    }
});

// 性别过滤器
CommonFilter.filter("gender", function () {
    return function (input) {
        var sex;
        switch (input) {
            case "0":
                sex = "女";
                break;
            case "1":
                sex = "男";
                break;
            default:
                sex = "未知";
        }
        return sex;
    }
});


// 连接状态类型过滤器
CommonFilter.filter("linkStatus", function () {
    return function (input) {
        var linkStatus;
        switch (input) {
            case 1:
                linkStatus = "新闻";
                break;
            case 2:
                linkStatus = "列表";
                break;
            case 3:
                linkStatus = "图片";
                break;
            default:
                linkStatus = "未知";
        }
        return linkStatus;
    }
});
