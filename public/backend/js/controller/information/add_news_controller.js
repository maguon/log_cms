app_admin_module.controller("add_news_controller", ["$scope", "_basic", "_config", "$host","$state", "$stateParams",  function ($scope, _basic, _config, $host,$state, $stateParams) {

    var id = $stateParams.id;//跳转过来的id
    var userId = _basic.getSession(_basic.USER_ID);
    // 返回
    $scope.return = function () {
        $state.go('information_menu_list', { id: id, from: 'add_news'}, {reload: true});
    };

    //插件 富文本编辑器
    function kedit(kedit){
        var editor = KindEditor.create(kedit,{
            cssPath: '/backend/assets/plugins/kindeditor/plugins/code/prettify.css',
            uploadJson: '../api/user/' + userId + '/image',   //上传图片的地址
            imageUploadJson: '../api/user/' + userId + '/image',
            fileManagerJson: '../uploads',
            allowFileManager: true,
            items:[
                'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
                'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
               'insertfile', 'table', 'hr', 'emoticons', 'baidumap'

            ],
            extraFileUploadParams: {
                "csrfmiddlewaretoken": "{{ csrf_token }}"
            },
            afterUpload: function () {
                this.sync();
            }, //图片上传后，将上传内容同步到textarea中
            afterBlur: function () {
                this.sync();
            },   ////失去焦点时，将上传内容同步到textarea中

        });
    }

    $(function(){
        kedit('textarea[name="content"]');
    })



    //获取菜单列表
    function getMenuList(){
        _basic.get($host.api_url + "/menu?menuId="+id).then(function (data) {
            if (data.success == true) {
                $scope.menuName = data.result[0].menu_name;
            }
        });
    }

    // 照片上传函数
    function uploadImage(filename, dom_obj, callback) {
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
                    _basic.formPost(dom_obj.parent().parent(), $host.api_url + '/user/' + userId + '/image', function (data) {

                        if (data.success) {
                            var imageId = data.result.imageId;
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
    //
    $scope.uploadNewsImage = function(dom) {
        var dom_obj = $(dom);
        var filename = $(dom).val();
        uploadImage(filename, dom_obj, function (imageId) {
            $scope.$apply(function () {
                $scope.drive_img = [{
                    img: $host.api_url + '/image/' + imageId,
                }];
            });
            $scope.obj = {
                "newsImage": imageId
            };
            swal("图片上传成功", "", "success");
        });
    };

    $scope.addItem=function(){
        var val = $('#editor_id').val();
        if( $scope.addNews==''||$scope.addMenuStatus==null||$scope.addLun==null||$scope.addNum==null){
            swal('请输入完整数据！',"","error")
        }
        else
        {
            var obj = {
                newsTitle:$scope.addNews,
                newsContent: val,
                newsNum:$scope.addNum,
                rollFlag: $scope.addLun,
                newsStatus: $scope.addMenuStatus
            };
            _basic.post($host.api_url + "/menu/"+ id +'/news', obj).then(function (data) {
                if (data.success == true) {
                    $scope.newsId =data.id;
                    getImg();
                    swal("新增成功", "", "success");
                    $scope.return();
                } else {
                    swal(data.msg, "", "error");
                }
            });
        }

    }

    function  getImg(){
        if($scope.obj==null){
            return;
        }
        else {
            _basic.put($host.api_url + "/news/" +  $scope.newsId +  "/image",  $scope.obj).then(function (data) {
                if (data.success == true) {
                    swal('新增成功！', "", "success")
                } else {
                    swal(data.msg, "", "error")
                }
            })
        }
    }

    getMenuList()


}])