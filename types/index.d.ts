


type NavFilterTest = (this: History, currentValue: NavObject, index: number, arr: NavObject[]) => any





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



    //配置属性：结束










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






