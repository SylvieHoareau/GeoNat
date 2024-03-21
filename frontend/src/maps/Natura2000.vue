<template>
    <div>
        <HeaderSection/>
        <h1>Natura 2000</h1>
        <div id="map"></div>
        <div id="info"></div>
    </div>
</template>

<script>
import HeaderSection from '../components/HeaderSection.vue';
import * as Gp from '@ignf-geoportal/sdk-2d';

export default {
    name: "Natura2000",
    components: {
        HeaderSection
    },
    data() {
        return {
            map:null,
        }
    },
    mounted() {
        this.initializeGeoportailMap();
    },
    methods: {
        async initializeGeoportailMap() {
            try {
                const map = await Gp.Map.load('map', {
                    apiKey: 'essentiels,cartes',
                    zoom: 6,
                    center: {
                        x: 2.642212,
                        y: 46.811339,
                        projection: 'CRS:84'
                    },
                    layersOptions: {
                        // Couches phtographies aériennes
                        'ORTHOIMAGERY.ORTHOPHOTOS': {},
                        // Couches plan IGN
                        'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2': {
                            opacity: 0.3
                        }
                    },
                    controlsOptions: {
                        layerSwitcher: {}
                    }
                })

                // Créer un service WFS
                const wfsService = new Gp.Services.WFS({
                    url: '',
                    version: '2.0.0',
                    typeName: '',
                    outputFormat: 'application/json'
                })

                // Créer la couche WFS
                const wfsLayer = new Gp.Layer.VectorLayer('Natura2000', {
                    source: new Gp.Source.Vector(wfsService),
                    style: new Gp.Style({

                    })
                })

                // Ajouter la couche WFS à la carte
                map.addLayer(wfsLayer);

                // Pour interagir avec la carte
                this.map = map;

                // Mettre à jour le zoom
                map.setZoom(8);

                const infoDiv = document.getElementById('info');
                infoDiv.innerHTML = "<p> SDK version " + Gp.sdkVersion + "( " + Gp.sdkDate + ")</p>";

            } catch (error) {
                console.error('Error loading map:', error);
            }
            
        }
    }
}
</script>

<style scoped>

#map {
    padding: 5px;
    width: 100%;
    height: 600px;
    box-shadow: 0 0 10px #999;
}

#info {
    padding: 5px;
    width: 100%;
    height: 20px;
    font-family: "monospace";
    font-size: 10px;
}
</style>