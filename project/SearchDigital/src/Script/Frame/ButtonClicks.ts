/**
 * 导出的模块不是类，没有this
 */
export module ButtonClicks {
    /**
     * 开启点击事件
     * @param target 节点
     * @param down 按下的函数 
     * @param up 抬起的函数
     * 以上两个只是函数名，不可传函数进来,如果是空值，那么直接用通用的4个事件函数
     */
    export function cardClicksOn(target, caller, down, move, up, out): void {
        let buttonCommon = new ButtonCommon();
        target.on(Laya.Event.MOUSE_DOWN, caller, down === null ? buttonCommon.down : down);
        target.on(Laya.Event.MOUSE_MOVE, caller, move === null ? buttonCommon.move : move);
        target.on(Laya.Event.MOUSE_UP, caller, up === null ? buttonCommon.up : up);
        target.on(Laya.Event.MOUSE_OUT, caller, out === null ? buttonCommon.out : out);
    }

    /**
     * 关闭点击事件
     * @param node 节点
     * @param down 按下的函数 
     * @param up 抬起的函数
    * 以上两个只是函数名，不可传函数进来,如果是空值，那么直接用这里的4个事件函数
     */
    export function cardClicksOff(target, caller, down, move, up, out): void {
        let buttonCommon = new ButtonCommon();
        target.off(Laya.Event.MOUSE_DOWN, caller, down === null ? buttonCommon.down : down);
        target.off(Laya.Event.MOUSE_MOVE, caller, move === null ? buttonCommon.move : move);
        target.off(Laya.Event.MOUSE_UP, caller, up === null ? buttonCommon.up : up);
        target.off(Laya.Event.MOUSE_OUT, caller, out === null ? buttonCommon.out : out);
    }

}
export default ButtonClicks;

/**
 * 通用的按钮点击效果
 */
export class ButtonCommon {
    /**按下*/
    down(event): void {
        event.currentTarget.scale(1.1, 1.1);
    }
    /**按下*/
    up(event): void {
        event.currentTarget.scale(1, 1);
    }
    /**移动*/
    move(event): void {
        event.currentTarget.scale(1.1, 1.1);
    }
    /**出屏幕*/
    out(event): void {
        event.currentTarget.scale(1, 1);
    }
}
