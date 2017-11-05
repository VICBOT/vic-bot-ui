<template lang="pug">
  q-layout
    voice
    pre {{data}}
    q-btn(@click="$refs.messageModal.open()" icon="chat" round style="bottom: 18px; right: 18px; z-index: 9999" color="primary").fixed-bottom-right
    q-modal(ref="messageModal", :content-css="{'min-width': '75%', height: '100%'}", position="right")
      q-modal-layout
        q-toolbar
          q-toolbar-title Messages
        q-field(icon="face")
          q-input(v-model="username" stack-label="Your username")
        q-field(icon="chat")
          q-input(v-model="message" stack-label="Write a message" @keyup.native.enter="sendMessage")
        q-btn.full-width(color="secondary" @click="sendMessage") Send Message
        q-list
          q-item(v-for="(message,i) in messages", :key="i")
            q-item-main
              q-item-tile(label) {{message.body}}
              q-item-tile(sublabel) 
                b {{message.username}}
                div {{message.date}}
    joystick
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        username: "Ralph",
        message: "",
        messages: [],
        data: null,
        led: false
      };
    },
    sockets: {
      connect() {
        console.log("CONNECTED");
      },
      board(data) {
        this.data = data;
        if (this.data.username) {
          this.messages.push(this.data);
        }
      }
    },
    watch: {
      led(val) {
        this.$socket.emit("ui", {
          led: {
            value: val
          }
        });
      }
    },
    mounted() {},
    methods: {
      sendMessage() {
        let message = {
          body: this.message,
          date: new Date(),
          username: this.username
        };
        this.sayMessage(this.message);
        this.message = "";
      },
      sayMessage(message) {
        let utterance = new SpeechSynthesisUtterance();
        utterance.text = message;
        //utterance.lang = "es-ES";
        speechSynthesis.speak(utterance);
        this.$socket.emit("ui", message);
      }
    }
  };
</script>

