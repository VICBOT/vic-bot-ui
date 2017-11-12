// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
import(`./themes/app.${__THEME}.styl`);
// 2. or, use next line to activate DEFAULT QUASAR STYLE
//require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from "vue";
import Quasar, * as All from "quasar";
import router from "./router";
import VueSocketIO from "vue-socket.io";
import { HOST } from "./config.json";
Vue.config.productionTip = false;

Vue.use(Quasar, {
  components: All
}); // Install Quasar Framework

Vue.use(VueSocketIO, HOST);

if (__THEME === "mat") {
  import("quasar-extras/roboto-font");
}
import "quasar-extras/material-icons";
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

new Vue({
  el: "#q-app",
  router,
  render: h => h(require("./App").default)
});
