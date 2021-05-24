app_admin_module.controller("information_list_management_controller", ["$scope", "_basic", "_config", "$host", function ($scope, _basic, _config, $host) {
    // 关联类型
    let linkList = _config.linkStatus;

    /**
     * 初始化 菜单树
     */
    function initMenuTree(){
        // 取得菜单树 根节点
        let $tree = $('#menuTree');

        // 生成菜单树
        $tree.tree({
            autoOpen: true,
            // 自定义 行样式
            onCreateLi: function(node, $li) {
                // Append a link to the jqtree-element div.
                // 是否有下一层标记（作用不大）
                let lowerFlag = node.lower_flag == 1 ? '<p style="margin-top: 10px"><i class="mdi mdi-check" style="cursor: pointer"> </i></p>' : ' ';
                $li.find('.jqtree-element').append(
                    ' <div class="col s1">\n' +
                    lowerFlag +
                    ' </div>\n' +
                    ' <div class="col s5 left-align"><p style="margin-top: 10px">' + node.menu_name + '</p></div>\n' +
                    ' <div class="col s6 center-align">\n' +
                    '     <a href="#!/information_menu_list/id/' + node._id + '/from/information_list_management">\n' +
                    '       <i style="font-size: 25px" class="mdi mdi-flower orange-text" style="padding-left: 20px"> </i>\n' +
                    linkList[node.menu_type-1].status_text + '管理' +
                    '     </a> \n'+
                    ' </div>'
                );
            }
        });

        // 监听事件，点击 节点 触发
        $tree.on( 'tree.click', async function(e) {
            // Disable single selection
            // e.preventDefault();

            // 取得 选中节点
            let selected_node = e.node;

            // 取得 选中节点 的子节点
            await _basic.get($host.api_url + "/menu?menuPid=" + selected_node._id).then(function (data) {
                if (data.success) {
                    // 更新当前节点数据
                    $tree.tree(
                        'updateNode',
                        selected_node,
                        {
                            children: data.result
                        }
                    );
                    // 显示 新加载数据
                    $tree.tree('openNode', selected_node);
                }
            });
        });
    }

    //获取根列表
    function getRootList(){
        _basic.get($host.api_url + "/menu?menuPid=-1").then(function (data) {
            if (data.success) {
                $('#menuTree').tree('loadData', data.result);
            }
        })
    }

    // 初始化数据
    function initData(){
        // 初始化 菜单树
        initMenuTree();
        // 初始化 菜单数据
        getRootList();
    }

    initData();
}]);