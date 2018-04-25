import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import home from '@/components/home/home.vue'
import select from '@/components/select/select.vue'
import carFriends from '@/components/carFriends/carFriends.vue'
import smallVideo from '@/components/smallVideo/smallVideo.vue'
import ranking from '@/components/ranking/ranking.vue'
import service from '@/components/service/service.vue'
import word from '@/components/word/word.vue'
import video from '@/components/video/video.vue'

Vue.prototype.$http = axios
Vue.use(Router, axios)

export default new Router({
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'home',
    component: home
  }, {
    path: '/home',
    name: 'home',
    component: home
  }, {
    path: '/select',
    name: 'select',
    component: select
  }, {
    path: '/carFriends',
    name: 'carFriends',
    component: carFriends
  }, {
    path: '/smallVideo',
    name: 'smallVideo',
    component: smallVideo
  }, {
    path: '/ranking',
    name: 'ranking',
    component: ranking
  }, {
    path: '/service',
    name: 'service',
    component: service
  }, {
    path: '/word',
    name: 'word',
    component: word
  }, {
    path: '/video',
    name: 'video',
    component: video
  }]
})
