<script setup lang="ts">
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { useAuthStore } from "../../stores/authStore.ts";
import { useRouter } from "vue-router";
import { useNotification } from "../../stores/notificationStore.ts";
const auth = useFirebaseAuth();
const authStore = useAuthStore();
const userData = authStore.getData;
const router = useRouter();
const notificationStore = useNotification();
function logout() {
  signOut(auth)
    .then(() => {
      authStore.clear();
      notificationStore.add({
        title: "See You Soon!",
        description: "Successfully logged out!",
      });
    })
    .catch((error) => console.error(error.message));
}
</script>
<template>
  <div class="dropdown dropdown-end text-primary">
    <label tabindex="0" class="btn btn-circle btn-ghost -mb-2">
      <div class="avatar" v-if="userData.photoUrl.length">
        <div class="w-10 rounded-full border">
          <img :src="userData.photoUrl" />
        </div>
      </div>
      <div class="avatar placeholder" v-else>
        <div
          class="bg-neutral-focus text-neutral-content rounded-full w-10 border"
        >
          <span>{{ userData.companyName[0].toUpperCase() }}</span>
        </div>
      </div>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu shadow bg-base-100 mt-2 rounded-box w-52"
    >
      <li>
        <a><IconPerson />Profile</a>
      </li>
      <!-- <li><a>Item 2</a></li> -->
      <li>
        <a class="text-error" @click.prevent="logout()"
          ><IconLogout /> Log Out</a
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import IconLogout from "../icons/IconLogout.vue";
import IconPerson from "../icons/IconPerson.vue";

export default {
  setup() {},
  components: { IconLogout, IconPerson },
  methods: {},
};
</script>
