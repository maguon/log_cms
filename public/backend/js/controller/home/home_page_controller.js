app_admin_module.controller("home_page_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    $scope.hostName=$host.host_name;

    function getMenuTree(){
        _basic.get($host.api_url + "/menuTree").then(function (data) {
            // 存在数据时，同步数据
            if (data.success && data.result.length > 0) {
                $scope.menuTree = data.result[0].menu_tree;
            }
            // 刷新JqTree对象数据
            $('#menuTree').tree('loadData', $scope.menuTree);
        });
    }

    // 初始化数据
    function initData(){
        // jqTree初始化
        $('#menuTree').tree({
            autoOpen: true,
            // 自定义 行
            onCreateLi: function(node, $li) {
                // Append a link to the jqtree-element div.
                $li.find('.jqtree-element').append(
                    ' <div class="col s12 left-align"><p style="margin-top: 10px">' + node.menu_name  + '</p></div>\n'
                );
            }
        });
        // 设置默认数据为空
        $scope.menuTree = [];
        // 取得menuTree
        getMenuTree();
    }

    initData();
}]);