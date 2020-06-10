import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'


Vue.config.productionTip = false;
Vue.use(VueAxios, axios)

import App from "./App.vue";
import router from './router'




new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
