export default {
  //初始化页面交互值
  data(){
    return {
        
    }
  },
  //页面未渲染前执行
  beforeMount () {
    
  },
  //页面交互
  methods:{
    //登录
    login(){
      let params={account:'admin',password:'123456'};
      this.$store.dispatch('loginModule/login',params).then(res=>{
        if(res.result==='success'){
           //登录成功后的操作
        }
      })
    }
  }
}