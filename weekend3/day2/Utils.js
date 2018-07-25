let utils = (function () {
    // 获取可视窗口的高度和宽度
    function win(attr,value) {
        if(value==undefined){
            return document.documentElement[attr]||document.body[attr]
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }
    // 获取到body的偏移量
    function offset(ele) {
        let L = ele.offsetLeft;
        let T = ele.offsetTop;
        let parent = ele.offsetParent;
        while(parent){
            L+=parent.clientLeft;
            T+=parent.clientTop;
            L+=parent.offsetLeft;
            T+=parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {left:L,top:T}
    }
    // getCss
    // 获取元素上的样式
    function getCss(ele,attr) {
        // 通过getComputedStyle获取浏览器计算成功后的样式
        var val = window.getComputedStyle(ele)[attr];// val=>'100px'
        // 对属性进行校验 val '12px' 'red'  '0.5' '100%'
        var reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|rem|em|pt)?$/gi;
        if(reg.test(val)){
            // '12px' '0.5' '1.5rem'
            return  parseFloat(val)
        }
        return val //'red'
    }
    // getCss(box,'width')
    // getCss(box,'background')

    // setCss
    // 给一个元素设置一个样式 box.style.width = 100

    function setCss(ele,attr,value) {
        // 对属性进行校验
        // width height margin\padding\ {left\right\top\bottom}
        // fontSize
        // position 下面的 {left\right\top\bottom}
        var reg = /^(width|height|fontSize)|(margin|padding)?(left|right|top|bottom)?$/ig;
        // 正则就是校验属性是否可以设置的数值的属性
        if(reg.test(attr)){
            // 判断传入的值是否带有px像素单位，如果带有，不处理，如果没带有，则需要加‘px’像素单位
            /px/.test(value)?null:value+='px'
        }
        //value+='px'// '100px';
        ele.style[attr]=value // box.style.width = 100 // '100px'
        // 将value变成字符串 ‘100px’
    }
    /*setCss(box,width,100);
    setCss(box,width,'100px');
    setCss(box,'background','red');
    setCss(box,opacity,0.5);*/
    // setGroupCss
    // 批量给元素设置样式：传一个对象
    function setGroupCss(ele,obj){
        // ele.style.attr = value
        if(Object.prototype.toString.call(obj) === '[object Object]'){
            for(let key in obj){
                setCss(ele,key,obj[key])
            }
        }
    }
    /*let obj = {width:'100px',background:'red',color:'green'};
    setGroupCss(box,obj)
    setGroupCss(box,1)*/
    //... 剩余运算符 扩展运算符 展开运算符
    /*let [a,...b] = [1,2,3,4];
    console.log(a, b);//b=>[2,3,4]
    function fn(a,b,...c){
        console.log(a, b, c);//2,3,4
    }
    fn(...b);
    fn(12,3,4,5);*/
    function css (...arg){// 将形参聚到一起，变成一个数组集合
        // 如果形参传了3个值话，就是设置元素
        if(arg.length===3){
            setCss(...arg) // 我们将形参拿到的值，通过...展开运算符，将其展开依次传入setCss中
        }else if(arg.length===2){
            if(arg[1] instanceof Object){
                setGroupCss(...arg)
            }else{
                return getCss(...arg)
            }
        }
    }

    //类数组转数组
    // [].slice.call(arguments)
    // arguments.__proto__ = Array.prototype;
    // [].push()
    //[...arguments]


    // a 和 b 的值进行交换
    //let c = null;
    /*c = a ;  a = a+b
      a = b ;  b = a-b
      b = c ;  a = a-b*/
    // let [a,b] = [b,a] ;
    // 获取 n 到 m 随机整数 n<m
    function getRandom(n,m) {
        n = Number(n);
        m = Number(m);
        if(!isNaN(n)&&!isNaN(m)){
            if(n>m){[n,m]=[m,n]};
            return Math.round(Math.random()*(m-n)+n)
        }
    }
    getRandom('1','a');

    return {
        win,
        offset,
        getCss,
        setCss,
        setGroupCss,
        css,
        getRandom,
    }
})()