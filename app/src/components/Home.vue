<template>
  <div class="home">
    <Navbar />
    <div class="main">
      <v-container style="text-align: center;">
      <v-layout row style="text-align: center;">
        <v-flex md2 class="hidden-sm-and-down">
          <!-- Empty -->
        </v-flex>
        <v-flex md8 xs12>
          <div class="messagesBox">
            <div id="messageElem"></div>
            <div id="feedback"></div>
          </div>
          <br>
        <div class="messageField">
          <v-layout row>
            <v-flex xs10>
              <v-text-field
            label="Solo"
            id="messageField"
            placeholder="Enter a message here..."
            solo
            flat
            v-model="newMessage"
          ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn v-on:click="sendMessage" depressed title="Send" icon color="blue-grey darken-1"><div style="color: white; padding-top: 4px;"><i class="material-icons">send</i></div></v-btn>
            </v-flex>
          </v-layout>
        </div>
        </v-flex>
        <v-flex md2 class="hidden-sm-and-down">
          <!-- empty -->
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
var socket = io.connect('http://localhost:5000');
export default {
  name: 'Home',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      username: sessionStorage.getItem('username'),
      newMessage: ''
    }
  },
  beforeCreate() {
    if (sessionStorage.getItem('username') === null) {
      this.$router.push({
          name: 'Welcome'
        })
    }
  },
  created() {
    // establish connection to socket.io
    socket.on('chat', function(data){
      this.messages = data;
      console.log(this.messages)
      var output = document.getElementById('messageElem');
      var feedback = document.getElementById('feedback');
      var message = document.getElementById('messageField');
      feedback.innerHTML = ""
      output.innerHTML += '<div style="margin-bottom: 10px; background-color: #90A4AE; padding: 5px; border-radius: 10px; color: white;"><strong>'+data.username+': </strong> '+data.message+'</div>';

      message.addEventListener('keypress', function() {
        socket.emit('typing', sessionStorage.getItem('username'))
      });
      socket.on('typing', function(data){
        feedback.innerHTML = '<p><em>'+data+' is typing a message... </em></p>';
        console.log(data);
      })
    })
  },
  methods: {
    sendMessage() {
      if (this.newMessage === '') {
        // empty condition
      }
      else {
        socket.emit('chat', {
        message: this.newMessage,
        username: this.username
      });
      }
      this.newMessage = ''
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  margin-top: 50px;
}
.messagesBox{
  text-align: left;
  background-color: #546E7A;
  border-radius: 5px;
  height: 300px;
  overflow: scroll;
  padding: 10px;
  padding-right: 30%;
}

</style>
