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
           this.timeNum.value = '10s';
           this.timerSwitch = false;
       }
       adaptiveRule() {
           let stageHeight = Laya.stage.height;
           this.self.height = stageHeight;
           this.background.height = stageHeight;
           this.background.x = 0;
           this.background.y = 0;
           this.line.y = stageHeight * 0.19;
           this.line.alpha = 0;
           this.levelsNode.y = stageHeight * 0.12;
           this.levelsNode.alpha = 0;
           this.indicateCard.y = stageHeight * 0.12;
           this.indicateCard.alpha = 0;
           this.timeCard.y = stageHeight * 0.12;
           this.timeCard.alpha = 0;
           this.cardParent.y = stageHeight * 0.22;
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
       replacementCard(type) {
           if (type === 'start') {
               this.levels = 0;
           }
           else if (type === 'reStart') {
               this.levels = 0;
           }
           this.levels++;
           Laya.timer.once(200, this, function () {
               this.levelsNode['LevelsNode'].levelsNodeAni('nextLevel', 120);
           });
           this.timeNum.value = '3s';
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
           let delayed = 0;
           this.timerSwitch = false;
           for (let i = 0; i < len; i++) {
               let card = this.cardParent._children[i];
               delayed += 50;
               Laya.timer.once(delayed, this, function () {
                   let rotate = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
                   Laya.Tween.to(card, { y: 1500, alpha: 0, rotation: rotate }, 800, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                       if (i === len - 1) {
                           this.cardParent.removeChildren(0, len - 1);
                           if (type === 'gameOver') {
                               this.createGameOver();
                           }
                           else if (type === 'nextLevel') {
                               this.replacementCard();
                           }
                       }
                   }));
               });
           }
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
           let time = 500;
           Laya.Tween.to(this.logo, { y: 644, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
               this.levelsGameOver();
           }), 0);
           Laya.Tween.to(this.btn_again, { y: 790, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
           }), 150);
           Laya.Tween.to(this.btn_return, { y: 790, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
           }), 300);
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
           let Lrotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
           let Arotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
           let Rrotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
           let time = 800;
           let targetY = 1800;
           Laya.Tween.to(this.btn_return, { y: targetY, rotation: Lrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
           }), 0);
           Laya.Tween.to(this.btn_again, { y: targetY, rotation: Arotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
           }), 150);
           Laya.Tween.to(this.logo, { y: targetY, rotation: Rrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
               this.self.removeSelf();
               this.homing(type);
           }), 300);
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
           this.startSwitch = false;
           this.startChange = 'appear';
           this.gameControl.adaptiveOther(this.self);
           this.appaer();
       }
       appaer() {
           let firstY = 1800;
           this.logo.y = 1500;
           this.btn_start.y = firstY;
           this.btn_start.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.btn_ranking.y = firstY;
           this.btn_ranking.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.btn_share.y = firstY;
           this.btn_share.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           this.anti_addiction.y = firstY;
           this.anti_addiction.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;
           let time = 400;
           let delayed = 80;
           Laya.Tween.to(this.logo, { y: 439, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
           }), 0);
           Laya.Tween.to(this.btn_start, { y: 620, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
           }), delayed);
           Laya.Tween.to(this.btn_ranking, { y: 812, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
           }), 2 * delayed);
           Laya.Tween.to(this.btn_share, { y: 812, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
           }), 3 * delayed);
           Laya.Tween.to(this.anti_addiction, { y: Laya.stage.height * 9 / 10, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
               this.startSwitch = true;
               this.clicksOnBtn();
           }), 4 * delayed);
       }
       startVanish() {
           let Lrotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
           let Srotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
           let Rrotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
           let time = 800;
           let delayed = 150;
           let targetY = 1800;
           Laya.Tween.to(this.logo, { y: targetY, rotation: Lrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
           }), 0);
           Laya.Tween.to(this.btn_start, { y: targetY, rotation: Srotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
           }), delayed);
           Laya.Tween.to(this.btn_ranking, { y: targetY, rotation: Rrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
           }), delayed * 2);
           Laya.Tween.to(this.btn_share, { y: 1500, rotation: Rrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
           }), delayed * 3);
           Laya.Tween.to(this.anti_addiction, { y: 1500, rotation: Rrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
               this.self.removeSelf();
               this.gameControl.otherAppear();
               this.gameControl.replacementCard('start');
           }), delayed * 4);
       }
       onUpdate() {
           if (this.startSwitch) {
               if (this.startChange === 'appear') {
                   this.btn_start.scaleX += 0.003;
                   this.btn_start.scaleY += 0.003;
                   if (this.btn_start.scaleX > 1.1) {
                       this.startChange = 'vanish';
                   }
               }
               else if (this.startChange === 'vanish') {
                   this.btn_start.scaleX -= 0.003;
                   this.btn_start.scaleY -= 0.003;
                   if (this.btn_start.scaleX < 1) {
                       this.startChange = 'appear';
                   }
               }
           }
       }
       clicksOnBtn() {
           this.btn_start.on(Laya.Event.MOUSE_DOWN, this, this.down);
           this.btn_start.on(Laya.Event.MOUSE_MOVE, this, this.move);
           this.btn_start.on(Laya.Event.MOUSE_UP, this, this.up);
           this.btn_start.on(Laya.Event.MOUSE_OUT, this, this.out);
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
           this.clicksOffBtn();
           if (event.currentTarget.name === 'btn_start') {
               this.startVanish();
           }
           else if (event.currentTarget.name === 'btn_ranking') ;
           else if (event.currentTarget.name === 'btn_share') ;
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
           reg("Script/IndicateCard.ts", IndicateCard);
           reg("Script/GameControl.ts", GameControl);
           reg("Script/LevelsNode.ts", LevelsNode);
           reg("Script/DigitalCard.ts", DigitalCard);
           reg("Script/GameOver.ts", GameOver);
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
