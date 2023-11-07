<script setup lang="ts"></script>
<template>
  <div
    class="card flex-shrink-0 w-96 shadow-2xl h-fit m-auto border border-2 bg-white"
  >
    <p class="text-primary text-3xl font-bold ml-16 mt-10">Login</p>

    <form class="card-body -mt-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text text-gray-400">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          class="input input-bordered"
          required
          v-model="email"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text text-gray-400">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          class="input input-bordered"
          required
          v-model="password"
        />
      </div>
      <div class="form-control my-6">
        <button
          class="btn btn-primary"
          @click.prevent="login(this.email, this.password)"
        >
          Login
        </button>
      </div>
      <div class="divider text-gray-300 my-6">OR</div>
      <button
        class="btn mx-6"
        @click.prevent="
          () => {
            $router.push({ path: '/signup' });
          }
        "
      >
        Sign Up Here
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";
import { useNotification } from "../../stores/notificationStore";

export default {
  methods: {
    login: function () {
      const auth = useFirebaseAuth();
      const authStore = useAuthStore();
      const router = useRouter();
      const notification = useNotification();
      signInWithEmailAndPassword(auth!, this.email, this.password)
        .then((userCredential) => {
          authStore.update(userCredential.user.uid);
          this.$router.push({ path: "/projects" });
        })
        .catch((error) => {
          notification.add({
            title: "Login Error",
            description: error.message,
          });
        });
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
