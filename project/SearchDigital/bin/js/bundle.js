(function () {
    'use strict';

    class GameControl extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.initGameScene();
            this.replacementCard();
        }
        initGameScene() {
            this.self = this.owner;
            this.self['Gamecontrol'] = this;
            this.levels = 10;
        }
        replacementCard() {
            this.indicateNumReset();
            this.cardCollection();
        }
        cardCollection() {
            let spacingY = 10;
            let cardCount = this.levels * 2;
            let startX1 = this.cardParent.width / 4;
            let startX2 = this.cardParent.width * 3 / 4;
            let startY = this.cardParent.height / 2;
            for (let i = 0; i < 2; i++) {
                for (let j = 1; j < this.levels + 1; j++) {
                    let card = this.createCard();
                    if (i % 2 === 0) {
                        card.x = startX1;
                    }
                    else {
                        card.x = startX2;
                    }
                    if (j % 2 === 0) {
                        card.y = startY + (j / 2) * (card.height + spacingY);
                    }
                    else {
                        card.y = startY - (j - 1) / 2 * (card.height + spacingY);
                    }
                }
            }
            this.levels++;
        }
        indicateNumReset() {
            this.levels;
            let num1 = Math.floor(Math.random() * 9) + 1;
            let overlen = this.levels - 1;
            let num = num1.toString();
            for (let i = 0; i < overlen; i++) {
                num += Math.floor(Math.random() * 10).toString();
            }
            let scale = 1 - (this.levels - 8) * 0.05;
            this.indicateNum.scale(scale, scale);
            this.indicateNum.value = num;
            this.changeAnumber();
        }
        changeAnumber() {
            let arr = [];
            for (let i = 0; i < this.indicateNum.value.length; i++) {
                arr.push(this.indicateNum.value[i]);
            }
            let random = Math.floor(Math.random() * (arr.length - 1)) + 1;
            let originalNum = arr[random];
            let randomNum = Math.floor(Math.random() * 10).toString();
            while (originalNum === randomNum) {
                randomNum = Math.floor(Math.random() * 10).toString();
            }
            arr[random] = randomNum;
            let numString;
            for (let j = 0; j < arr.length; j++) {
                if (j === 0) {
                    numString = arr[j];
                }
                else {
                    numString += arr[j];
                }
            }
            return numString;
        }
        createCard() {
            let card = Laya.Pool.getItemByCreateFun('speakBox', this.digitalCard.create, this.digitalCard);
            this.cardParent.addChild(card);
            card['DigitalCard'].number.value = this.changeAnumber();
            card['DigitalCard'].numAdaptiveBoard();
            return card;
        }
        clearAllCard() {
            let len = this.cardParent._children.length;
            let delayed = 0;
            for (let i = 0; i < len; i++) {
                let card = this.cardParent._children[i];
                delayed += 100;
                Laya.timer.once(delayed, this, function () {
                    card.alpha = 0;
                    if (i === len - 1) {
                        this.cardParent.removeChildren(0, len - 1);
                    }
                });
            }
        }
        onDisable() {
        }
    }

    class DigitalCard extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['DigitalCard'] = this;
        }
        numAdaptiveBoard() {
            let len = this.number.value.length;
            if (len <= 3) {
                this.board.width = len * 40 + 80;
            }
            else if (len >= 3 && len <= 6) {
                this.board.width = len * 40 + 50;
            }
            this.board.height = 135 - (len - 1) * 6;
            let scale = 1 - (len - 1) * 0.05;
            this.number.scale(scale, scale);
            this.self.height = this.board.height;
            this.self.pivotY = this.self.height / 2;
            this.board.x = this.self.pivotX;
            this.board.y = this.self.pivotY;
            this.number.x = this.self.pivotX;
            this.number.y = this.self.pivotY * 1.1;
            this.board.pivotX = this.board.width / 2;
            this.board.pivotY = this.board.height / 2;
            this.board.x = this.number.x;
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Script/GameControl.ts", GameControl);
            reg("Script/DigitalCard.ts", DigitalCard);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Scene/MainScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
