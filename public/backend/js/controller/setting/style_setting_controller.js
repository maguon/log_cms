app_admin_module.controller("style_setting_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    let userId = _basic.getSession(_basic.USER_ID);
    var item = [];
    var dataPost =[];
    const viewInput =$('input');  //获取元素
    viewInput.focus();  //触发一下focus事件
    function addlList(){
        _basic.get($host.api_url + "/menu").then(function (data) {
            if (data.success == true) {
                $scope.columnList = data.result;
                layout();
            }
        })
        _basic.get($host.api_url + "/menu?menuType=3").then(function (data) {
            if (data.success == true) {
                $scope.carouselList = data.result;
            }
        })
    };

    function layout(){
        _basic.get($host.api_url + "/layout").then(function (data) {
            if (data.success == true) {
                if(data.result.length>0){
                    $scope.layoutList = data.result[0];
                    $scope.layoutList.content=data.result[0].content;
                    for (var i = 0; i < $scope.columnList.length; i++) {
                        for(var j = 0; j < $scope.layoutList.content.length; j++){
                            if($scope.columnList[i]._id==$scope.layoutList.content[j]){
                                item.push({tag:$scope.columnList[i].menu_name,id:$scope.columnList[i]._id})
                            }
                        }
                    }
                    chip();
                }
            }
        })
    }

    function chip(){
        $('.chips').chips({
            data: item,
        });
    }
    $scope.chageSelect =function (el){
        var length= $('.chip').length;
        if(el!=='') {
            if(item.length==0){
                item=[{tag: el.menu_name,id:el._id}];
                $('.chips').chips({
                   data: item,
                })
            }
            else{
                for (var i = 0; i < length; i++) {
                    if (item[i].tag == el.menu_name) {
                        swal('重复数据', "", "error");
                        return;
                    }
                }
                item.push({tag:el.menu_name,id:el._id})
               chip();
            }
        }


    }


    // 提交新增
    $scope.postStyle = function () {
        for(i=0;i<item.length;i++){
            dataPost.push(item[i].id);
        };
        if(dataPost.length==0){
            dataPost=[];
        }
        if($scope.carousel==undefined){
            $scope.carousel='';
        }
        if ($scope.layoutList.multi_menu === undefined||$scope.layoutList.multi_menu === "") {
            swal('请录入完整信息!', "", "error")
        } else {
            var obj = {
                multiMenu: $scope.layoutList.multi_menu,
                carousel: $scope.layoutList.carousel,
                content: dataPost
            };
            _basic.post($host.api_url + "/layout", obj).then(function (data) {
                if (data.success) {
                    swal("保存成功", "", "success");
                } else {
                    swal(data.msg, "", "error");
                }
            })
        }
    };

    addlList()
}]);