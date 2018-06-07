export default function getRem() {
  function auto(){                          //字体大小 自适应 rem单位
    var oHtml = document.documentElement;
    getSize();
    window.onresize = function(){
        getSize();
    };
    function getSize(){
        var screenWidth = oHtml.clientWidth;
        if (screenWidth < 320) {
            oHtml.style.fontSize = '42.6667px';
        } else if(screenWidth > 750){
            oHtml.style.fontSize = '100px';
        }else{
            oHtml.style.fontSize = screenWidth/(750/100) + 'px';
        }
    }
  }
  auto();                                  //  1rem=100px
  /*浏览器横屏坚屏改变时也运行函数*/
  window.onorientationchange = function() {
      auto();
  };
  /* 浏览器窗口发生改变也运行函数*/
  window.onresize=function(){
      auto();
  };
}