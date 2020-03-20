import GameControl from "./GameControl";

export default class DigitalCard extends Laya.Script {
    /** @prop {name:board, tips:"数字底板", type:Node}*/
    public board: Laya.Image;

    /** @prop {name:number, tips:"具体数字", type:Node}*/
    public number: Laya.FontClip;

    /**指代this.ower*/
    private self: Laya.Sprite;
    /**主场景脚本*/
    private gameControl;
    /**父节点*/
    private cardParent;
    /**关卡数*/
    private levels;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['DigitalCard'] = this;
        this.gameControl = this.self.scene['Gamecontrol'];
        this.cardParent = this.gameControl.cardParent as Laya.Sprite;
        this.levels = this.gameControl.levels;
        this.number.alpha = 0;
        this.self.alpha = 0;
        // 数字随着长度而减小
        let scale = 1 - (this.levels - 1) * 0.04;
        this.number.scale(scale, scale);
        this.cardClicksOn();
        
    }

    /**数字长度和底板的适配
     * 数字越长，底板越长
     * */
    numAdaptiveBoard(): void {
        this.setHeightAndY();
        // 保持和底板高度一致
        this.self.pivotY = this.self.height / 2;
        // 居中
        this.board.x = this.self.pivotX;
        this.board.y = this.self.pivotY;
        this.number.x = this.board.x;
        this.number.y = this.board.y * 1.1;//往下偏移一些
        this.board.pivotX = this.board.width / 2;
        this.board.pivotY = this.board.height / 2;
        // 数字和底板位置一样
        this.board.x = this.number.x;
    }

    /**设置高度，和位置偏移*/
    setHeightAndY(): void {
        switch (this.levels) {
            case 1:
                this.board.height = 200;
                this.self.height = this.board.height;
                this.self.y += this.cardParent.height / 3;
                break;
            case 2:
                this.board.height = 200;
                this.self.height = this.board.height;
                this.self.y += this.cardParent.height / 3;
                break;
            case 3:
                this.board.height = 150;
                this.self.height = this.board.height;
                this.self.y += this.cardParent.height / 3;
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                this.board.height = 135 - (this.levels - 1) * 6;
                let scale = 1 - (this.levels - 1) * 0.05;
                this.number.scale(scale, scale);
                break;
        }
    }

    /**根据子节点数量和父节点的大小设置宽度*/
    cardwidth(): void {
        let cardParent = this.gameControl.cardParent as Laya.Sprite;
        let parentW = cardParent.width;
        let parentH = cardParent.height;
    }

    /**开启点击事件*/
    cardClicksOn(): void {
        this.self.on(Laya.Event.MOUSE_DOWN, this, this.down);
        this.self.on(Laya.Event.MOUSE_MOVE, this, this.move);
        this.self.on(Laya.Event.MOUSE_UP, this, this.up);
        this.self.on(Laya.Event.MOUSE_OUT, this, this.out);
    }
    /**关闭点击事件*/
    cardClicksOnOff(node): void {
        node.off(Laya.Event.MOUSE_DOWN, this, this.down);
        node.off(Laya.Event.MOUSE_MOVE, this, this.move);
        node.off(Laya.Event.MOUSE_UP, this, this.up);
        node.off(Laya.Event.MOUSE_OUT, this, this.out);
    }

    /**关闭所有卡牌的点击事件*/
    allCardClicksOff(): void {
        let cardParent = this.gameControl.cardParent as Laya.Sprite;
        for (let i = 0; i < cardParent._children.length; i++) {
            let card = cardParent._children[i];
            this.cardClicksOnOff(card);
        }
    }

    /**按下*/
    down(event): void {
        event.currentTarget.scale(1.1, 1.1);
    }

    /**消失动画*/
    cardVanish(): void {
        Laya.Tween.to(this.self, { scaleX: 0, scaleY: 0, alpha: 0 }, 200, null, Laya.Handler.create(this, function () {
            this.self.removeSelf();
            this.gameControl.clearAllCard();
        }))
    }
    /**移动*/
    move(event): void {
        event.currentTarget.scale(1, 1);
    }
    /**抬起*/
    up(event): void {
        event.currentTarget.scale(1, 1);
        let indicateNum = this.gameControl.indicateNum;
        if (this.number.value === indicateNum.value) {
            this.allCardClicksOff();
            this.cardVanish();
        }
    }
    /**出屏幕*/
    out(event): void {
        event.currentTarget.scale(1, 1);
    }

    onDisable(): void {
    }
}