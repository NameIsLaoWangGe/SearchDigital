import GameControl from "./GameControl";

export default class DigitalCard extends Laya.Script {
    /** @prop {name:board, tips:"数字底板", type:Node}*/
    public board: Laya.Image;

    /** @prop {name:number, tips:"具体数字", type:Node}*/
    public number: Laya.FontClip;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;
    /**父节点*/
    private cardParent;
    /**提示卡牌*/
    private indicateCard;
    /**关卡数*/
    private levels;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['DigitalCard'] = this;
        this.gameControl = this.self.scene['Gamecontrol'];
        this.cardParent = this.gameControl.cardParent as Laya.Sprite;
        this.indicateCard = this.gameControl.indicateCard as Laya.Sprite;
        this.levels = this.gameControl.levels;
        // 数字随着长度而减小
        let scale = 1 - (this.levels - 1) * 0.04;
        this.number.scale(scale, scale);
    }

    /**开启点击事件*/
    cardClicksOn(): void {
        this.self.on(Laya.Event.MOUSE_DOWN, this, this.down);
        this.self.on(Laya.Event.MOUSE_MOVE, this, this.move);
        this.self.on(Laya.Event.MOUSE_UP, this, this.up);
        this.self.on(Laya.Event.MOUSE_OUT, this, this.out);
    }
    /**关闭点击事件*/
    cardClicksOff(): void {
        this.self.off(Laya.Event.MOUSE_DOWN, this, this.down);
        this.self.off(Laya.Event.MOUSE_MOVE, this, this.move);
        this.self.off(Laya.Event.MOUSE_UP, this, this.up);
        this.self.off(Laya.Event.MOUSE_OUT, this, this.out);
    }

    /**按下*/
    down(event): void {
        event.currentTarget.scale(1.1, 1.1);
    }

    /**消失动画
     * @param type 两个情况。一个是点错了，一个是对了，都会出现消失动画
    */
    cardVanish(type): void {
        this.gameControl.clearAllClicks();
        if (type === 'right') {
            this.indicateCard['IndicateCard'].rightAni();
            Laya.Tween.to(this.self, { y: this.self.y + 10 }, 50, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(this.self, { y: this.self.y - 20 }, 50, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(this.self, { y: this.self.y + 10 }, 50, null, Laya.Handler.create(this, function () {
                        this.gameControl.clearAllCard('nextLevel');
                        this.self.removeSelf();
                    }))
                }))
            }))
        } else if (type === 'error') {
            this.indicateCard['IndicateCard'].errorAni();
            Laya.Tween.to(this.self, { x: this.self.x - 10 }, 50, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(this.self, { x: this.self.x + 20 }, 50, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(this.self, { x: this.self.x - 10 }, 50, null, Laya.Handler.create(this, function () {
                        this.gameControl.clearAllCard('gameOver');
                    }))
                }))
            }))
        }
    }

    /**移动*/
    move(event): void {
        event.currentTarget.scale(1, 1);
    }
    /**抬起*/
    up(event): void {
        this.cardClicksOff();
        event.currentTarget.scale(1, 1);
        let indicateNum = this.gameControl.indicateNum;
        if (this.number.value === indicateNum.value) {
            this.cardVanish('right');
        } else {
            this.cardVanish('error');
        }
    }
    /**出屏幕*/
    out(event): void {
        event.currentTarget.scale(1, 1);
    }

    onDisable(): void {
    }
}