window.onload = function(){
//cc是一个全局变量
cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.enableRetina(true);
    cc.view.setDesignResolutionSize(568, 320, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
  //load resources
  //加载游戏资源（全局资源），回调
  //加载资源时会显示cocos的加载画面
  cc.LoaderScene.preload(g_resources, function () {
      //运行开始场景
      cc.director.runScene(new StartScene());
      console.log("资源加载完毕");
  }, this);
};
//指定运行的canvas
cc.game.run("canvas");
};