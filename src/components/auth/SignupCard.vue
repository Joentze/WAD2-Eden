<template>
    <div class="hero min-h-screen bg-base-200" style="background-image: url(src/components/auth/hon-sustainability-2880x1440px.jpeg);">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold text-white">Sign Up now!</h1>
        <p class="py-6 text-white">Your journey to sustainability begins with Eden</p>
      </div>
    <div>
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
          placeholder="example@mail.com"
          class="input input-sm input-bordered"
          required
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text text-primary">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          class="input input-sm input-bordered"
          required
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text text-primary">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          class="input input-sm input-bordered"
          required
        />
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary"><IconPlant />Save the Earth</button>
      </div>
    </form>
  </div>
</div>
</div>
</div>
</template>
<script lang="ts">
import IconPlant from "../icons/IconPlant.vue";
export default {
  components: { IconPlant },
};
</script>
