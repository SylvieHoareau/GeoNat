<!--CommuneMap.vue-->
<template>
    <div>
        <HeaderSection/>
        <div id="map"></div>
    </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { VUE_APP_TOKEN_IGN } from '../../config.js';

export default {
    name: 'CommuneMap',
    components: {
        HeaderSection,
    },
    data() {
        return {
            wfsEndpoint: 'https://wxs.ign.fr/administratif/geoportail/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=ADMINEXPRESS-COG.LATEST:commune',
            geoJSONData: { type: 'FeatureCollection', features: [] },
            geoJSONLayer: null,
            map: null,
            CLEF: VUE_APP_TOKEN_IGN,
            featuresPerPage: 1000,
            attribution: '&copy; <a href="https://www/openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    },
    mounted() {
        // Initialiser la carte Leaflet
        this.map = L.map('map', {
            center: L.latLng(51.9253, -14.2350),
            zoom: 5
        })
        // Ajouter le calque de tuiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www/openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        // Appeler la méthode fetchData pour récupérer et afficher les données
        this.fetchData();
    },
    methods: {

        async fetchData() {
            try {
                const totalCount = 34945;
                const totalPages = Math.ceil(totalCount / this.featuresPerPage);

                // Récupérer les données de toutes les pages
                const allData = []
                for (let page = 0; page < totalPages; page++) {
                    const startIndex = page * this.featuresPerPage;
                    const response = await axios.get(this.wfsEndpoint, {
                        params: {
                            SERVICE: 'WFS',
                            VERSION: '2.0.0',
                            REQUEST: 'GetFeature',
                            TYPENAME: 'ADMINEXPRESS-COG.LATEST:commune',
                            outputFormat: 'application/json',
                            startIndex,
                            count: this.featuresPerPage
                        },
                        headers: {
                            Authorization: this.CLEF,
                            Accept: 'application/json'
                        }
                    })
                    console.log('Réponse de \'API IGN: ', response.data);

                    // Pour inspecter la structure des données
                    console.log('Données brutes:', response.data);

                    const pageData = response.data.features;
                    console.log('pageData', pageData);

                    allData.push(...pageData);
                }

                // Mettre à jour this.geoJSONData avec les nouvelles
                this.geoJSONData.features = [...this.geoJSONData.features, ...allData]; 

                // Mettre à jour le calque GeoJSON avec les nouvelles données
                if (!this.geoJSONLayer) {
                    // Ajouter le calque GeoJSON
                    this.geoJSONLayer = L.geoJSON(this.geoJSONData, {
                        onEachFeature: (feature, layer) => {
                            // Personnaliser l'interaction avec chaque entité
                            layer.bindPopup(feature.properties.nom)
                        }
                    }).addTo(this.map);
                } else {
                   this.geoJSONLayer.clearLayers(); // Effacer les couches existantes
                   this.geoJSONLayer.addData(this.geoJSONData);
                }
                
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error)
            }
        }
    }
   
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
}
</style>