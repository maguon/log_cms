app_admin_module.controller("setting_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    let userId = _basic.getSession(_basic.USER_ID);
    const imgPath = '../uploads/';
    const favicon = 'favicon.ico';
    const logo = 'logo.png';

    function getList(){
        _basic.get($host.api_url + "/style").then(function (data) {
            console.log(data);
            if (data.success) {
                console.log($scope.styleList)
                $scope.styleList = data.result[0];
                $scope.faviconSrc = imgPath + favicon + '?' + new Date().getTime();
                $scope.logoSrc = imgPath + logo + '?' + new Date().getTime();
            }
        })
    }

    // 提交新增
    $scope.postStyle = function () {
        if ($scope.styleList == undefined || $scope.styleList.title == ''||$scope.styleList.logo_title == ''||$scope.styleList.page_footer == ''
            ||$scope.styleList.meta==undefined||$scope.styleList.css_link==undefined||$scope.styleList.script_text==''||$scope.styleList.js_link==undefined) {
            swal('请录入完整信息!', "", "error")
        } else {
            if(Array.isArray($scope.styleList.meta)==false){
                $scope.styleList.meta=$scope.styleList.meta.split(',');
            }
            if(Array.isArray($scope.styleList.css_link)==false){
                $scope.styleList.css_link=$scope.styleList.css_link.split(',');
            }
           if(Array.isArray($scope.styleList.js_link)==false){
               $scope.styleList.js_link=$scope.styleList.js_link.split(',');
           }

            var obj = {
                title: $scope.styleList.title,
                logoTitle: $scope.styleList.logo_title,
                pageFooter: $scope.styleList.page_footer,
                meta:$scope.styleList.meta,
                cssLink:$scope.styleList.css_link,
                jsLink:$scope.styleList.js_link,
                scriptText:$scope.styleList.script_text
            };
            _basic.post($host.api_url + "/sid/0/style", obj).then(function (data) {
                if (data.success) {
                    swal("保存成功", "", "success");
                    getList();
                } else {
                    swal(data.msg, "", "error");
                }
            })
        }
    };

    // favicon上传
    $scope.uploadFavicon = function(dom) {
        let dom_obj = $(dom);
        let filename = $(dom).val();
        if (filename) {
            if ((/\.(jpe?g|png|gif|svg|bmp|tiff?)$/i).test(filename)) {
                //check size
                var max_size_str = dom_obj.attr('max_size');
                var max_size = 4 * 1024 * 1024; //default: 4M
                var re = /\d+m/i;
                if (re.test(max_size_str)) {
                    _basic.formPost(dom_obj.parent().parent(), $host.api_url + '/user/' + userId + '/favicon?', function (data) {
                        if (data.success) {
                            $scope.faviconSrc = imgPath + favicon + '?' + new Date().getTime();
                            swal("favicon上传成功", "", "success");
                            // 刷新页面
                            getList();
                        } else {
                            swal('上传图片失败', "", "error");
                        }
                    }, function (error) {
                        swal('服务器内部错误', "", "error");
                    })
                }
            } else if (filename && filename.length > 0) {
                dom_obj.val('');
                swal('支持的图片类型为. (jpeg,jpg,png,gif,svg,bmp,tiff)', "", "error");
            }
        }
    };

    // logo上传
    $scope.uploadLogo = function(dom) {
        var dom_obj = $(dom);
        var filename = $(dom).val();
        if (filename) {
            if ((/\.(jpe?g|png|gif|svg|bmp|tiff?)$/i).test(filename)) {
                //check size
                var max_size_str = dom_obj.attr('max_size');
                var max_size = 4 * 1024 * 1024; //default: 4M
                var re = /\d+m/i;
                if (re.test(max_size_str)) {
                    _basic.formPost(dom_obj.parent().parent(), $host.api_url + '/user/' + userId + '/logo?', function (data) {
                        if (data.success) {
                            $scope.logoSrc = imgPath + logo + '?' + new Date().getTime();
                            swal("logo上传成功", "", "success");
                            // 刷新页面
                            getList();
                        } else {
                            swal('上传图片失败', "", "error");
                        }
                    }, function (error) {
                        swal('服务器内部错误', "", "error");
                    })
                }
            } else if (filename && filename.length > 0) {
                dom_obj.val('');
                swal('支持的图片类型为. (jpeg,jpg,png,gif,svg,bmp,tiff)', "", "error");
            }
        }
    };

    getList()
}]);