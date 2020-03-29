import { Animation } from "./Template/Animation";
import { PalyAudio } from "./Template/PlayAudio";

export default class GameControl extends Laya.Script {

    /** @prop {name:indicateCard, tips:"提示牌", type:Node}*/
    public indicateCard: Laya.Sprite;
    /** @prop {name:indicateNum, tips:"提示牌下的提示数字", type:Node}*/
    public indicateNum: Laya.FontClip;

    /** @prop {name:timeCard, tips:"时间", type:Node}*/
    public timeCard: Laya.Sprite;
    /** @prop {name:timeNum, tips:"时间数字", type:Node}*/
    public timeNum: Laya.FontClip;

    /** @prop {name:cardParent, tips:"数字牌父节点容器", type:Node}*/
    public cardParent: Laya.Sprite;

    /** @prop {name:digitalCard, tips:"数字牌的预制体", type:Prefab}*/
    public digitalCard: Laya.Prefab;

    /** @prop {name:levelsNode, tips:"关卡数", type:Node}*/
    public levelsNode: Laya.Sprite;
    /** @prop {name:levelsNum, tips:"关卡数", type:Node}*/
    public levelsNum: Laya.FontClip;

    /** @prop {name:background, tips:"背景图", type:Node}*/
    public background: Laya.Sprite;

    /** @prop {name:line, tips:"分割线", type:Node}*/
    public line: Laya.Sprite;

    /** @prop {name:startGame, tips:"游戏开始预制体", type:Prefab}*/
    public startGame: Laya.Prefab;

    /** @prop {name:gameOVer, tips:"游戏结束预制体", type:Prefab}*/
    public gameOVer: Laya.Prefab;

    /** @prop {name:ranking, tips:"排行榜", type:Prefab}*/
    public ranking: Laya.Prefab;

    /**指代this.ower,指代当前场景*/
    private self: Laya.Scene;
    /**时间线*/
    private timer: number;
    /**时间线开关*/
    private timerSwitch: boolean;
    /**内部关卡数*/
    private levels: number;

    /**看视频广告开始游戏的视频实例*/
    private videoAd;
    /**监听变量，监听广告关闭，只能监听一次*/
    private videoAdOnClose: boolean;

    /**bannar广告实例*/
    private bannerAd;

    /**开始游戏界面，用于指向开始游戏界面*/
    private startNode;

    /**开始界面首次音效不播放*/
    private startFirstAudio: number;

    constructor() { super(); }

    onEnable(): void {
        this.initGameScene();
        this.adaptiveRule();
        // 第一个音效加载
        Laya.loader.create('音效/单张发牌.mp3', Laya.Handler.create(this, function () {
            this.createStartGame();
        }));
    }

    /**初始化的一些变量*/
    initGameScene(): void {
        this.self = this.owner as Laya.Scene;
        this.self['Gamecontrol'] = this;//脚本属性化
        this.levels = 0;
        this.levelsNum.value = this.levels.toString();
        this.timer = 0;
        this.timeNum.value = '30s';
        this.timerSwitch = false;
        this.videoAdOnClose = false;
        this.startFirstAudio = 0;
        // 延时加载广告
        this.videoAdLode();
        this.bannerAdLode();
        this.wxPostInit();
    }

