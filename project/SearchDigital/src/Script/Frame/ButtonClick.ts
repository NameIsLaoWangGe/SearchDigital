export module ButtonClick {
    /**
     * 上下旋转动画
     * @param node 节点
     * @param time 时间
     */
    export function upDownRotate(node, time): void {
        Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    }), 0);
                }), 0);
            }), 0);
        }), 0);
    }
    /**开启点击事件*/
    export function cardClicksOn(): void {
    }
    /**关闭点击事件*/
    function cardClicksOff(): void {
    }
    /**按下*/
    function down(event): void {

    }
    /**移动*/
    function move(event): void {
    }
    /**抬起*/
    function up(event): void {

    }
    /**出屏幕*/
    function out(event): void {
    }
}

export default ButtonClick;
