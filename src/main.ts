import { createApp } from 'vue'
import './assets/css/reset.css'
import App from './App.vue'
//路由
import router from "./router/index"
//codemirror
import useCodeMirror from './plugins/codemirror'

const app = createApp(App)
useCodeMirror(app)
app.use(router).mount('#app')
