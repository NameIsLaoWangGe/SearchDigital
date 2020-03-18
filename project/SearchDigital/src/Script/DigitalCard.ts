export default class DigitalCard extends Laya.Script {
    /** @prop {name:board, tips:"数字底板", type:Node}*/
    public board: Laya.Image;

    /** @prop {name:number, tips:"具体数字", type:Node}*/
    public number: Laya.FontClip;


    /**指代this.ower*/
    private self: Laya.Sprite;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['DigitalCard'] = this;
    }

    /**数字长度和底板的适配
     * 数字越长，底板越长
     * */
    numAdaptiveBoard(): void {
        let len = this.number.value.length;
        this.board.width = 140 + (len - 1) * 30;
        // 两个都居中
        this.board.pivotX = this.board.width / 2;
        this.board.pivotY = this.board.height / 2;
        this.board.x = this.number.x;
    }

    onDisable(): void {
    }
}