import Vue from 'vue'
import App from './App.vue'
import KBRegister from './plugin'

Vue.config.productionTip = false
Vue.use(KBRegister)

new Vue({
  render: h => h(App)
}).$mount('#app')
