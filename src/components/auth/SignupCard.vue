<template>
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
</template>
<script lang="ts">
import IconPlant from "../icons/IconPlant.vue";
export default {
  components: { IconPlant },
};
</script>
