var StartBgLayer = cc.Layer.extend({
    //自定义类的构造函数
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    //？？为什么有两个？
    init:function(){
        //2.获取游戏窗口大小
        var winsize = cc.director.getWinSize();

        //3.获得游戏窗口中间位置
        //？？cc.p函数是什么作用？
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        //4. create a background image and set it's position at the center of the screen
        //创建一个精灵，把它放置在屏幕中央当背景
        //注意坐标系的不同（中点坐标系）
        var startBgSprite = new cc.Sprite(res.startBg);
        startBgSprite.setPosition(centerpos);
        this.addChild(startBgSprite);
        //播放背景音乐
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(res.startBgMusic,true); 
    }
});