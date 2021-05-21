app_admin_module.controller("column_list_management_controller", ["$scope", "_basic","baseService", "_config", "$host", function ($scope, _basic,baseService, _config, $host) {
    $scope.showTr2 =false;
    $scope.showTr1 =false;
    $scope.linkList = _config.linkStatus;
    let userId = _basic.getSession(_basic.USER_ID);
    // 存储动态下拉菜单
    let selectArray = [];
    // 存储每个下拉选中的内容
    let selectPid = [];
    $scope.editSelectedMenu = [];
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
        $scope.selectedMenu = [];
        $scope.addnum = "";
        $scope.addMenuName = "";
        $scope.addHeaderShow = 0;
        $scope.addLink =1;
        $scope.addMenuStatus =1;
        $scope.addMenuLink ="";
        // 初始化 banner 图片以及 背景图片
        $scope.bannerImg = "";
        $scope.bgImg = "";
        $(".modal").modal();
        $("#newOperator").modal("open");
        // 清空文件选择路径
        document.getElementById('addBanner').value = '';
        document.getElementById('addBgImg').value = '';
        // 打开【新增栏目】时，清空动态菜单
        selectArray = [];
        $scope.selectArray = selectArray;
        // 清空 选中
        selectPid = [];
        // 重新取得最新的 menu 列表
        getMenu();
    };

    // 提交新增
    $scope.submitForm = function () {
        // 取得父菜单ID
        let menuPid = selectPid[selectPid.length-1];
        $scope.submitted = true;
        if(menuPid==''||$scope.addMenuName==''||$scope.addnum==""||$scope.addHeaderShow==null||$scope.addMenuStatus==null||$scope.addLink==""){
            swal('请录入完整信息!',"","error")
        }else{
            var obj = {
                menuPid: menuPid,
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
        // 清空 动态select数组
        $scope.editSelectArray = [];
        $scope.editSelectedMenu = [];
        // 默认父菜单
        $scope.baseMenu = "-1";
        // 取得编辑数据
        _basic.get($host.api_url + "/menu?menuId=" + id).then(function (data) {
            if (data.success == true) {
                $scope.look_operation = data.result[0];
                $scope.bannerImg = $scope.look_operation.banner_image || '';
                $scope.bgImg = $scope.look_operation.bg_image || '';
                getSelectArray($scope.look_operation);
            } else {
                swal(data.msg, "", "error");
            }
        })
    };


    // 修改
    $scope.changeOperatorForm = function (id) {
        $scope.submitted = true;
        if($scope.look_operation.menu_name==''||$scope.look_operation.menu_num==null
            ||$scope.look_operation.menu_header_show==null||$scope.look_operation.menu_status==null){
            swal('请录入完整信息!',"","error")
        }else {
            // 父菜单ID 调用接口用
            let menuPid = '';
            // 当动态select存在时，则父菜单ID 在 动态select中
            if ($scope.editSelectedMenu.length > 0) {
                // 动态最后一项是否选中
                if ($scope.editSelectedMenu[$scope.editSelectedMenu.length-1] == '') {
                    // 如果动态只有1项，且为空，则父菜单ID 为默认select选中值
                    if ($scope.editSelectedMenu.length == 1) {
                        menuPid = $scope.baseMenu;
                    } else {
                        // 最后一项 未选中，则是前一项的值
                        menuPid = $scope.editSelectedMenu[$scope.editSelectedMenu.length-2];
                    }
                } else {
                    // 最后一项 未选中，则是最后项的值
                    menuPid = $scope.editSelectedMenu[$scope.editSelectedMenu.length-1];
                }
            } else {
                // 当动态select不存在时，则父菜单ID 为默认select选中值
                menuPid = $scope.baseMenu;
            }
            var obj = {
                menuPid: menuPid,
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

    /**
     * 当父菜单 联动select选中时，执行查询下一层事件，并显示下一层，迭代方法
     *
     * @param selectMenuId 当前选中的menuId
     * @param index 当前select选项框的层数，默认初始为0层
     */
    $scope.changeSelect = function(selectMenuId, index) {
        // 默认初始选择菜单, 2种情况，1：初始，2：选择多层后，再次选择初始菜单
        if (index == 0) {
            // 点击初始菜单，则先清空 动态下拉菜单
            selectArray = [];
            $scope.selectArray = selectArray;
            // 清空 选中
            selectPid = [];
            // 将当前选中内容存入动态
            selectPid.push(selectMenuId);
        } else {
            // 非初始菜单点击时，清空 当前层数 之后的所有动态
            selectArray = selectArray.slice(0,index);
            $scope.selectArray = selectArray;
            selectPid = selectPid.slice(0,index);
            // 并将当前选中的替换数组中对应层数选中菜单ID
            selectPid.splice(index,1,selectMenuId);
        }

        // 当前选中 不是【请选择】，且不是【根目录】时，执行检索接口，查询，此菜单是否有子菜单
        if (selectMenuId != '' && selectMenuId != -1) {
            _basic.get($host.api_url + "/menu?menuPid=" + selectMenuId).then(function (data) {
                // 当有子菜单时
                if (data.success && data.result.length > 0) {
                    // 添加动态select数组
                    selectArray.push(data.result);
                    $scope.selectArray = selectArray;
                }
            });
        }
    };

    /**
     * 当父菜单 联动select选中时，执行查询下一层事件，并显示下一层，迭代方法
     *
     * @param selectMenuId 当前选中的menuId
     * @param index 当前select选项框的层数，默认初始为0层
     */
    $scope.changeEditSelect = function(selectMenuId, index) {
        // 点击菜单时，清空 当前层数 之后的所有动态
        $scope.editSelectArray = $scope.editSelectArray.slice(0,index);
        $scope.editSelectedMenu = $scope.editSelectedMenu.slice(0,index);

        // 当前选中 不是【请选择】，且不是【根目录】时，执行检索接口，查询，此菜单是否有子菜单
        if (selectMenuId != '' && selectMenuId != -1) {
            _basic.get($host.api_url + "/menu?menuPid=" + selectMenuId).then(function (data) {
                // 当有子菜单时
                if (data.success && data.result.length > 0) {
                    // 添加动态select数组
                    $scope.editSelectArray.push(data.result);
                }
            });
        }
    };

    async function getSelectArray(menu) {
        // 当前选中菜单 的父菜单ID 和 本身ID
        let currentPid = menu.menu_pid;
        let currentId = menu._id;
        // 循环索引
        let idx = 0;
        // 默认 选中 当前菜单的父菜单
        $scope.baseMenu = currentPid;
        // 当 当前选中菜单 有父菜单时，循环
        while (currentPid != -1) {
            // 多次循环的时候 最后必须 赋值
            $scope.baseMenu = currentPid;
            // 将当前父菜单 的 子列表作为select保存
            await _basic.get($host.api_url + "/menu?menuPid=" + currentPid).then(function (data) {
                // 当有子菜单时
                if (data.success && data.result.length > 0) {
                    // 添加动态select数组
                    $scope.editSelectArray.splice(0,0, data.result);
                    // 第一层 父菜单默认不选中
                    if (idx > 0) {
                        $scope.editSelectedMenu.splice(0,0, currentId);
                    } else {
                        $scope.editSelectedMenu.splice(0,0, '');
                    }
                }
            });

            // 取得 当前父菜单 的父菜单ID，替换要查询的父菜单，判断是否有下一次循环用
            await _basic.get($host.api_url + "/menu?menuId=" + currentPid).then(function (data) {
                if (data.success && data.result.length > 0) {
                    currentPid = data.result[0].menu_pid;
                    currentId = data.result[0]._id;
                }
            });
            idx++;
        }
    }

    getMenu();
    getRootList();
}]);