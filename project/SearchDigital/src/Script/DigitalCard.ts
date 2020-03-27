import GameControl from "./GameControl";
import { Animation } from "./Template/Animation";
import { Clicks } from "./Template/Clicks";
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
    /**提示卡牌*/
    private indicateCard;
    /**关卡数*/
    private levels;

    /**点击后的标记*/
    private sign: boolean;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Sprite;
        this.self['DigitalCard'] = this;
        this.gameControl = this.self.scene['Gamecontrol'];
        this.cardParent = this.gameControl.cardParent as Laya.Sprite;
        this.indicateCard = this.gameControl.indicateCard as Laya.Sprite;
        this.levels = this.gameControl.levels;
        // 数字随着长度而减小
        let scale = 1 - (this.levels - 1) * 0.04;
        this.number.scale(scale, scale);
        this.board.skin = 'UI/数字底板.png';
        this.sign = false;
    }

    /**消失动画
     * @param type 两个情况。一个是点错了，一个是对了，都会出现消失动画
    */
    cardVanish(type): void {
        clearAllCard_Next => this.gameControl.clearAllCard_Next();
        if (type === 'right') {
            Animation.leftRight_Shake(this.indicateCard, 50, 10, null);
            Animation.leftRight_Shake(this.self, 50, 10, func => this.gameControl.clearAllCard_Next());
        } else if (type === 'error') {
            Animation.upDwon_Shake(this.indicateCard, 50, 10, null);
            Animation.upDwon_Shake(this.self, 50, 10, func => this.gameControl.clearAllCard_Over());
        }
    }

    /**开启点击事件*/
    cardClicksOn(): void {
        Clicks.clicksOn('largen', this.self, this, this.down, null, this.up, null);
    }
    /**关闭点击事件*/
    cardClicksOff(): void {
        Clicks.clicksOff('largen', this.self, this, this.down, null, this.up, null);
    }
    /**按下*/
    down(event): void {
        event.currentTarget.scale(1.1, 1.1);
        let indicateNum = this.gameControl.indicateNum;
        if (this.number.value === indicateNum.value) {
            this.board.skin = 'UI/正确底板.png';
        } else {
            this.board.skin = 'UI/错误底板.png';
        }
    }
    /**抬起*/
    up(event): void {
        // 无论点错点对时间都停止
        this.gameControl.timerSwitch = false;
        this.cardClicksOff();
        event.currentTarget.scale(1, 1);
        let indicateNum = this.gameControl.indicateNum;
        if (this.number.value === indicateNum.value) {
            this.cardVanish('right');
        } else {
            this.cardVanish('error');
        }
    }

    onDisable(): void {
    }
}