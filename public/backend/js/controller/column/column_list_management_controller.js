app_admin_module.controller("column_list_management_controller", ["$scope", "_basic","baseService", "_config", "$host", function ($scope, _basic,baseService, _config, $host) {
    $scope.showTr2 =false;
    $scope.showTr1 =false;
    $scope.linkList = _config.linkStatus;
    let userId = _basic.getSession(_basic.USER_ID);

    //获取菜单
    function getMenu(){
        _basic.get($host.api_url + "/menu").then(function (data) {
            if (data.success == true) {
                $scope.columnList = data.result;
            }
        })
    }

    //获取根列表
    function getRootList(){
        _basic.get($host.api_url + "/menu?menuPid=-1").then(function (data) {
            if (data.success == true) {
                $scope.rootList = data.result;
            }
        })
    }

    // 获取子一级
    $scope.showLastTr =function (id,index){
        // 子一级 全部隐藏
        $(".load_mission").hide();
        // 子一级 点击显示
        $(".load_mission" + index).show();
        // 取得 子一级 数据
        _basic.get($host.api_url + "/menu?menuPid="+id).then(function (data) {
            if (data.success) {
                // 子一级 数据
                $scope.firstList = data.result;
                // 子二级 数据
                $scope.scondList = [];
            }
        })
    };

    // 获取子二级
    $scope.showLastTr2 =function (id,index){
        // 子二级 全部隐藏
        $(".load1_mission").hide();
        // 子二级 点击显示
        $(".load1_mission" + index).show();
        // 取得 子二级 数据
        _basic.get($host.api_url + "/menu?menuPid="+id).then(function (data) {
            if (data.success) {
                $scope.scondList = data.result;
            }
        })
    };

    /**
     * 点击【新增】按钮，打开【新增栏目】页面
     */
    $scope.newOperator = function () {
        $scope.submitted = false;
        $scope.addColumn = "";
        $scope.addnum = "";
        $scope.addMenuName = "";
        $scope.addHeaderShow = "";
        $scope.addLink ="";
        $scope.addMenuStatus ="";
        $scope.addMenuLink ="";
        // 初始化 banner 图片以及 背景图片
        $scope.bannerImg = "";
        $scope.bgImg = "";
        $(".modal").modal();
        $("#newOperator").modal("open");
        // 清空文件选择路径
        document.getElementById('addBanner').value = '';
        document.getElementById('addBgImg').value = '';
        // 重新取得最新的 menu 列表
        getMenu();
    };

    // 提交新增
    $scope.submitForm = function () {
        $scope.submitted = true;
        if($scope.addColumn==''||$scope.addMenuName==''||$scope.addnum==""||$scope.addHeaderShow==null||$scope.addMenuStatus==null||$scope.addLink==""){
            swal('请录入完整信息!',"","error")
        }else{
            var obj = {
                menuPid: $scope.addColumn,
                menuName: $scope.addMenuName,
                menuNum:$scope.addnum,
                menuHeaderShow:$scope.addHeaderShow,
                menuStatus:$scope.addMenuStatus,
                menuType: $scope.addLink,
                menuLink: $scope.addMenuLink
            };
            _basic.post($host.api_url + "/menu", obj).then(function (data) {
                if (data.success) {
                    uploadImg(data.result.menuId);
                    swal("新增成功", "", "success");
                    $('#newOperator').modal('close');
                    getRootList();
                } else {
                    swal(data.msg, "", "error");
                }
            })
        }

    };


    /**
     * 点击编辑按钮，打开【编辑栏目】页面
     * @param id 栏目ID
     */
    $scope.lookOperation = function (id) {
        $(".modal").modal();
        $("#look_Operator").modal("open");
        // 清空文件选择路径
        document.getElementById('editBanner').value = '';
        document.getElementById('editBgImg').value = '';

        // 取得编辑数据
        _basic.get($host.api_url + "/menu?menuId=" + id).then(function (data) {
            if (data.success == true) {
                $scope.look_operation = data.result[0];
                $scope.bannerImg = $scope.look_operation.banner_image || '';
                $scope.bgImg = $scope.look_operation.bg_image || '';
            } else {
                swal(data.msg, "", "error");
            }
        })
    };


    // 修改
    $scope.changeOperatorForm = function (id) {
        $scope.submitted = true;
        if($scope.look_operation.menu_pid==''||$scope.look_operation.menu_name==''||$scope.look_operation.menu_num==null
            ||$scope.look_operation.menu_header_show==null||$scope.look_operation.menu_status==null){
            swal('请录入完整信息!',"","error")
        }else {
            var obj = {
                menuPid: $scope.look_operation.menu_pid,
                menuName: $scope.look_operation.menu_name,
                menuNum: $scope.look_operation.menu_num,
                menuHeaderShow: $scope.look_operation.menu_header_show,
                menuStatus: $scope.look_operation.menu_status,
                menuLink: $scope.look_operation.menu_link
            };
            _basic.put($host.api_url + "/menu/" + id, obj).then(function (data) {
                if (data.success == true) {
                    uploadImg(id);
                    getRootList();
                    swal("修改成功", "", "success");
                    $('#look_Operator').modal('close');

                } else {
                    swal(data.msg, "", "error");
                }
            })
        }
    };


    //删除当前信息
    $scope.delete = function (id){
        swal({
                title: "确定删除当前栏目？",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
            if(isConfirm){
                _basic.delete($host.api_url + "/menu/" +id).then(function (data) {
                    if (data.success == true) {
                        getRootList();
                        swal("删除成功", "", "success");
                    }
                    else {
                        swal(data.msg, "", "error");
                    }
                });
            }
         });
    };

    // 照片上传函数
    function uploadImage(filename, dom_obj, callback) {
        if (filename) {
            if ((/\.(jpe?g|png|gif|svg|bmp|tiff?)$/i).test(filename)) {
                //check size
                //$file_input[0].files[0].size
                let max_size_str = dom_obj.attr('max_size');
                let max_size = 4 * 1024 * 1024; //default: 4M
                let re = /\d+m/i;
                if (re.test(max_size_str)) {
                    max_size = parseInt(max_size_str.substring(0, max_size_str.length - 1)) * 1024 * 1024;
                    _basic.formPost(dom_obj.parent(), $host.api_url + '/user/' + userId + '/image', function (data) {
                        if (data.success) {
                            let imageId = data.result.imageId;
                            $scope.bg_image = imageId;
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
            } else if (filename && filename.length > 0) {
                dom_obj.val('');
                swal('支持的图片类型为. (jpeg,jpg,png,gif,svg,bmp,tiff)', "", "error");
            }
        }
    }

    $scope.uploadMenuBanner = function(dom, editFlag) {
        let dom_obj = $(dom);
        let filename = $(dom).val();
        uploadImage(filename, dom_obj, function (imageId) {
            $scope.bannerImg = imageId;
            swal('上传图片成功！', "", "success");
            // 如果是编辑画面的时候，则刷新  banner图片 路径
            if (editFlag === 1) {
                $scope.$apply(function () {
                    $scope.bannerImg = imageId;
                });
            }
        });
    };

    $scope.uploadMenuBgImg = function(dom, editFlag) {
        let dom_obj = $(dom);
        let filename = $(dom).val();
        uploadImage(filename, dom_obj, function (imageId) {
            $scope.bgImg = imageId;
            swal('上传图片成功！', "", "success");
            // 如果是编辑画面的时候，则刷新  背景图片 路径
            if (editFlag === 1) {
                $scope.$apply(function () {
                    $scope.bgImg = imageId;
                });
            }
        });
    };

    function uploadImg(menuId) {
        _basic.put($host.api_url + "/menu/" + menuId + "/image", {"bannerImage": $scope.bannerImg,"bgImage": $scope.bgImg}).then(function (data) {
            if (data.success) {
                swal('新增成功！', "", "success")
            } else {
                swal(data.msg, "", "error")
            }
        })
    }

    $scope.deleteBannerImg = function() {
        _basic.delete($host.api_url + "/image/" + $scope.bannerImg.replace('/uploads/','')).then(function (data) {
            if (data.success) {
                $scope.bannerImg = "";
                // 清空文件选择路径
                document.getElementById('editBanner').value = '';
                swal('删除图片成功！', "", "success")
            } else {
                swal(data.msg, "", "error")
            }
        });
    };

    $scope.deleteBgImg = function() {
        _basic.delete($host.api_url + "/image/" + $scope.bgImg.replace('/uploads/','')).then(function (data) {
            if (data.success) {
                // 清空文件选择路径
                document.getElementById('editBgImg').value = '';
                $scope.bgImg = "";
                swal('删除图片成功！', "", "success")
            } else {
                swal(data.msg, "", "error")
            }
        });
    };

    getMenu();
    getRootList();
}]);