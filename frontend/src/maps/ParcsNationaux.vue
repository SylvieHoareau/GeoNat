<!--ParcsNationaux.vue-->
<template>
    <div>
        <HeaderSection/>
        <h1>Carte des Parcs Nationaux</h1>
        <div v-if="loading">Chargement des données ...</div>
        <!--Name : PROTECTEDAREAS.PN:pn-->
        <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker v-for="feature in features" :key="feature.id" :lat-lng="getPolygon(feature)"></l-marker>
        </l-map>
    </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import * as L from 'leaflet';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import * as xmlJS from 'xml-js';

export default {
    name: 'ParcsNationaux',
    components: {
        HeaderSection,
        LMap,
        LTileLayer,
        LMarker
    },
    data () {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: ' OpenStreetMap contributors',
            center: [46.603354, 1.888334],
            zoom: 5,
            features: [], // Données des Parcs Nationaux
            loading: false
        }
    },
    methods: {
        // getLatLng(feature) {
        //     // Fonction pour extraire les coordonnées de chaque feature
        //     // Vérifier si la feature a une géométrie avant d'essayer d'accéder aux coordonnées
        //     if (feature.geometry) {
        //         return [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        //     } else {
        //         console.error('Feature does not have geometry:', feature);
        //         return null;
        //     }
        // }
        getPolygon(feature) {
            // Vérifiez sir la feature a une géométrie de type Polygon
            if (feature.geometry && feature.geometry.type === 'Polygon') {
                // Créer un nouveau polygon Leaflet à partir des coordonnées
                const polygon = L.polygon(feature.geometry.coordinates);
                return polygon;
            } else {
                console.error('Feature does not have a Polygon geometry: ', feature);
                return null;
            }
        }
    },
    async created() {
        this.loading = true;
        const pageSize = 100; // Nombre d'enregistrements par page
        let startIndex = 0; // Index de départ pour la pagination
        let hasMoreData = true; // Variable pour contrôler la boucle
    
        // Requête HTTP pour récupérer les données des Parcs Nationaux
        // et les stocker dans this.features
        const getFeature = async () => {
            const url = 'https://data.geopf.fr/wfs/ows?';
            const params = {
                SERVICE: 'WFS',
                VERSION: '2.0.0',
                REQUEST: 'GetFeature',
                TYPENAME: 'PROTECTEDAREAS.PN:pn',
                STARTINDEX: startIndex,
                COUNT: pageSize
            }

            try {
                const response = await axios.get(url, { params });
                console.log('Response : ', response);
                console.log('Count : ', pageSize);
                // Convertir les données XML en JSON
                const result = xmlJS.xml2js(response.data, {compact: true});
                // Extraire les features
                const features = result['wfs:FeatureCollection']['wfs:member'];
                console.log('features : ', features);
                if (features && features.length > 0) {
                    this.features = this.features.concat(features);
                    startIndex += pageSize;
                } else {
                    hasMoreData = false; // S'il n'y a plus de données, on arrête la boucle
                }
                return response.data;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        }

        // Boucle pour charger les données par lots
       
        while (hasMoreData) {
            await getFeature();
        }
        // getFeature().then(data => console.log(data));
    }
}

</script>

<style scoped>
  .l-map {
    width: 100%;
    height: 100vh;
  }
</style>