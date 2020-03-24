(function () {
   'use strict';

   class IndicateCard extends Laya.Script {
       constructor() { super(); }
       onEnable() {
           this.self = this.owner;
           this.gameControl = this.self.scene['Gamecontrol'];
           this.self['IndicateCard'] = this;
       }
       indicateNodeAin() {
           let time = 120;
           Laya.Tween.to(this.self, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
               this.indicateNumReset();
               Laya.Tween.to(this.self, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                   this.gameControl.cardCollection();
               }), 0);
           }), 0);
       }
       indicateNumReset() {
           let num1 = Math.floor(Math.random() * 9) + 1;
           let levels = this.gameControl.levels;
           let overlen = levels - 1;
           let num = num1.toString();
           for (let i = 0; i < overlen; i++) {
               num += Math.floor(Math.random() * 10).toString();
           }
           let scale = 1 - (levels - 2) * 0.04;
           this.indicateNum.scale(scale, scale);
           this.indicateNum.value = num;
           this.gameControl.changeAnumber();
       }
       errorAni() {
           Laya.Tween.to(this.self, { x: this.self.x - 10 }, 50, null, Laya.Handler.create(this, function () {
               Laya.Tween.to(this.self, { x: this.self.x + 20 }, 50, null, Laya.Handler.create(this, function () {
                   Laya.Tween.to(this.self, { x: this.self.x - 10 }, 50, null, Laya.Handler.create(this, function () {
                   }));
               }));
           }));
       }
       rightAni() {
           Laya.Tween.to(this.self, { y: this.self.y + 10 }, 50, null, Laya.Handler.create(this, function () {
               Laya.Tween.to(this.self, { y: this.self.y - 20 }, 50, null, Laya.Handler.create(this, function () {
                   Laya.Tween.to(this.self, { y: this.self.y + 10 }, 50, null, Laya.Handler.create(this, function () {
                   }));
               }));
           }));
       }
       onDisable() {
       }
   }

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
                       this.startNode['GameOVer'].startVanish('adv');
                   }
                   else {
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
           this.line.y = stageHeight * 0.202;
           this.line.alpha = 0;
           let location = stageHeight * 0.132;
           this.levelsNode.y = location;
           this.levelsNode.alpha = 0;
           this.indicateCard.y = location;
           this.indicateCard.alpha = 0;
           this.timeCard.y = location;
           this.timeCard.alpha = 0;
           this.cardParent.y = stageHeight * 0.22;
       }
       replacementCard(type) {
           if (type === 'start') {
               this.levels = 1;
               this.timeNum.value = '30s';
           }
           else if (type === 'adv') {
               this.levels = 1;
               this.timeNum.value = '40s';
           }
           else if (type === 'reStart') {
               this.levels = 1;
               this.timeNum.value = '30s';
           }
           else if (type === 'nextLevel') {
               this.levels++;
           }
           this.timer = -50;
           Laya.timer.once(200, this, function () {
               this.levelsNode['LevelsNode'].levelsNodeAni('nextLevel', 120);
           });
       }
       createStartGame() {
           let startGame = Laya.Pool.getItemByCreateFun('startGame', this.startGame.create, this.startGame);
           this.self.addChild(startGame);
       }
       otherVanish() {
           let time = 200;
           let delayed = 150;
           Laya.Tween.to(this.levelsNode, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
           }), 0);
           Laya.Tween.to(this.indicateCard, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
           }), delayed);
           Laya.Tween.to(this.timeCard, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
           }), delayed * 2);
           Laya.Tween.to(this.line, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
           }), delayed * 3);
       }
       otherAppear() {
           let time = 200;
           let delayed = 150;
           Laya.Tween.to(this.levelsNode, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
           }), 0);
           Laya.Tween.to(this.indicateCard, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
           }), delayed);
           Laya.Tween.to(this.timeCard, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
           }), delayed * 2);
           Laya.Tween.to(this.line, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
           }), delayed * 3);
       }
       cardCollection() {
           let spacingY = 5;
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
               let tagetY;
               if (j % 2 === 0) {
                   card.x = startX1;
                   tagetY = j / 2 * (card.height + spacingY) + 80;
               }
               else {
                   card.x = startX2;
                   tagetY = (j - 1) / 2 * (card.height + spacingY) + 80;
               }
               card.rotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
               let time = 500;
               Laya.timer.once(delayed, this, function () {
                   Laya.Tween.to(card, { y: tagetY, rotation: 0 }, time, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                       if (j === len - 1) {
                           this.timerSwitch = true;
                           for (let index = 0; index < this.cardParent._children.length; index++) {
                               const card = this.cardParent._children[index];
                               card['DigitalCard'].cardClicksOn();
                           }
                       }
                   }));
               });
           }
       }
       clearAllCard(type) {
           this.clearAllClicks();
           let len = this.cardParent._children.length;
           this.timerSwitch = false;
           for (let i = 0; i < len; i++) {
               let card = this.cardParent._children[i];
               if (card['DigitalCard'].number.value === this.indicateNum.value) {
                   if (type === 'gameOver') {
                       this.cardRotating(card);
                   }
               }
               else {
                   Laya.timer.once(i * 50, this, function () {
                       let rotate = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
                       Laya.Tween.to(card, { y: 1500, alpha: 0, rotation: rotate }, 800, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                           if (type === 'nextLevel') {
                               if (i === len - 1) {
                                   this.cardParent.removeChildren(0, len - 1);
                                   this.replacementCard('nextLevel');
                               }
                           }
                       }));
                   });
               }
           }
       }
       cardRotating(card) {
           let len = this.cardParent._children.length;
           Laya.timer.once(len * 50 + 500, this, function () {
               Laya.Tween.to(card, { scaleY: 0 }, 120, null, Laya.Handler.create(this, function () {
                   card['DigitalCard'].number.alpha = 0;
                   Laya.Tween.to(card, { scaleY: 1 }, 120, null, Laya.Handler.create(this, function () {
                       Laya.Tween.to(card, { scaleY: 0 }, 120, null, Laya.Handler.create(this, function () {
                           card['DigitalCard'].number.alpha = 1;
                           Laya.Tween.to(card, { scaleY: 1 }, 120, null, Laya.Handler.create(this, function () {
                               Laya.Tween.to(card, { y: 1500, alpha: 0, rotation: Math.floor(Math.random() * 2) === 1 ? 30 : -30 }, 1300, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                                   this.cardParent.removeChildren(0, len - 1);
                                   this.createGameOver();
                               }), 100);
                           }));
                       }));
                   }));
               }));
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
       }
       adaptiveOther(self) {
           self.width = 750;
           self.height = Laya.stage.height;
           self.pivotX = this.self.width / 2;
           self.pivotY = this.self.height / 2;
           self.pos(375, Laya.stage.height / 2);
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
                       this.clearAllCard('gameOver');
                       return;
                   }
                   this.timeNum.value = (Number(subNum) - 1).toString() + 's';
               }
           }
       }
       onDisable() {
       }
   }

   class LevelsNode extends Laya.Script {
       onEnable() {
           this.self = this.owner;
           this.gameControl = this.self.scene['Gamecontrol'];
           this.cardParent = this.gameControl.cardParent;
           this.indicateCard = this.gameControl.indicateCard;
           this.self['LevelsNode'] = this;
       }
       levelsNodeAni(type, time) {
           Laya.Tween.to(this.self, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
               this.levelsNum.alpha = 0;
               Laya.Tween.to(this.self, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                   Laya.Tween.to(this.self, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                       Laya.Tween.to(this.self, { scaleX: 1 }, time - 50, null, Laya.Handler.create(this, function () {
                           this.levelsNum.alpha = 1;
                           let levels = this.gameControl.levels;
                           this.levelsNum.value = levels.toString();
                           if (type === 'nextLevel') {
                               this.indicateCard['IndicateCard'].indicateNodeAin();
                           }
                       }), 0);
                   }), 0);
               }), 0);
           }), 0);
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
           this.indicateCard = this.gameControl.indicateCard;
           this.levels = this.gameControl.levels;
           let scale = 1 - (this.levels - 1) * 0.04;
           this.number.scale(scale, scale);
       }
       cardClicksOn() {
           this.self.on(Laya.Event.MOUSE_DOWN, this, this.down);
           this.self.on(Laya.Event.MOUSE_MOVE, this, this.move);
           this.self.on(Laya.Event.MOUSE_UP, this, this.up);
           this.self.on(Laya.Event.MOUSE_OUT, this, this.out);
       }
       cardClicksOff() {
           this.self.off(Laya.Event.MOUSE_DOWN, this, this.down);
           this.self.off(Laya.Event.MOUSE_MOVE, this, this.move);
           this.self.off(Laya.Event.MOUSE_UP, this, this.up);
           this.self.off(Laya.Event.MOUSE_OUT, this, this.out);
       }
       down(event) {
           event.currentTarget.scale(1.1, 1.1);
       }
       cardVanish(type) {
           this.gameControl.clearAllClicks();
           if (type === 'right') {
               this.indicateCard['IndicateCard'].rightAni();
               Laya.Tween.to(this.self, { y: this.self.y + 10 }, 50, null, Laya.Handler.create(this, function () {
                   Laya.Tween.to(this.self, { y: this.self.y - 20 }, 50, null, Laya.Handler.create(this, function () {
                       Laya.Tween.to(this.self, { y: this.self.y + 10 }, 50, null, Laya.Handler.create(this, function () {
                           this.gameControl.clearAllCard('nextLevel');
                           this.self.removeSelf();
                       }));
                   }));
               }));
           }
           else if (type === 'error') {
               this.indicateCard['IndicateCard'].errorAni();
               Laya.Tween.to(this.self, { x: this.self.x - 10 }, 50, null, Laya.Handler.create(this, function () {
                   Laya.Tween.to(this.self, { x: this.self.x + 20 }, 50, null, Laya.Handler.create(this, function () {
                       Laya.Tween.to(this.self, { x: this.self.x - 10 }, 50, null, Laya.Handler.create(this, function () {
                           this.gameControl.clearAllCard('gameOver');
                       }));
                   }));
               }));
           }
       }
       move(event) {
           event.currentTarget.scale(1, 1);
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
       out(event) {
           event.currentTarget.scale(1, 1);
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
       }
       appaer() {
           let firstY = 1800;
           this.logo.y = firstY;
           this.logo.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.btn_again.y = firstY;
           this.btn_again.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.btn_return.y = firstY;
           this.btn_return.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.commonAppear(this.logo, 0, 644);
           this.commonAppear(this.btn_again, 1, 790);
           this.commonAppear(this.btn_return, 2, 790);
       }
       commonAppear(node, number, targetY) {
           let time = 500;
           let delayed = 150;
           Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
               if (number === 0) {
                   this.levelsGameOver();
               }
           }), number * delayed);
       }
       levelsGameOver() {
           let time = 200;
           let targetX = Laya.stage.width / 2;
           let targetY = this.logo.y + (this.self.y - this.self.height / 2) - 150;
           let Pre = 1 / 2;
           Laya.Tween.to(this.levelsNode, { x: targetX * Pre, y: targetY * Pre, rotation: 45 }, time, null, Laya.Handler.create(this, function () {
               Laya.Tween.to(this.levelsNode, { x: targetX, y: targetY, rotation: 0, }, time, null, Laya.Handler.create(this, function () {
                   this.logoSwitch = true;
               }), 0);
           }), 30);
           this.levelsNode['LevelsNode'].levelsNodeAni('common', 100);
           Laya.Tween.to(this.indicateCard, { alpha: 0 }, time * 2, null, Laya.Handler.create(this, function () {
               this.clicksOnBtn();
               if (Laya.Browser.onMiniGame) {
                   this.gameControl.bannerAd.show();
               }
           }), 60);
           Laya.Tween.to(this.timeCard, { alpha: 0 }, time * 2, null, Laya.Handler.create(this, function () {
           }), 30);
           Laya.Tween.to(this.line, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
           }), 0);
       }
       homing(type) {
           let time = 250;
           let targetX = 108;
           let targetY = this.indicateCard.y;
           Laya.Tween.to(this.levelsNode, { x: this.levelsNode.x - targetX - 20, y: this.levelsNode.y - targetY, rotation: -45 }, time, null, Laya.Handler.create(this, function () {
               Laya.Tween.to(this.levelsNode, { x: targetX, y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
               }), 0);
           }), 0);
           this.levelsNode['LevelsNode'].levelsNodeAni('common', 100);
           Laya.Tween.to(this.indicateCard, { alpha: 1 }, time * 2, null, Laya.Handler.create(this, function () {
           }), 100);
           Laya.Tween.to(this.timeCard, { alpha: 1 }, time * 2, null, Laya.Handler.create(this, function () {
           }), 200);
           Laya.Tween.to(this.line, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
               if (type === 'again') {
                   this.gameControl.replacementCard('reStart');
               }
               else if (type === 'return') {
                   this.gameControl.createStartGame();
                   this.gameControl.otherVanish();
               }
           }), 500);
       }
       vanish(type) {
           let Rrotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
           this.commonVanish(this.btn_again, 0, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
           this.commonVanish(this.btn_return, 1, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
           let time = 800;
           let targetY = 1800;
           Laya.Tween.to(this.logo, { y: targetY, rotation: Rrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
               if (Laya.Browser.onMiniGame) {
                   this.gameControl.bannerAd.hide();
               }
               this.self.removeSelf();
               this.homing(type);
           }), 300);
       }
       commonVanish(node, number, rotation) {
           let time = 800;
           Laya.Tween.to(node, { y: 1800, rotation: rotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
           }), 0);
       }
       clicksOnBtn() {
           this.btn_again.on(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_again.on(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_again.on(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_again.on(Laya.Event.MOUSE_OUT, this, this.out);
           this.btn_return.on(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_return.on(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_return.on(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_return.on(Laya.Event.MOUSE_OUT, this, this.out);
       }
       clicksOffBtn() {
           this.btn_again.off(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_again.off(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_again.off(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_again.off(Laya.Event.MOUSE_OUT, this, this.out);
           this.btn_return.off(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_return.off(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_return.off(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_return.off(Laya.Event.MOUSE_OUT, this, this.out);
       }
       down(event) {
           event.currentTarget.scale(1.1, 1.1);
       }
       move(event) {
           event.currentTarget.scale(1, 1);
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
       out(event) {
           event.currentTarget.scale(1, 1);
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
           this.gameControl.adaptiveOther(this.self);
           this.background.width = Laya.stage.width;
           this.background.height = Laya.stage.height;
           this.appear();
       }
       appear() {
           this.background.alpha = 0.3;
           this.baseboard.alpha = 0;
           let time = 300;
           Laya.Tween.to(this.background, { alpha: 0.3 }, time, null, Laya.Handler.create(this, function () {
           }), 0);
           Laya.Tween.to(this.baseboard, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
               this.clicksOnBtn();
           }), 0);
       }
       vanish() {
           let time = 300;
           Laya.Tween.to(this.background, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
               this.self.removeSelf();
           }), 0);
           Laya.Tween.to(this.baseboard, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
           }), 0);
       }
       clicksOnBtn() {
           this.background.on(Laya.Event.MOUSE_DOWN, this, this.down);
           this.background.on(Laya.Event.MOUSE_MOVE, this, this.move);
           this.background.on(Laya.Event.MOUSE_UP, this, this.up);
           this.background.on(Laya.Event.MOUSE_OUT, this, this.out);
       }
       clicksOffBtn() {
           this.background.off(Laya.Event.MOUSE_DOWN, this, this.down);
           this.background.off(Laya.Event.MOUSE_MOVE, this, this.move);
           this.background.off(Laya.Event.MOUSE_UP, this, this.up);
           this.background.off(Laya.Event.MOUSE_OUT, this, this.out);
       }
       down(event) {
           event.currentTarget.scale(1.1, 1.1);
       }
       move(event) {
           event.currentTarget.scale(1, 1);
       }
       up(event) {
           event.currentTarget.scale(1, 1);
           this.vanish();
           console.log('我点击了背景！');
       }
       out(event) {
           event.currentTarget.scale(1, 1);
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
           this.videoAd = this.gameControl.videoAd;
           this.appaer();
       }
       appaer() {
           let firstY = 1800;
           this.logo.y = firstY;
           this.logo.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.btn_start.y = firstY;
           this.btn_start.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.btn_adv.y = firstY;
           this.btn_adv.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.btn_ranking.y = firstY;
           this.btn_ranking.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.btn_share.y = firstY;
           this.btn_share.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.anti_addiction.y = Laya.stage.height * 9 / 10;
           this.anti_addiction.alpha = 0;
           this.commonAppear(this.logo, 0, 416);
           this.commonAppear(this.btn_start, 1, 565);
           this.commonAppear(this.btn_adv, 2, 667);
           this.commonAppear(this.btn_ranking, 3, 877);
           this.commonAppear(this.btn_share, 4, 877);
           Laya.Tween.to(this.anti_addiction, { alpha: 1 }, 1000, null, Laya.Handler.create(this, function () {
           }));
       }
       commonAppear(node, number, targetY) {
           let delayed = 80;
           let time = 600;
           Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
               if (number === 4) {
                   this.startSwitch = true;
                   this.clicksOnBtn();
                   if (Laya.Browser.onMiniGame) {
                       this.gameControl.bannerAd.show()
                           .then(() => console.log('banner 广告显示'));
                   }
               }
           }), number * delayed);
       }
       startVanish(type) {
           Laya.Tween.to(this.anti_addiction, { alpha: 0 }, 300, null, Laya.Handler.create(this, function () {
           }));
           this.commonVanish(this.logo, 0, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
           this.commonVanish(this.btn_start, 1, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
           this.commonVanish(this.btn_adv, 2, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
           this.commonVanish(this.btn_ranking, 3, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
           let time = 600;
           Laya.Tween.to(this.btn_share, { y: 1800, rotation: Math.floor(Math.random() * 2) === 1 ? 30 : -30 }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
               this.self.removeSelf();
               this.gameControl.otherAppear();
               this.gameControl.replacementCard(type);
           }), 4 * 150);
       }
       commonVanish(node, number, rotation) {
           let time = 600;
           let delayed = 150;
           Laya.Tween.to(node, { y: 1800, rotation: rotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
               if (number === 4) {
                   this.self.removeSelf();
                   this.gameControl.otherAppear();
                   if (this.watchAds) {
                       this.gameControl.replacementCard('adv');
                   }
                   else {
                       this.gameControl.replacementCard('start');
                   }
               }
           }), number * delayed);
       }
       clicksOnBtn() {
           this.btn_start.on(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_start.on(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_start.on(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_start.on(Laya.Event.MOUSE_OUT, this, this.out);
           this.btn_adv.on(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_adv.on(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_adv.on(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_adv.on(Laya.Event.MOUSE_OUT, this, this.out);
           this.btn_ranking.on(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_ranking.on(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_ranking.on(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_ranking.on(Laya.Event.MOUSE_OUT, this, this.out);
           this.btn_share.on(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_share.on(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_share.on(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_share.on(Laya.Event.MOUSE_OUT, this, this.out);
       }
       clicksOffBtn() {
           this.btn_start.off(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_start.off(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_start.off(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_start.off(Laya.Event.MOUSE_OUT, this, this.out);
           this.btn_adv.off(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_adv.off(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_adv.off(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_adv.off(Laya.Event.MOUSE_OUT, this, this.out);
           this.btn_ranking.off(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_ranking.off(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_ranking.off(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_ranking.off(Laya.Event.MOUSE_OUT, this, this.out);
           this.btn_share.off(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_share.off(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_share.off(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_share.off(Laya.Event.MOUSE_OUT, this, this.out);
       }
       down(event) {
           event.currentTarget.scale(1.1, 1.1);
       }
       move(event) {
           event.currentTarget.scale(1, 1);
       }
       up(event) {
           event.currentTarget.scale(1, 1);
           if (event.currentTarget.name === 'btn_start') {
               if (Laya.Browser.onMiniGame) {
                   this.gameControl.bannerAd.hide();
               }
               this.startVanish('start');
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
           else if (event.currentTarget.name === 'btn_share') ;
       }
       out(event) {
           event.currentTarget.scale(1, 1);
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
           reg("Script/IndicateCard.ts", IndicateCard);
           reg("Script/GameControl.ts", GameControl);
           reg("Script/LevelsNode.ts", LevelsNode);
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
