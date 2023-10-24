<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

const auth = useFirebaseAuth();
const authStore = useAuthStore();
const router = useRouter();

function login(email: string, password: string) {
  signInWithEmailAndPassword(auth!, email, password)
    .then((userCredential) => {
      authStore.update(userCredential.user.uid);
      router.push({ path: "/projects" });
    })
    .catch((error) => console.error(error.message));
}
</script>
<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold text-white">Login now!</h1>
        <p class="py-6 text-white">
          Your journey to sustainability begins with Eden
        </p>
      </div>
      <div
        class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 h-fit m-auto border border-1"
      >
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Email</span>
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
              <span class="label-text text-primary">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              required
              v-model="password"
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover text-primary"
                >Forgot password?</a
              >
            </label>
          </div>
          <div class="form-control mt-6">
            <button
              class="btn btn-primary"
              @click.prevent="login(this.email, this.password)"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
