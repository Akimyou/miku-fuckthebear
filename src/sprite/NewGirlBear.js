var NewGirlBear = OldBear.extend({
    name : "newGirlBear",
    ctor : function(position){
        this._super("#"+this.name+"0.png");
        
        this.speed = this.speed*0.8;
        
        this.runnActionTime = this.speed/1000+0.025*2;
        this.init(position);
    },
    getRunnAction:function(){
        var frames = [];
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"1.png")
        );
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"2.png")
        );
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"3.png")
        );
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"4.png")
        );
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"5.png")
        );
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"6.png")
        );
        var animation = new cc.Animation(frames,this.runnActionTime);
        var action = new cc.RepeatForever(new cc.Animate(animation));
        return action;
    },
    getDieAction:function(){
        var frames = [];
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"7.png")
        );
        var animation = new cc.Animation(frames,this.dieActionTime);
        var action = new cc.RepeatForever(new cc.Animate(animation));
        return action;
    }
});