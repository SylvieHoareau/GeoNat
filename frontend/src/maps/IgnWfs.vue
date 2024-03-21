<!--IgnMap.vue-->
<template>
    <div>
        <HeaderSection/>
        <h1>IGN | Service de sélection WFS</h1>
        <input v-model="search" placeholder="Rechercher ...">
        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Nom</th>
                    <th>CRS par défault</th>
                    <th>Résumé</th>
                   
                </tr>
            </thead>
            <tbody>
                <tr v-for="feature in filteredFeatures" :key="feature.Name[0]">
                    <td>{{ feature.Title[0] }}</td>
                    <td>{{ feature.Name[0] }}</td>
                    <td>{{ feature.DefaultCRS[0] }}</td>
                    <td>{{ feature.Abstract[0] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import axios from 'axios';
import { parseString } from 'xml2js'; 

export default {
    name: 'IgnWfs',
    components: {
        HeaderSection
    },
    data() {
        return {
            search: '',
            features: []
        }
    },
    computed: {
        filteredFeatures() {
            if (!this.search) {
                return this.features;
            }
            return this.features.filter(feature => {
                return feature.Title[0].toLowerCase().includes(this.search.toLowerCase());
            })
        }
    },
    async created() {
        const response = await axios.get('https://data.geopf.fr/wfs/ows?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities');
        console.log('Response : ', response);
        parseString(response.data, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                this.features = result['wfs:WFS_Capabilities'].FeatureTypeList[0].FeatureType;
                console.log('Result : ', result);
            }
        })
    }
}

</script>

<style scoped>
    input {
        padding: 1em;
        margin: 1em;
    }

    table {
        width: 100%;
        border-collapse: collapse
    }

    th, td {
        border: 1px solid black;
        padding: 5px;
        text-align: left;
    }
</style>