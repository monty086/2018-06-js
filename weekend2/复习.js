Function.prototype.call =function(obj,...arg){
    console.log(this); //f
    arg// [1,2,3]
    if(obj == undefined){
        this(...arg)//this(1,2,3)
    }else{
        obj.__proto__.fn = this // f
        obj.fn(...arg);
        delete obj.__proto__.fn
    }
}

function f() {
    console.log(this);
}
f.call(null,1,2,3)
f.call({},1,2,3)
