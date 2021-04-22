jQuery(document).ready(function() {
    RevolutionSlider.initRSfullScreen();
});
var RevolutionSlider = function() {
  return {
    initRSfullScreen: function() {
      var revapi;
      jQuery(document).ready(function() {
        revapi = jQuery('.fullscreenbanner').revolution(
          {
            delay: 8000,//滑动内容停留时间。默认9000毫秒
            startwidth: 1170,//滑动内容宽度，默认890像素。
            startheight: 500,//滑动内容高度，默认490像素。
            hideThumbs: 10,//缩略图
            fullWidth: "on",//是否开启全屏展示图片内容，on：开启，off：关闭。
            fullScreen: "on",
            hideCaptionAtLimit: "",
            dottedOverlay: "twoxtwo",
            navigationStyle: "preview4",
            fullScreenOffsetContainer: "",
          });
      });
    }

  };
}();



