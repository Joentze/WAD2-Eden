<template>
  <!-- You can open the modal using ID.showModal() method -->
  <button class="btn btn-primary btn-square" onclick="my_modal_4.showModal()">
    +
  </button>
  <dialog id="my_modal_4" class="modal text-primary">
    <div class="modal-box w-11/12 max-w-5xl">
      <div class="flex flex-row">
        <div class="flex-grow">
          <h1 class="font-bold text-xl">New Project 🌳</h1>
          <p class="text-gray-400 text-sm">
            Create a new project for your enterprise
          </p>
        </div>

        <button
          :disabled="postDescription === ''"
          class="btn btn-square btn-primary"
          @click="async () => await post()"
        >
          <IconArrowRight />
        </button>
      </div>

      <div class="divider" />
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-primary font-bold">Project Title</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text text-primary font-bold">Project Tag</span>
          </label>
          <select class="select select-bordered">
            <option disabled selected>Pick one</option>
            <option>BEACH</option>
            <option>FOREST</option>
            <option>PEOPLE</option>
            <option>ANIMALS</option>
          </select>
        </div>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-primary font-bold"
            >Project Location</span
          >
        </label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-primary font-bold"
            >Project Description</span
          >
        </label>
        <textarea
          v-model="postDescription"
          placeholder="Type here"
          class="textarea textarea-bordered h-24"
        />
      </div>
      <DateRangeSelector />
      <div class="form-control w-full">
        <label class="label">
          <MediaFileUploaderComponent
            v-on:fileUrls="async (event) => await setFileUrls(event)"
          />
        </label>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button, it will close the modal -->
          <button class="btn" id="closeButton">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script lang="ts">
import IconArrowRight from "../../icons/IconArrowRight.vue";
import MediaFileUploaderComponent from "../../file/MediaFileUploaderComponent.vue";
import { useAuthStore } from "../../../stores/authStore.ts";
import { postMedia } from "../../../firebaseHelpers/mediaHelpers.ts";
import { validateMediaPost } from "../../../validators/mediaValidators.ts";
import DateRangeSelector from "../../date/DateRangeSelector.vue";
export default {
  setup() {
    const authStore = useAuthStore();
    const { companyName, photoUrl, uid } = authStore.getData;
    return { companyName, photoUrl, uid };
  },
  components: { IconArrowRight, MediaFileUploaderComponent, DateRangeSelector },
  methods: {
    post: async function () {},
    setFileUrls: function (urls) {
      this.postImages = urls;
    },
  },
  data() {
    return {
      isLoading: false,
      postDescription: "",
      postImages: [],
      creatorId: "",
      creatorPhotoUrl: "",
    };
  },
};
</script>
