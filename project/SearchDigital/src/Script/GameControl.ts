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


    constructor() { super(); }

    onEnable(): void {
        this.initGameScene();
    }

    /**初始化的一些变量*/
    initGameScene(): void {
        this.self = this.owner as Laya.Scene;
        this.self['Gamecontrol'] = this;//脚本属性化
        this.cardCollection();
    }

    /**构建数字牌集合*/
    cardCollection(): void {
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

    /**构建单个数字*/
    createCard(num): Laya.Sprite {
        let card = Laya.Pool.getItemByCreateFun('speakBox', this.digitalCard.create, this.digitalCard) as Laya.Sprite;
        this.cardParent.addChild(card);
        card['DigitalCard'].number.value = num;
        card['DigitalCard'].numAdaptiveBoard();
        return card;
    }

    /**提示数字和底板的适配*/

    onDisable(): void {
    }
}