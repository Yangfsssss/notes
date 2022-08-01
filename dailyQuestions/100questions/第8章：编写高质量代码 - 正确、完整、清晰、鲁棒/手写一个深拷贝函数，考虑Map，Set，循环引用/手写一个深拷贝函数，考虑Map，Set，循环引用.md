使用JSON.stringify()和JSON.parse()：
    无法转换函数；
    无法转换Map/Set；
    无法转换循环引用；

    在保证数据结构足够简单的情况下，可以使用JSON.stringify()和JSON.parse()；

答案：
    考虑Object/Array/Map/Set；
    考虑循环引用；

划重点：
    功能完整性：考虑多种数据结构；
    鲁棒性：考虑循环引用；
    （有时面试官不给你要求，你能否想到这几点？）

    正则/Error/Math等还没有覆盖到；