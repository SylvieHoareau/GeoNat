<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to="/">GeoNat</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <!--Accueil-->
                    <b-nav-item to="/">Accueil</b-nav-item>
                    <!--Cartes-->
                    <b-nav-item to="/cartes">Cartes</b-nav-item>
                    <!--Contact-->
                    <b-nav-item to="/contact">Contact</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'HeaderSection',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>