var map = new BMap.Map("map_div");// 创建Map实例
var point = new BMap.Point(121.871059,39.080075);
map.centerAndZoom(point, 16);
map.enableScrollWheelZoom(); //启用滚轮放大缩小

var marker = new BMap.Marker(new BMap.Point(121.871059,39.080075));  // 创建标注
map.addOverlay(marker);



var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?7b39e70ff868f7233e9085d3dcebdcca";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();



$(document).ready(function(){
    console.log('123')
    $("#sideNav").sideNav({closeOnClick: true});
    // $("#sideNav").sideNav({
    //     menuWidth: 280, // Default is 300
    //     edge: 'left', // Choose the horizontal origin
    //     closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    //     draggable: true // Choose whether you can drag to open on touch screens
    // });
    console.log('456')

    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    $("#sideNav").sideNav({closeOnClick: true});
});
window.setInterval(function() { $(".carousel").carousel('next') }, 4500);