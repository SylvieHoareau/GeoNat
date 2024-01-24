// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import HomePage from '../src/pages/HomePage.vue'
import ContactPage from '../src/pages/ContactPage.vue'
import MapReunion from '../src/maps/MapReunion.vue'
import SingupPage from '../src/pages/SignupPage.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/carte', component: MapReunion },
    { path: '/contact', component: ContactPage },
    { path: '/signup', component: SingupPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
