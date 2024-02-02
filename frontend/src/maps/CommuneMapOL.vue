<!--CommuneMap.vue-->
<template>
    <div>
        <HeaderSection/>
        <h1>Découpage Administratif - Communes</h1>
        <div ref="map" id="map" class="map"></div>
    </div>
</template>

<script>
import HeaderSection from '../components/HeaderSection.vue';
import 'ol/ol.css';
import { Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { OSM, Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { transform } from 'ol/proj';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { VUE_APP_TOKEN_IGN } from '../../config.js';

export default {
    name: 'CommuneMap',
    components: {
        HeaderSection,
    },
    setup() {
        const state = reactive({
            map: null,
            vectorLayer: null,
            vectorSource: new VectorSource(),
            pageData: []
        })

        // Pour afficher les données ADMINEXPRESS-COG.LATEST:commune
        const wfsEndpoint = 'https://wxs.ign.fr/administratif/geoportail/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=ADMINEXPRESS-COG.LATEST:commune'

        // Clé personnelle IGN
        const CLEF = VUE_APP_TOKEN_IGN;

        // Nombre d'entité à récupérer par page
        const featuresPerPage = 1000;

        // Créer la couche vectorielle avec OpenLayers
        const geoJSONFormat = new GeoJSON();

        onMounted(() => {
            const fetchData = async () => {
                try {
                    const totalCount = 34945;
                    const totalPages = Math.ceil(totalCount / featuresPerPage);

                    // Récupérer les données de toutes les pages
                    const allData = []
                    for (let page = 0; page < totalPages; page++) {
                        const startIndex = page * featuresPerPage;
                        const response = await axios.get(wfsEndpoint, {
                            params: {
                                SERVICE: 'WFS',
                                VERSION: '2.0.0',
                                REQUEST: 'GetFeature',
                                TYPENAME: 'ADMINEXPRESS-COG.LATEST:commune',
                                outputFormat: 'application/json',
                                startIndex,
                                count: featuresPerPage
                            },
                            headers: {
                                Authorization: CLEF,
                                Accept: 'application/json'
                            }
                        })
                        console.log('Réponse de \'API IGN: ', response.data);

                        // Pour inspecter la structure des données
                        console.log('Données brutes:', response.data);

                        const pageData = response.data.features;
                        console.log('pageData', pageData);

                        // TRansfromation des coordonnées de EPSG:4326 à EPSG:3857
                        pageData.forEach(feature => {
                            feature.geometry.coordinates = feature.geometry.coordinates.map(polygon => 
                                polygon.map(linearRing => 
                                    linearRing.map(coordPair =>
                                        transform(coordPair, 'EPSG:4326', 'EPSG:3857')))
                            )
                            
                            console.log('Coordonnées transformées:', feature.geometry.coordinates)
                        })

                        state.pageData = [ ...state.pageData, ...pageData];

                        allData.push(...pageData);
                    }

                    // Initialiser la couche vectorielle avec OpenLayers
                    state.vectorLayer = new VectorLayer({
                            source: state.vectorSource
                    })

                    // Ajouter les fonctionnalités à la couche 
                    const features = geoJSONFormat.readFeatures({
                        type: 'FeatureCollection',
                        features: pageData
                    })

                    state.vectorSource.addFeatures(features);

                    // Initialiser la carte avec OpenLayers
                    state.map = new Map({
                        target: 'map',
                        layers: [
                            new VectorLayer({
                                source: new OSM()
                            }),
                            state.vectorLayer
                        ],
                        view: new View({
                            center: [-14.2350, 51.9253],
                            // center: transform([-14.2350, 51.9253], 'EPSG:4326', 'EPSG:3857'),
                            zoom: 5
                        })
                    })
                } catch (error) {
                    console.error('Erreur lors de la récupération des données', error)
                }
            }
            fetchData()
        })

        return { ...state }
    }
}
</script>

<style scoped>
#map {
    padding: 5px;
    width: 100vw;
    height: 100vh;
    box-shadow: 0 0 10px #999;
}
</style>