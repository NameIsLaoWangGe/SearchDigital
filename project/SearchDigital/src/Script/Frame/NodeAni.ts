export module NodeAni {
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

    /**
     * 上下旋转动画
     * @param node 节点
     * @param time 时间
     */
    export function righeLeftRotate(node, time, func): void {
        Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    }), 0);

                }), 0);
            }), 0);
        }), 0);
    }

    /**
     * 左右抖动
     * @param node 节点
     * @param time 时间
     * @param range 幅度
     * @param func 回调函数
     */
    export function errorAni(node, time, range, func): void {
        Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(node, { x: node.x + range * 2 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }))
            }))
        }))
    }

    /**
     * 上下抖动
     * @param node 节点
     * @param time 时间
     * @param range 幅度
     * @param func 回调函数
     */
    export function rightAni(node, time, range, func): void {
        Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(node, { y: node.y - range * 2 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }))
            }))
        }))
    }

    /**
     * 渐隐渐出
     * @param node 节点
     * @param time 时间
     * @param delayed 延时
     * @param range 幅度
     * @param func 回调函数
     */
    export function fade_out(node, time, delayed, range, func): void {
        Laya.Tween.to(node, { alpha: range }, time, null, Laya.Handler.create(this, function () {
        }), delayed)
    }

}

export default NodeAni;
