import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
        Form,
        FormItem,
        Input,
        Button,
        Header,
        Container,
        Aside,
        Main,
        Menu,
        Submenu,
        MenuItem,
        Breadcrumb,
        BreadcrumbItem,
        Card,
        Row,
        Col,
        Table,
        TableColumn,
        Switch,
        Tooltip,
        Pagination,
        Dialog,
        MessageBox,
        Tag,
        Tree,
        Select,
        Option
                } from 'element-ui';
import './assets/css/global.css'
import {Message} from "element-ui"
import axios from "axios"


axios.defaults.baseURL = `http://47.115.124.102:8888/api/private/v1/`
// 请求拦截器  
axios.interceptors.request.use(config=>{
  // 最后必须 return config
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Container.name, Container);
Vue.component(Main.name,  Main);
Vue.component(Aside.name, Aside);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Card.name, Card);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Switch.name, Switch);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Pagination.name, Pagination);
Vue.component(Dialog.name, Dialog);
Vue.component(Tag.name, Tag);
Vue.component(Tree.name, Tree);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);






Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
