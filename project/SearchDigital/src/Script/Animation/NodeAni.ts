export default class NodeAni extends Laya.Script {
    constructor() { super(); }

    onEnable(): void {

    }
    /**
     * 上下旋转动画
     * @param node 节点
     * @param time 时间
     */
    upDownRotate(node, time): void {
        Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    }), 0);
                }), 0);
            }), 0);
        }), 0);
    }

    /**
     * 上下旋转动画
     * @param node 节点
     * @param time 时间
     */
    righeLeftRotate(node, time): void {
        Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    }), 0);
                }), 0);
            }), 0);
        }), 0);
    }



    onDisable(): void {
    }
}