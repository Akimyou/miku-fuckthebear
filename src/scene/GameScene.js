var GameScene = cc.Scene.extend({
    nowPoint:0,
    life:g.life,
    //控制小熊刷新的参数－－开始
    spaceTime:g.spaceTime,
    timeCount:0,
    lastturn:0,
    currentTurn:1,
    typeObj:{s:0,e:1},//2种熊
    //控制小熊刷新的参数－－结束
    //控制连击与倍率的参数－－开始
    corpsesArray:new Array(),
    minCorpsesArrayLength:g.minCorpsesArrayLength,
    comboCount:0,
    pointMultiplying:1,
    pointMultiplyingP:1,
    comboShowIsShow:false,
    //控制连击的参数－－结束
    onEnter:function () {
        console.log("游戏场景运行");
        //调用基类构造函数
        this._super();
        var gameBgLayer = new GameBgLayer();
        gameBgLayer.init();
        this.addChild(gameBgLayer);
        
        var gameMainLayer = new GameMainLayer();
        gameMainLayer.init();
        this.addChild(gameMainLayer);
        this.gameMainLayer = gameMainLayer;
        
        var gameHudLayer = new GameHudLayer();
        gameHudLayer.init();
        this.addChild(gameHudLayer);
        this.gameHudLayer = gameHudLayer;
        
        this.scheduleUpdate();
    },
    /*请注意这个（坑爹啊）*/
    update:function(dt){
        if(this.lastturn < this.currentTurn){
                this.lastturn = this.currentTurn;
                var type = g.rand(this.typeObj.s,this.typeObj.e);
                var newBear = null;
                if(type==0){
                    newBear = new OldGrayBear(cc.p(g.minX,g.rand(16,g.maxY)));
                }else if(type == 1){
                    newBear = new OldGirlBear(cc.p(g.minX,g.rand(16,g.maxY)));
                }else if(type == 2){
                    newBear = new OldWhiteBear(cc.p(g.minX,g.rand(16,g.maxY)));
                }else if(type == 3){
                    newBear = new OldGraySuperBear(cc.p(g.minX,g.rand(16,g.maxY)));
                }
                ////////////////////////////////////////////////////////////////
                else if(type == 4){
                    newBear = new NewGirlBear(cc.p(g.minX,g.rand(16,g.maxY)));
                }else if(type == 5){
                    newBear = new NewGrayBear(cc.p(g.minX,g.rand(16,g.maxY)));
                }else if(type == 6){
                    newBear = new NewSkateboardBear(cc.p(g.minX,g.rand(16,g.maxY)));
                }else if(type == 7){
                    newBear = new NewSkullBear(cc.p(g.minX,g.rand(16,g.maxY)));
                }else if(type == 8){
                    newBear = new NewWhiteBear(cc.p(g.minX,g.rand(16,g.maxY)));
                }
                this.gameMainLayer.addChild(newBear);
                
        }
        this.timeCount = this.timeCount + parseInt(dt*1000);
        this.currentTurn = Math.floor(this.timeCount/this.spaceTime);
        //愉快连击
        if(parseInt(this.timeCount/1000) >= 10){
            this.spaceTime = 800;
            //console.log("MIKU-愉快连击");
            this.typeObj = {s:2,e:3};
        }
        //缓一口气
        if(parseInt(this.timeCount/1000) >= 20){
            this.spaceTime = 1000;
            //console.log("MIKU-缓一口气");
            this.typeObj = {s:0,e:2};
        }
        //坚持住
        if(parseInt(this.timeCount/1000) >= 30){
            this.spaceTime = 1000;
            //console.log("MIKU-坚持住");
            this.typeObj = {s:3,e:3};
        }
        //好像有希望，终于到黎明了
        if(parseInt(this.timeCount/1000) >= 40){
            this.spaceTime = 1500;
            //console.log("MIKU-好像有希望，终于到黎明了");
            this.typeObj = {s:4,e:8};
        }
        //到地狱了
        if(parseInt(this.timeCount/1000) >= 50){
            this.spaceTime = 400;
            //console.log("MIKU-到地狱了");
            this.typeObj = {s:0,e:8};
        }
        if(this.corpsesArray.length <= this.minCorpsesArrayLength){
                this.comboCount = 0;
                this.comboIsShow = false;
        }
        var bears = this.gameMainLayer.children;
        for(i in bears){
            var bear = bears[i];
            //玩家击杀
            if(bear.beTouch){
                 //如果是超级熊
                if(bear.isSuper){
                    this.gameMainLayer.addChild(bear.goBack());
                    bear.beRemove = true;
                }
                if(!bear.isDie&&!bear.isWin){
                    //击杀音效
                    cc.audioEngine.playEffect(res.startBtnEffect,false);
                    bear.die();
                    //计算连击次数
                    if(this.corpsesArray.length > this.minCorpsesArrayLength){
                        this.comboCount = this.comboCount +1;
                        this.comboIsShow = true;
                    }
                    //计算分数倍率
                    this.pointMultiplying = parseInt(this.comboCount/this.pointMultiplyingP);
                    if(this.pointMultiplying == 0){
                        this.pointMultiplying = 1;
                    }
                    if(this.pointMultiplying >= 9){
                        this.pointMultiplying = 9;
                    }
                    this.nowPoint = this.nowPoint + 1*this.pointMultiplying;
                    //console.log(this.pointMultiplying);
                }
            }
            //死亡(尸体会留在场上一会儿(dieCountTime))
            if(bear.isDie){
                if(!bear.dieCountTime){
                    bear.dieCountTime = 0;
                }
                bear.dieCountTime = bear.dieCountTime + dt;
                if(!bear.isCorpses){
                    bear.isCorpses = true;
                   this.corpsesArray.push(bear); 
                }
                if(bear.dieCountTime >= bear.dieMaxTime){
                    bear.beRemove = true;
                }
            }
            //游戏结束逻辑
            if(bear.checkOut(g.maxX)&&!bear.isWin){
                bear.win();
                this.life = this.life - 1;
                //击杀音效
                cc.audioEngine.playEffect(res.bearBeWinEffect,false);
                if(this.life <= 0){
                    console.log("游戏结束");
                    //立刻存储分数（存储用this.nowPoint更安全）
                    var userPoint = rsacode(this.nowPoint);
                    $.post(uploadBasePath+"/rankbyscore/tempScore.php",{"userPoint":userPoint},function(data){
                        console.log(data);
                    });
                    g.nowPoint = this.nowPoint;
                    cc.director.runScene(new EndScene());
                }
            }
            //清除精灵
            if(bear.beRemove){
                this.gameMainLayer.removeChild(bear);
                this.corpsesArray.pop();
            }
        }
        //更新生命值
        this.gameHudLayer.lifeLabel.setString(this.life);
        //更新游戏分数
        this.gameHudLayer.nowPointLabel.setString(this.nowPoint);
        if(this.nowPoint >= g.highPoint){
            g.highPoint = this.nowPoint;
            //本地存储
            localStorage.setItem("highPoint",g.highPoint);
        }
        this.gameHudLayer.highPointLabel.setString(g.highPoint);
        //更新连击
        this.gameHudLayer.comboSprite.setVisible(this.comboIsShow);
        for(i in this.gameHudLayer.multNumSpriteArray){
            this.gameHudLayer.multNumSpriteArray[i].setVisible(false);
        }
        if(this.comboIsShow&&this.pointMultiplying>=2){
            this.gameHudLayer.multNumSpriteArray[this.pointMultiplying].setVisible(true);
        }
    }
});