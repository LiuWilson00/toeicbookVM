import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import ToeicBook from '../views/ToeicBook.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/PrivacyPolicy',
    name: 'Privacy Policy',
    component: PrivacyPolicy
  },
  {
    path: '/ToeicBook/:day',
    name: 'ToeicBook',
    component: ToeicBook,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
