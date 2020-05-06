type NavType = "back" | "forward" | "push" | "replace" | "load" | "unknown"



interface NavObject {
    url: string;   //本次导航的url位置
    state?: any;   //描述本次导航的state
    title?: string;   //描述本次导航的设置的title，与民pushState 和 replaceState 方法中的 title 相同
    name?: string;   //本次导航的名字
}


interface NavInfo extends NavObject {
    type: string;   //描述本次导航的类型， 该属性可能的值由 navTypeMap 常量定义
    index: number;   //本次导航位置在navList中的索引
    arguments?: any[];   //描述本次导航的参数
}


interface History {

    //配置属性：开始

    /**
     * navList : Array<NavObject>   导航栈
     *
     * NavObject = {url:string ,state:any,title:string,name:string}     导航对象
     *
     * navObject.url : string   本次导航的url位置
     * navObject.state ? : any   描述本次导航的state
     * navObject.title ? : string   描述本次导航的设置的title，与民pushState 和 replaceState 方法中的 title 相同
     * navObject.name ? : string   本次导航的名字
     */
    readonly navList: NavObject[]



    /**
     * maxNavIndex : number   当前最大的导航索引 navIndex
     */
    readonly maxNavIndex: number;


    /**
     * currNavIndex : number    当前的慎用索引 ；
     */
    currNavIndex: number




    /**
     * navType : string  navType的成员； 当前页面的导航类型，即：页面是怎么到这的；
     * 当 给 navType 设置为 null 时，将自动根据 currNavIndex 和 oldNavIndex 来计算，
     */
    navType: NavType;


    /**
     * oldLength : number   表示上一次 length 的长度
     */
    oldLength: number;



    /**
     * navInfo : {type : string,index : number,url : string,state ? : any,title ? : string,name ? : string,arguments ? : Arguments || Array}      获取导航信息
     *
     * navInfo.type : string   描述本次导航的类型， 该属性可能的值由 navTypeMap 常量定义
     * navInfo.index : number   本次导航位置在navList中的索引
     * navInfo.url : string   本次导航的url位置
     * navInfo.state ? : any   描述本次导航的state
     * navInfo.title ? : string   描述本次导航的设置的title，与民pushState 和 replaceState 方法中的 title 相同
     * navInfo.name ? : string   本次导航的名字
     * navInfo.arguments ? : Arguments || Array   描述本次导航的参数
     */
    navInfo: NavInfo;




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






    //工具方法：开始

    /**
     * 根据 isSubsetOf 和 isEqual 来查找 navList 中所有匹配 nav 的索引
     * @param nav : Nav  导航对象
     * @returns [Index]   所有匹配的索引
     */
    matchedIndexs(nav: NavObject): number[];









    /**
     * 把根据 filterTest 过滤出的导航索引 按照距离目标从近到远的顺序排序，并返回
     * @param filterTest : (currentValue,index,arr)=>boolean    用来测试数组的每个元素的函数。调用时使用参数 (currentValue,index,arr)。返回true表示保留该元素（通过测试），false则不保留
     * @param targetIndex ? : number   可选；默认值：当前的索引 ；
     * @returns [Index]    返回按照距离 targetIndex 从近到远排序后的索引数组
     */
    navIndexDistanceSort(filterTest: NavFilterTest, targetIndex?: number): number[];






    /**
     * 找出过滤出的距离 targetIndex 最近的导航的索引；
     * @param filterTest : (currentValue,index,arr)=>boolean    用来测试数组的每个元素的函数。调用时使用参数 (currentValue,index,arr)。返回true表示保留该元素（通过测试），false则不保留
     * @param targetIndex ? : number   可选；默认值：当前的索引 ；
     * @returns Index    返回过滤出的距离 targetIndex 最近的导航的索引；
     */
    nearestNavIndex(filterTest: NavFilterTest, targetIndex?: number): number;






    /**
     * 找出过滤出的距离 targetIndex 最远的导航的索引；
     * @param filterTest : (currentValue,index,arr)=>boolean    用来测试数组的每个元素的函数。调用时使用参数 (currentValue,index,arr)。返回true表示保留该元素（通过测试），false则不保留
     * @param targetIndex ? : number   可选；默认值：当前的索引 ；
     * @returns Index    返回过滤出的距离 targetIndex 最远的导航的索引；
     */
    farthestNavIndex(filterTest: NavFilterTest, targetIndex?: number): number;





    /**
     * 往 navList 的头部追加nav
     * @param nav : Nav
     */
    navListUnshift(...navs: NavObject[]): void;





    /**
     * 往 navList 的尾部追加nav
     * @param nav : Nav
     */
    navListPush(...navs: NavObject[]): void;





    /**
     * 给 navList 指定的 索引处设置 新的 nav 对象
     * @param index
     * @param nav
     */
    navListSetNav(index: number, nav: NavObject): void;







    /**
     * 给 navList 指定的 索引处设置 新的 nav 对象
     * @param index
     */
    activateNavIndex(index: number): void;




    /**
     * 反转 navList
     */
    navListReverse(): void;





    /**
     * 获取可前进 或者 后退的最大步数
     * @param back ? : boolean    可选；默认值：false ; 前进 ；
     */
    maxGoStepNumber(back?: boolean): number;





    /**
     * 判断前进 或者 后退的步数是否是无效的
     */
    isInvalidForGoStepNumber(stepNumber: number): boolean;






    /**
     * 获取前进 或者 后退的有效步数
     */
    getValidGoStepNumber(stepNumber: number): number;


    //工具方法：结束









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




    // 初始化和销毁：开始

    /**
     * 初始化导航
     */
    initNav(): void;



    /**
     * 销毁导航
     */
    destroyNav(): void;




    // 初始化和销毁：结束



}



type NavFilterTest = (this: History, currentValue: NavObject, index: number, arr: NavObject[]) => any






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
