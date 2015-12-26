var OldGraySuperBear = OldBear.extend({
    isSuper:true,
    name : "oldGrayBear",
    ctor : function(position){
        this._super("#"+this.name+"0.png");
        this.speed = this.speed*1.5;
        this.init(position);
    },
    //重写基类OldBear的方法(只加载滑板帧)
    getRunnAction:function(name){
        var frames = [];
        frames.push(
            cc.spriteFrameCache.getSpriteFrame(this.name+"4.png")
        );
        var animation = new cc.Animation(frames,this.runnActionTime);
        var action = new cc.RepeatForever(new cc.Animate(animation));
        return action;
    },
    goBack:function(){
        newBear = new OldGrayBear(this.getPosition());
        return newBear;
    }
});