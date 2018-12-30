<template>
  <div class="welcome">
    <Navbar />
    <div class="main">
        <div class="welcomeMsg font-weight-regular">Welcome to Vortex.</div>
        <div class="welcomeMsgSub font-weight-thin">An experimental realtime chat app.</div>
        <v-container style="margin-top: 25px;">
            <v-layout row wrap style="text-align: center;">
                <v-flex md5 xs12 style="margin-top: 70px;">
                    <v-text-field
                    label="Solo"
                    id="username"
                    placeholder="Enter a username"
                    solo
                    flat
                    v-model="username"
                    ></v-text-field>
                    <v-btn v-on:click="connect" depressed round small color="blue-grey darken-1"><div style="color: white;">Connect</div></v-btn>
                </v-flex>
                <v-flex md2 xs12> 
                    <!-- Empty -->
                </v-flex>
                <v-flex md5 xs12 class="hidden-sm-and-down">
                    <img src="../assets/vortex.gif" height="350" width="350">
                </v-flex>
                <v-flex xs12 class="hidden-md-and-up" style="text-align: center; margin-top: 20px;">
                    <img src="../assets/vortex.gif" height="200" width="200">
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './Navbar'
import Footer from './Footer'
export default {
  name: 'Welcome',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      username: ''
    }
  },
  methods: {
    async connect() {
      if (this.username === '') {
        document.getElementById('username').placeholder = "Please enter a username...";
        document.getElementById('username').style.borderBottom = "2px solid rgba(183,28,28,0.3)";
      }
      if (this.username !== '') {
        sessionStorage.setItem("username", this.username);
        this.$router.push({
          name: 'Home'
        })
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
    margin-top: 100px;
}
.welcomeMsg{
    text-align: center;
    color: white;
    font-size: 35px;
    font-family: Product Sans;
}
.welcomeMsgSub{
    text-align: center;
    color: white;
    font-size: 15px;
}
</style>
