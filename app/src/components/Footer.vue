<template>
  <div class="footer">
<v-footer
    height="20"
    color="blue-grey darken-1"
    app
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-btn color="white" href="https://github.com/Merwanedr/vortex" title="source code" flat small icon><div style="color: white; font-size: 20px;"><i class="fab fa-github"></i></div></v-btn> <!-- add github link -->
      <v-btn href="https://merwanedr.github.io/" color="transparent" flat small round><div style="color: white;"><i class="fas fa-heart"></i> Support </div></v-btn>
      <v-btn color="transparent" flat small round><div style="color: white;">© {{new Date().getFullYear()}} Merwane Draï</div></v-btn>
    </v-layout>
  </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
