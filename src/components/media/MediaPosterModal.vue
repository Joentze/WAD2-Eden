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

        <button
          class="btn btn-square btn-primary"
          @click="async () => await post()"
        >
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
import IconArrowRight from "../icons/IconArrowRight.vue";
import MediaFileUploaderComponent from "../file/MediaFileUploaderComponent.vue";
import { useAuthStore } from "../../stores/authStore.ts";
import { postMedia } from "../../firebaseHelpers/mediaHelpers.ts";
import { validateMediaPost } from "../../validators/mediaValidators.ts";
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
    post: async function () {
      try {
        const media = {
          postDescription: this.postDescription,
          postImages: this.postImages,
          createdBy: this.companyName,
          creatorPhotoUrl: this.photoUrl,
          creatorId: this.uid,
          postTag: "",
          postMentions: [],
          createdOn: new Date(),
        };
        validateMediaPost(media);
        this.isLoading = true;
        await postMedia(media);
        this.isLoading = false;
        document.getElementById("closeButton").click();
      } catch (e) {
        console.error(e);
        throw new Error("There was an error with making a post at this time!");
      }
    },
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
