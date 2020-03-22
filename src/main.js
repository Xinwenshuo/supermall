import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import FastClick from 'fastclick'
import toast from './components/common/toast'
Vue.use(toast)
import Vant from "vant";
import "vant/lib/index.css";

import { Lazyload } from "vant";
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue();
Vue.use(Vant)
// 解决移动端300ms延迟
FastClick.attach(document.body)
Vue.use(Lazyload, {
  // 未加载的占位图片
  loading: require("./assets/img/common/placeholder.png")
});
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
