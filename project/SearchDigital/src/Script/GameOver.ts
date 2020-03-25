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
        this.logo.y = firstY;
        this.logo.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.btn_again.y = firstY;
        this.btn_again.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.btn_return.y = firstY;
        this.btn_return.rotation = Math.floor(Math.random() * 2) === 1 ? 45 : -45;

        this.commonAppear(this.logo, 0, 644);
        this.commonAppear(this.btn_again, 1, 790);
        this.commonAppear(this.btn_return, 2, 790);
    }

    /**通过出现动画*/
    commonAppear(node, number, targetY): void {
        let time = 500;
        let delayed = 150
        Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
            if (number === 0) {
                this.levelsGameOver();
            }
        }), number * delayed);
    }

    /**关卡卡牌移动到中间做为最终分数*/
    levelsGameOver(): void {
        let time = 200;
        // 关卡节点动画
        let targetX = Laya.stage.width / 2;
        let targetY = this.logo.y + (this.self.y - this.self.height / 2) - 150;//y在logo的世界坐标-100的位置
        let Pre = 1 / 2;//这个是路线上的一个点站到整体的百分比
        Laya.Tween.to(this.levelsNode, { x: targetX * Pre, y: targetY * Pre, rotation: 45 }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(this.levelsNode, { x: targetX, y: targetY, rotation: 0, }, time, null, Laya.Handler.create(this, function () {
                this.logoSwitch = true;
            }), 0);
        }), 30);

        this.levelsNode['LevelsNode'].levelsNodeAni('common', 100);//这个是旋转动画

        // 提示卡牌动画
        Laya.Tween.to(this.indicateCard, { alpha: 0 }, time * 2, null, Laya.Handler.create(this, function () {
            this.clicksOnBtn();
            // // 开启bannar广告
            // if (Laya.Browser.onMiniGame) {
            //     this.gameControl.bannerAd.show();
            // }
        }), 60);

        // 时间节点动画
        Laya.Tween.to(this.timeCard, { alpha: 0 }, time * 2, null, Laya.Handler.create(this, function () {
        }), 30);

        // 分割线动画
        Laya.Tween.to(this.line, { alpha: 0 }, time, null, Laya.Handler.create(this, function () {
        }), 0);

    }

    /**关卡卡牌移动到中间做为最终分数]
     * 一种是重来消失
     * 一种是返回主界面消失
     * @param type
    */
    homing(type): void {
        let time = 250;
        // 关卡节点动画
        let targetX = 108;//排好的位置不变
        let targetY = this.indicateCard.y;//y轴和时间、提示卡牌位置一样
        let Pre = 1 / 2;//这个是路线上的一个点站到整体的百分比\
        Laya.Tween.to(this.levelsNode, { x: this.levelsNode.x - targetX - 20, y: this.levelsNode.y - targetY, rotation: -45 }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(this.levelsNode, { x: targetX, y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
            }), 0);
        }), 0);

        this.levelsNode['LevelsNode'].levelsNodeAni('common', 100);//这个是旋转动画

        // 提示卡牌动画
        Laya.Tween.to(this.indicateCard, { alpha: 1 }, time * 2, null, Laya.Handler.create(this, function () {
        }), 100);

        // 时间节点动画
        Laya.Tween.to(this.timeCard, { alpha: 1 }, time * 2, null, Laya.Handler.create(this, function () {
        }), 200);
        // 分割线动画
        Laya.Tween.to(this.line, { alpha: 1 }, time, null, Laya.Handler.create(this, function () {
            if (type === 'again') {
                this.gameControl.replacementCard('reStart');
            } else if (type === 'return') {
                this.gameControl.createStartGame();
                this.gameControl.otherVanish();
            }

        }), 500);
    }

    /**消失动画
     * 一种是重来消失
     * 一种是返回主界面消失
     * @param type
    */
    vanish(type): void {

        let Lrotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
        let Arotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;
        let Rrotation = Math.floor(Math.random() * 2) === 1 ? 30 : -30;

        this.commonVanish(this.btn_again, 0, Math.floor(Math.random() * 2) === 1 ? 30 : -30);
        this.commonVanish(this.btn_return, 1, Math.floor(Math.random() * 2) === 1 ? 30 : -30);

        // 重来按钮动画
        let time = 800;
        let targetY = 1800;
        Laya.Tween.to(this.logo, { y: targetY, rotation: Rrotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
            // 关闭bannar广告
            if (Laya.Browser.onMiniGame) {
                this.gameControl.bannerAd.hide();
            }
            this.self.removeSelf();
            this.homing(type);
        }), 300);
    }

    /**通用消失动画*/
    commonVanish(node, number, rotation): void {
        let time = 800;
        let delayed = 150;
        // logo 动画
        Laya.Tween.to(node, { y: 1800, rotation: rotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
        }), 0);
    }

    /**两个按钮的点击事件*/
    clicksOnBtn(): void {
        this.btn_again.on(Laya.Event.MOUSE_DOWN, this, this.down);
        this.btn_again.on(Laya.Event.MOUSE_MOVE, this, this.move);
        this.btn_again.on(Laya.Event.MOUSE_UP, this, this.up);
        this.btn_again.on(Laya.Event.MOUSE_OUT, this, this.out);

        this.btn_return.on(Laya.Event.MOUSE_DOWN, this, this.down);
        this.btn_return.on(Laya.Event.MOUSE_MOVE, this, this.move);
        this.btn_return.on(Laya.Event.MOUSE_UP, this, this.up);
        this.btn_return.on(Laya.Event.MOUSE_OUT, this, this.out);
    }

    /**两个按钮的点击事件*/
    clicksOffBtn(): void {
        this.btn_again.off(Laya.Event.MOUSE_DOWN, this, this.down);
        this.btn_again.off(Laya.Event.MOUSE_MOVE, this, this.move);
        this.btn_again.off(Laya.Event.MOUSE_UP, this, this.up);
        this.btn_again.off(Laya.Event.MOUSE_OUT, this, this.out);

        this.btn_return.off(Laya.Event.MOUSE_DOWN, this, this.down);
        this.btn_return.off(Laya.Event.MOUSE_MOVE, this, this.move);
        this.btn_return.off(Laya.Event.MOUSE_UP, this, this.up);
        this.btn_return.off(Laya.Event.MOUSE_OUT, this, this.out);
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
        if (event.currentTarget.name === 'btn_again') {
            this.vanish('again');
        } else if (event.currentTarget.name === 'btn_return') {
            this.vanish('return');
        }
    }
    /**出屏幕*/
    out(event): void {
        event.currentTarget.scale(1, 1);
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