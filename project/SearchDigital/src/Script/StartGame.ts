export default class StartGame extends Laya.Script {
    /** @prop {name:logo, tips:"游戏结束标题", type:Node}*/
    public logo: Laya.Sprite;

    /** @prop {name:btn_start, tips:"开始游戏按钮", type:Node}*/
    public btn_start: Laya.Sprite;

    /** @prop {name:btn_ranking, tips:"排行榜按钮", type:Node}*/
    public btn_ranking: Laya.Sprite;

    /** @prop {name:btn_share, tips:"分享按钮", type:Node}*/
    public btn_share: Laya.Sprite;

    /** @prop {name:anti_addiction, tips:"防沉迷文字", type:Node}*/
    public anti_addiction: Laya.Sprite;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;
    /**等级节点*/
    private levelsNode: Laya.Sprite;
    /**提示卡牌节点*/
    private indicateCard: Laya.Sprite;
    /**时间卡牌节点*/
    private timeCard: Laya.Sprite;
    /**时间卡牌节点*/
    private line: Laya.Sprite;


    /**开始游戏按别扭的渐隐动画开关*/
    private startSwitch: boolean;
    private startChange: string;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['GameOVer'] = this;
        this.gameControl = this.self.scene['Gamecontrol'];
        this.levelsNode = this.gameControl.levelsNode as Laya.Sprite;
        this.indicateCard = this.gameControl.indicateCard as Laya.Sprite;
        this.timeCard = this.gameControl.timeCard as Laya.Sprite;
        this.line = this.gameControl.line as Laya.Sprite;

        this.startSwitch = false;
        this.startChange = 'appear';

        this.gameControl.adaptiveOther(this.self);

        this.appaer();
    }

    /**出现动画*/
    appaer(): void {
        let firstY = 1800;
        this.logo.y = 1500;
        // this.logo.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

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
        // logo 动画
        Laya.Tween.to(this.logo, { y: 439, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
        }), 0);

        // 开始游戏按钮动画
        Laya.Tween.to(this.btn_start, { y: 620, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
        }), delayed);

        // 排行榜按钮动画
        Laya.Tween.to(this.btn_ranking, { y: 812, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
        }), 2 * delayed);

        // 分享按钮动画
        Laya.Tween.to(this.btn_share, { y: 812, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
        }), 3 * delayed);

        // 防按沉迷文字动画
        Laya.Tween.to(this.anti_addiction, { y: Laya.stage.height * 9 / 10, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
            this.startSwitch = true;
            this.clicksOnBtn();
        }), 4 * delayed);
    }

    /**消失动画*/
    startVanish(): void {
        let Lrotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
        let Srotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
        let Rrotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
        let time = 800;
        let delayed = 150;
        let targetY = 1800;
        // logo 动画
        Laya.Tween.to(this.logo, { y: targetY, rotation: Lrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
        }), 0);
        // 返回按钮动画
        Laya.Tween.to(this.btn_start, { y: targetY, rotation: Srotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
        }), delayed);
        // 重来按钮动画
        Laya.Tween.to(this.btn_ranking, { y: targetY, rotation: Rrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {

        }), delayed * 2);
        // 重来按钮动画
        Laya.Tween.to(this.btn_share, { y: 1500, rotation: Rrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {

        }), delayed * 3);

        // 防沉迷文字动画
        Laya.Tween.to(this.anti_addiction, { y: 1500, rotation: Rrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
            this.self.removeSelf();
            this.gameControl.otherAppear();
            this.gameControl.replacementCard('start');
        }), delayed * 4);
    }

    onUpdate(): void {
        if (this.startSwitch) {
            if (this.startChange === 'appear') {
                this.btn_start.scaleX += 0.003;
                this.btn_start.scaleY += 0.003;
                if (this.btn_start.scaleX > 1.1) {
                    this.startChange = 'vanish';
                }
            } else if (this.startChange === 'vanish') {
                this.btn_start.scaleX -= 0.003;
                this.btn_start.scaleY -= 0.003;
                if (this.btn_start.scaleX < 1) {
                    this.startChange = 'appear';
                }
            }
        }
    }

    /**按钮的点击事件*/
    clicksOnBtn(): void {
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

    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
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
        this.clicksOffBtn();
        if (event.currentTarget.name === 'btn_start') {
            this.startVanish();
        } else if (event.currentTarget.name === 'btn_ranking') {

        } else if (event.currentTarget.name === 'btn_share') {

        }
    }

    /**出屏幕*/
    out(event): void {
        event.currentTarget.scale(1, 1);
    }

    onDisable(): void {

    }
}