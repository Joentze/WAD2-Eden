<template>
  <div class="hero min-h-screen bg-base-200 " style="background-image: url(src/components/auth/hon-sustainability-2880x1440px.jpeg);">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold text-white">Login now!</h1>
        <p class="py-6 text-white">Your journey to sustainability begins with Eden</p>
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
        <button class="btn btn-primary" @click.prevent="login()">Login</button>
      </div>
    </form>
  </div>
</div>
</div>
</template>
<script lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
const auth = useFirebaseAuth();
export default {
  methods: {
    login: function () {
      //   console.log(`email: ${this.email}`, this.password);
      signInWithEmailAndPassword(auth!, this.email, this.password)
        .then((userCredential) => {
          this.$router.push("/projects");
        })
        .catch((error) => console.error(error.message));
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
