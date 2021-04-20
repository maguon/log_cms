app_admin_module.controller("information_news_list_controller", ["$scope", "_basic", "_config", "$host","$state", "$stateParams",  function ($scope, _basic, _config, $host,$state, $stateParams) {
    var id = $stateParams.id;//跳转过来的id
    const imgPath = '../uploads/';
    var userId = _basic.getSession(_basic.USER_ID);
    $scope.editor='';
    function kedit(kedit){
        $scope.editor = KindEditor.create(kedit,{
            cssPath: '/backend/assets/plugins/kindeditor/plugins/code/prettify.css',
            uploadJson: '../api/user/' + userId + '/image',
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
    // 返回
    $scope.return = function () {
        $state.go('information_menu_list', { id: $scope.menu_id, from: 'information_news_list'}, {reload: true});
    };

    //获取菜单列表
    function getNewsList(){
        _basic.get($host.api_url + "/news?newsId="+id).then(function (data) {
            if (data.success == true) {
                $scope.newsItem = data.result[0];
                $scope.news_content=$scope.editor.html($scope.newsItem.news_content);
                $scope.menu_id = data.result[0].menu_id._id;
                if(data.result[0].news_image==null){
                    $scope.newsItem.news_image='';
                }

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
        if (src==""){
            $scope.img=''
        }
        else {
            $scope.img= imgPath +src+ '?' + new Date().getTime();
        }
    };

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
                    _basic.formPost(dom_obj.parent().parent(), $host.api_url + '/user/' + userId + '/image?', function (data) {

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

               /* if (dom_obj[0].files[0].size > max_size) {
                    swal('图片文件最大: ' + max_size_str, "", "error");
                    return false;
                }*/
            }
            else if (filename && filename.length > 0) {
                dom_obj.val('');
                swal('支持的图片类型为. (jpeg,jpg,png,gif,svg,bmp,tiff)', "", "error");
            } else {

            }

        }
    };

    // 图片上传
    $scope.uploadNewsImage = function(dom) {
        var dom_obj = $(dom);
        var filename = $(dom).val();
        uploadImage(filename, dom_obj, function (imageId) {
            $scope.$apply(function () {
                $scope.newsItem.news_image = [{
                    img: $host.api_url + '/image/' + imageId,
                }];
            });
            $scope.obj = {
                "newsImage": imageId
            };
            _basic.put($host.api_url + "/news/" +  id+ "/image", $scope.obj).then(function (data) {
                if (data.success == true) {
                    swal("图片上传成功", "", "success");
                    getNewsList();
                    $scope.getBigImg(imageId);
                } else {
                    swal(data.msg, "", "error");
                }
            })
        });
    };


    $scope.putItem=function(){
        var val=null;
        if($('#editor_id').val() == '                                ' ){
            val = $scope.newsItem.news_content;
        }
        else {
            val=$('#editor_id').val();
        }
        console.log(val)
        if($scope.newsItem.news_title==''||  $scope.newsItem.news_status==null|| $scope.newsItem.roll_flag==null||$scope.newsItem.news_num==null){
            swal('请输入完整数据！',"","error")
        }
        else
        {
            var obj = {
                newsTitle:  $scope.newsItem.news_title,
                newsContent: val,
                newsNum:$scope.newsItem.news_num,
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
            if($scope.obj==undefined){
                return;
            }
            else {
                _basic.put($host.api_url + "/news/" +  id +  "/image",  $scope.obj).then(function (data) {
                    if (data.success == true) {
                        swal('修改成功！', "", "success")
                    } else {
                        swal(data.msg, "", "error")
                    }
                })
            }
        }
    }

    getNewsList()
}])