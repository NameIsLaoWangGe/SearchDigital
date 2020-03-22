export default class StartGame extends Laya.Script {
    /** @prop {name:logo, tips:"游戏结束标题", type:Node}*/
    public logo: Laya.Sprite;

    /** @prop {name:btn_start, tips:"开始游戏按钮", type:Node}*/
    public btn_start: Laya.Sprite;

    /** @prop {name:btn_ranking, tips:"排行榜按钮", type:Node}*/
    public btn_ranking: Laya.Sprite;

    /** @prop {name:btn_share, tips:"分享按钮", type:Node}*/
    public btn_share: Laya.Sprite;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;

    /**开始游戏按别扭的渐隐动画开关*/
    private startSwitch: boolean;
    private startChange: string;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['GameOVer'] = this;
        this.gameControl = this.self.scene['Gamecontrol'];

        this.startSwitch = false;
        this.startChange = 'appear';

        this.appaer();
    }

    /**出现动画*/
    appaer(): void {
        this.logo.y = 1500;
        this.logo.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.btn_start.y = 1500;
        this.btn_start.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.btn_ranking.y = 1500;
        this.btn_ranking.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.btn_share.y = 1500;
        this.btn_share.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        let time = 300;
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
            this.startSwitch = true;
        }), 3 * delayed);
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

    onDisable(): void {

    }
}