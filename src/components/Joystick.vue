<template lang="pug">
  #joystick(style="height: 100vh; background: #222")
</template>

<script>
  import nipplejs from "nipplejs";

  export default {
    name: "Joystick",
    data() {
      return {
        controller: null
      };
    },
    mounted() {
      this.controller = nipplejs.create({
        zone: this.$el,
        mode: "static",
        position: {
          left: "50%",
          top: "50%"
        },
        size: 300
      });
      this.controller.on("move", this.move);
      this.controller.on("end", this.brake);
    },
    methods: {
      move(e, { force, direction }) {
        //this.$socket.emit("ui", data.type);
        force = force >= 1 ? 1 : force;
        let speed = ~~(force * 255);
        this.$socket.emit("ui", {
          motor: {
            speed,
            force,
            direction,
            host: document.location.host
          }
        });
      },
      brake() {
        this.$socket.emit("ui", "BRAKE");
      }
    }
  };
</script>
