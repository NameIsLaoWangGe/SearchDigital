/**
 * 1.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向 原来的this。
 */
export module Clicks {
    /**
     * 点击事件注册
     * @param effect 效果类型
     * @param target 节点
     * @param caller 指向脚本（this）引用
     * @param down 按下函数
     * @param move 移动函数
     * @param up 抬起函数
     * @param out 出屏幕函数
     * 以上4个只是函数名，不可传递函数，如果没有特殊执行，那么就用此模块定义的4个函数，包括通用效果。
     */
    export function clicksOn(effect, target, caller, down, move, up, out): void {
        let btnEffect;
        switch (effect) {
            case 'largen':
                btnEffect = new Btn_LargenEffect();
                break;
            default:
                btnEffect = new Btn_LargenEffect();
                break;
        }
        target.on(Laya.Event.MOUSE_DOWN, caller, down === null ? btnEffect.down : down);
        target.on(Laya.Event.MOUSE_MOVE, caller, move === null ? btnEffect.move : move);
        target.on(Laya.Event.MOUSE_UP, caller, up === null ? btnEffect.up : up);
        target.on(Laya.Event.MOUSE_OUT, caller, out === null ? btnEffect.out : out);
    }

    /**
     * 点击事件的关闭
     * @param target 节点
     * @param caller 指向脚本（this）引用
     * @param down 按下函数
     * @param move 移动函数
     * @param up 抬起函数
     * @param out 出屏幕函数
     * 以上4个只是函数名，不可传递函数，如果没有特殊执行，那么就用此模块定义的4个函数，包括通用效果。
     */
    export function clicksOff(effect, target, caller, down, move, up, out): void {
        let btnEffect;
        switch (effect) {
            case 'largen':
                btnEffect = new Btn_LargenEffect();
                break;
            default:
                break;
        }
        target.off(Laya.Event.MOUSE_DOWN, caller, down === null ? btnEffect.down : down);
        target.off(Laya.Event.MOUSE_MOVE, caller, move === null ? btnEffect.move : move);
        target.off(Laya.Event.MOUSE_UP, caller, up === null ? btnEffect.up : up);
        target.off(Laya.Event.MOUSE_OUT, caller, out === null ? btnEffect.out : out);
    }

}
export default Clicks;

/**
 * 点击放大的按钮点击效果
 */
export class Btn_LargenEffect {
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
