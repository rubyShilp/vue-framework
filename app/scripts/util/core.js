import md5 from 'md5';
import qs from 'qs';
import router from './../routers/router';
//判断对象是否为json格式
export function isJson(obj){
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;  
    return isjson;
}
//参数序列化
export function urlParams(params){
    return qs.stringify(params);
}
//提示信息
export function tripBox(options){
    var defaults = {
        texts: "默认2秒后自动关闭",
        speed: 300,
        speedend: 2000
    };
    var options = $.extend(defaults, options);
    if ($("#layerTips").is(":hidden") || $("#layerTips").length == 0) {
        if ($("#layerTips").length == 0) {
            var confirmHtml = "<div id=\"layerTips\"><div class=\"layerTipsBox\">" + options.texts + "</div></div>";
            $("body").append(confirmHtml);
        } else {
            $("#layerTips").html("<div class=\"layerTipsBox\">" + options.texts + "</div>");
            $("#layerTips").fadeIn(options.speed);
        }
        setTimeout(function () {
            $("#layerTips").fadeOut(options.speed);
        }, options.speedend);
    }
}
//密码加密
export function encryption(password){
    return md5(password);
}
//session超时自动调回登录界面
export function sessionOut(){
    setTimeout(function() {
        router.push({path:'/login'});
    }, 2000);
}
//验证码倒数计时
export function restTime(id){
    var resetbtn = document.getElementById(id),
				count  = 30,iTimer=0,
				ibtn   = true;
			if(ibtn){
				ibtn = false;
				clearInterval(iTimer);
               // resetbtn.disabled=true;
               $('#'+id).attr("disabled","true");
               iTimer=setInterval(function(){
                        if(count == 1){
                            resetbtn.innerHTML = "重新发送";
                            clearInterval(iTimer);
                            ibtn = true;
                            $('#'+id).removeAttr("disabled");
                            return false;
                        }
                    resetbtn.innerHTML = "发送("+--count + ')';
               }.bind(this),1000)
			}
}
//数据是否存在
export function messageEcho(oldValue,newValue){
    for(let i=0;i<oldValue.length;i++){
        if(oldValue[i].contactName===newValue.contactName && oldValue[i].contactAccount===newValue.contactAccount){
            return true;
        }
    }
    return false;
}
//计算时间差相隔天数
export function surplusDay(startData,endDtata){
    return (new Date(endDtata).getTime()-new Date(startData).getTime())/(24 * 60 * 60 * 1000);
}
//计算时间差 耗时
export function timeConsuming(startData,endDtata){
    let dateTime = new Date(endDtata).getTime()-new Date(startData).getTime();
    let hour = new Date(dateTime).getHours();
    let minutes = new Date(dateTime).getMinutes();
    return hour+"时"+minutes+"分钟";
}
//日期格式化
export function formDate(date,format){
    var args = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
}
//获取token值
export function token(){
    return sessionStorage.getItem('TOKEN');
}
//下载文件
export function dowandFile(res,fileName){
    var blob = new Blob([res]);
    if('download' in document.createElement('a')){
        var a = window.document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }else{
        navigator.msSaveBlob(blob, fileName)
    }
}