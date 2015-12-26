//开始场景类
var StartScene = cc.Scene.extend({
    onEnter:function () {
        //调用基类构造函数
        this._super();
        console.log("开始场景运行");
        var startBgLayer = new StartBgLayer();
        startBgLayer.init();
        this.addChild(startBgLayer);
        var startMenuLayer = new StartMenuLayer();
        startMenuLayer.init();
        this.addChild(startMenuLayer);
    }
});