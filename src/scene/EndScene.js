var EndScene = cc.Scene.extend({
    onEnter:function () {
        //调用基类构造函数
        this._super();
        console.log("结束场景运行");
        var gameBgLayer = new GameBgLayer();
        gameBgLayer.init();
        this.addChild(gameBgLayer);
        var endBgLayer = new EndBgLayer();
        endBgLayer.init();
        this.addChild(endBgLayer);
        var gameHudLayer = new GameHudLayer();
        gameHudLayer.init();
        this.addChild(gameHudLayer);
        var endMenuLayer = new EndMenuLayer();
        endMenuLayer.init();
        this.addChild(endMenuLayer);
    }
});