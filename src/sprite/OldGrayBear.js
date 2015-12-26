var OldGrayBear = OldBear.extend({
    name : "oldGrayBear",
    ctor : function(position){
        this._super("#"+this.name+"0.png");
        this.speed = this.speed*1;
        this.init(position);
    }
});