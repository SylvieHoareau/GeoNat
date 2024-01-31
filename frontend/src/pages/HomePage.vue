<!-- HomePage.vue-->
<template>
    <div>
        <HeaderSection />
        <div class="container mt-5">
            <div class="jumbotron">
                <h1 class="display-4">GeoNat : l'application de cartographie au service de la nature</h1>
                <p class="lead">GeoNat est une application qui utilise des outils géospatiaux pour la gestion et la conservation de la nature.</p>
                <hr class="my-4">
                <p>Avec GeoNat vous pouvez : </p>
                <ul class="list-group">
                    <li class="list-group-item">Explorer et analyser les données environnementales de votre région</li>
                    <li class="list-group-item">Identifier et protéger les espaces naturels sensibles</li>
                    <li class="list-group-item">Connaître et valoriser le patrimoine naturel</li>
                </ul>
                <router-link class=" btn btn-success btn-lg mt-3" to="/signup">Rejoignez GeoNat dès maintenant !</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderSection from '../components/HeaderSection.vue' 
export default {
  name: 'HomePage',
  components: {
    HeaderSection
  }
}
</script>

<style scoped>

</style>