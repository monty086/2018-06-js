// 1.获取元素
let box = document.getElementById('box');
let uls = box.getElementsByTagName('ul');
let imgs = document.getElementsByTagName('img');
uls = [...uls];
let bodyH = null;
// 2. 循环ul
function bind(n){
    // n就是添加20个图片【li】;
    for (var i=0;i<n;i++){
        // 对uls这个集合进行sort，根据每一个ul的高度进行排序；
        uls.sort(function (a,b) {
          return utils.css(a,'height')-utils.css(b,'height');
        });
        // 给 uls集合中的高度最小的ul进行添加li标签
        uls[0].innerHTML+=`<li style="height:${utils.getRandom(280,350)}px">
                <img src="" photo="img/${utils.getRandom(1,27)}.jpg" alt="">
                <a href="javascript:;">点击查看详情</a>
            </li>`;
        // 给最短的ul记录一下高度
        bodyH = uls[1].offsetHeight;
    }
}
bind(20);
// 滑动滚动条的时候执行fn函数
fn();
window.onscroll = fn;

function fn() {
    // 实时记录窗口的卷上去的高度
    let winScroll = utils.win('scrollTop');
    //  窗口的实际高度
    let winH = utils.win('clientHeight');
    //  当浏览器卷上去的高度+浏览器实际窗口的高度>整个ul高度的时候，让再重新加载20个li
    if(winScroll+winH>bodyH){
        bind(20);
    }
    // 循环所有的图片,让所有的图片进行加载
    for(var i=0;i<imgs.length;i++){
        // 再函数中让所有的图片进行加载
        lazyImg(imgs[i])
    }
};
function lazyImg(ele) {
    // 浏览器滚动高度
    let winScroll = utils.win('scrollTop');
    // 浏览器自身的高度
    let winH = utils.win('clientHeight');
    // 图片的高度
    let imgH = utils.css(ele,'height');
    // 图片距离body的上偏移量
    let imgT = utils.offset(ele).top;
    // 浏览器滚动的高度+浏览器自身的高度> 图片的高度+图片距离body的上偏移量
    if(winScroll+winH>imgH+imgT){
        // 声明一个新的图片
        let newImg = new Image();
        // 获取图片元素上的属性photo
        let url = ele.getAttribute('photo');
        // 给新的图片赋值src
        newImg.src = url;
        // 当这个新的图片进行试加载的时候，执行这个函数
        newImg.onload = function () {
            // 成功：证明图片地址没问题，给图片地址给真实的ele元素
            ele.src = this.src;
        }
    }
}
