// 1 获取元素
let header  = document.getElementById('header');
let buttons = header.getElementsByTagName('a');
let ul = document.getElementById('shopList');
let data = null;

// 2. 通过ajax请求我们要操作的数组
// 创建ajax对象
let xhr = new XMLHttpRequest();
// 开启一个地址
xhr.open('get','data/product.json',false);
// 监听状态
xhr.onreadystatechange = function () {
    if(xhr.readyState==4&& xhr.status==200){
        data = JSON.parse(xhr.responseText)
    }
}
// 发送请求
xhr.send();
// console.log(data)

// 3. 将数据绑定到页面当中
function bindHTML() {
    let str = ``;
    // 利用字符串拼接的方式，将标签放入到ul当中，dom检测到有标签添加后，会进行渲染，回流
    data.forEach(function (item,index) {
        str+= `<li>
                <img src=${item.img} alt="">
                <p>${item.title}</p>
                <p class="hot">热度:${item.hot}</p>
                <del>$9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </li>`
    });
    ul.innerHTML=str
}
bindHTML()

// 开始排序
for (var i = 0; i < buttons.length; i++) {
    // 给每个a标签添加一个自定义属性flg每次点击让这个flg都进行变换正负
    buttons[i].flg = -1; // flg 1  -1
    buttons[i].onclick = function () {
        this.flg *= -1; //this.flg =1  -1
        // flg=1 升序  flg=-1  降序
        // 通过getAttribute获取该元素的行内样式属性
        let value = this.getAttribute('attrName');//价格=>price
        // 通过call方法改变函数中的this
        sort.call(this,value)
        arrowColor.call(this);
        clearArrow.call(this);
    }
}
function sort(value) {
    if(value=='time'){
        // 通过bind改变sort函数中的this
        data.sort(function (a,b) {
            return (new Date(a[value])-new Date(b[value]))*this.flg
        }.bind(this))
    }else{
        data.sort(function (a,b) {
            return (a[value] - b[value])*this.flg
        }.bind(this))
    }
    // 最后重新在进行回流渲染
    bindHTML()
}

// 5. 让箭头的颜色根据排序进行变化
function arrowColor (){
    console.log(this);// 当前点击元素
    console.log(this.flg);// 1 升序 -1 降序
    // 拿到上下箭头的两个元素对象
    let up = this.children[0]; // 第一个元素子节点
    let down = this.children[1]; // 第二个元素子节点
    if(this.flg>0){
        // 升序
        up.classList.add('bg');
        // 需要将降序元素清除bg类名
        down.classList.remove('bg')
    }else{
        // 降序
        down.classList.add('bg');
        // 升序也需要清除
        up.classList.remove('bg')
    }
}
// 6.清除箭头，将点击那一项以外的箭头全部清除。
function clearArrow() {
    console.log(this); // 点击的那个元素
    // 遍历所有的箭头，将自己点击的那一项其余的全部清除
    for (let i = 0; i < buttons.length ; i++) {
       if(buttons[i] != this) {
           //buttons[i] // 除了自己点击的a标签以外的那两个
          buttons[i].children[0].classList.remove('bg')
          // 找到a标签下面的 两个 i标签，将它身上的 bg类名清除
          buttons[i].children[1].classList.remove('bg');
          // 为了用户体验好，我需要让当前点击的a标签以外的按钮，都按照升序的方式进行排序
          buttons[i].flg = -1
       }
    }
}


