var g = { };
    //小熊场景边界
    g.minX = 16;
    g.maxX = 530;
    g.minY = 16;
    g.maxY = 230;
    //
    g.life = 3;
    g.nowPoint = 0;
    //本地高分存储（好像webview不支持）
    if(localStorage){
        g.highPoint =localStorage.getItem("highPoint");   
    }
    if(!g.highPoint){
        g.highPoint = 0;
    }
    //刷小熊的间隔时间
    g.spaceTime = 1000;
    g.minCorpsesArrayLength = 2;
    //
    g.rand = function(){
        if(arguments.length == 1){
            return Math.floor(Math.random() * arguments[0]);   
        }
        if(arguments.length == 2){
            var min = 0;
            var max = 0;
            if(arguments[0]<=arguments[1]){
                min = arguments[0];
                max = arguments[1];
            }else{
                min = arguments[1];
                max = arguments[0];
            }
            var range = max - min;
            var rand = Math.random();   
            var num = arguments[0] + Math.round(rand * range);
            return num;
        }
        return false;
    };
    //