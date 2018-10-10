import { mapState } from 'vuex';
export default {
  //初始化页面交互值
  data(){
    return {
        querySerch:{name:'战三',fuzzyFields:'',pageSize:10,pageNo:1},
        list:new Array(),
        businessCount:0,
        dateTime:1
    }
  },
  //页面未渲染前执行
  beforeMount () {
    //this.login();
  },
  computed:{
    ...mapState({
       userName:state=>state.loginModule.name
    })
  },
  mounted () {
    
  },
  //页面交互
  methods:{
    //登录
    login(){
      let params={account:'swaiwai@163.com',password:'qwer1234'};
      this.$store.dispatch('loginModule/login',params).then(res=>{
        if(res.result==='success'){
          sessionStorage.setItem('TOKEN', res.data.token);
          this.$store.commit('loginModule/NAME',res.data);
          this.userQuery(1);
        }
      })
    },
    userQuery(currentPage){
      this.querySerch.pageNo=currentPage;
      this.$store.dispatch('loginModule/businessQuery',this.querySerch).then(res=>{
        if(res.result==='success'){
          this.list=res.data.list;
          this.businessCount=res.data.totalCount;
        }
      })
    }
  }
}