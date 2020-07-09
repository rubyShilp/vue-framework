import { mapState } from 'vuex';
import vueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import line from './line.js';
export default {
  //初始化页面交互值
  data(){
    return {
        querySerch:{name:'战三',fuzzyFields:'',pageSize:10,pageNo:1},
        list:new Array(),
        businessCount:0,
        dateTime:1,
        selectName:'',//发起人
        isApproval:false,
        dropList:[1,2,3,4],
        approverList:new Array(),//审批人数据集
    }
  },
  components:{
    'vue-draggable-resizable':vueDraggableResizable,
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
  mounted(){
    let options={
      title:'直线图',
      type:'bar',
      data:['销量'],
      xData:['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      name:'销量'
    }
    line(this.$refs.chart,options);
    line(this.$refs.ddd,options);
  },
  //页面交互
  methods:{
    //登录
    login(){
      GeeTest('#captcha','float','100%').then(res=>{
         
      })
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
      this.$store.dispatch('loginModule/businessQuery',{}).then(res=>{
        if(res.result==='success'){
          this.list=res.data.list;
          this.businessCount=res.data.totalCount;
        }
      })
    },
    //添加审批人
    addApprover(type){
      this.selectName='';
      this.isApproval=true;
      setTimeout(()=>{
        let em=document.getElementsByClassName('approval_form')[0];
        if(type===1){
          em.style.right='0px';
        }else{
          em.style.right='-800px';
          this.isApproval=false;
        }
      },0);
    },
    //确定选择
    approverSure(){
      this.approverList.push({
        name:this.selectName
      })
      this.addApprover(2)
    },
    selectClick(value){
      console.log(value);
    },
    tagClose(index){
      this.approverList.splice(index,1);
    }
  }
}