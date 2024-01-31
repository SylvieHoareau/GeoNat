<template>
    <div>
        <div id="map" class="map"></div>  
    </div>
</template>

<script>
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import WMTS from 'ol/source/WMTS.js';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
import {fromLonLat, get as getProjection} from 'ol/proj.js';
import {getWidth} from 'ol/extent.js';

export default {
    name: 'IgnMap',
    mounted() {
        // Initialisation de la carte IGN
        this.initMap
    },
    methods: {
        initMap() {
            const map = new Map({
            target: 'map',
            view: new View({
                zoom: 5,
                center: fromLonLat([5, 45]),
            }),
            });

            const resolutions = [];
            const matrixIds = [];
            const proj3857 = getProjection('EPSG:3857');
            const maxResolution = getWidth(proj3857.getExtent()) / 256;

            for (let i = 0; i < 20; i++) {
                matrixIds[i] = i.toString();
                resolutions[i] = maxResolution / Math.pow(2, i);
            }

            const tileGrid = new WMTSTileGrid({
                origin: [-20037508, 20037508],
                resolutions: resolutions,
                matrixIds: matrixIds,
            });

            // For more information about the IGN API key see
            // https://geoservices.ign.fr/blog/2021/01/29/Maj_Cles_Geoservices.html

            const apiKey = '';
            const ign_source = new WMTS({
                url: 'https://wxs.ign.fr/choisirgeoportail/geoportail/wmts',
                layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
                matrixSet: 'PM',
                format: 'image/png',
                projection: 'EPSG:3857',
                tileGrid: tileGrid,
                style: 'normal',
                attributions:
                    '<a href="https://www.ign.fr/" target="_blank">' +
                    '<img src="https://wxs.ign.fr/static/logos/IGN/IGN.gif" title="Institut national de l\'' +
                    'information géographique et forestière" alt="IGN"></a>',
                requestEncoding: 'REST',
                tileLoadFunction: function (imageTile, src) {
                    imageTile.getImage().src = src + '&key=' + apiKey;
                }
            });

            const ign = new TileLayer({
                source: ign_source,
            });

            map.addLayer(ign);
        }
        
    }
}

</script>

<style scoped>
.map {
    width: 100%;
    height: 400px;
}
</style>