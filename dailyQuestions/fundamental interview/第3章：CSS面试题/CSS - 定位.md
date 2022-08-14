absolute 和 relative 分别依据什么定位？
    relative依据自身定位；
    absolute依据最近一层的定位元素定位；
        定位元素：relative/absolute/fixed/body；

居中对齐有哪些实现方式？
    水平居中：
        inline元素：text-align:center；
        block元素：margin:0 auto；
        absolute元素：left:50% + transform:translateX(-50%)/margin-left负值；

    垂直居中：
        inline元素：vertical-align:middle/line-height:height；
        absolute元素：
            top:50% + transform:translateY(-50%)/margin-top负值（须知尺寸）;
            top，left，bottom，right = 0 + margin:auto；
        

        水平垂直居中：
            display:flex；
            justify-content:center；
            align-items:center；

            display:table;
            ...
            

    