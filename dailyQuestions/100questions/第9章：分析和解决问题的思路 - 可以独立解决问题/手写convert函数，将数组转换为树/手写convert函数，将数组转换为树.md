思路：
    遍历数组；
    对每个元素生成TreeNode；
    找到parentNode，并加入它的children；

    如何找到parentNode：
        遍历数组去查找，太慢；
        可用一个Map来维护关系，便于查找；

扩展：
    数组，像是关系型数据库，如MySQL；
    树，像是文档型数据库，如Mongodb；

连环问：将树转换为数组
    遍历数节点（广度优先）；
    将树节点转换为Array Item，push到数组；
    根据父子关系，找到Array Item的parentId；

    如何找到parentId：
        遍历数组去查找，太慢；
        可用一个Map来维护关系，便于查找；

    划重点：使用广度优先遍历；
