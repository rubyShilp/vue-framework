import {post} from './../../servers/httpServer.js';
const state={
    name:'hello',
};
const mutations={
  NAME(state,val){
    state.name=val;
  }
}
const actions={
  login: async({commit},user)=>{
    let result=await post('/simulated-login',user);
    return result.data;
  },
  //查询业务模型
  businessQuery:async({},params)=>{
    let result=await post('/evidence/business-model/list',params);
    return result.data;
  },
};
const loginModule={
  namespaced:true,
  state:state,
  mutations:mutations,
  actions:actions
};
export default loginModule;