盒模型宽度计算：
  offsetWidth = （内容宽度 + 内边距 + 边框），无外边距；
  box-sizing设置为border-box时，content = width - border - padding，即此时的offsetWidth = width；
  box-sizing设置为content-box时，content = width - padding；即此时的offsetWidth = width + border；

margin纵向重叠问题：
    相邻元素的margin-top和margin-bottom会发生重叠；
    空白内容的<p></p>也会重叠；

margin负值问题：
    margin-top和margin-left负值，元素向上、向左移动；
    margin-right负值，右侧元素左移，自身不受影响；
    margin-bottom负值，下侧元素上移，自身不受影响；

BFC的理解与应用：
    Block format context，块级格式化上下文；
    一块独立渲染区域，内部元素的渲染不会影响边界以外的元素；

    形成BFC的常见条件：
        float不是none；
        position是absolute或fixed；
        overflow不是visible；
        display是inline-block或flex等；
    
    常见应用：
        清除浮动；

float布局：
    如何实现圣杯布局和双飞翼布局？
        圣杯布局和双飞翼布局的目的：
            三栏布局，中间一栏最先加载和渲染（内容最重要）；
            两侧内容固定，中间内容随着宽度自适应；
            一般用于PC网页；
        技术总结：
            使用float布局；
            两侧使用margin负值，以便和中间内容横向重叠；
            防止中间内容被两侧覆盖，一个用padding一个用margin；

    手写clearfix：
  ```css
        :after {
          content:'';
          display:table;
          clear:both;
        }
  ```

通过flex实现一个三点的色子：
    常用语法回顾：
        （容器）子元素排列方向：flex-direction：row或column；
        （容器）主轴元素排列：just-content：flex-start、flex-end、center、space-between、space-around；
        （容器）交叉轴排列：align-items：flex-start、flex-end、center、baseline、stretch；
        （容器）换行：flex-wrap：nowrap或wrap；
        （元素）子元素排列：align-self：flex-start、flex-end、center、baseline、stretch；
