app_admin_module.controller("add_news_controller", ["$scope", "_basic", "_config", "$host","$state", "$stateParams",  function ($scope, _basic, _config, $host,$state, $stateParams) {
    var id = $stateParams.id;//跳转过来的id
    $scope.editor = CKEDITOR.replace( 'TextArea1');


    // 返回
    $scope.return = function () {
        $state.go('information_menu_list', { id: id, from: 'add_news'}, {reload: true});
    };



    //获取菜单列表
    function getMenuList(){
        _basic.get($host.api_url + "/menu?menuId="+id).then(function (data) {
            if (data.success == true) {
                $scope.menuName = data.result[0].menu_name;
            }
        })
        _basic.get($host.api_url + "/news?menuId="+id).then(function (data) {
            if (data.success == true) {
                $scope.newsId = data.result[0]._id;
            }
        })
    }




    // 图片上传
    $scope.uploadBrandImage = function(element) {       //单次提交图片的函数
        if (!element.files[0]) {
            // console.log("未选择图片！");
            return;
        }
        $scope.$apply(function(scope) {
            var photofile = element.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                var prev_img = document.getElementById("face");
                prev_img.src = e.target.result;
                var bufferData=prev_img.src.replace(/^data:image\/\w+;base64,/, "");
                $scope.imageSrc= btoa(bufferData);
                //$scope.imageSrc=prev_img.src
                function Uint8ToString(u8a){
                    var CHUNK_SZ = 0x8000;
                    var c = [];
                    for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
                        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
                    }
                    return c.join("");
                }
                $scope.u8_2 = new Uint8Array(atob($scope.imageSrc).split("").map(function(c) {
                    return c.charCodeAt(0); }));//这个用于保存数据
                $scope.b64encoded = btoa(Uint8ToString($scope.u8_2));
                $scope.image= window.atob($scope.b64encoded);//这个用于页面预览
            };
            reader.readAsDataURL(photofile);
        });
    };




    $scope.addItem=function(){
        var val = $scope.editor.getData();
        if( $scope.addNews==''||$scope.addMenuStatus==''||$scope.addLun==""||val==''||val==undefined){
            swal('请输入完整数据！',"","error")
        }
        else
        {
            var obj = {
                newsTitle:$scope.addNews,
                newsContent: val,
                rollFlag: $scope.addLun,
                newsStatus: $scope.addMenuStatus
            };
            _basic.post($host.api_url + "/menu/"+ id +'/news', obj).then(function (data) {
                if (data.success == true) {
                    swal("新增成功", "", "success");
                    $scope.return();
                } else {
                    swal(data.msg, "", "error");
                }
            })
        }

    }

    getMenuList()

}])