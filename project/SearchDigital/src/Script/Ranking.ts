export default class Ranking extends Laya.Script {
    /** @prop {name:background, tips:"黑色背景图", type:Node}*/
    public background: Laya.Sprite;

    /** @prop {name:baseboard, tips:"排行内容", type:Node}*/
    public baseboard: Laya.Sprite;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;
    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['GameOVer'] = this;
        this.gameControl = this.self.scene['Gamecontrol'];

        this.gameControl.adaptiveOther(this.self);
        this.background.width = Laya.stage.width;
        this.background.height = Laya.stage.height;

        this.appear();
    }

    /**出现*/
    appear(): void {
        this.background.alpha = 0.3;
        this.baseboard.alpha = 0;
        let time = 300;
        Laya.Tween.to(this.background, { alpha: 0.3 }, time, null, Laya.Handler.create(this, function () {

        }), 0);
        Laya.Tween.to(this.baseboard, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
            this.clicksOnBtn();
        }), 0);

    }

    /**消失*/
    vanish(): void {
        let time = 300;
        Laya.Tween.to(this.background, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
            this.self.removeSelf();
        }), 0);
        Laya.Tween.to(this.baseboard, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
        }), 0);
    }

    /**两个按钮的点击事件*/
    clicksOnBtn(): void {
        this.background.on(Laya.Event.MOUSE_DOWN, this, this.down);
        this.background.on(Laya.Event.MOUSE_MOVE, this, this.move);
        this.background.on(Laya.Event.MOUSE_UP, this, this.up);
        this.background.on(Laya.Event.MOUSE_OUT, this, this.out);
    }

    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
        this.background.off(Laya.Event.MOUSE_DOWN, this, this.down);
        this.background.off(Laya.Event.MOUSE_MOVE, this, this.move);
        this.background.off(Laya.Event.MOUSE_UP, this, this.up);
        this.background.off(Laya.Event.MOUSE_OUT, this, this.out);
    }

    /**按下*/
    down(event): void {
        event.currentTarget.scale(1.1, 1.1);

    }
    /**移动*/
    move(event): void {
        event.currentTarget.scale(1, 1);

    }
    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        this.vanish();
        console.log('我点击了背景！');
    }
    /**出屏幕*/
    out(event): void {
        event.currentTarget.scale(1, 1);
    }

    onDisable(): void {

    }
}