
(function(){

// 规定好每张图片处于的位置和状态
var states = [
    {ZIndex:1,width:120,height:150,top:69,left:134,opac:0.2},
    {ZIndex:2,width:130,height:170,top:59,left:  0,opac:0.5},
    {ZIndex:3,width:170,height:218,top:36,left:110,opac:0.7},
    {ZIndex:4,width:224,height:288,top: 0,left:263,opac:  1},
    {ZIndex:3,width:170,height:218,top:36,left:470,opac:0.7},
    {ZIndex:2,width:130,height:170,top:59,left:620,opac:0.5},
    {ZIndex:1,width:120,height:150,top:69,left:500,opac:0.2}
];

//将状态和位置赋给li
var lis = $('#box li');

function move(){
    lis.each(function(index,ele){
        var state = states[index];
    //   $(ele).css({
    //       'z-inde':state.ZIndex,
    //        'width':state.width,
    //        'height':state.height
    //     })

        $(ele).css('z-index',state.ZIndex).finish().animate(state,1000).
        find('img').css('opacity',state.opac)
    })
}
move();
// 下一张
function next(){
    states.unshift(states.pop());
    move();
}
$('#box .next').click(function(){
    // 原理：把数组中的最后一个元素移动数组中的第一个
    next()
})
// 上一张
$('#box .prev').click(function(){
    // 原理：把数组中的第一个移动最后一个元素
    states.push(states.shift())
    move();
})

// 自动轮播
var time = null;
function autoPlay(){
    time = setInterval(function(){
        next()
    },2000)
}
autoPlay();

// 停止轮播
$('#box section').add('#box li').hover(function(){
    clearInterval(time)
},function(){
    autoPlay();
})

})()
// 分装为插件，能够使得只要使用这个插件，就能被重复使用的效果，会产生什么样的问题？
// 1.在插件中最好不要使用id，原因插件是为了能够被重复使用，也就是说在一个页面上会
// 重复调用，会造成页面的冲突，并且id具有唯一性的特性。
// 2.变量命名和方法的命名：states、time、move()，用户在使用这个插件的时候，可能
// 还会引入自己创建的文件，也有这样的命名，那么就会产生冲突。
// 3.标签class的值的问题：prev，next。这些class命名太大众化，大多数编写者都会使用
// 这样的命名，势必会造成冲突。
// 4.插件的文件命名问题：index.js，index.css，命名太大众化，比如：jquery.Slide.js


// 变量的作用域问题：
// 1.全局域[window]   2.函数域[function]
// 1.全局域：从页面被打开之后到页面关闭之前始终都是存在的
// 2.函数域：存在函数被调用的一瞬间，

// 闭包作用：可以保留函数的作用域（所以move可以当前自由行函数中的states）
// 闭包产生的条件：函数里面套函数（内层的函数要）

// 全局变量会产生闭包？
// 不会，因为全局变量存在全局域
