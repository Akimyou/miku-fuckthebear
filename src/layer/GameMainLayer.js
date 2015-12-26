var GameMainLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
    },
    init:function(){
        cc.spriteFrameCache.addSpriteFrames(res.oldBears_plist);
        cc.spriteFrameCache.addSpriteFrames(res.newBears_plist);
    }
});