<template>
  <div class="navbar">
    <v-toolbar flat color="blue-grey darken-1" height="45" fixed>
    <v-toolbar-title>
        <router-link to="/" style="font-size: 30px; font-family: Product Sans;"><strong>Vortex</strong></router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div style="color: white; font-size: 20px;">{{username}}</div>
  </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      username: ''
    }
  },
  created() {
      this.username = sessionStorage.getItem('username')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
