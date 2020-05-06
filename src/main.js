import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Form, FormItem, Input, Button } from 'element-ui';
import './assets/css/global.css'
import {Message} from "element-ui"
import axios from "axios"


axios.defaults.baseURL = 'http://106.12.11.162:8888/api/private/v1/'
Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
