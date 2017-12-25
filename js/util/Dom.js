/**
 * Created by zhangxiaohu on 2017/5/2.
 */
function getElementsByClassName(strClass) {
    if(document.getElementsByClassName){
        return document.getElementsByClassName(strClass);
    }
    strClass=strClass.replace(/^ +| +$/g,"");
    var aClass=strClass.split(/ +/);
    var eles=document.getElementsByTagName("*");
    for(var i=0;i<aClass.length;i++){
        var a=[]
        var reg=new RegExp("(^| )"+aClass[i]+"( |$)");
        for(var j=0;j<eles.length;j++){
            var ele=eles[j];
            if(reg.test(ele.className)){
                a.push(ele);
            }
        }
        eles=a;
    }
    return eles;
}
if(typeof window !== 'undefined'){
    try{
        window.console = window.console || (function(){
            var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
                = c.clear = c.exception = c.trace = c.assert = function(){};
            return c;
        })();
    }catch(e){
        
    }
    
}

module.exports =  {
    getElementsByClassName
};