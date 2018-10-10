import Vue from 'vue';
import Vuex from 'vuex';
import mainModule from './../modules/mainModule.js'
Vue.use(Vuex);
const state={
    
};
const store = new Vuex.Store({
  state:state,
  modules: mainModule
})
export default store


