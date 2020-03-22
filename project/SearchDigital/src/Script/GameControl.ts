export default class GameControl extends Laya.Script {

    /** @prop {name:indicateCard, tips:"提示牌", type:Node}*/
    public indicateCard: Laya.Sprite;
    /** @prop {name:indicateNum, tips:"提示牌下的提示数字", type:Node}*/
    public indicateNum: Laya.FontClip;

    /** @prop {name:timeCard, tips:"时间", type:Node}*/
    public timeCard: Laya.Sprite;
    /** @prop {name:timeNum, tips:"时间数字", type:Node}*/
    public timeNum: Laya.FontClip;

    /** @prop {name:cardParent, tips:"数字牌父节点容器", type:Node}*/
    public cardParent: Laya.Sprite;

    /** @prop {name:digitalCard, tips:"数字牌的预制体", type:Prefab}*/
    public digitalCard: Laya.Prefab;

    /** @prop {name:levelsNode, tips:"关卡数", type:Node}*/
    public levelsNode: Laya.Sprite;
    /** @prop {name:levelsNum, tips:"关卡数", type:Node}*/
    public levelsNum: Laya.FontClip;

    /** @prop {name:background, tips:"背景图", type:Node}*/
    public background: Laya.Sprite;

    /** @prop {name:line, tips:"分割线", type:Node}*/
    public line: Laya.Sprite;

    /** @prop {name:startGame, tips:"游戏开始预制体", type:Prefab}*/
    public startGame: Laya.Prefab;

    /** @prop {name:gameOVer, tips:"游戏结束预制体", type:Prefab}*/
    public gameOVer: Laya.Prefab;

    /**指代this.ower,指代当前场景*/
    private self: Laya.Scene;
    /**时间线*/
    private timer: number;
    /**时间线开关*/
    private timerSwitch: boolean;
    /**内部关卡数*/
    private levels: number;


    constructor() { super(); }

    onEnable(): void {
        this.initGameScene();
        this.adaptiveRule();
        this.createStartGame();
    }

    /**初始化的一些变量*/
    initGameScene(): void {
        this.self = this.owner as Laya.Scene;
        this.self['Gamecontrol'] = this;//脚本属性化
        this.levels = 0;
        this.levelsNum.value = this.levels.toString();
        this.timer = 0;
        this.timeNum.value = '10s';
        this.timerSwitch = false;
    }

    /**自适应规则*/
    adaptiveRule(): void {
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

    /**创建游戏开始界面*/
    createStartGame(): void {
        let startGame = Laya.Pool.getItemByCreateFun('startGame', this.startGame.create, this.startGame) as Laya.Sprite;
        this.self.addChild(startGame);
    }

    /**功能节点的消失动画*/
    otherVanish(): void {
        let time = 200;
        let delayed = 150;
        // 提示卡牌动画
        Laya.Tween.to(this.levelsNode, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
        }), 0);
        // 提示卡牌动画
        Laya.Tween.to(this.indicateCard, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
        }), delayed);
        // 时间节点动画
        Laya.Tween.to(this.timeCard, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
        }), delayed * 2);
        // 分割线动画
        Laya.Tween.to(this.line, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
        }), delayed * 3);
    }

    /**功能节点的消失动画*/
    otherAppear(): void {
        let time = 200;
        let delayed = 150;
        // 提示卡牌动画
        Laya.Tween.to(this.levelsNode, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
        }), 0);
        // 提示卡牌动画
        Laya.Tween.to(this.indicateCard, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
        }), delayed);
        // 时间节点动画
        Laya.Tween.to(this.timeCard, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
        }), delayed * 2);
        // 分割线动画
        Laya.Tween.to(this.line, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
        }), delayed * 3);
    }

    /**牌局开始
     * 一种情况是重新开始
     * 一种情况是开始游戏界面进入的开始
     * @param type 
    */
    replacementCard(type): void {
        if (type === 'start') {
            this.levels = 0;
        } else if (type === 'reStart') {
            this.levels = 0;
        }
        this.levels++;
        Laya.timer.once(200, this, function () {
            this.levelsNode['LevelsNode'].levelsNodeAni('nextLevel', 120);
        })
        this.timeNum.value = '3s';
    }

    /**构建数字牌集合
     * 卡牌数量根据关卡数来计算，并且如果没有铺满的情况下，集中在卡牌父节点中间；
    */
    cardCollection(): void {
        let spacingY = 5;
        // 卡牌数量是固定的
        let startX1 = this.cardParent.width / 4;
        let startX2 = this.cardParent.width * 3 / 4;
        let len = 14;//总数
        let noChengeJ = Math.floor(Math.random() * len);//随机一个卡牌数字不变
        let delayed = 10;// 延时变量
        // 从下往上
        let zOrder1 = 100;
        for (let j = len - 1; j >= 0; j--) {
            zOrder1--;
            delayed += 50;
            // 修改数字
            let card: Laya.Sprite;
            if (j === noChengeJ) {
                card = this.createCard('nochange') as Laya.Sprite;
            } else {
                card = this.createCard('change') as Laya.Sprite;
            }
            // 初始位置
            card.y = 1500;
            card.zOrder = Math.floor(Math.random() * 30);
            //目标位置
            let tagetY;
            if (j % 2 === 0) {
                card.x = startX1;
                tagetY = j / 2 * (card.height + spacingY) + 80;
            } else {
                card.x = startX2;
                tagetY = (j - 1) / 2 * (card.height + spacingY) + 80;
            }
            // 随机一个角度
            card.rotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
            // 动画表现
            let time = 500;
            Laya.timer.once(delayed, this, function () {
                Laya.Tween.to(card, { y: tagetY, rotation: 0 }, time, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                    // 开启时间倒计时
                    // 并且开启点击事件
                    if (j === len - 1) {
                        this.timerSwitch = true;
                        for (let index = 0; index < this.cardParent._children.length; index++) {
                            const card = this.cardParent._children[index];
                            card['DigitalCard'].cardClicksOn();
                        }
                    }
                }));
            })
        }
    }

    /**清除所有卡牌，顺序是从下到上和卡牌的出现相反
     * @param type 有两个模式，一个是下一关，一个是失败结算
    */
    clearAllCard(type): void {
        this.clearAllClicks();
        let len = this.cardParent._children.length;
        let delayed = 0;
        this.timerSwitch = false;//时间停止
        for (let i = 0; i < len; i++) {
            let card = this.cardParent._children[i] as Laya.Sprite;
            delayed += 50;
            Laya.timer.once(delayed, this, function () {
                let rotate = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
                Laya.Tween.to(card, { y: 1500, alpha: 0, rotation: rotate }, 800, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                    if (i === len - 1) {
                        this.cardParent.removeChildren(0, len - 1);
                        if (type === 'gameOver') {
                            this.createGameOver();
                        } else if (type === 'nextLevel') {
                            this.replacementCard();
                        }
                    }
                }))
            })
        }
    }

    /**清除卡牌上所有的点击事件*/
    clearAllClicks(): void {
        for (let index = 0; index < this.cardParent._children.length; index++) {
            const card = this.cardParent._children[index];
            card['DigitalCard'].cardClicksOff();
        }
    }

    /**构建单个数字
     * @param type 是否需要修改number值，因为其中有一个等于指示牌的值不可修改
    */
    createCard(type): Laya.Sprite {
        let card = Laya.Pool.getItemByCreateFun('speakBox', this.digitalCard.create, this.digitalCard) as Laya.Sprite;
        this.cardParent.addChild(card);
        if (type === 'change') {
            card['DigitalCard'].number.value = this.changeAnumber();
        } else {
            card['DigitalCard'].number.value = this.indicateNum.value;
        }
        return card;
    }

    /**卡牌数字和提示卡牌一一对应
     * 之后每个卡牌上的数字会随机改变一个*/
    changeAnumber(): string {
        // 把这个字符串放进这个数组
        let arr = [];
        for (let i = 0; i < this.indicateNum.value.length; i++) {
            arr.push(this.indicateNum.value[i]);
        }
        // 随机一个位置，修改掉，必须进行修，第一位暂不做修改
        let random = Math.floor(Math.random() * (arr.length - 1));
        let originalNum = arr[random];
        let randomNum = Math.floor(Math.random() * 10).toString();
        while (originalNum === randomNum) {
            randomNum = Math.floor(Math.random() * 10).toString();
        }
        arr[random] = randomNum;
        let numString: string;
        for (let j = 0; j < arr.length; j++) {
            if (j === 0) {
                numString = arr[j];
            } else {
                numString += arr[j];
            }
        }
        return numString;
    }

    /**创建结算界面*/
    createGameOver(): void {
        let gameOVer = Laya.Pool.getItemByCreateFun('gameOVer', this.gameOVer.create, this.gameOVer) as Laya.Sprite;
        this.self.addChild(gameOVer);
    }

    /**其他界面的自适应规则*/
    adaptiveOther(self): void {
        self.width = 750;
        self.height = Laya.stage.height;
        self.pivotX = this.self.width / 2;
        self.pivotY = this.self.height / 2;
        self.pos(375, Laya.stage.height / 2);
    }

    onUpdate(): void {
        // 倒计时
        if (this.timerSwitch) {
            this.timer++;
            if (this.timer % 60 == 0) {
                let timeNum = this.timeNum.value;
                let subNum;
                if (timeNum.length === 3) {
                    subNum = timeNum.substring(0, 2);
                } else if (timeNum.length === 2) {
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

    onDisable(): void {
    }
}