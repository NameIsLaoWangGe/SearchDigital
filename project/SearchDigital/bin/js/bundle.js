(function () {
    'use strict';

    class GameControl extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.initGameScene();
        }
        initGameScene() {
            this.self = this.owner;
            this.self['Gamecontrol'] = this;
            this.cardCollection();
        }
        cardCollection() {
            let spacingY = 10;
            for (let i = 0; i < 5; i++) {
                let num1 = Math.floor(Math.random() * 9) + 1;
                let num2 = Math.floor(Math.random() * 10);
                let num = num1.toString() + num2.toString();
                let card = this.createCard(num);
                card.x = 200;
                card.y = i * (card.height + spacingY);
            }
        }
        createCard(num) {
            let card = Laya.Pool.getItemByCreateFun('speakBox', this.digitalCard.create, this.digitalCard);
            this.cardParent.addChild(card);
            card['DigitalCard'].number.value = num;
            card['DigitalCard'].numAdaptiveBoard();
            return card;
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
            this.board.width = 140 + (len - 1) * 30;
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
