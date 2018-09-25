import Vue from 'vue';
import {formDate} from './../util/core';
//日期格式化Date('yyyy年MM月dd日 hh:mm:ss')
Vue.filter('Date',function(value,format){
    return formDate(new Date(value),format);
});
Vue.filter('sexName',function(value){
    if(value==1){
        return '男';
    }else{
        return '女';
    }
})