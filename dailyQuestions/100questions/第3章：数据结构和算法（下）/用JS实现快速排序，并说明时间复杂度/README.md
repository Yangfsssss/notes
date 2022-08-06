找到中间位置midValue（无序数组哪个位置的值都一样）；
遍历数组，小于midValue放在left，否则放在right；
继续递归。最后concat拼接，返回；

细节：获取midValue的两种方式
    使用splice，会修改原数组；
    使用slice，不会修改原数组 --- 更加推荐；

时间复杂度：
    有遍历，有二分 --- O(n*logn)或者O(nlogn)；
    （常规排序，嵌套循环，复杂度是O(n^2)）；

splice和slice没有从性能上区分出来：
    算法本身的时间复杂度就够高O(n*logn)；
    外加，splice是逐步二分之后执行的，二分会快速削减数量级；
    如果单独比较splice和slice，效果会非常明显；

划重点：
    常见排序算法；
    有二分，时间复杂度就包含O(logn)；
    注意数组操作：splice和slice；

