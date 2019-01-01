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
            <div v-for="message in messages" class="message" v-bind:key="message._id">
              <strong>{{ message.username}}:</strong>
              <div>{{ message.contents }}</div>
              <div style="text-align: right;"><strong>{{ message.time }}</strong></div>
            </div>
            <div id="feedback"></div>
            <div v-if="messages.length == 0"> <!-- If empty box -->
              <v-chip class="emptyBox" v-model="chip" close color="blue-grey darken-3" text-color="white">Looks like it's pretty empty here... <br>Type a message to begin.</v-chip>
            </div>
          </div>
          <br>
        <div class="messageField">
          <v-layout row>
            <v-flex xs10>
              <v-text-field label="Solo"
                            id="messageField"
                            placeholder="Enter a message here..."
                            solo
                            flat
                            @keydown="emitTyping"
                            @keydown.enter="sendMessage"
                            v-model="newMessage">
              </v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="sendMessage"
                     depressed
                     title="Send"
                     icon
                     color="blue-grey darken-1">
                <div style="color: white; padding-top: 4px;">
                  <i class="material-icons">send</i>
                </div>
              </v-btn>
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
      messages: [],
      newMessage: '',
      usersTyping: [],
      chip: true
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
    socket.on('chat', ({ contents, username, time, _id }) => {
      this.messages.push({ contents, username, time, _id });
      this.usersTyping.splice(this.usersTyping.indexOf(username), 1);
      var feedback = document.getElementById('feedback');
      feedback.innerHTML = '';
    });
    socket.on('typing', function(data){
      var feedback = document.getElementById('feedback');
      feedback.innerHTML = '<p>'+data+' is typing a message...'+'</p>';
    });
  },
  computed: {

  },
  methods: {
    sendMessage() {
      if (this.newMessage === '') {
        // empty condition
      } else {
        socket.emit('chat', {
          contents: this.newMessage,
          username: this.username,
          time: new Date().getHours()+':'+new Date().getMinutes(),
          _id: Math.random().toString(36).substring(7) // random id function
        });
      }
      this.newMessage = ''
    },
    emitTyping() {
      socket.emit('typing', sessionStorage.getItem('username'));
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
.message {
  margin-bottom: 10px;
  background-color: #90A4AE;
  padding: 5px;
  border-radius: 10px;
  color: white;
}
#feedback{
  color: white;
  font-size: 12px;
}
.emptyBox{
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>
