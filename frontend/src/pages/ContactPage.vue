<!--ContactPage.vue-->
<template>
    <div>
        <HeaderSection />
        <div class="container mt-4">
          <h1>Pour me contacter</h1>
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">Nom :</label>
              <input type="text" v-model="formData.name" class="form-control" id="name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email :</label>
              <input type="text" v-model="formData.email" class="form-control" id="name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Message :</label>
              <input type="text" v-model="formData.message" class="form-control" id="name" required>
            </div>
            <button type="submit" class="btn btn-success">Envoyer</button>
          </form>
        </div>
        
    </div>
</template>

<script>
import HeaderSection from '../components/HeaderSection.vue' 
export default {
  name: 'ContactPage',
  components: {
    HeaderSection
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Logique pour envoyer le formulaire
      console.log('Formulaire soumis ! Données: ', this.formData);
    }
  }
}
</script>

<style scoped>

</style>