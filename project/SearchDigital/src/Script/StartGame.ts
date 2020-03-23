export default class StartGame extends Laya.Script {
    /** @prop {name:logo, tips:"游戏结束标题", type:Node}*/
    public logo: Laya.Sprite;

    /** @prop {name:btn_start, tips:"开始游戏按钮", type:Node}*/
    public btn_start: Laya.Sprite;

    /** @prop {name:btn_adv, tips:"看广告开始游戏按钮", type:Node}*/
    public btn_adv: Laya.Sprite;

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
    /**保存视频实例*/
    private videoAd;
    /**是否观看了视频*/
    private watchAds: boolean;

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
        this.watchAds = false;

        this.gameControl.adaptiveOther(this.self);

        this.appaer();
    }

    /**出现动画*/
    appaer(): void {
        let firstY = 1800;
        this.logo.y = firstY;
        this.logo.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.btn_start.y = firstY;
        this.btn_start.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.btn_adv.y = firstY;
        this.btn_adv.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.btn_ranking.y = firstY;
        this.btn_ranking.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.btn_share.y = firstY;
        this.btn_share.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.anti_addiction.y = Laya.stage.height * 9 / 10;
        this.anti_addiction.alpha = 0;

        this.commonAppear(this.logo, 0, 416);
        this.commonAppear(this.btn_start, 1, 565);
        this.commonAppear(this.btn_adv, 2, 667);
        this.commonAppear(this.btn_ranking, 3, 877);
        this.commonAppear(this.btn_share, 4, 877);
        // this.commonAppear(this.anti_addiction, 5, Laya.stage.height * 9 / 10);
        Laya.Tween.to(this.anti_addiction, { alpha: 1 }, 1000, null, Laya.Handler.create(this, function () {
        }));
    }

    /**通用出现动画*/
    commonAppear(node, number, targetY): void {
        let delayed = 80;
        let time = 600;
        Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
            if (number === 4) {
                this.startSwitch = true;
                this.clicksOnBtn();
            }
        }), number * delayed);
    }

    /**消失动画
    */
    startVanish(): void {
        Laya.Tween.to(this.anti_addiction, { alpha: 0 }, 300, null, Laya.Handler.create(this, function () {
        }));
        this.commonVanish(this.logo, 0, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
        this.commonVanish(this.btn_start, 1, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
        this.commonVanish(this.btn_adv, 2, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
        this.commonVanish(this.btn_ranking, 3, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
        this.commonVanish(this.btn_share, 4, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
        // this.commonVanish(this.anti_addiction, 5, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
    }

    /**通用消失动画*/
    commonVanish(node, number, rotation): void {
        let time = 600;
        let delayed = 150;
        Laya.Tween.to(node, { y: 1800, rotation: rotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
            if (number === 4) {
                this.self.removeSelf();
                this.gameControl.otherAppear();
                if (this.watchAds) {
                    this.gameControl.replacementCard('adv');
                } else {
                    this.gameControl.replacementCard('start');
                }
            }
        }), number * delayed);
    }


    /**按钮的点击事件*/
    clicksOnBtn(): void {
        this.btn_start.on(Laya.Event.MOUSE_DOWN, this, this.down);
        this.btn_start.on(Laya.Event.MOUSE_MOVE, this, this.move);
        this.btn_start.on(Laya.Event.MOUSE_UP, this, this.up);
        this.btn_start.on(Laya.Event.MOUSE_OUT, this, this.out);

        this.btn_adv.on(Laya.Event.MOUSE_DOWN, this, this.down);
        this.btn_adv.on(Laya.Event.MOUSE_MOVE, this, this.move);
        this.btn_adv.on(Laya.Event.MOUSE_UP, this, this.up);
        this.btn_adv.on(Laya.Event.MOUSE_OUT, this, this.out);

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

        this.btn_adv.off(Laya.Event.MOUSE_DOWN, this, this.down);
        this.btn_adv.off(Laya.Event.MOUSE_MOVE, this, this.move);
        this.btn_adv.off(Laya.Event.MOUSE_UP, this, this.up);
        this.btn_adv.off(Laya.Event.MOUSE_OUT, this, this.out);

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
        if (event.currentTarget.name === 'btn_start') {
            this.startVanish();
            this.clicksOffBtn();
        } else if (event.currentTarget.name === 'btn_adv') {
            //实例
            let videoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-6de18c6de7b6d9ab'
            })
            this.videoAd = videoAd;
            videoAd.load()
            //捕捉错误
            videoAd.onError(err => {
                console.log(err)
            })
            //关闭视频的回调函数
            videoAd.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                console.log(res)
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    this.watchAds = true;
                    console.log('视频看完了，时间增加10s');
                } else {
                    // 播放中途退出，不下发游戏奖励
                    this.watchAds = false;
                    console.log('视频没有看完，没有奖励');
                }
            })
        } else if (event.currentTarget.name === 'btn_ranking') {

        } else if (event.currentTarget.name === 'btn_share') {

        }
    }
    /**出屏幕*/
    out(event): void {
        event.currentTarget.scale(1, 1);
    }

    onUpdate(): void {
        if (this.startSwitch) {
            if (this.startChange === 'appear') {

                this.btn_start.scaleX += 0.003;
                this.btn_start.scaleY += 0.003;

                this.btn_adv.scaleX -= 0.003;
                this.btn_adv.scaleY -= 0.003;

                if (this.btn_start.scaleX > 1.1) {
                    this.startChange = 'vanish';
                }
            } else if (this.startChange === 'vanish') {

                this.btn_start.scaleX -= 0.003;
                this.btn_start.scaleY -= 0.003;

                this.btn_adv.scaleX += 0.003;
                this.btn_adv.scaleY += 0.003;

                if (this.btn_start.scaleX < 1) {
                    this.startChange = 'appear';
                }
            }
        }
    }

    onDisable(): void {

    }
}