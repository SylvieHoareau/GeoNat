// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import HomePage from '../src/pages/HomePage.vue'
import ContactPage from '../src/pages/ContactPage.vue'
import SignupPage from '../src/pages/SignupPage.vue'
import MapReunion from '../src/maps/MapReunion.vue'
import IgnMap from '../src/maps/IgnMap.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/osm', component: MapReunion },
    { path: '/ign', component: IgnMap },
    { path: '/contact', component: ContactPage },
    { path: '/signup', component: SignupPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
