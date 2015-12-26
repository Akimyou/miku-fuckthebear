var EndMenuLayer = cc.Layer.extend({
    restartBtnP:cc.p(204,52),
    uploadPointBtnP:cc.p(360,52),
    ctor:function(){
        this._super();
    },
    init:function(){
        //创建一个菜单项目，并且指定菜单项目的样式与回调
        var restartBtnSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.restartBtn_up),
            new cc.Sprite(res.restartBtn_down), 
            //注意this指代的对象
            //按下菜单时的回调函数
            this.restart,
            this
        );
        restartBtnSprite.setPosition(this.restartBtnP);
        
        var uploadPointBtnSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.uploadPointBtn_up),
            new cc.Sprite(res.uploadPointBtn_down), 
            this.uploadPoint,
            this
        );
        uploadPointBtnSprite.setPosition(this.uploadPointBtnP);
        
        //将菜单项目打包成菜单
        var endMenu = new cc.Menu(restartBtnSprite,uploadPointBtnSprite);
        //把菜单放在屏幕的某个位置（注意坐标）
        //中心对齐，第一象限
        endMenu.setPosition(0,0);
        this.addChild(endMenu);
    },
    //此处定义了开始游戏菜单项目的回调函数
    restart:function(){
        console.log("click restart");
        cc.audioEngine.playEffect(res.startBtnEffect,false);
        cc.director.runScene(new GameScene());
    },
    uploadPoint:function(){
        console.log("click uploadPoint");
        cc.audioEngine.playEffect(res.normalBtnEffect,false);
        //获取用户分数
        console.log("本局游戏分数:"+g.nowPoint,"最高游戏分数:"+g.highPoint);
        //打开上传分数模态框
        $(function(){
            $("#showPoint").val(g.nowPoint);
            $("#submitBtn").show();
            initIc();
            $("#myModal").modal("show");
        });
    }
});