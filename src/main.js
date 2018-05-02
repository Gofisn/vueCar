// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
	error:'./static/img/error.png',
	loading:'./static/img/loading.png'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  data:{
  	eventHub:new Vue(),
  }
})
router.push('/home')