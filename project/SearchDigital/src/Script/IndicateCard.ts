export default class IndicateCard extends Laya.Script {
    constructor() { super(); }
    /** @prop {name:indicateNum, tips:"提示牌下的提示数字", type:Node}*/
    public indicateNum: Laya.FontClip;
    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;


    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.gameControl = this.self.scene['Gamecontrol'];
        this.self['IndicateCard'] = this;
    }

    /**更换任务数字动画*/
    indicateNodeAin(): void {
        let time = 120;
        Laya.Tween.to(this.self, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
            this.indicateNumReset();
            Laya.Tween.to(this.self, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                this.gameControl.cardCollection();
            }), 0);
        }), 0);
    }

    /**变化关卡数对应的任的数字
   */
    indicateNumReset(): void {
        let num1 = Math.floor(Math.random() * 9) + 1;//保证第一个数字不等于0
        let levels = this.gameControl.levels;
        let overlen = levels - 1;//剩余长度
        let num: string = num1.toString();
        for (let i = 0; i < overlen; i++) {
            num += Math.floor(Math.random() * 10).toString();//每次增加一个长度
        }
        // 大小缩小
        let scale = 1 - (levels - 2) * 0.04;
        this.indicateNum.scale(scale, scale);
        this.indicateNum.value = num;
        this.gameControl.changeAnumber();
    }

    /**左右摇摆动画*/
    errorAni(): void {
        Laya.Tween.to(this.self, { x: this.self.x - 10 }, 50, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(this.self, { x: this.self.x + 20 }, 50, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(this.self, { x: this.self.x - 10 }, 50, null, Laya.Handler.create(this, function () {
                }))
            }))
        }))
    }

    /**上下摇摆动画*/
    rightAni(): void {
        Laya.Tween.to(this.self, { y: this.self.y + 10 }, 50, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(this.self, { y: this.self.y - 20 }, 50, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(this.self, { y: this.self.y + 10 }, 50, null, Laya.Handler.create(this, function () {
                }))
            }))
        }))
    }

    onDisable(): void {
    }
}