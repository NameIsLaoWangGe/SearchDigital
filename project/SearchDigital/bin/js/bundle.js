(function () {
    'use strict';

    var Animation;
    (function (Animation) {
        function upDown_Rotate(node, time, func) {
            Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), 0);
        }
        Animation.upDown_Rotate = upDown_Rotate;
        function leftRight_Rotate(node, time, func) {
            Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                        }), 0);
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), 0);
            }), 0);
        }
        Animation.leftRight_Rotate = leftRight_Rotate;
        function leftRight_Shake(node, time, range, func) {
            Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { x: node.x + range * 2 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }));
                }));
            }));
        }
        Animation.leftRight_Shake = leftRight_Shake;
        function upDwon_Shake(node, time, range, func) {
            Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { y: node.y - range * 2 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }));
                }));
            }));
        }
        Animation.upDwon_Shake = upDwon_Shake;
        function fade_out(node, alhpa1, alhpa2, time, delayed, func) {
            node.alpha = alhpa1;
            Laya.Tween.to(node, { alpha: alhpa2 }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.fade_out = fade_out;
        function fade_out_Move(node, time, range, x, y, delayed, func) {
            Laya.Tween.to(node, { alpha: range, x: x, y: y }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.fade_out_Move = fade_out_Move;
        function drop(node, targetY, rotation, time, delayed, func) {
            Laya.Tween.to(node, { y: targetY, rotation: rotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.drop = drop;
        function go_up(node, initialY, initialR, targetY, time, delayed, func) {
            node.y = initialY;
            node.rotation = initialR;
            Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }
        Animation.go_up = go_up;
        function cardRotateX_TowFace(node, arr, func1, time, delayed, func2) {
            Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                for (let i = 0; i < arr.length; i++) {
                    let child = node.getChildByName(arr[i]);
                    if (child !== null) {
                        child['alpha'] = 0;
                    }
                }
                if (func1 !== null) {
                    func1();
                }
                Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 1 }, time * 1 / 2, null, Laya.Handler.create(this, function () {
                            for (let i = 0; i < arr.length; i++) {
                                let child = node.getChildByName(arr[i]);
                                if (child !== null) {
                                    child['alpha'] = 1;
                                }
                            }
                            if (func2 !== null) {
                                func2();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }
        Animation.cardRotateX_TowFace = cardRotateX_TowFace;
        function cardRotateX_OneFace(node, func1, time, delayed, func2) {
            Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                if (func1 !== null) {
                    func1();
                }
                Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    if (func2 !== null) {
                        func2();
                    }
                }), 0);
            }), delayed);
        }
        Animation.cardRotateX_OneFace = cardRotateX_OneFace;
        function cardRotateY_TowFace(node, arr, func1, time, delayed, func2) {
            Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                for (let i = 0; i < arr.length; i++) {
                    let child = node.getChildByName(arr[i]);
                    if (child !== null) {
                        child['alpha'] = 0;
                    }
                }
                if (func1 !== null) {
                    func1();
                }
                Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 1 }, time * 1 / 2, null, Laya.Handler.create(this, function () {
                            for (let i = 0; i < arr.length; i++) {
                                let child = node.getChildByName(arr[i]);
                                if (child !== null) {
                                    child['alpha'] = 1;
                                }
                            }
                            if (func2 !== null) {
                                func2();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }
        Animation.cardRotateY_TowFace = cardRotateY_TowFace;
        function cardRotateY_OneFace(node, func1, time, delayed, func2) {
            Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                if (func1 !== null) {
                    func1();
                }
                Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    if (func2 !== null) {
                        func2();
                    }
                }), 0);
            }), delayed);
        }
        Animation.cardRotateY_OneFace = cardRotateY_OneFace;
        function move_changeRotate(node, targetX, targetY, per, rotation_pe, time, func) {
            let targetPerX = targetX * per + node.x * (1 - per);
            let targetPerY = targetY * per + node.y * (1 - per);
            Laya.Tween.to(node, { x: targetPerX, y: targetPerY, rotation: 45 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { x: targetX, y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), 0);
            }), 0);
        }
        Animation.move_changeRotate = move_changeRotate;
    })(Animation || (Animation = {}));

    class GameControl extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.initGameScene();
            this.adaptiveRule();
            this.createStartGame();
        }
        initGameScene() {
            this.self = this.owner;
            this.self['Gamecontrol'] = this;
            this.levels = 0;
            this.levelsNum.value = this.levels.toString();
            this.timer = 0;
            this.timeNum.value = '30s';
            this.timerSwitch = false;
            this.videoAdOnClose = false;
            this.videoAdLode();
            this.bannerAdLode();
            this.wxPostInit();
        }
        videoAdLode() {
            if (Laya.Browser.onMiniGame) {
                this.videoAd = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-6de18c6de7b6d9ab'
                });
                this.videoAd.onLoad(() => {
                    console.log('激励视频 广告加载成功');
                });
                this.videoAd.onError(err => {
                    console.log(err);
                });
                this.videoAd.onClose(res => {
                    if (res && res.isEnded || res === undefined) {
                        this.startNode['GameOVer'].vanish('adv');
                        if (Laya.Browser.onMiniGame) {
                            this.bannerAd.hide();
                        }
                    }
                    else {
                        if (Laya.Browser.onMiniGame) {
                            this.bannerAd.show()
                                .then(() => console.log('banner 广告显示'));
                        }
                        console.log('视频没有看望不会开始游戏');
                    }
                });
            }
        }
        bannerAdLode() {
            if (Laya.Browser.onMiniGame) {
                this.bannerAd = wx.createBannerAd({
                    adUnitId: 'adunit-5329937f4349b0ea',
                    adIntervals: 30,
                    style: {
                        left: 0,
                        top: 0,
                        width: 750
                    }
                });
                this.bannerAd.onLoad(() => {
                    console.log('banner 广告加载成功');
                });
                this.bannerAd.onError(err => {
                    console.log(err);
                });
                this.bannerAd.show();
            }
        }
        adaptiveRule() {
            let stageHeight = Laya.stage.height;
            this.self.height = stageHeight;
            this.background.height = stageHeight;
            this.background.x = 0;
            this.background.y = 0;
            this.line.y = stageHeight * 0.215;
            this.line.alpha = 0;
            let location = stageHeight * 0.132;
            this.levelsNode.y = location;
            this.levelsNode.alpha = 0;
            this.indicateCard.y = location;
            this.indicateCard.alpha = 0;
            this.timeCard.y = location;
            this.timeCard.alpha = 0;
            this.cardParent.y = stageHeight * 0.22;
            this.cardAndParentAdaptive();
        }
        createStartGame() {
            let startGame = Laya.Pool.getItemByCreateFun('startGame', this.startGame.create, this.startGame);
            this.self.addChild(startGame);
        }
        replacementCard(type) {
            if (type === 'start' || type === 'reStart' || type === 'adv') {
                this.levels = 1;
            }
            else if (type === 'nextLevel') {
                this.levels++;
            }
            this.timer = -50;
            this.otherRotate(type);
        }
        otherRotate(type) {
            let time = 120;
            Animation.cardRotateX_OneFace(this.levelsNode, func => this.levelsNum.value = this.levels.toString(), time, 0, func => Animation.cardRotateY_OneFace(this.indicateCard, func => this.indicateNumReset(), time, 0, func => this.otherRotateFunc(type, time)));
        }
        otherRotateFunc(type, time) {
            if (type === 'nextLevel') {
                this.cardCollection();
            }
            else {
                Animation.cardRotateX_OneFace(this.timeCard, func => {
                    if (type === 'start' || type === 'reStart') {
                        this.timeNum.value = '30s';
                    }
                    else if (type === 'adv') {
                        this.timeNum.value = '40s';
                    }
                }, time, 0, func => this.cardCollection());
            }
        }
        indicateNumReset() {
            let num1 = Math.floor(Math.random() * 9) + 1;
            let levels = this.levels;
            let overlen = levels - 1;
            let num = num1.toString();
            for (let i = 0; i < overlen; i++) {
                num += Math.floor(Math.random() * 10).toString();
            }
            let scale = 1 - (levels - 2) * 0.04;
            this.indicateNum.scale(scale, scale);
            this.indicateNum.value = num;
            this.changeAnumber();
        }
        otherVanish() {
            let time = 200;
            let delayed = 150;
            Animation.fade_out(this.levelsNode, 1, 0, time, delayed * 0, null);
            Animation.fade_out(this.indicateCard, 1, 0, time, delayed * 1, null);
            Animation.fade_out(this.timeCard, 1, 0, time, delayed * 2, null);
            Animation.fade_out(this.line, 1, 0, time, delayed * 3, null);
        }
        otherAppear() {
            let time = 200;
            let delayed = 150;
            Animation.fade_out(this.levelsNode, 0, 1, time, delayed * 0, null);
            Animation.fade_out(this.indicateCard, 0, 1, time, delayed * 1, null);
            Animation.fade_out(this.timeCard, 0, 1, time, delayed * 2, null);
            Animation.fade_out(this.line, 0, 1, time, delayed * 3, null);
        }
        cardAndParentAdaptive() {
            this.cardSpacingY = 5;
            let remainingW = this.self.height - this.cardParent.y - this.self.height * 0.05;
            let cardSpace = remainingW / 7;
            this.cardHeight = cardSpace - this.cardSpacingY;
        }
        cardCollection() {
            let startX1 = this.cardParent.width / 4;
            let startX2 = this.cardParent.width * 3 / 4;
            let len = 14;
            let noChengeJ = Math.floor(Math.random() * len);
            let delayed = 10;
            for (let j = len - 1; j >= 0; j--) {
                delayed += 50;
                let card;
                if (j === noChengeJ) {
                    card = this.createCard('nochange');
                }
                else {
                    card = this.createCard('change');
                }
                card.y = 1500;
                card.zOrder = Math.floor(Math.random() * 30);
                card.height = this.cardHeight;
                card['DigitalCard'].board.height = this.cardHeight;
                card['DigitalCard'].number.y = this.cardHeight / 2;
                let tagetY;
                if (j % 2 === 0) {
                    card.x = startX1;
                    tagetY = j / 2 * (card.height + this.cardSpacingY) + 80;
                }
                else {
                    card.x = startX2;
                    tagetY = (j - 1) / 2 * (card.height + this.cardSpacingY) + 80;
                }
                Animation.go_up(card, 1800, Math.floor(Math.random() * 2) === 1 ? 30 : -30, tagetY, 500, delayed, func => {
                    if (j === len - 1) {
                        this.timerSwitch = true;
                        for (let index = 0; index < this.cardParent._children.length; index++) {
                            const card = this.cardParent._children[index];
                            card['DigitalCard'].cardClicksOn();
                        }
                    }
                });
            }
        }
        clearAllCard_Next() {
            this.clearAllClicks();
            let len = this.cardParent._children.length;
            this.timerSwitch = false;
            for (let i = 0; i < len; i++) {
                let card = this.cardParent._children[i];
                Laya.timer.once(i * 50, this, function () {
                    Animation.drop(card, 1800, Math.floor(Math.random() * 2) === 1 ? 30 : -30, 800, 0, func => {
                        if (i === len - 1) {
                            this.cardParent.removeChildren(0, len - 1);
                            this.replacementCard('nextLevel');
                        }
                    });
                });
            }
        }
        clearAllCard_Over() {
            this.clearAllClicks();
            let len = this.cardParent._children.length;
            this.timerSwitch = false;
            for (let i = 0; i < len; i++) {
                let card = this.cardParent._children[i];
                Laya.timer.once(i * 50, this, func => {
                    if (card['DigitalCard'].number.value === this.indicateNum.value) {
                        card.zOrder = 1000;
                        this.cardRotating(card, i);
                    }
                    else {
                        Animation.drop(card, 1800, Math.floor(Math.random() * 2) === 1 ? 30 : -30, 800, 0, null);
                    }
                });
            }
        }
        cardRotating(card, i) {
            let len = this.cardParent._children.length;
            Animation.cardRotateY_TowFace(card, ['number'], null, 120, (len - i) * 50 + 500, func => {
                Animation.drop(card, 1800, Math.floor(Math.random() * 2) === 1 ? 30 : -30, 1000, 500, func => {
                    this.cardParent.removeChildren(0, len - 1);
                    this.createGameOver();
                });
            });
        }
        clearAllClicks() {
            for (let index = 0; index < this.cardParent._children.length; index++) {
                const card = this.cardParent._children[index];
                card['DigitalCard'].cardClicksOff();
            }
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
        createGameOver() {
            let gameOVer = Laya.Pool.getItemByCreateFun('gameOVer', this.gameOVer.create, this.gameOVer);
            this.self.addChild(gameOVer);
        }
        createRanking() {
            let ranking = Laya.Pool.getItemByCreateFun('ranking', this.ranking.create, this.ranking);
            this.self.addChild(ranking);
            if (Laya.Browser.onMiniGame) {
                this.bannerAd.hide();
            }
        }
        adaptiveOther(self) {
            self.width = 750;
            self.pivotX = self.width / 2;
            self.pivotY = self.height / 2;
            self.pos(375, Laya.stage.height / 2);
        }
        childAdaptive(child, parent, locationY) {
            child.y = locationY - (Laya.stage.height / 2 - parent.height / 2);
        }
        wxPostInit() {
            if (Laya.Browser.onMiniGame) {
                Laya.loader.load(["res/atlas/rank.atlas"], Laya.Handler.create(null, function () {
                    Laya.MiniAdpter.sendAtlasToOpenDataContext("res/atlas/rank.atlas");
                    let wx = Laya.Browser.window.wx;
                    let openDataContext = wx.getOpenDataContext();
                    openDataContext.postMessage({ action: 'init' });
                }));
            }
        }
        wxPostData() {
            if (Laya.Browser.onMiniGame) {
                let args = {
                    type: 'scores', data: { scores: this.levelsNum.value }
                };
                let wx = Laya.Browser.window.wx;
                let openDataContext = wx.getOpenDataContext();
                openDataContext.postMessage(args);
                console.log('上传了');
            }
            else {
                console.log('没有上传');
            }
        }
        wxShare() {
            if (Laya.Browser.onMiniGame) {
                let wx = Laya.Browser.window.wx;
                wx.shareAppMessage({
                    title: '数字找茬',
                    imageUrlId: 'CRYATpcgSFGkeB4Hs75jOQ',
                    imageUrl: 'https://mmocgame.qpic.cn/wechatgame/9zdKibmXJ3RsmFpXn6UAV4ScT8ulA4wzqUUNicKWDIaODZbuv38lkBBOBQv8XbxOI0/0'
                });
                console.log("主动进行了转发");
            }
            else {
                console.log("仅支持微信客户端");
            }
        }
        onUpdate() {
            if (this.timerSwitch) {
                this.timer++;
                if (this.timer % 60 == 0 && this.timer > 0) {
                    let timeNum = this.timeNum.value;
                    let subNum;
                    if (timeNum.length === 3) {
                        subNum = timeNum.substring(0, 2);
                    }
                    else if (timeNum.length === 2) {
                        subNum = timeNum.substring(0, 1);
                    }
                    if (subNum === '0') {
                        this.timerSwitch = false;
                        this.clearAllCard_Over();
                        return;
                    }
                    this.timeNum.value = (Number(subNum) - 1).toString() + 's';
                }
            }
        }
        onDisable() {
        }
    }

    var Clicks;
    (function (Clicks) {
        function clicksOn(effect, target, caller, down, move, up, out) {
            let btnEffect;
            switch (effect) {
                case 'largen':
                    btnEffect = new Btn_LargenEffect();
                    break;
                default:
                    btnEffect = new Btn_LargenEffect();
                    break;
            }
            target.on(Laya.Event.MOUSE_DOWN, caller, down === null ? btnEffect.down : down);
            target.on(Laya.Event.MOUSE_MOVE, caller, move === null ? btnEffect.move : move);
            target.on(Laya.Event.MOUSE_UP, caller, up === null ? btnEffect.up : up);
            target.on(Laya.Event.MOUSE_OUT, caller, out === null ? btnEffect.out : out);
        }
        Clicks.clicksOn = clicksOn;
        function clicksOff(effect, target, caller, down, move, up, out) {
            let btnEffect;
            switch (effect) {
                case 'largen':
                    btnEffect = new Btn_LargenEffect();
                    break;
                default:
                    break;
            }
            target.off(Laya.Event.MOUSE_DOWN, caller, down === null ? btnEffect.down : down);
            target.off(Laya.Event.MOUSE_MOVE, caller, move === null ? btnEffect.move : move);
            target.off(Laya.Event.MOUSE_UP, caller, up === null ? btnEffect.up : up);
            target.off(Laya.Event.MOUSE_OUT, caller, out === null ? btnEffect.out : out);
        }
        Clicks.clicksOff = clicksOff;
    })(Clicks || (Clicks = {}));
    class Btn_LargenEffect {
        down(event) {
            event.currentTarget.scale(1.1, 1.1);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
        }
        move(event) {
            event.currentTarget.scale(1.1, 1.1);
        }
        out(event) {
            event.currentTarget.scale(1, 1);
        }
    }

    class DigitalCard extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['DigitalCard'] = this;
            this.gameControl = this.self.scene['Gamecontrol'];
            this.cardParent = this.gameControl.cardParent;
            this.indicateCard = this.gameControl.indicateCard;
            this.levels = this.gameControl.levels;
            let scale = 1 - (this.levels - 1) * 0.04;
            this.number.scale(scale, scale);
            this.board.skin = 'UI/数字底板.png';
            this.sign = false;
        }
        cardVanish(type) {
            if (type === 'right') {
                Animation.upDwon_Shake(this.indicateCard, 50, 10, null);
                Animation.upDwon_Shake(this.self, 50, 10, func => this.gameControl.clearAllCard_Next());
            }
            else if (type === 'error') {
                Animation.leftRight_Shake(this.indicateCard, 50, 10, null);
                Animation.leftRight_Shake(this.self, 50, 10, func => this.gameControl.clearAllCard_Over());
            }
        }
        cardClicksOn() {
            Clicks.clicksOn('largen', this.self, this, this.down, null, this.up, null);
        }
        cardClicksOff() {
            Clicks.clicksOff('largen', this.self, this, this.down, null, this.up, null);
        }
        down(event) {
            event.currentTarget.scale(1.1, 1.1);
            this.self.zOrder = 100;
            let indicateNum = this.gameControl.indicateNum;
            if (this.number.value === indicateNum.value) {
                this.board.skin = 'UI/正确底板.png';
            }
            else {
                this.board.skin = 'UI/错误底板.png';
            }
        }
        up(event) {
            this.gameControl.timerSwitch = false;
            this.cardClicksOff();
            event.currentTarget.scale(1, 1);
            let indicateNum = this.gameControl.indicateNum;
            if (this.number.value === indicateNum.value) {
                this.cardVanish('right');
            }
            else {
                this.cardVanish('error');
            }
        }
        onDisable() {
        }
    }

    class GameOver extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['GameOVer'] = this;
            this.gameControl = this.self.scene['Gamecontrol'];
            this.levelsNode = this.gameControl.levelsNode;
            this.indicateCard = this.gameControl.indicateCard;
            this.timeCard = this.gameControl.timeCard;
            this.line = this.gameControl.line;
            this.logoSwitch = false;
            this.logoChange = 'appear';
            this.gameControl.adaptiveOther(this.self);
            this.appaer();
            this.gameControl.wxPostData();
        }
        appaer() {
            let firstY = 1800;
            let time = 800;
            let delayed = 150;
            Animation.go_up(this.logo, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 644, time, 0, null);
            Animation.go_up(this.btn_again, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 790, time, delayed, null);
            Animation.go_up(this.btn_return, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 790, time, delayed * 2, func => this.levelsCardAni());
        }
        levelsCardAni() {
            let time = 200;
            let targetX = Laya.stage.width / 2;
            let targetY = this.logo.y + (this.self.y - this.self.height / 2) - 150;
            Animation.move_changeRotate(this.levelsNode, targetX, targetY, 0.5, 45, time, func => this.logoSwitch = true);
            Animation.cardRotateX_TowFace(this.levelsNode, ['levelsNum'], null, 100, 0, null);
            Animation.fade_out(this.indicateCard, 1, 0, time * 2, 60, func => this.clicksOnBtn());
            Animation.fade_out(this.timeCard, 1, 0, time * 2, 30, null);
            Animation.fade_out(this.line, 1, 0, time * 2, 0, null);
        }
        nodeDisplay(type) {
            let time = 250;
            let targetX = 108;
            let targetY = this.indicateCard.y;
            Animation.move_changeRotate(this.levelsNode, targetX, targetY, 0.5, -45, time, null);
            Animation.cardRotateX_TowFace(this.levelsNode, ['levelsNum'], null, 100, 0, null);
            Animation.fade_out(this.indicateCard, 0, 1, time * 2, 100, null);
            Animation.fade_out(this.timeCard, 0, 1, time * 2, 200, null);
            Animation.fade_out(this.line, 0, 1, time * 2, 500, func => this.nodeDisplayFunc(type));
        }
        nodeDisplayFunc(type) {
            if (type === 'again') {
                this.gameControl.replacementCard('reStart');
            }
            else if (type === 'return') {
                this.gameControl.createStartGame();
                this.gameControl.otherVanish();
            }
        }
        vanish(type) {
            let time = 800;
            let targetY = 1800;
            let delayed = 150;
            Animation.drop(this.btn_again, targetY, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 0, null);
            Animation.drop(this.btn_return, targetY, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 1, null);
            Animation.drop(this.logo, targetY, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 2, func => this.vanishFunc(type));
        }
        vanishFunc(type) {
            if (Laya.Browser.onMiniGame) {
                this.gameControl.bannerAd.hide();
            }
            this.self.removeSelf();
            this.nodeDisplay(type);
        }
        clicksOnBtn() {
            Clicks.clicksOn('largen', this.btn_again, this, null, null, this.up, null);
            Clicks.clicksOn('largen', this.btn_return, this, null, null, this.up, null);
        }
        clicksOffBtn() {
            Clicks.clicksOff('largen', this.btn_again, this, null, null, this.up, null);
            Clicks.clicksOff('largen', this.btn_return, this, null, null, this.up, null);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
            this.clicksOffBtn();
            if (event.currentTarget.name === 'btn_again') {
                this.vanish('again');
            }
            else if (event.currentTarget.name === 'btn_return') {
                this.vanish('return');
            }
        }
        onUpdate() {
            if (this.logoSwitch) {
                if (this.logoChange === 'appear') {
                    this.logo.alpha -= 0.01;
                    if (this.logo.alpha < 0.3) {
                        this.logoChange = 'vanish';
                    }
                }
                else if (this.logoChange === 'vanish') {
                    this.logo.alpha += 0.01;
                    if (this.logo.alpha >= 1) {
                        this.logoChange = 'appear';
                    }
                }
            }
        }
        onDisable() {
        }
    }

    class Ranking extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['GameOVer'] = this;
            this.gameControl = this.self.scene['Gamecontrol'];
            this.background.width = Laya.stage.width;
            this.background.height = Laya.stage.height;
            this.gameControl.childAdaptive(this.background, this.self, this.background.y);
            this.gameControl.adaptiveOther(this.self);
            this.appear();
        }
        onAwake() {
            console.log('排行榜');
            if (Laya.Browser.onMiniGame) {
                let wx = Laya.Browser.window.wx;
                let openDataContext = wx.getOpenDataContext();
                openDataContext.postMessage({ action: 'ranking' });
            }
        }
        appear() {
            let time = 300;
            Animation.fade_out(this.background, 0, 0.3, time, 0, null);
            Animation.fade_out(this.baseboard, 0, 1, time, 0, func => this.clicksOnBtn());
        }
        vanish() {
            let time = 300;
            Animation.fade_out(this.background, 0.3, 0, time, 0, func => this.vanishFunc());
            Animation.fade_out(this.baseboard, 1, 0, time, 0, null);
        }
        vanishFunc() {
            this.self.removeSelf();
            if (Laya.Browser.onMiniGame) {
                let wx = Laya.Browser.window.wx;
                let openDataContext = wx.getOpenDataContext();
                openDataContext.postMessage({ action: 'close' });
            }
            if (Laya.Browser.onMiniGame) {
                this.gameControl.bannerAd.show()
                    .then(() => console.log('banner 广告显示'));
            }
        }
        clicksOnBtn() {
            Clicks.clicksOn('largen', this.background, this, null, null, this.up, null);
        }
        clicksOffBtn() {
            Clicks.clicksOff('largen', this.background, this, null, null, this.up, null);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
            this.vanish();
            console.log('我点击了背景！');
        }
        onDisable() {
        }
    }

    class StartGame extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.self = this.owner;
            this.self['GameOVer'] = this;
            this.gameControl = this.self.scene['Gamecontrol'];
            this.levelsNode = this.gameControl.levelsNode;
            this.indicateCard = this.gameControl.indicateCard;
            this.timeCard = this.gameControl.timeCard;
            this.line = this.gameControl.line;
            this.gameControl.startNode = this.self;
            this.startSwitch = false;
            this.startChange = 'appear';
            this.watchAds = false;
            this.gameControl.adaptiveOther(this.self);
            this.gameControl.childAdaptive(this.anti_addiction, this.self, Laya.stage.height * 9 / 10);
            this.videoAd = this.gameControl.videoAd;
            this.appaer();
        }
        appaer() {
            let time = 800;
            let delayed = 150;
            let firstY = 1800;
            Animation.go_up(this.logo, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 416, time, 0, null);
            Animation.go_up(this.btn_start, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 565, time, delayed * 1, null);
            Animation.go_up(this.btn_adv, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 667, time, delayed * 2, null);
            Animation.go_up(this.btn_ranking, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 877, time, delayed * 3, null);
            Animation.go_up(this.btn_share, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 877, time, delayed * 4, func => this.appaerFunc());
            Animation.fade_out(this.anti_addiction, 0, 1, 1000, 0, null);
        }
        appaerFunc() {
            this.startSwitch = true;
            this.clicksOnBtn();
            if (Laya.Browser.onMiniGame) {
                this.gameControl.bannerAd.show()
                    .then(() => console.log('banner 广告显示'));
            }
        }
        vanish(type) {
            let time = 600;
            let y = 1800;
            let delayed = 50;
            Animation.drop(this.logo, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 0, null);
            Animation.drop(this.btn_start, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 1, null);
            Animation.drop(this.btn_adv, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 2, null);
            Animation.drop(this.btn_ranking, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 3, null);
            Animation.drop(this.btn_share, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 5, func => this.vanishFunc(type));
            Animation.fade_out(this.anti_addiction, 1, 0, 300, 0, null);
        }
        vanishFunc(type) {
            this.self.removeSelf();
            this.gameControl.otherAppear();
            this.gameControl.replacementCard(type);
        }
        clicksOnBtn() {
            Clicks.clicksOn('largen', this.btn_start, this, null, null, this.up, null);
            Clicks.clicksOn('largen', this.btn_adv, this, null, null, this.up, null);
            Clicks.clicksOn('largen', this.btn_ranking, this, null, null, this.up, null);
            Clicks.clicksOn('largen', this.btn_share, this, null, null, this.up, null);
        }
        clicksOffBtn() {
            Clicks.clicksOff('largen', this.btn_start, this, null, null, this.up, null);
            Clicks.clicksOff('largen', this.btn_adv, this, null, null, this.up, null);
            Clicks.clicksOff('largen', this.btn_ranking, this, null, null, this.up, null);
            Clicks.clicksOff('largen', this.btn_share, this, null, null, this.up, null);
        }
        up(event) {
            event.currentTarget.scale(1, 1);
            if (event.currentTarget.name === 'btn_start') {
                if (Laya.Browser.onMiniGame) {
                    this.gameControl.bannerAd.hide();
                }
                this.vanish('start');
                this.clicksOffBtn();
            }
            else if (event.currentTarget.name === 'btn_adv') {
                if (Laya.Browser.onMiniGame) {
                    this.gameControl.bannerAd.hide();
                }
                this.videoAd.show().catch(() => {
                    this.videoAd.load()
                        .then(() => this.videoAd.show())
                        .catch(err => {
                        console.log('激励视频 广告显示失败');
                    });
                });
            }
            else if (event.currentTarget.name === 'btn_ranking') {
                this.gameControl.createRanking();
            }
            else if (event.currentTarget.name === 'btn_share') {
                this.gameControl.wxShare();
            }
        }
        onUpdate() {
            if (this.startSwitch) {
                if (this.startChange === 'appear') {
                    this.btn_start.scaleX += 0.003;
                    this.btn_start.scaleY += 0.003;
                    this.btn_adv.scaleX -= 0.003;
                    this.btn_adv.scaleY -= 0.003;
                    if (this.btn_start.scaleX > 1.1) {
                        this.startChange = 'vanish';
                    }
                }
                else if (this.startChange === 'vanish') {
                    this.btn_start.scaleX -= 0.003;
                    this.btn_start.scaleY -= 0.003;
                    this.btn_adv.scaleX += 0.003;
                    this.btn_adv.scaleY += 0.003;
                    if (this.btn_start.scaleX < 1) {
                        this.startChange = 'appear';
                    }
                }
            }
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
            reg("Script/GameOver.ts", GameOver);
            reg("Script/Ranking.ts", Ranking);
            reg("Script/StartGame.ts", StartGame);
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
    GameConfig.stat = true;
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
