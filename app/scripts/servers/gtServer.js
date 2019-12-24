import './../util/gt.js';
import {post} from './httpServer.js';
const GeeTest=function(id,product,width,callback){
   post(url,params).then(res=>{
       if(res.success){
            initGeetest({
                gt: res.data.gt,
                challenge: res.data.challenge,
                offline: !res.data.success,
                new_captcha: res.data.new_captcha,
                success: res.data.success,
                product:product,
                width:width,
                bg_color: 'gray'
            },(captchaObj)=>{
                captchaObj.onReady(()=>{
                    return typeof callback == "function" && callback(captchaObj)
                }).onSuccess(()=>{
                    return typeof callback == "function" && callback(captchaObj)
                })
            })
       }
   })
}
module.exports={
    GeeTest
}