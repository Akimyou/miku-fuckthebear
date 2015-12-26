var StartMenuLayer = cc.Layer.extend({
    startBtnP:cc.p(273,58),
    rankBtnP:cc.p(477,58),
    installBtnP:cc.p(540,287),
    ctor:function(){
        this._super();
    },
    init:function(){
        //创建一个菜单项目，并且指定菜单项目的样式与回调
        var startBtnSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.startBtn_up),
            new cc.Sprite(res.startBtn_down), 
            //注意this指代的对象
            //按下菜单时的回调函数
            this.start,
            this
        );
        startBtnSprite.setPosition(this.startBtnP);
        
        var rankBtnSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.rankBtn_up),
            new cc.Sprite(res.rankBtn_down), 
            //注意this指代的对象
            //按下菜单时的回调函数
            this.rank,
            this
        );
        rankBtnSprite.setPosition(this.rankBtnP);
        
        var installBtnSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.installBtn_up),
            new cc.Sprite(res.installBtn_down), 
            this.install,
            this
        );
        installBtnSprite.setPosition(this.installBtnP);
        
        //将菜单项目打包成菜单
        var startMenu = new cc.Menu(startBtnSprite,rankBtnSprite);
        //把菜单放在屏幕的某个位置（注意坐标）
        //中心对齐，第一象限
        startMenu.setPosition(0,0);
        this.addChild(startMenu);
    },
    //此处定义了开始游戏菜单项目的回调函数
    start:function(){
        console.log("click start");
        cc.audioEngine.playEffect(res.startBtnEffect,false) ;
        cc.director.runScene(new GameScene());
    },
    rank:function(){
        console.log("click rank");
        cc.audioEngine.playEffect(res.normalBtnEffect,false) ;
        //模拟点击排行版
        var rankTableA = document.getElementById("rankTable");
        rankTableA.click();
    },
    install:function(){
        console.log("click install");
        cc.audioEngine.playEffect(res.normalBtnEffect,false) ;
        cc.director.runScene(new EndScene());
    }
});