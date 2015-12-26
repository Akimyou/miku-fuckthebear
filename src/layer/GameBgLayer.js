var GameBgLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
    },
    init:function(){
        var winsize = cc.director.getWinSize();
        //将坐标封装成对象
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        var gameBgSprite = new cc.Sprite(res.gameBg);
        gameBgSprite.setPosition(centerpos);
        this.addChild(gameBgSprite);
        cc.audioEngine.stopMusic ();
        cc.audioEngine.playMusic(res.gameBgMusic,true); 
    }
});