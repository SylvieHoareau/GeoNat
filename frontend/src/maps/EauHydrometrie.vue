<template>
    <div class="hello">
        <HeaderSection />
      <h1>Hydrométrie</h1>
      
    </div>
  </template>
  
  <script>
import HeaderSection from '@/components/HeaderSection.vue';

  export default {
    name: 'EauHydrometrie',
    props: {
        msg: String
    },
    components: { 
        HeaderSection
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
  