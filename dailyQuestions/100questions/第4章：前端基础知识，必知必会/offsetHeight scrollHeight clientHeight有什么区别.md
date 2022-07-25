同offsetWidth/scrollWidth/clientWidth

盒子模型：width/height/padding/margin/border/box-sizing  
    box-sizing的值决定content的计算方法：
    当box-sizing为border-box时，content计算规则为(width - padding * 2 - border * 2) * (height - padding * 2 - border * 2)。
    当box-sizing为content-box时，content计算规则为width * height

offsetWidth/offsetHeight = border + padding + content
clientWidth/clientHeight = padding + content
scrollWidth/clientHeight = padding + 内容实际尺寸

scrollTop/scrollLeft:由于滚动被隐藏内容的高度/宽度。