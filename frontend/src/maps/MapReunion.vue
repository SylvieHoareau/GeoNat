<!--MapReunion.vue-->
<template>
    <div>
        <HeaderSection />
        <h1>Carte de La Réunion</h1>
        <div id="map"></div>
    </div>
</template>

<script>
import HeaderSection from '../components/HeaderSection.vue' 
import 'ol/ol.css' // Import des styles Open Layers
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'

export default {
  name: 'MapReunion',
  components: {
    HeaderSection
  },
  mounted() {
    // Initialisation de la carte Open Layers
    this.initMap()
  },
  methods: {
    initMap() {
        // Créer une carte Open Layers avec une couche OSM (Open Street Map)
        new Map({
            target: 'map', // ID de la div où on veut afficher la carte
            layers : [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([55.315722, -21.230135]),
                zoom: 10
            })
        })
    }
  }
}
</script>

<style scoped>

/* html,
body {
  margin: 0;
  height: 100%;
} */

#map {
  position: absolute;
  top: 8em;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
</style>