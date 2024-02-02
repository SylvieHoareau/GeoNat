// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from '../src/pages/HomePage.vue';
import ContactPage from '../src/pages/ContactPage.vue';
import SignupPage from '../src/pages/SignupPage.vue';
import MapReunion from '../src/maps/MapReunion.vue';
// import IgnMap from '../src/maps/IgnMap.vue';
// import OrthoMap from '../src/maps/OthoMap.vue';
import CommuneMap from '../src/maps/CommuneMap.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/osm', component: MapReunion },
    // { path: '/ign', component: IgnMap },
    // { path: '/ortho', component: OrthoMap },
    { path: '/commune', component: CommuneMap },
    { path: '/contact', component: ContactPage },
    { path: '/signup', component: SignupPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
