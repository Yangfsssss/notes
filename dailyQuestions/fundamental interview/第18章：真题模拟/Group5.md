如何阻止事件冒泡和默认行为？
    阻止冒泡：e.stopPropagation();
    阻止默认行为：e.preventDefault();

查找、添加、删除、移动DOM节点的方法？
    查找：document.getElementById('xxx')等；
    添加：element.appendChild(newElement)等;
    删除：element.removeChild(oldElement);
    移动：p && element.appendChild(p);

如何减少DOM操作？
    缓存DOM查询结果；
    多次DOM操作，合并到一次插入；
    document.createDocumentFragment();