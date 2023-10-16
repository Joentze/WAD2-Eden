<template>
  <!-- You can open the modal using ID.showModal() method -->
  <button class="btn btn-primary" onclick="my_modal_4.showModal()">
    open modal
  </button>
  <dialog id="my_modal_4" class="modal text-primary">
    <div class="modal-box w-11/12 max-w-5xl">
      <div class="flex flex-row">
        <div class="flex-grow">
          <h1 class="font-bold text-xl">Make a Post 📝</h1>
          <p class="text-gray-400 text-sm">Share an experience with others!</p>
        </div>

        <button class="btn btn-square btn-primary" @click="post">
          <IconArrowRight />
        </button>
      </div>
      <div class="divider" />
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-primary font-bold"
            >What's on your mind?</span
          >
        </label>
        <textarea
          v-model="postDescription"
          placeholder="Type here"
          class="textarea textarea-bordered h-24"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <MediaFileUploaderComponent v-on:fileUrls="setFileUrls" />
        </label>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script lang="ts">
import IconArrowRight from "../icons/IconArrowRight.vue";
import MediaFileUploaderComponent from "../file/MediaFileUploaderComponent.vue";
import { useAuthStore } from "../../stores/authStore.ts";
export default {
  setup() {
    const authStore = useAuthStore();
    console.log(authStore.getData);
    const { companyName, photoUrl, uid } = authStore.getData;
    // this.creatorId = companyName;
    // this.creatorPhotoUrl = photoUrl;
    return { companyName, photoUrl, uid };
  },
  components: { IconArrowRight, MediaFileUploaderComponent },
  methods: {
    post: function () {
      console.log(
        this.postDescription,
        this.postImages,
        this.companyName,
        this.photoUrl,
        this.uid
      );
    },
    setFileUrls: function (urls) {
      this.postImages = urls;
    },
  },
  data() {
    return {
      postDescription: "",
      postImages: [],
      creatorId: "",
      creatorPhotoUrl: "",
    };
  },
};
</script>
