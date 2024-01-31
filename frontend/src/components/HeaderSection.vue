<!--HeaderSection.vue-->
<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-success py-2 px-2" style="background-color: #388E3C">
            <router-link class="navbar-brand text-white" to="/">GeoNat</router-link>
            <button class="navbar-toggler" type="button" data-target="#nav-collapse" aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="nav-collapse">
                <ul class="navbar-nav">
                    <!--Accueil-->
                    <li class="nav-item">
                        <router-link class="nav-link text-white hover-effect" to="/">Accueil</router-link>
                    </li>
                    <!--Cartes-->
                    <li class="nav-item">
                        <router-link class="nav-link text-white hover-effect" to="/osm">Cartes OSM</router-link>
                    </li>
                    <!--Cartes-->
                      <li class="nav-item">
                        <router-link class="nav-link text-white hover-effect" to="/ign">Cartes IGN</router-link>
                    </li>
                    <!--Contact-->
                    <li class="nav-item">
                        <router-link class="nav-link text-white hover-effect" to="/contact">Contact</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>

export default {
  name: 'HeaderSection',
}
</script>

<style scoped>

/*Effet de survol */
.hover-effect:hover {
    background-color: #5cb85c;
    color: #fff;
}
</style>