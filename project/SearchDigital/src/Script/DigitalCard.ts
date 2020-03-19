export default class DigitalCard extends Laya.Script {
    /** @prop {name:board, tips:"数字底板", type:Node}*/
    public board: Laya.Image;

    /** @prop {name:number, tips:"具体数字", type:Node}*/
    public number: Laya.FontClip;


    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['DigitalCard'] = this;
        this.gameControl = this.self.scene['Gamecontrol'];
        this.cardClicksOn();
    }

    /**数字长度和底板的适配
     * 数字越长，底板越长
     * */
    numAdaptiveBoard(): void {
        let len = this.number.value.length;
        //数字越长宽度长，但是高度越窄，并且数字变小
        if (len <= 3) {
            this.board.width = len * 40 + 80;
        } else if (len >= 3 && len <= 6) {
            this.board.width = len * 40 + 50;
        }
        this.board.height = 135 - (len - 1) * 6;
        let scale = 1 - (len - 1) * 0.05;
        this.number.scale(scale, scale);

        // 保持和地板高度一致
        this.self.height = this.board.height;
        this.self.pivotY = this.self.height / 2;
        // 居中
        this.board.x = this.self.pivotX;
        this.board.y = this.self.pivotY;
        this.number.x = this.self.pivotX;
        this.number.y = this.self.pivotY * 1.1;//往下偏移一些
        this.board.pivotX = this.board.width / 2;
        this.board.pivotY = this.board.height / 2;
        // 数字和底板位置一样
        this.board.x = this.number.x;
    }

    /**开启点击事件*/
    cardClicksOn(): void {
        this.self.on(Laya.Event.MOUSE_DOWN, this, this.down);
        this.self.on(Laya.Event.MOUSE_MOVE, this, this.move);
        this.self.on(Laya.Event.MOUSE_UP, this, this.up);
        this.self.on(Laya.Event.MOUSE_OUT, this, this.out);
    }
    /**关闭点击事件*/
    cardClicksOnOff(): void {
        this.self.off(Laya.Event.MOUSE_DOWN, this, this.down);
        this.self.off(Laya.Event.MOUSE_MOVE, this, this.move);
        this.self.off(Laya.Event.MOUSE_UP, this, this.up);
        this.self.off(Laya.Event.MOUSE_OUT, this, this.out);
    }
    /**按下*/
    down(event): void {
        event.currentTarget.scale(0.9, 0.9);
    }

    /**消失动画*/
    cardVanish(): void {
        Laya.Tween.to(this.self, { scaleX: 0, scaleY: 0, alpha: 0 }, 200, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
            this.self.removeSelf();
        }))
    }

    /**移动*/
    move(event): void {
        event.currentTarget.scale(1, 1);
    }
    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        let indicateNum = this.gameControl.indicateNum;
        if (this.number.value === indicateNum.value) {
            this.cardClicksOnOff();
            this.cardVanish();
        }
    }
    /**出屏幕*/
    out(event): void {
        event.currentTarget.scale(1, 1);
    }

    onDisable(): void {
    }
}