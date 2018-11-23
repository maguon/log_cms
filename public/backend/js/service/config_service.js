/**
 * Created by ASUS on 2017/5/25.
 */

// 公共数据
baseService.factory("_config", function () {
    var _this = {};

    // 关联类型
    _this.linkStatus = [
        {
            id: 1,
            status_text: "新闻"
        },
        {
            id: 2,
            status_text: "列表"
        },
         {
             id: 3,
             status_text: "图片"
         }
    ];

    return _this
});
