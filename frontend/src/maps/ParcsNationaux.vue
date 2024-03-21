<!--IgnMap.vue-->
<template>
    <div>
        <HeaderSection/>
        <h1>Carte des Parcs Nationaux</h1>
        <!--Name : PROTECTEDAREAS.PN:pn-->
        <div id="map"></div>
    </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';

export default {
    name: 'ParcsNationaux',
    components: {
        HeaderSection
    }
}

</script>

<style scoped>
  #map {
    width: 100%;
    height: 100vh;
  }
</style>