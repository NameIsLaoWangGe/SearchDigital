export default class LevelsNode extends Laya.Script {
    /** @prop {name:levelsNum, tips:"提示牌下的提示数字", type:Node}*/
    public levelsNum: Laya.FontClip;
    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;
    /**父节点*/
    private cardParent;
    /**提示卡牌*/
    private indicateCard;

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.gameControl = this.self.scene['Gamecontrol'];
        this.cardParent = this.gameControl.cardParent as Laya.Sprite;
        this.indicateCard = this.gameControl.indicateCard as Laya.Sprite;
        this.self['LevelsNode'] = this;
    }

    /**
     *普通旋转动画
     */
    levelsNodeAni(): void {
        let time = 100;
        Laya.Tween.to(this.self, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
            this.levelsNum.alpha = 0;
            Laya.Tween.to(this.self, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(this.self, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(this.self, { scaleX: 1 }, time - 50, null, Laya.Handler.create(this, function () {
                        this.levelsNum.alpha = 1;
                    }), 0);
                }), 0);
            }), 0);
        }), 0);
    }

    onDisable(): void {
    }
}