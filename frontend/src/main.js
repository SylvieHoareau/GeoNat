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
import CommuneMapOL from '../src/maps/CommuneMapOL.vue';
import TaxonsGroups from '../src/datas/TaxonsGroups.vue';
import EauHydrometrie from '../src/maps/EauHydrometrie.vue';
import TestIgn from '../src/maps/TestIgn.vue';
import IgnSdk from '../src/maps/IgnSdk.vue';


const routes = [
    { path: '/', component: HomePage },
    { path: '/contact', component: ContactPage },
    { path: '/signup', component: SignupPage },
    { path: '/osm', component: MapReunion },
    // { path: '/ign', component: IgnMap },
    // { path: '/ortho', component: OrthoMap },
    { path: '/commune', component: CommuneMap },
    { path: '/communeol', component: CommuneMapOL },
    { path: '/eau', component: EauHydrometrie },
    { path: '/taxons', component: TaxonsGroups },
    { path: '/testign', component: TestIgn },
    { path: '/ignsdk', component: IgnSdk }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
