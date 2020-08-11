import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import jquery from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import router from './router'
import { ValidationObserver, ValidationProvider, configure, localize, extend } from 'vee-validate' // 驗證套件
import * as rules from 'vee-validate/dist/rules'
import zhTW from 'vee-validate/dist/locale/zh_TW.json' // 語系檔案
import './bus'
// 載入vee全部的rules和錯誤提示
// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
}) // 所有驗證規則
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
localize('tw', zhTW)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)
window.$ = jquery
Vue.filter('money', function (num) {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return '$' + parts.join('.')
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
