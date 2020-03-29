/**
 * number.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
 * 2.音乐播放模块
 */
export module PalyAudio {

    /**单张发牌音效
     * @param number 播放次数
    */
    export function aAingleCard(number): void {
        Laya.SoundManager.playSound('音效/单张发牌.mp3', number, Laya.Handler.create(this, function () { }));
    }

    /**连续发牌音效
     * @param number 播放次数
    */
    export function groupUp(number): void {
        Laya.SoundManager.playSound('音效/连续发牌.mp3', number, Laya.Handler.create(this, function () { }));
    }
    /**群体下落音效
     * @param number 播放次数 
    */
    export function groupDrop(number): void {
        Laya.SoundManager.playSound('音效/全体下落.mp3', number, Laya.Handler.create(this, function () { }));
    }

    /**播放单张卡牌旋转音效
     * @param number 播放次数
    */
    export function cardRotate(number): void {
        Laya.SoundManager.playSound('音效/单张牌旋转.mp3', number, Laya.Handler.create(this, function () { }));
    }

    /**游戏结束音效
     * @param number 播放次数
    */
    export function gameOver(number): void {
        Laya.SoundManager.playSound('音效/结束.mp3', number, Laya.Handler.create(this, function () { }));
    }

    /**点击正确音效
    * @param number 播放次数
    */
    export function clickRight(number): void {
        Laya.SoundManager.playSound('音效/点击正确.mp3', number, Laya.Handler.create(this, function () { }));
    }

    /**点击正确音效
     * @param number 播放次数
    */
    export function clickError(number): void {
        Laya.SoundManager.playSound('音效/点击错误.mp3', number, Laya.Handler.create(this, function () { }));
    }

}

export default PalyAudio;
