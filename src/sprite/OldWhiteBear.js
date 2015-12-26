var OldWhiteBear = OldBear.extend({
    name : "oldWhiteBear",
    ctor : function(position){
        this._super("#"+this.name+"0.png");
        this.speed = this.speed*1.2;
        this.init(position);
    }
});