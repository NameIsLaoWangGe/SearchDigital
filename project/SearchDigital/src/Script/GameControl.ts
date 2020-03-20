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
        this.replacementCard();
    }

    /**初始化的一些变量*/
    initGameScene(): void {
        this.self = this.owner as Laya.Scene;
        this.self['Gamecontrol'] = this;//脚本属性化
        this.self.height = Laya.stage.height;
        this.levels = 0;
        this.levelsNum.value = this.levels.toString();
        this.timer = 0;
        this.timeNum.value = '10s';
        this.timerSwitch = false;
    }

    /**牌局开始*/
    replacementCard(): void {
        this.levels++;
        this.levelsNodeAni();
        this.timeNum.value = '10s';
    }

    /**等级动画*/
    levelsNodeAni(): void {
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

    /**构建数字牌集合
     * 卡牌数量根据关卡数来计算，并且如果没有铺满的情况下，集中在卡牌父节点中间；
    */
    cardCollection(): void {
        let spacingY = 5;
        // 卡牌数量是关卡数量的2倍
        let cardCount = this.levels * 2;
        let startX1 = this.cardParent.width / 4;
        let startX2 = this.cardParent.width * 3 / 4;
        let startY = 100;
        //随机一个值不去修改
        let noChengeI = Math.floor(Math.random() * 2);
        let noChengeJ = Math.floor(Math.random() * 6);
        let delayed = 10;
        // 从上往下
        for (let j = 0; j < 6; j++) {
            Laya.timer.once(delayed, this, function () {
                for (let i = 0; i < 2; i++) {
                    // 数字长度等于关卡数
                    let card;
                    if (i === noChengeI && j === noChengeJ) {
                        card = this.createCard('nochange');
                    } else {
                        card = this.createCard('change');
                    }
                    this.cardAppear(card);
                    // 横排位置
                    if (i % 2 === 0) {
                        card.x = startX1;
                    } else {
                        card.x = startX2;
                    }
                    // 竖排位置
                    card.y = startY + j * (card.height + spacingY);

                    //开启时间倒计时
                    if (i === 1 && j === this.levels - 1) {
                        this.timerSwitch = true;
                    }
                }
            });
            delayed += 300;
        }
    }

    /**卡牌出现的翻转动画*/
    cardAppear(card: Laya.Sprite): void {
        let time = 100;
        Laya.Tween.to(card, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(card, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                let number = card.getChildByName('number') as Laya.FontClip;
                number.alpha = 1;
                Laya.Tween.to(card, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                }), 0);
            }), 0);
        }), 0);
    }

    /**任务数字动画*/
    indicateNodeAin(): void {
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

    /**关卡数对应的任务数字
    */
    indicateNumReset(): void {
        let num1 = Math.floor(Math.random() * 9) + 1;//保证第一个数字不等于0
        let overlen = this.levels - 1;//剩余长度
        let num: string = num1.toString();
        for (let i = 0; i < overlen; i++) {
            num += Math.floor(Math.random() * 10).toString();//每次增加一个长度
        }
        // 从第八关开始大小缩小
        let scale = 1 - (this.levels - 2) * 0.04;
        this.indicateNum.scale(scale, scale);
        this.indicateNum.value = num;
        this.changeAnumber();
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
        // card['DigitalCard'].numAdaptiveBoard();
        return card;
    }

    /**清除所有卡牌，顺序是从下到上和卡牌的出现相反*/
    clearAllCard(): void {
        let len = this.cardParent._children.length;
        let delayed = 0;
        for (let i = 0; i < len; i++) {
            let card = this.cardParent._children[i] as Laya.Sprite;
            delayed += 100;
            Laya.timer.once(delayed, this, function () {
                card.alpha = 0;
                if (i === len - 1) {
                    this.cardParent.removeChildren(0, len - 1);
                    this.replacementCard();
                }
            })
        }
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
                    return;
                }
                this.timeNum.value = (Number(subNum) - 1).toString() + 's';
            }
        }
    }

    onDisable(): void {
    }
}