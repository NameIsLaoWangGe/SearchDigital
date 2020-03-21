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

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['GameOVer'] = this;
        this.gameControl = this.self.scene['Gamecontrol'];
        this.self.width = 750;
        this.self.height = Laya.stage.height;
        this.self.pivotX = this.self.width / 2;
        this.self.pivotY = this.self.height / 2;
        this.self.pos(375, 0);
    }

    onDisable(): void {
    }
}