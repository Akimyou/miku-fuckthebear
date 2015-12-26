var NewSkateboardBear = OldBear.extend({
    name : "newSkateboardBear",
    ctor : function(position){
        this._super("#"+this.name+"0.png");
        
        this.speed = this.speed*1.5;
        this.runnActionTime = this.speed/1000-0.025;
        this.init(position);
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
            cc.spriteFrameCache.getSpriteFrame(this.name+"2.png")
        );
        var animation = new cc.Animation(frames,this.runnActionTime);
        var action = new cc.RepeatForever(new cc.Animate(animation));
        return action;
    }
});