    /**初始化视频广告*/
    videoAdLode(): void {
        // 创建激励视频广告实例，提前初始化
        if (Laya.Browser.onMiniGame) {
            this.videoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-6de18c6de7b6d9ab'
            })
            this.videoAd.onLoad(() => {
                console.log('激励视频 广告加载成功')
            })
            this.videoAd.onError(err => {
                console.log(err)
            })
            this.videoAd.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    this.startNode['GameOVer'].vanish('adv');
                    // 关闭bannar广告
                    if (Laya.Browser.onMiniGame) {
                        this.bannerAd.hide();
                    }
                } else {
                    // 显示bannar广告
                    if (Laya.Browser.onMiniGame) {
                        this.bannerAd.show()
                            .then(() => console.log('banner 广告显示'));
                    }
                    // 播放中途退出，不下发游戏奖励
                    console.log('视频没有看望不会开始游戏');
                }
            })
        }
    }

    /**
     * 初始化bannar广告
     */
    bannerAdLode(): void {
        // 创建 Banner 广告实例，提前初始化
        if (Laya.Browser.onMiniGame) {
            this.bannerAd = wx.createBannerAd({
                adUnitId: 'adunit-5329937f4349b0ea',
                adIntervals: 30,
                style: {
                    left: 0,
                    top: 0,
                    width: 750
                }
            })
            this.bannerAd.onLoad(() => {
                console.log('banner 广告加载成功');

            })

            this.bannerAd.onError(err => {
                console.log(err)
            })

            this.bannerAd.show();
        }
    }

    /**自适应规则*/
    adaptiveRule(): void {
        let stageHeight = Laya.stage.height;
        this.self.height = stageHeight;

        this.background.height = stageHeight;
        this.background.x = 0;
        this.background.y = 0;

        let location = stageHeight * 0.132;
        this.levelsNode.y = location;
        this.levelsNode.alpha = 0;

        this.indicateCard.y = location;
        this.indicateCard.alpha = 0;

        this.timeCard.y = location;
        this.timeCard.alpha = 0;


        this.cardParent.y = stageHeight * 0.22;

        this.line.y = (this.cardParent.y + this.indicateCard.y + this.indicateCard.height / 2 + 7) / 2;//在这两个元素的中间位置
        this.line.alpha = 0;
        this.cardAndParentAdaptive();
    }

    /**创建游戏开始界面*/
    createStartGame(): void {
        let startGame = Laya.Pool.getItemByCreateFun('startGame', this.startGame.create, this.startGame) as Laya.Sprite;
        this.self.addChild(startGame);
    }
    /**牌局开始
     * 一种情况是重新开始
     * 一种情况是开始游戏界面进入的开始
     * 一种是看完广告开始游戏
     * 一种是下一关
     * @param type 
     */
    replacementCard(type): void {
        if (type === 'start' || type === 'reStart' || type === 'adv') {
            this.levels = 1;
        } else if (type === 'nextLevel') {
            this.levels++;
        }
        this.timer = -50;//少许延时
        this.otherRotate(type);
    }

    /**
     * 功能节点旋转动画分为4种情况：
     * 一种情况是重新开始游戏，
     * 一种情况是开始游戏界面进入的开始游戏，
     * 一种是看完广告开始游戏，
     * 一种是下一关，
     * @param type 
     */
    otherRotate(type): void {
        let time = 120;
        // 等级卡牌旋转动画
        Animation.cardRotateX_OneFace(this.levelsNode, func => {
            this.levelsNum.value = this.levels.toString();
            PalyAudio.cardRotate(1);
        }, time, 0, func => {
            //提示卡牌旋转动画
            Animation.cardRotateY_OneFace(this.indicateCard, func => this.indicateNumReset(), time, 0,
                func => {
                    PalyAudio.cardRotate(1);
                    this.otherRotateFunc(type, time);
                })
        });
    }

    /**节点变换回调*/
    otherRotateFunc(type, time): void {
        // 如果是下一关，那么时间节点不会旋转
        if (type === 'nextLevel') {
            this.cardCollection();
        } else {
            Animation.cardRotateX_OneFace(this.timeCard, func => {
                PalyAudio.cardRotate(1);
                if (type === 'start' || type === 'reStart') {
                    this.timeNum.value = '30s';
                } else if (type === 'adv') {
                    this.timeNum.value = '40s';
                }
            }, time, 0, func => this.cardCollection());
        }
    }

    /**
     * 变化关卡数对应的数字
    */
    indicateNumReset(): void {
        let num1 = Math.floor(Math.random() * 9) + 1;//保证第一个数字不等于0
        let levels = this.levels;
        let overlen = levels - 1;//剩余长度
        let num: string = num1.toString();
        for (let i = 0; i < overlen; i++) {
            num += Math.floor(Math.random() * 10).toString();//每次增加一个长度
        }
        // 大小缩小
        let scale = 1 - (levels - 2) * 0.04;
        this.indicateNum.scale(scale, scale);
        this.indicateNum.value = num;
        this.changeAnumber();
    }

    /**功能节点的消失动画*/
    otherVanish(): void {
        let time = 200;
        let delayed = 150;
        // 提示卡牌动画
        Animation.fade_out(this.levelsNode, 1, 0, time, delayed * 0, null);
        // 提示卡牌动画
        Animation.fade_out(this.indicateCard, 1, 0, time, delayed * 1, null);
        // 时间节点动画
        Animation.fade_out(this.timeCard, 1, 0, time, delayed * 2, null);
        // 分割线动画
        Animation.fade_out(this.line, 1, 0, time, delayed * 3, null);
    }

    /**功能节点的出现动画*/
    otherAppear(): void {
        let time = 200;
        let delayed = 150;
        // 等级节点动画
        Animation.fade_out(this.levelsNode, 0, 1, time, delayed * 0, null);
        // 提示卡牌动画
        Animation.fade_out(this.indicateCard, 0, 1, time, delayed * 1, null);
        // 时间节点动画
        Animation.fade_out(this.timeCard, 0, 1, time, delayed * 2, null);
        // 分割线动画
        Animation.fade_out(this.line, 0, 1, time, delayed * 3, null);
    }

    /**卡牌的高度*/
    private cardHeight: number;
    /**卡牌之间的间距*/
    private cardSpacingY: number;
    /**卡牌高度和卡牌父节点的适配规则*/
    cardAndParentAdaptive(): void {
        this.cardSpacingY = 10;
        // 通过卡牌父节点位置向下算出卡牌可以存放的空间位置
        let remainingW = this.self.height - this.cardParent.y - this.self.height * 0.05;
        // 单个卡牌可以存放的位置
        let cardSpace = remainingW / 7;
        this.cardHeight = cardSpace - this.cardSpacingY;
    }

    /**构建数字牌集合
     * 卡牌数量根据关卡数来计算，并且如果没有铺满的情况下，集中在卡牌父节点中间；
    */
    cardCollection(): void {
        // 卡牌数量是固定的
        let startX1 = this.cardParent.width / 4;
        let startX2 = this.cardParent.width * 3 / 4;
        let len = 14;//总数
        let noChengeJ = Math.floor(Math.random() * len);//随机一个卡牌数字不变
        let delayed = 10;// 延时变量
        // 从下往上
        let zOrder1 = 100;
        for (let j = len - 1; j >= 0; j--) {
            zOrder1--;
            // 修改数字
            let card: Laya.Sprite;
            if (j === noChengeJ) {
                card = this.createCard('nochange') as Laya.Sprite;
            } else {
                card = this.createCard('change') as Laya.Sprite;
            }
            // 初始属性
            card.y = 1500;
            card.zOrder = Math.floor(Math.random() * 30);
            card.height = this.cardHeight;
            card['DigitalCard'].board.height = this.cardHeight;
            card['DigitalCard'].number.y = this.cardHeight / 2;
            //目标位置
            let tagetY;
            if (j % 2 === 0) {
                card.x = startX1;
                tagetY = j / 2 * (card.height + this.cardSpacingY) + 80;
            } else {
                card.x = startX2;
                tagetY = (j - 1) / 2 * (card.height + this.cardSpacingY) + 80;
            }
            if (j === 0) {
                PalyAudio.groupUp(1);
            }
            // 动画表现
            Animation.go_up(card, 1800, Math.floor(Math.random() * 2) === 1 ? 30 : -30, tagetY, 500, delayed, func => {

                if (j === len - 1) {
                    this.timerSwitch = true;
                    for (let index = 0; index < this.cardParent._children.length; index++) {
                        const card = this.cardParent._children[index];
                        card['DigitalCard'].cardClicksOn();
                    }
                }
            });
            delayed += 50;
        }
    }

    /**
     *成功后清除卡牌前往下一关
    */
    clearAllCard_Next(): void {
        this.clearAllClicks();
        let len = this.cardParent._children.length;
        this.timerSwitch = false;//时间停止
        for (let i = 0; i < len; i++) {
            let card = this.cardParent._children[i] as Laya.Sprite;
            Laya.timer.once(i * 50, this, function () {
                Animation.drop(card, 1800, Math.floor(Math.random() * 2) === 1 ? 30 : -30, 800, 0, func => {
                    if (i === 1) {
                        PalyAudio.groupDrop(1);
                    }
                    // 如果是创建下一关的话，遍历结束就会创建下一关
                    if (i === len - 1) {
                        this.cardParent.removeChildren(0, len - 1);
                        this.replacementCard('nextLevel');
                    }
                });
            })
        }
    }

    /**
     *失败后清除卡牌出现gameover界面
    */
    clearAllCard_Over(): void {
        this.clearAllClicks();
        let len = this.cardParent._children.length;
        this.timerSwitch = false;//时间停止
        for (let i = 0; i < len; i++) {
            let card = this.cardParent._children[i] as Laya.Sprite;
            Laya.timer.once(i * 50, this, func => {
                if (i === 1) {
                    PalyAudio.groupDrop(1);
                }

                if (card['DigitalCard'].number.value === this.indicateNum.value) {
                    card.zOrder = 1000;//层级放在最高位置
                    this.cardRotating(card, i);
                } else {
                    Animation.drop(card, 1800, Math.floor(Math.random() * 2) === 1 ? 30 : -30, 800, 0, null);
                }
            })
        }
    }

    /**自身旋转动画，用于点错后提示正确的那张卡牌
     * 旋转之后下落
     * 动画结束后进行游戏结束界面的创建
    */
    cardRotating(card, i): void {
        let len = this.cardParent._children.length;
        let time = 120;
        Animation.cardRotateY_TowFace(card, ['number'], func => { PalyAudio.cardRotate(2) }, 120, (len - i) * 50 + 500, func => {
            // 下落
            Animation.drop(card, 1800, Math.floor(Math.random() * 2) === 1 ? 30 : -30, 1000, 500, func => {
                this.cardParent.removeChildren(0, len - 1);
                this.createGameOver();
            });
        });
    }



    /**清除卡牌上所有的点击事件*/
    clearAllClicks(): void {
        for (let index = 0; index < this.cardParent._children.length; index++) {
            const card = this.cardParent._children[index];
            card['DigitalCard'].cardClicksOff();
        }
    }

    /**构建单个数字
     * @param type 是否需要修改number值，因为其中有一个等于指示牌的值不可修改
    */
    createCard(type): Laya.Sprite {
        let card = Laya.Pool.getItemByCreateFun('speakBox', this.digitalCard.create, this.digitalCard) as Laya.Sprite;
        this.cardParent.addChild(card);
        if (type === 'change') {
            card['DigitalCard'].number.value = this.changeAnumber();
        } else {
            card['DigitalCard'].number.value = this.indicateNum.value;
        }
        return card;
    }

    /**卡牌数字和提示卡牌一一对应
     * 之后每个卡牌上的数字会随机改变一个*/
    changeAnumber(): string {
        // 把这个字符串放进这个数组
        let arr = [];
        for (let i = 0; i < this.indicateNum.value.length; i++) {
            arr.push(this.indicateNum.value[i]);
        }
        // 随机一个位置，修改掉，必须进行修，第一位暂不做修改
        let random = Math.floor(Math.random() * (arr.length - 1));
        let originalNum = arr[random];
        let randomNum = Math.floor(Math.random() * 10).toString();
        while (originalNum === randomNum) {
            randomNum = Math.floor(Math.random() * 10).toString();
        }
        arr[random] = randomNum;
        let numString: string;
        for (let j = 0; j < arr.length; j++) {
            if (j === 0) {
                numString = arr[j];
            } else {
                numString += arr[j];
            }
        }
        return numString;
    }

    /**创建结算界面*/
    createGameOver(): void {
        let gameOVer = Laya.Pool.getItemByCreateFun('gameOVer', this.gameOVer.create, this.gameOVer) as Laya.Sprite;
        this.self.addChild(gameOVer);
    }

    /**创建排行榜界面*/
    createRanking(): void {
        let ranking = Laya.Pool.getItemByCreateFun('ranking', this.ranking.create, this.ranking) as Laya.Sprite;
        this.self.addChild(ranking);
        // 关闭bannar广告
        if (Laya.Browser.onMiniGame) {
            this.bannerAd.hide();
        }
    }

    /**其他界面的自适应规则*/
    adaptiveOther(self): void {
        self.width = 750;
        self.pivotX = self.width / 2;
        self.pivotY = self.height / 2;
        self.pos(375, Laya.stage.height / 2);
    }

    /**界面内子元素Y轴适配*/
    childAdaptive(child, parent, locationY): void {
        child.y = locationY - (Laya.stage.height / 2 - parent.height / 2);
    }

    /** 微信排行榜初始化*/
    wxPostInit() {
        if (Laya.Browser.onMiniGame) {
            Laya.loader.load(["res/atlas/rank.atlas"], Laya.Handler.create(null, function () {
                //加载完成
                //使用接口将图集透传到子域
                Laya.MiniAdpter.sendAtlasToOpenDataContext("res/atlas/rank.atlas");

                let wx: any = Laya.Browser.window.wx;
                let openDataContext: any = wx.getOpenDataContext();
                openDataContext.postMessage({ action: 'init' });
            }));
        }
    }

    /** 更新微信排行榜的数据*/
    wxPostData() {
        if (Laya.Browser.onMiniGame) {
            let args = {
                type: 'scores', data: { scores: this.levelsNum.value }
            }
            let wx: any = Laya.Browser.window.wx;
            let openDataContext: any = wx.getOpenDataContext();
            openDataContext.postMessage(args);
            console.log('上传了');
        } else {
            console.log('没有上传');
        }
    }

    /**分享*/
    wxShare() {
        if (Laya.Browser.onMiniGame) {
            let wx: any = Laya.Browser.window.wx;
            //下次测试
            wx.shareAppMessage({
                title: '你的数字敏感度及格了吗？',
                imageUrlId: 'CRYATpcgSFGkeB4Hs75jOQ',
                imageUrl: 'https://mmocgame.qpic.cn/wechatgame/9zdKibmXJ3RsmFpXn6UAV4ScT8ulA4wzqUUNicKWDIaODZbuv38lkBBOBQv8XbxOI0/0'
            });
            console.log("主动进行了转发");
        } else {
            console.log("仅支持微信客户端");
        }
    }

    onUpdate(): void {
        // 倒计时
        if (this.timerSwitch) {
            this.timer++;
            if (this.timer % 60 == 0 && this.timer > 0) {
                let timeNum = this.timeNum.value;
                let subNum;
                if (timeNum.length === 3) {
                    subNum = timeNum.substring(0, 2);
                } else if (timeNum.length === 2) {
                    subNum = timeNum.substring(0, 1);
                }
                if (subNum === '0') {
                    this.timerSwitch = false;
                    this.clearAllCard_Over();
                    return;
                }
                this.timeNum.value = (Number(subNum) - 1).toString() + 's';
            }
        }
    }



    onDisable(): void {
    }
}