var OldBear = cc.Sprite.extend({
    ctor : function(img){
        this._super(img);
        //parms
        this.speed = 100;//(px/s)
        //status
        this.isRun = null;
        this.isWin = null;
        this.isDie = null;
        this.isCorpses = false;
        this.dieMaxTime = 3;
        this.beRemove = null;
        this.beTouch = false;
        //actions
        this.runnAction = null;
        this.runnActionTime = this.speed/1000;
        this.winAction = null;
        this.winActionTime = 1;
        this.dieAction = null;
        this.dieActionTime = 1;
    },
    init:function(position){
        this.setPosition(position);
        this.runnAction = this.getRunnAction();
        this.winAction = this.getWinAction();
        this.dieAction = this.getDieAction();
        this.addTouchEventListenser();
        this.run();
    },
    addTouchEventListenser:function(){
        var self = this;
        this.touchListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,                  
        onTouchBegan: function (touch, event) { 
            var pos = touch.getLocation();
            var target = event.getCurrentTarget();  
            if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
                self.touch();
                return true;
            }
            return false;
        }});
        cc.eventManager.addListener(this.touchListener,this);
    },
    getRunnAction:function(){
        var frames = [];
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"0.png")
        );
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"1.png")
        );
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"0.png")
        );
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"2.png")
        );
        var animation = new cc.Animation(frames,this.runnActionTime);
        var action = new cc.RepeatForever(new cc.Animate(animation));
        return action;
    },
    getWinAction:function(){
        var frames = [];
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"0.png")
        );
        var animation = new cc.Animation(frames,this.winActionTime);
        var action = new cc.RepeatForever(new cc.Animate(animation));
        return action;
    },
    getDieAction:function(){
        var frames = [];
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"3.png")
        );
        var animation = new cc.Animation(frames,this.dieActionTime);
        var action = new cc.RepeatForever(new cc.Animate(animation));
        return action;
    },
    //
    run:function(){
        this.stopAllActions();
        this.isRun = true;
        this.isWin = false;
        this.isDie = false;
        this.runAction(this.runnAction);
        this.runAction(new cc.MoveBy(g.maxX/this.speed, cc.p(g.maxX,0)));
    },
    win:function(){
        this.stopAllActions();
        this.isRun = false;
        this.isWin = true;
        this.isDie = false;
        this.runAction(this.winAction);
    },
    die:function(){
        this.stopAllActions();
        this.isRun = false;
        this.isWin = false;
        this.isDie = true;
        this.runAction(this.dieAction);
    },
    touch:function(){
        this.beTouch = true;
    },
    //检测小熊是否跑出边界
    checkOut:function(out){
        var bearX = this.getPositionX();
        if(bearX >= out){
            return true;
        }else{
            return false;
        }
    }
});