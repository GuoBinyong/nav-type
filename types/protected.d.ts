

interface History {

    //配置属性：开始




    /**
     * popstate事件的监听器
     */
    readonly _popstateEventListener: (evt: Event) => void;


    //配置属性：结束




    //解析导航：开始


    /**
     * 解析go的导航
     * @param nav : Nav     新的导航对象
     *
     * 注意：
     * 在navList中的导航元素小于2时（一般发生在初始时，比如重新加载了页面），用前进后退按钮是无法判断方向的，此时默认用返回的处理逻辑；但如果监测到 history.length 发生变化，便可判断之前的移动方法；而 history.length 只会发生在 pushState 和 replaceState 时
     */
    _parseNavOfGo(nav: NavObject): void





    /**
     * 用 跳转的步数 stepNum 来校验、纠正、配置当前 navList
     * @param stepNum : number   跳转的步数
     */
    _parseNavOfGoWithStepNumber(nav: NavObject, stepNum: number): void;




    /**
     * 在没有参考数据的情况下激活 nav
     * 注意：
     * 在navList中的导航元素少于2个时（一般发生在初始时，比如重新加载了页面），用前进后退按钮是无法判断方向的，此时默认用返回的处理逻辑；
     */
    _parseNavOfGoWithout(nav: NavObject): void;





    /**
     * 解析push导航
     * @param nav : Nav  导航位置
     */
    _parseNavOfPush(nav: NavObject): void;


    /**
     * 将当前的位置替换为 指定的 nav
     * @param nav : Nav  导航位置
     */
    _parseNavOfReplace(nav: NavObject): void




    /**
     * 配置相关数据:navInfo、存储navList、清空临时数据
     */
    _configNavData(): void;


    //解析导航：结束









    //监听事件：开始


    /**
     * 监听 popstate
     */
    _listenPopstate(): void;



    /**
     * 移除当前 history 监听 popstate 事件的监听器
     */
    _removePopstateListener(): void;




    //监听事件：结束


}




/**
 * 获取 this 值，本方法确定获取的this值一定是 History 的实例
 * @param History
 */
declare function getThisOfHistory(thisValue: any): History;




//替换原来的方法：开始


/**
 *创建 back 函数
 * @author 郭斌勇
 */
declare function createBack(oriBack: typeof History.prototype.back): typeof History.prototype.back;



/**
 *创建 forward 函数
 * @author 郭斌勇
 */
declare function createForward(oriForward: typeof History.prototype.forward): typeof History.prototype.forward;


/**
 *创建 go 函数
 * @author 郭斌勇
 */
declare function createGo(oriGo: typeof History.prototype.go): typeof History.prototype.go;



/**
 *创建 pushState 函数
 * @author 郭斌勇
 */

declare function createPushState(oriPushState: typeof History.prototype.pushState): typeof History.prototype.pushState;


/**
 *创建 replaceState 函数
 * @author 郭斌勇
 */
declare function createReplaceState(oriReplaceState: typeof History.prototype.replaceState): typeof History.prototype.replaceState;


/**
 *替换 History 实例的原生方法，会替换以下方法：back、、forward、go、pushState、replaceState
 *
 * @author 郭斌勇
 * @param {History} historyInst
 */
declare function replaceNativeMethodOf(historyInst: History): void;


/**
 * 为了防止 webview 外壳（加过webview的应用程序，如：打开生活号的支付宝、打开公众号的微信、包壳的应用app等）对 webview 中的 history 实例的改造影响到 本工具实现的 导航工能
 * 需要 单独对 webview 默认创建的 History 实例 history 单独进行下方式替换；
 *
 * 又因为在进行方法替换时，会选获取替换对象的原方法
 * 所以，如果 先对 History.prototype 进行替换，则，当再对 history 进行替换时，在获取原方法时 有可能会获取到 History.prototype 中已被替换后的方法，这就会使得 webview 外壳 对 history 改变的 方法丢失；
 * 所以，需要 先对 history 方法进行替换，然后再对 History.prototype 方法进行替换；
 */

// replaceNativeMethodOf(history);
// replaceNativeMethodOf(History.prototype);

