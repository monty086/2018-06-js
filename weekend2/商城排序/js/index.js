// 1.获取元素
let header = document.getElementById('header');
let button = header.getElementsByTagName('a');//三个按钮
let ul = document.getElementById('shopList');
let data = null;

// 2. 通过ajax获取到它的数据
let xhr = new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange =function () {
    if(xhr.readyState==4&&xhr.status==200){
        data = JSON.parse(xhr.responseText)
    }
}
xhr.send();

// 3. 绑定数据
function bindHTML (){
    let str = '';
    data.forEach(function (item,index) {
        str+=`<li>
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <p class="hot">热度:${item.hot}</p>
                <del>$9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </li>`
    })
    ul.innerHTML = str
}
bindHTML();
// 4. 给商品进行排序

for (let i = 0; i < button.length; i++) {
    button[i].flg = -1;// 1 -1 1 -1
    button[i].onclick =function () {
        this.flg *= -1;
        let val = this.getAttribute('attrName')
        //sort排序
        sort.call(this,val)
    }
}
function sort(value) {
    var _this = this;
    // 如果形参value是time的时候，我们就需要通过转化成时间戳来排序；否则我们按照正常的sort排序即可
    if(value == 'time'){
        data.sort(function (a,b) {
            return (new Date(a.time)-new Date(b.time))*_this.flg
            // this一开始是window ，
        })
    }else{
        data.sort(function (a,b) {
            return (a[value]-b[value])*_this.flg
        })
    }
    bindHTML()
}


