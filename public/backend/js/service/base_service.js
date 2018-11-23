
var baseService = angular.module("baseService", []);

baseService.factory("baseService", function () {

    var _this = {};
    // 表格数据父子分组
    _this.tableArray = function (json) {
        var ret = [], o = {};

        function add(arr, data){
            var obj = {
                "_id": data._id,
                "menu_pid": data.menu_pid,
                "menu_name": data.menu_name,
                "menu_num":  data.menu_num,
                "lower_flag": data.lower_flag,
                "menu_status": data.menu_status,
                "childer": []
            };
            o[data._id] = obj;
            arr.push(obj);
        };

        json.forEach(x => {
            if(o[x.menu_pid]){
                add(o[x.menu_pid].childer, x);
            }else{
                add(ret, x);
            }
        });

        return ret;
    };

    _this.pass_parameter = function () {
        //定义参数对象
        var myObject = {};

        /**
         * 定义传递数据的setter函数
         * @param {type} xxx
         * @returns {*}
         * @private
         */
        var _setter = function (data) {
            myObject = data;
        };

        /**
         * 定义获取数据的getter函数
         * @param {type} xxx
         * @returns {*}
         * @private
         */
        var _getter = function () {
            return myObject;
        };

        // Public APIs
        // 在controller中通过调setter()和getter()方法可实现提交或获取参数的功能
        return {
            setter: _setter,
            getter: _getter
        };
    };
    // 获取当前月第一天
    _this.dateFirst = function () {
        var date = new Date();
        return date.setDate(1);
    };
    // 获取当前月最后一天
    _this.dateLast = function () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
    };

    _this.getWeek = function () {
        var d1 = new Date();
        var d2 = new Date();
        var date = new Date();
        var currentYear = date.getFullYear();
        d2.setMonth(0);
        d2.setDate(1);
        d2.setDate(7 - d2.getDay());
        var rq = d1 - d2;
        var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
        var s2 = Math.ceil(s1 / 7);
        var s3 = s2 + 1;
        if (s3 < 10) {
            s3 = "0" + s3;
        }
        var string = currentYear + '' + s3;
        return string;
    };
    return _this
});





