import { Animation } from "./Template/Animation";
import { Clicks } from "./Template/Clicks";

export default class GameOver extends Laya.Script {
    /** @prop {name:logo, tips:"游戏结束标题", type:Node}*/
    public logo: Laya.Sprite;

    /** @prop {name:btn_again, tips:"再来", type:Node}*/
    public btn_again: Laya.Sprite;

    /** @prop {name:btn_return, tips:"返回", type:Node}*/
    public btn_return: Laya.Sprite;

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

    /**logo的渐隐动画开关*/
    private logoSwitch: boolean;
    private logoChange: string;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['GameOVer'] = this;
        this.gameControl = this.self.scene['Gamecontrol'];
        this.levelsNode = this.gameControl.levelsNode as Laya.Sprite;
        this.indicateCard = this.gameControl.indicateCard as Laya.Sprite;
        this.timeCard = this.gameControl.timeCard as Laya.Sprite;
        this.line = this.gameControl.line as Laya.Sprite;

        this.logoSwitch = false;
        this.logoChange = 'appear';

        this.gameControl.adaptiveOther(this.self);
        this.appaer();
        this.gameControl.wxPostData();
    }

    /**出现动画*/
    appaer(): void {
        let firstY = 1800;
        let time = 800;
        let delayed = 150;
        Animation.go_up(this.logo, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 644, time, 0, null);
        Animation.go_up(this.btn_again, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 790, time, delayed, null);
        Animation.go_up(this.btn_return, firstY, Math.floor(Math.random() * 2) === 1 ? 45 : -45, 790, time, delayed * 2, func => this.levelsCardAni());
    }

    /**关卡卡牌移动到中间做为最终分数*/
    levelsCardAni(): void {
        let time = 200;
        // 关卡节点动画
        let targetX = Laya.stage.width / 2;
        let targetY = this.logo.y + (this.self.y - this.self.height / 2) - 150;//y在logo的世界坐标-100的位置
        Animation.move_changeRotate(this.levelsNode, targetX, targetY, 0.5, 45, time, func => this.logoSwitch = true);
        Animation.cardRotateX_TowFace(this.levelsNode, ['levelsNum'], null, 100, 0, null);

        // 提示卡牌隐藏动画
        Animation.fade_out(this.indicateCard, 1, 0, time * 2, 60, func => this.clicksOnBtn());
        // 时间节点隐藏动画
        Animation.fade_out(this.timeCard, 1, 0, time * 2, 30, null);
        // 分割线隐藏动画
        Animation.fade_out(this.line, 1, 0, time * 2, 0, null);
    }

    /**
      * 功能节点显示
     * 一种是重来显示
     * 一种是返回主界面显示
     * @param type
    */
    nodeDisplay(type): void {
        let time = 250;
        // 关卡节点动画
        let targetX = 108;//原位置
        let targetY = this.indicateCard.y;//转换为当前self坐标系坐标
        Animation.move_changeRotate(this.levelsNode, targetX, targetY, 0.5, -45, time, null);
        Animation.cardRotateX_TowFace(this.levelsNode, ['levelsNum'], null, 100, 0, null);

        // 提示卡牌动画
        Animation.fade_out(this.indicateCard, 0, 1, time * 2, 100, null);
        // 时间节点动画
        Animation.fade_out(this.timeCard, 0, 1, time * 2, 200, null);
        // 分割线动画
        Animation.fade_out(this.line, 0, 1, time * 2, 500, func => this.nodeDisplayFunc(type));
    }

    /**
     * 功能节点显示回调
     * @param type 包括重来和返回主界面
     * */
    nodeDisplayFunc(type): void {
        if (type === 'again') {
            this.gameControl.replacementCard('reStart');
        } else if (type === 'return') {
            this.gameControl.createStartGame();
            this.gameControl.otherVanish();
        }
    }

    /** 
     * 界面元素下落消失动画
     * 一种是重来消失
     * 一种是返回主界面消失
     * @param type
    */
    vanish(type): void {
        // 三个元素的下落动画
        let time = 800;
        let targetY = 1800;
        let delayed = 150;
        Animation.drop(this.btn_again, targetY, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 0, null);
        Animation.drop(this.btn_return, targetY, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 1, null);
        Animation.drop(this.logo, targetY, Math.floor(Math.random() * 2) === 1 ? 30 : -30, time, delayed * 2, func => this.vanishFunc(type));
    }
    /**
     * 下落消失回调
     * 一种是重来消失
     * 一种是返回主界面消失
     * @param type 
     */
    vanishFunc(type): void {
        // 关闭bannar广告
        if (Laya.Browser.onMiniGame) {
            this.gameControl.bannerAd.hide();
        }
        this.self.removeSelf();
        this.nodeDisplay(type);
    }

    /**两个按钮的点击事件*/
    clicksOnBtn(): void {
        Clicks.clicksOn('largen', this.btn_again, this, null, null, this.up, null);
        Clicks.clicksOn('largen', this.btn_return, this, null, null, this.up, null);
    }

    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
        Clicks.clicksOff('largen', this.btn_again, this, null, null, this.up, null);
        Clicks.clicksOff('largen', this.btn_return, this, null, null, this.up, null);
    }

    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        this.clicksOffBtn();
        if (event.currentTarget.name === 'btn_again') {
            this.vanish('again');
        } else if (event.currentTarget.name === 'btn_return') {
            this.vanish('return');
        }
    }

    onUpdate(): void {
        if (this.logoSwitch) {
            if (this.logoChange === 'appear') {
                this.logo.alpha -= 0.01;
                if (this.logo.alpha < 0.3) {
                    this.logoChange = 'vanish';
                }
            } else if (this.logoChange === 'vanish') {
                this.logo.alpha += 0.01;
                if (this.logo.alpha >= 1) {
                    this.logoChange = 'appear';
                }
            }
        }
    }

    onDisable(): void {
    }
}