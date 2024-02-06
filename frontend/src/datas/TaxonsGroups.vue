<!--TaxonsGroups.vue-->
<template>
    <div>
        <HeaderSection />
        <div class="container mt-4">
            <h2>Statistiques taxonomiques par groupes</h2>
            <div v-for="(item, index) in stats" :key="index" class="card mt-3">
                <div class="card-body">
                    <h5 class="card-title">{{ item.group }}</h5>
                    <p class="card-text">Nombre de taxons : {{ item.taxonCount }}</p>
                </div>
            </div>
            <p>Source : INPN - MNHN - OpenObs</p>
        </div>
    </div>
</template>
  
<script>
    import HeaderSection from '@/components/HeaderSection.vue';
    import axios from 'axios';

    export default {
        name: 'TaxonsGroups',
        components: {
            HeaderSection
        },
        data() {
            return {
                stats: [] // Initialisation des données de l'API
            }
        },
        mounted() {
            // Appel de l'API
            axios
                .get('https://openobs.mnhn.fr/api/taxa/stats/generalGroups')
                .then(response => (this.stats = response.data))
        }
    }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
  