app_admin_module.controller("information_news_list_controller", ["$scope", "_basic", "_config", "$host","$state", "$stateParams",  function ($scope, _basic, _config, $host,$state, $stateParams) {
    var id = $stateParams.id;//跳转过来的id
    var userId = _basic.getSession(_basic.USER_ID);
    $scope.editor = CKEDITOR.replace( 'TextArea1');
    // 返回
    $scope.return = function () {
        $state.go('information_menu_list', { id: $scope.menu_id, from: 'information_news_list'}, {reload: true});
    };

    //获取菜单列表
    function getNewsList(){
        _basic.get($host.api_url + "/news?newsId="+id).then(function (data) {
            if (data.success == true) {
                $scope.newsItem = data.result[0];
                $scope.menu_id = data.result[0].menu_id;
                getMenuList();
            }
        })
    }

    function getMenuList(){
        _basic.get($host.api_url + "/menu?menuId="+$scope.menu_id).then(function (data) {
            if (data.success == true) {
                $scope.menuName = data.result[0].menu_name;
            }
        })
    }

    //看图片
    $scope.getBigImg = function (src){
        $scope.img=$host.file_url + '/image/'+src;
    }

    // 照片上传函数
    function uploadBrandImage(filename, dom_obj, callback) {
        if (filename) {
            if ((/\.(jpe?g|png|gif|svg|bmp|tiff?)$/i).test(filename)) {
                //check size
                //$file_input[0].files[0].size
                var max_size_str = dom_obj.attr('max_size');
                var max_size = 4 * 1024 * 1024; //default: 4M
                var re = /\d+m/i;
                if (re.test(max_size_str)) {
                    max_size = parseInt(max_size_str.substring(0, max_size_str.length - 1)) * 1024 * 1024;
                    // $currentDom = $(dom).prev();
                    _basic.formPost(dom_obj.parent().parent(), $host.file_url + '/user/' + userId + '/image?imageType=0', function (data) {

                        if (data.success) {
                            var imageId = data.imageId;
                            callback(imageId);

                        } else {
                            swal('上传图片失败', "", "error");
                        }
                    }, function (error) {
                        swal('服务器内部错误', "", "error");
                    })
                }

                if (dom_obj[0].files[0].size > max_size) {
                    swal('图片文件最大: ' + max_size_str, "", "error");
                    return false;
                }
            }
            else if (filename && filename.length > 0) {
                dom_obj.val('');
                swal('支持的图片类型为. (jpeg,jpg,png,gif,svg,bmp,tiff)', "", "error");
            } else {

            }

        }
    };

    // 图片上传
    $scope.uploadBrandImage = function(dom) {
        var dom_obj = $(dom);
        var filename = $(dom).val();
        uploadBrandImage(filename, dom_obj, function (imageId) {
            $scope.$apply(function () {
                $scope.drive_img = [{
                    img: $host.file_url + '/image/' + imageId,
                }];
            });
            $scope.obj = {
                "newsImage": imageId
            };
        });
    };


    $scope.putItem=function(){
        var val = $scope.editor.getData();
        if($scope.newsItem.news_title==''||  $scope.newsItem.news_status==null|| $scope.newsItem.roll_flag==null||val==''||val==undefined){
            swal('请输入完整数据！',"","error")
        }
        else
        {
            var obj = {
                newsTitle:  $scope.newsItem.news_title,
                newsContent: val,
                rollFlag:   $scope.newsItem.roll_flag,
                newsStatus:   $scope.newsItem.news_status
            };
            _basic.put($host.api_url + "/news/"+ id , obj).then(function (data) {
                if (data.success == true) {
                    swal("修改成功", "", "success");
                    $scope.return();
                } else {
                    swal(data.msg, "", "error");
                }
            });
            _basic.put($host.api_url + "/news/" +  id +  "/image",  $scope.obj).then(function (data) {
                if (data.success == true) {
                    swal('修改成功！', "", "success")
                } else {
                    swal(data.msg, "", "error")
                }
            })
        }

    }

    getNewsList()
}])