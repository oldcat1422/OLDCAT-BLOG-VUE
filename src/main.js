import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import MavonEditor from 'mavon-editor';  
import 'mavon-editor/dist/css/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 关闭生产提示
app.config.productionTip = false

app.use(store)
app.use(ElementPlus)
app.use(router)
app.use(ArcoVue);
app.use(MavonEditor);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.mount('#app')

// createApp(App).mount('#app')
