var OldGirlBear = OldBear.extend({
    name : "oldGirlBear",
    ctor : function(position){
        this._super("#"+this.name+"0.png");
        this.speed = this.speed*0.8;
        this.init(position);
    }
});