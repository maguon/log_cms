app_admin_module.config(['$stateProvider',"$urlRouterProvider",function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("","/home_page");
    $stateProvider
        .state("index", {  //路由状态
            url: "/index",  //路由路径
            templateUrl: "js/view/index.html",  //路由填充的模板
            controller:'index_controller'
        })
        //首页
        .state("home_page", {  //路由状态
            url: "/home_page",  //路由路径
            templateUrl: "/backend/js/views/home/home_page.html",  //路由填充的模板
            controller:'home_page_controller'
        })

        //栏目列表管理
        .state("column_list_management", {  //路由状态
            url: "/column_list_management",  //路由路径
            templateUrl: "/backend/js/views/column/column_list_management.html",  //路由填充的模板
            controller:'column_list_management_controller'
        })
        //信息列表管理
        .state("information_list_management", {  //路由状态
            url: "/information_list_management",  //路由路径
            templateUrl: "/backend/js/views/information/information_list_management.html",  //路由填充的模板
            controller:'information_list_management_controller'
        })

        .state("information_menu_list", {
            url: "/information_menu_list/id/{id}/from/{from}",
            templateUrl: "/backend/js/views/information/information_menu_list.html",
            controller:"information_menu_list_controller"
        })

        .state("information_news_list", {
            url: "/information_news_list/id/{id}/from/{from}",
            templateUrl: "/backend/js/views/information/information_news_list.html",
            controller:"information_news_list_controller"
        })
        .state("add_news", {
            url: "/add_news/id/{id}/from/{from}",
            templateUrl: "/backend/js/views/information/add_news.html",
            controller:"add_news_controller"
        })

        //人才招聘管理
        .state("recruitment_management", {  //路由状态
            url: "/recruitment_management",  //路由路径
            templateUrl: "/backend/js/views/recruitment/recruitment_management.html",  //路由填充的模板
            controller:'recruitment_management_controller'
        })
        //用户管理
        .state("user_management", {  //路由状态
            url: "/user_management",  //路由路径
            templateUrl: "/backend/js/views/user/user_management.html",  //路由填充的模板
            controller:'user_management_controller'
        })
        //系统日志
        .state("system_log", {  //路由状态
            url: "/system_log",  //路由路径
            templateUrl: "/backend/js/views/system/system_log.html",  //路由填充的模板
            controller:'system_log_controller'
        })
        //联系方式
        .state("contact_information", {  //路由状态
            url: "/contact_information",  //路由路径
            templateUrl: "/backend/js/views/contact/contact_information.html",  //路由填充的模板
            controller:'contact_information_controller'
        })


}]);
