<template>
  <div
    class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 h-fit m-auto border border-1"
  >
    <form class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text text-primary">Name of Organisation</span>
        </label>
        <input
          type="email"
          placeholder="example: The Tree Huggers"
          class="input input-sm input-bordered"
          required
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text text-primary">Description</span>
        </label>
        <textarea
          type="text"
          placeholder="We love trees!"
          class="textarea textarea-bordered"
          required
        />
      </div>
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
      <br />
      <p class="text-primary font-bold">Account Details:</p>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-gray-400 flex flex-row gap-2"
            ><IconBuilding />Corporation</span
          >
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-primary"
            checked
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-gray-400 flex flex-row gap-2">
            <IconPlant />Social Enterprise</span
          >
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-primary"
            checked
          />
        </label>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text text-primary">Site URL:</span>
        </label>
        <input
          type="text"
          placeholder="https://www.example.com"
          class="input input-sm input-bordered"
          required
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text text-primary">Contact No:</span>
        </label>
        <input
          type="number"
          placeholder="example: 67674455"
          class="input input-sm input-bordered"
          required
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text text-primary">Thumbnail:</span>
        </label>
        <input
          type="file"
          class="file-input file-input-bordered w-full max-w-xs text-primary"
        />
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary">Save the Earth</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import IconPlant from "../icons/IconPlant.vue";
import IconBuilding from "../icons/IconBuilding.vue";
import IconCommunity from "../icons/IconCommunity.vue";
export default {
  components: { IconPlant, IconBuilding, IconCommunity },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      state: 0,
    };
  },
};
</script>
