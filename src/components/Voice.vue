<template lang="pug">
  div
    q-field(icon="title")
      q-input(v-model="message" stack-label="What you want the bot to say?")
    q-btn.full-width(color="primary", :disabled="speaking", @click="speak") Speak
    q-select(:options="voices", v-model="voice")
</template>

<script>
  export default {
    name: "Voice",
    data() {
      return {
        voices: [],
        voice: null,
        message: "",
        utterance: new SpeechSynthesisUtterance()
      };
    },
    async mounted() {
      this.voices = speechSynthesis.getVoices();
      //this.utterance.lang = "es-ES";
    },
    computed: {
      speaking() {
        return speechSynthesis.speaking;
      }
    },
    methods: {
      speak() {
        this.utterance.text = this.message;
        speechSynthesis.speak(this.utterance);
        this.message = "";
      }
    }
  };
</script>
