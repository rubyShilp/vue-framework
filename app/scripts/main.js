import Vue from 'vue';
import App from './components/app.vue';
import store from './store/store';
import router from './routers/router';
import fadadaUI from 'fadada-ui';
import 'fadada-ui/lib/main.css';
import './filter/filter';
Vue.use(fadadaUI);
new Vue({
    store,
    router: router,
    render: h => h(App)
}).$mount("#app")