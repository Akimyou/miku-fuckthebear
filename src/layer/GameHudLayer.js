var GameHudLayer = cc.Layer.extend({
    nowPoint:cc.p(76,295),
    highPoint:cc.p(207,290),
    life:cc.p(320,287),
    combo:cc.p(470,290),
    multNum:cc.p(500,228),
    ctor : function(){
        this._super();
    },
    //火狐浏览器对于label的布局有一定误差（无视掉）
    init:function(){
        var nowPointSprite = new cc.Sprite(res.nowPoint);
        nowPointSprite.setPosition(this.nowPoint);
        this.addChild(nowPointSprite);
        
        var nowPointLabel = new cc.LabelTTF(g.nowPoint+"", "Helvetica", 20);
        nowPointLabel.setColor(cc.color(254, 252, 250));
        nowPointLabel.setPosition(cc.p(this.nowPoint.x+15,this.nowPoint.y-8));
        this.addChild(nowPointLabel);
        this.nowPointLabel = nowPointLabel;
        
        var highPointSprite = new cc.Sprite(res.highPoint);
        highPointSprite.setPosition(this.highPoint);
        this.addChild(highPointSprite);
        
        var highPointLabel = new cc.LabelTTF(g.highPoint+"", "Helvetica", 15);
        highPointLabel.setColor(cc.color(248, 226, 168));
        highPointLabel.setPosition(cc.p(this.highPoint.x+10,this.highPoint.y-3));
        this.addChild(highPointLabel);
        this.highPointLabel = highPointLabel;
        
        var lifeSprite = new cc.Sprite(res.life);
        lifeSprite.setPosition(this.life);
        this.addChild(lifeSprite);
        
        var lifeLabel = new cc.LabelTTF("0", "Helvetica", 20);
        lifeLabel.setColor(cc.color(255, 0, 20));
        lifeLabel.setPosition(cc.p(this.life.x+10,this.life.y));
        this.addChild(lifeLabel);
        this.lifeLabel = lifeLabel;
        
        var comboSprite = new cc.Sprite(res.combo);
        comboSprite.setPosition(this.combo);
        comboSprite.setVisible(false);
        this.addChild(comboSprite);
        this.comboSprite = comboSprite;
        
        var multNumSpriteArray = new Array();
        for(var i= 2;i<=9;i++){
            var multNumSprite = new cc.Sprite(res["multNumx"+i]);
            multNumSprite.setPosition(this.multNum);
            multNumSprite.setVisible(false);
            multNumSpriteArray[i] = multNumSprite;
            this.addChild(multNumSprite);
        }
        this.multNumSpriteArray = multNumSpriteArray;
        //this.multNumSpriteArray[2].setVisible(true);
    }
});