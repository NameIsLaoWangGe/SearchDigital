import { Clicks } from "./Template/Clicks";
import { Animation } from "./Template/Animation";

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
        this.gameControl.startNode = this.self;

        this.startSwitch = false;
        this.startChange = 'appear';
        this.watchAds = false;

        this.gameControl.adaptiveOther(this.self);
        this.gameControl.childAdaptive(this.anti_addiction, this.self, Laya.stage.height * 9 / 10);


        this.videoAd = this.gameControl.videoAd;
        this.appaer();
    }

    /**出现动画*/
    appaer(): void {
        let time = 800;
        let delayed = 150;
        let firstY = 1800;
        // logo上升
        Animation.go_up(this.logo, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 416, time, 0, func => {
        });
        // 开始按钮上升
        Animation.go_up(this.btn_start, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 565, time, delayed * 1, null);
        // 开始按钮上升
        Animation.go_up(this.btn_adv, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 667, time, delayed * 2, null);
        // 排行按钮上升
        Animation.go_up(this.btn_ranking, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 877, time, delayed * 3, null);
        // 分享按钮上升
        Animation.go_up(this.btn_share, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 877, time, delayed * 4, func => this.appaerFunc());
        // 分割线出现
        Animation.fade_out(this.anti_addiction, 0, 1, 1000, 0, null);
    }

    /**出现动画回调函数*/
    appaerFunc(): void {
        this.startSwitch = true;
        this.clicksOnBtn();
        // 显示bannar广告
        if (Laya.Browser.onMiniGame) {
            this.gameControl.bannerAd.show()
                .then(() => console.log('banner 广告显示'));
        }
    }

    /**
     * 消失动画
     * 一种是普通开始
     * 一种是看广告开始
     * @param  type 消失后的开始游戏类型
    */
    vanish(type): void {
        let time = 600;
        let y = 1800;
        let delayed = 50;
        // logo下落
        Animation.drop(this.logo, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 0, null);
        // 开始按钮下落
        Animation.drop(this.btn_start, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 1, null);
        // 看广告开始按钮下落
        Animation.drop(this.btn_adv, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 2, null);
        // 排行榜按钮下落
        Animation.drop(this.btn_ranking, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 3, null);
        // 分享按钮下落
        Animation.drop(this.btn_share, y, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 5, func => this.vanishFunc(type));
        // 分割线消失
        Animation.fade_out(this.anti_addiction, 1, 0, 300, 0, null);
    }

    /**
     * 动画播放完毕后开始游戏
    */
    vanishFunc(type): void {
        this.self.removeSelf();
        this.gameControl.otherAppear();
        this.gameControl.replacementCard(type);
    }

    /**按钮的点击事件*/
    clicksOnBtn(): void {
        Clicks.clicksOn('largen', this.btn_start, this, null, null, this.up, null);
        Clicks.clicksOn('largen', this.btn_adv, this, null, null, this.up, null);
        Clicks.clicksOn('largen', this.btn_ranking, this, null, null, this.up, null);
        Clicks.clicksOn('largen', this.btn_share, this, null, null, this.up, null);
    }

    /**关闭按钮点击事件*/
    clicksOffBtn(): void {
        Clicks.clicksOff('largen', this.btn_start, this, null, null, this.up, null);
        Clicks.clicksOff('largen', this.btn_adv, this, null, null, this.up, null);
        Clicks.clicksOff('largen', this.btn_ranking, this, null, null, this.up, null);
        Clicks.clicksOff('largen', this.btn_share, this, null, null, this.up, null);
    }

    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        if (event.currentTarget.name === 'btn_start') {
            // 关闭bannar广告
            if (Laya.Browser.onMiniGame) {
                this.gameControl.bannerAd.hide();
            }
            this.vanish('start');
            this.clicksOffBtn();
        } else if (event.currentTarget.name === 'btn_adv') {
            // 关闭bannar广告
            if (Laya.Browser.onMiniGame) {
                this.gameControl.bannerAd.hide();
            }
            // 用户触发广告后，显示激励视频广告
            this.videoAd.show().catch(() => {
                // 失败重试
                this.videoAd.load()
                    .then(() => this.videoAd.show())
                    .catch(err => {
                        console.log('激励视频 广告显示失败')
                    })
            })
        } else if (event.currentTarget.name === 'btn_ranking') {
            this.gameControl.createRanking();

        } else if (event.currentTarget.name === 'btn_share') {
            this.gameControl.wxShare();
        }
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