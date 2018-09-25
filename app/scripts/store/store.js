import Vue from 'vue';
import Vuex from 'vuex';
import modules from './../components/modules'
Vue.use(Vuex);
const state={
    
};
const store = new Vuex.Store({
  state:state,
  modules: modules
})
export default store


