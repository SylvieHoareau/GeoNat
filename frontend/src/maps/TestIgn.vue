<template>
    <div ref="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
// import ImageLayer from "ol/layer/Image";
import TileWMS from "ol/source/TileWMS";
// import ImageWMS from "ol/source/ImageWMS";
import GeoJSON from "ol/format/GeoJSON";
import { VUE_APP_TOKEN_IGN } from "../../config.js";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

export default {
    name: "TestIgn",
    data() {
        return {
            map:null,
        }
    },
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {

            const ignApiKey = VUE_APP_TOKEN_IGN;

            // Déclaration de la source de la couche en format WMTS
            const sourceIGN = new TileWMS({
                url: "https://wxs.ign.fr/" + ignApiKey + "/geoportail/wmts",
                /* Chargement de l'espace de travail : couche */
                params: {
                    LAYER: 'GEOGRAPHICALGRIDSYSTEMS.MAPS', 
                    TILED: true,
                    MATRIXSET: "PM",
                    FORMAT: "image/jpeg"
                    }
                })

            // Déclaration de la couche Géoportail IGN
            const coucheIGN = new TileLayer({ 
                source: sourceIGN,
                opacity: 1
            });

            // Déclaration de la source de la couche en format WFS
            const sourceWFS = new VectorSource({
                format: new GeoJSON(),
                url: "https://wxs.ign.fr/" + ignApiKey + "/geoportail/wfs",
                params: {
                    LAYER: "BDPARCELLAIRE-VECTEUR_WLD_BDD_WFS"
                },
                crossOrigin: "anonymous"
            })

            // Déclaration de la couche vectorielle IGN
            const coucheVectorielleIGN = new VectorLayer({
                source: sourceWFS
            })

            //  Déclaration des couches
            var couches = [coucheIGN, coucheVectorielleIGN]; 

            // Déclaration de la carte
            this.map = new Map({
                /* Cible de la div map */
                target: this.$refs.map,
                /* Appel des couches de la carte */
                layers: couches,
                /* Caractéristiques de la vue de la carte */
                view: new View({
                    center: [-8233510, 4980620],
                    zoom: 13
                })
            });

        }
    }
}
</script>

<style scoped>

.map{
    width: 1200px;
    height: 600px;
}
</style>