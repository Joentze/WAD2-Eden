import "./assets/main.css";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(VueFire, {
  firebaseApp,
  modules: [
    // ... other modules
    VueFireAuth(),
  ],
});
app.use(router);

app.mount("#app");
