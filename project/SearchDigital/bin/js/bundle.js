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
            this.self.height = Laya.stage.height;
            this.levels = 0;
            this.levelsNum.value = this.levels.toString();
            this.timer = 0;
            this.timeNum.value = '10s';
            this.timerSwitch = false;
        }
        replacementCard() {
            this.levels++;
            this.levelsNodeAni();
            this.timeNum.value = '10s';
        }
        levelsNodeAni() {
            let time = 150;
            Laya.Tween.to(this.levelsNode, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                this.levelsNum.alpha = 0;
                Laya.Tween.to(this.levelsNode, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(this.levelsNode, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(this.levelsNode, { scaleX: 1 }, time - 50, null, Laya.Handler.create(this, function () {
                            this.levelsNum.alpha = 1;
                            this.levelsNum.value = this.levels.toString();
                            this.indicateNodeAin();
                        }), 0);
                    }), 0);
                }), 0);
            }), 0);
        }
        cardCollection() {
            let spacingY = 5;
            let cardCount = this.levels * 2;
            let startX1 = this.cardParent.width / 4;
            let startX2 = this.cardParent.width * 3 / 4;
            let startY = 100;
            let noChengeI = Math.floor(Math.random() * 2);
            let noChengeJ = Math.floor(Math.random() * 6);
            let delayed = 10;
            for (let j = 0; j < 6; j++) {
                Laya.timer.once(delayed, this, function () {
                    for (let i = 0; i < 2; i++) {
                        let card;
                        if (i === noChengeI && j === noChengeJ) {
                            card = this.createCard('nochange');
                        }
                        else {
                            card = this.createCard('change');
                        }
                        this.cardAppear(card);
                        if (i % 2 === 0) {
                            card.x = startX1;
                        }
                        else {
                            card.x = startX2;
                        }
                        card.y = startY + j * (card.height + spacingY);
                        if (i === 1 && j === this.levels - 1) {
                            this.timerSwitch = true;
                        }
                    }
                });
                delayed += 300;
            }
        }
        cardAppear(card) {
            let time = 100;
            Laya.Tween.to(card, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(card, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    let number = card.getChildByName('number');
                    number.alpha = 1;
                    Laya.Tween.to(card, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    }), 0);
                }), 0);
            }), 0);
        }
        indicateNodeAin() {
            let time = 150;
            Laya.Tween.to(this.indicateCard, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                this.indicateNum.alpha = 0;
                Laya.Tween.to(this.indicateCard, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(this.indicateCard, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(this.indicateCard, { scaleY: 1 }, time - 50, null, Laya.Handler.create(this, function () {
                            this.indicateNum.alpha = 1;
                            this.indicateNumReset();
                            this.cardCollection();
                        }), 0);
                    }), 0);
                }), 0);
            }), 0);
        }
        indicateNumReset() {
            let num1 = Math.floor(Math.random() * 9) + 1;
            let overlen = this.levels - 1;
            let num = num1.toString();
            for (let i = 0; i < overlen; i++) {
                num += Math.floor(Math.random() * 10).toString();
            }
            let scale = 1 - (this.levels - 2) * 0.04;
            this.indicateNum.scale(scale, scale);
            this.indicateNum.value = num;
            this.changeAnumber();
        }
        changeAnumber() {
            let arr = [];
            for (let i = 0; i < this.indicateNum.value.length; i++) {
                arr.push(this.indicateNum.value[i]);
            }
            let random = Math.floor(Math.random() * (arr.length - 1));
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
        createCard(type) {
            let card = Laya.Pool.getItemByCreateFun('speakBox', this.digitalCard.create, this.digitalCard);
            this.cardParent.addChild(card);
            if (type === 'change') {
                card['DigitalCard'].number.value = this.changeAnumber();
            }
            else {
                card['DigitalCard'].number.value = this.indicateNum.value;
            }
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
                        this.replacementCard();
                    }
                });
            }
        }
        onUpdate() {
            if (this.timerSwitch) {
                this.timer++;
                if (this.timer % 60 == 0) {
                    let timeNum = this.timeNum.value;
                    let subNum;
                    if (timeNum.length === 3) {
                        subNum = timeNum.substring(0, 2);
                    }
                    else if (timeNum.length === 2) {
                        subNum = timeNum.substring(0, 1);
                    }
                    if (subNum === '0') {
                        return;
                    }
                    this.timeNum.value = (Number(subNum) - 1).toString() + 's';
                }
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
            this.gameControl = this.self.scene['Gamecontrol'];
            this.cardParent = this.gameControl.cardParent;
            this.levels = this.gameControl.levels;
            this.number.alpha = 0;
            this.self.alpha = 0;
            let scale = 1 - (this.levels - 1) * 0.04;
            this.number.scale(scale, scale);
            this.cardClicksOn();
        }
        numAdaptiveBoard() {
            this.setHeightAndY();
            this.self.pivotY = this.self.height / 2;
            this.board.x = this.self.pivotX;
            this.board.y = this.self.pivotY;
            this.number.x = this.board.x;
            this.number.y = this.board.y * 1.1;
            this.board.pivotX = this.board.width / 2;
            this.board.pivotY = this.board.height / 2;
            this.board.x = this.number.x;
        }
        setHeightAndY() {
            switch (this.levels) {
                case 1:
                    this.board.height = 200;
                    this.self.height = this.board.height;
                    this.self.y += this.cardParent.height / 3;
                    break;
                case 2:
                    this.board.height = 200;
                    this.self.height = this.board.height;
                    this.self.y += this.cardParent.height / 3;
                    break;
                case 3:
                    this.board.height = 150;
                    this.self.height = this.board.height;
                    this.self.y += this.cardParent.height / 3;
                    break;
                case 4:
                    break;
                case 5:
                    break;
                default:
                    this.board.height = 135 - (this.levels - 1) * 6;
                    let scale = 1 - (this.levels - 1) * 0.05;
                    this.number.scale(scale, scale);
                    break;
            }
        }
        cardwidth() {
            let cardParent = this.gameControl.cardParent;
            let parentW = cardParent.width;
            let parentH = cardParent.height;
        }
        cardClicksOn() {
            this.self.on(Laya.Event.MOUSE_DOWN, this, this.down);
            this.self.on(Laya.Event.MOUSE_MOVE, this, this.move);
            this.self.on(Laya.Event.MOUSE_UP, this, this.up);
            this.self.on(Laya.Event.MOUSE_OUT, this, this.out);
        }
        cardClicksOnOff(node) {
            node.off(Laya.Event.MOUSE_DOWN, this, this.down);
            node.off(Laya.Event.MOUSE_MOVE, this, this.move);
            node.off(Laya.Event.MOUSE_UP, this, this.up);
            node.off(Laya.Event.MOUSE_OUT, this, this.out);
        }
        allCardClicksOff() {
            let cardParent = this.gameControl.cardParent;
            for (let i = 0; i < cardParent._children.length; i++) {
                let card = cardParent._children[i];
                this.cardClicksOnOff(card);
            }
        }
        down(event) {
            event.currentTarget.scale(1.1, 1.1);
        }
        cardVanish() {
            Laya.Tween.to(this.self, { scaleX: 0, scaleY: 0, alpha: 0 }, 200, null, Laya.Handler.create(this, function () {
                this.self.removeSelf();
                this.gameControl.clearAllCard();
            }));
        }
        move(event) {
            event.currentTarget.scale(1, 1);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
            let indicateNum = this.gameControl.indicateNum;
            if (this.number.value === indicateNum.value) {
                this.allCardClicksOff();
                this.cardVanish();
            }
        }
        out(event) {
            event.currentTarget.scale(1, 1);
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
