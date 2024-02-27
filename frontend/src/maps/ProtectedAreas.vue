<!--NaturaZfs.vue-->
<template>
    <div>
        <div id="map" class="map"></div>  
    </div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import axios from 'axios';
import WMTS from 'ol/source/WMTS';

export default {
    name: 'NaturaZfs',
    data() {
        return {
            apiKey: null,
            map: null
        }
    },
    mounted() {
        // Récupérer la clé API dans le backend
        axios.get('http://localhost:3000/api/getApiKey')
            .then(response => {
                this.apiKey = response.data.apiKey;
                // Vérifier la clé API
                console.log('API Key:', this.apiKey);
            })
            .catch(error => {
                console.error('Error fetching API Key:', error);
            })
        // Initialisation de la carte IGN
        this.initMap()
    },
    methods: {
        initMap() {

            const ignLayer = new TileLayer({
                source: new WMTS({
                    url:'https://wxs.ign.fr/environnement/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=',
                    layer: 'PROTECTEDAREAS.ZPS',
                    matrixSet: 'PM',
                    format: 'image/jpeg',
                    projection: 'EPSG:3857',
                    tileGrid: new WMTS.options.tileGrid({
                        origin: [-20037508, 20037508],
                        resloutions: [156543.0339280497, 78271.516964048],
                        matrixIds: ['PM:0', 'PM:1']
                    }),
                    style: 'normal',
                    wrapX: true
                }),
            });

            // Configuration de la vue de la carte
            const view = new View({
                center: [0, 0],
                zoom: 2
            })

            // Création de la carte
            this.map = new Map({
                target: this.$refs.map,
                layers: [ignLayer],
                view: view
            })
        }
        
    }
}

</script>

<style scoped>
.map {
    width: 1200px;
    height: 400px;
}
</style>