import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import './eventBus';

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuelidate)
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  vuetify: new Vuetify({
    icons: {
      iconfont: 'md',
    },
  }),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
