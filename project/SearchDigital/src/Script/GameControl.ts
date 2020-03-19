export default class GameControl extends Laya.Script {

    /** @prop {name:scoreNum, tips:"分数节点", type:Node}*/
    public scoreNum: Laya.FontClip;
    /** @prop {name:scoreParent, tips:"分数节点的父节点", type:Node}*/
    public scoreParent: Laya.Sprite;

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

    /**指代this.ower,指代当前场景*/
    private self: Laya.Scene;
    /**当前关卡数*/
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
        this.levels = 10;
        // this.clearAllCard();
    }

    /**牌局开始*/
    replacementCard(): void {
        this.indicateNumReset();
        this.cardCollection();
    }

    /**构建数字牌集合
     * 卡牌数量根据关卡数来计算，并且如果没有铺满的情况下，集中在卡牌父节点中间；
    */
    cardCollection(): void {
        let spacingY = 10;
        let spacingX = 10;
        // 卡牌数量是关卡数量的2倍
        let cardCount = this.levels * 2;
        let startX1 = this.cardParent.width / 4;
        let startX2 = this.cardParent.width * 3 / 4;
        let startY = this.cardParent.height / 2;
        for (let i = 0; i < 2; i++) {
            // 从1开始循环，方便%2计算
            for (let j = 1; j < this.levels + 1; j++) {
                // 数字长度等于关卡数
                let card = this.createCard();
                // 横排位置
                if (i % 2 === 0) {
                    card.x = startX1;
                } else {
                    card.x = startX2;
                }
                // 竖排位置
                if (j % 2 === 0) {
                    card.y = startY + (j / 2) * (card.height + spacingY);
                } else {
                    card.y = startY - (j - 1) / 2 * (card.height + spacingY);
                }
            }
        }
        this.levels++;
    }

    /**关卡数对应的数字长度
     * 随机设置
    */
    indicateNumReset(): void {
        this.levels;
        let num1 = Math.floor(Math.random() * 9) + 1;//保证第一个数字不等于0
        let overlen = this.levels - 1;//剩余长度
        let num: string = num1.toString();
        for (let i = 0; i < overlen; i++) {
            num += Math.floor(Math.random() * 10).toString();//每次增加一个长度
        }
        // 从第八关开始大小缩小
        let scale = 1 - (this.levels - 8) * 0.05;
        this.indicateNum.scale(scale, scale);
        this.indicateNum.value = num;
        this.changeAnumber();
    }

    /**开始的卡牌数字和提示卡牌一一
        * 之后每个卡牌上的数字会随机改变一个*/
    changeAnumber(): string {
        // 把这个字符串放进这个数组
        let arr = [];
        for (let i = 0; i < this.indicateNum.value.length; i++) {
            arr.push(this.indicateNum.value[i]);
        }
        // 随机一个位置，修改掉，必须进行修，第一位暂不做修改
        let random = Math.floor(Math.random() * (arr.length - 1)) + 1;
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
        // console.log(numString);
        return numString;
    }

    /**构建单个数字*/
    createCard(): Laya.Sprite {
        let card = Laya.Pool.getItemByCreateFun('speakBox', this.digitalCard.create, this.digitalCard) as Laya.Sprite;
        this.cardParent.addChild(card);
        card['DigitalCard'].number.value = this.changeAnumber();
        card['DigitalCard'].numAdaptiveBoard();
        return card;
    }

    /**清除所有卡牌*/
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
                }
            })
        }
    }

    /**提示数字和底板的适配*/

    onDisable(): void {
    }
}