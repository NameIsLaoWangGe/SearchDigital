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
        //数字越长宽度长，但是高度越窄，并且数字变小
        if (len <= 3) {
            this.board.width = len * 40 + 80;
        } else if (len >= 3 && len <= 6) {
            this.board.width = len * 40 + 50;
        }
        this.board.height = 135 - (len - 1) * 6;
        let scale = 1 - (len - 1) * 0.05;
        this.number.scale(scale, scale);

        // 保持和地板高度一致
        this.self.height = this.board.height;
        this.self.pivotY = this.self.height / 2;
        // 居中
        this.board.x = this.self.pivotX;
        this.board.y = this.self.pivotY;
        this.number.x = this.self.pivotX;
        this.number.y = this.self.pivotY * 1.1;//往下偏移一些
        this.board.pivotX = this.board.width / 2;
        this.board.pivotY = this.board.height / 2;
        // 数字和底板位置一样
        this.board.x = this.number.x;
    }

    onDisable(): void {
    }
}