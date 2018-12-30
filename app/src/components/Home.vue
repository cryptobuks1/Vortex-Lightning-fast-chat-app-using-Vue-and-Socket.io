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
            <p class="feedback" v-if="feedbackMessage">
              {{ feedbackMessage }}
            </p>
            <div v-for="message in messages" class="message">
              <strong>{{ message.username}}:</strong>
              {{ message.contents }}
            </div>
            <div id="feedback"></div>
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
    socket.on('chat', ({ contents, username }) => {
      this.messages.push({ contents, username });
      this.usersTyping.splice(this.usersTyping.indexOf(username), 1);
    });

    socket.on('typing', ({ username }) => {
      if (!this.usersTyping.indexOf(username)) {
        this.usersTyping.push(username);
        setTimeout(() => {
          this.usersTyping.splice(this.usersTyping.indexOf(username), 1);
        }, 5000);
      }
    })

    socket.on('end_typing', ({ username }) => {
    });
  },
  computed: {
    feedbackMessage() {
      const l = this.usersTyping.length;
      return l > 0 ? `${l} user${l > 1 ? 's' : ''} typing in the chat` : false;
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage === '') {
        // empty condition
      } else {
        socket.emit('chat', {
          contents: this.newMessage,
          username: this.username,
        });
      }
      this.newMessage = ''
    },
    emitTyping() {
      socket.emit('typing', { username: this.username });
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

</style>
