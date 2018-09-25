import Vue from 'vue';
import App from './components/app.vue';
import store from './store/store';
import router from './routers/router';
import './filter/filter';
new Vue({
    store,
    router: router,
    render: h => h(App)
}).$mount("#app")