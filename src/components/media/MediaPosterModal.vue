<template>
  <!-- You can open the modal using ID.showModal() method -->
  <button class="btn btn-primary" onclick="my_modal_4.showModal()">
    open modal
  </button>
  <dialog id="my_modal_4" class="modal text-primary">
    <div class="modal-box w-11/12 max-w-5xl">
      <div class="flex flex-row">
        <div class="flex-grow">
          <h1 class="font-bold text-xl">Make a Post!</h1>
          <p class="text-gray-400 text-sm">Share an experience with others!</p>
        </div>

        <button class="btn btn-square btn-primary"><IconArrowRight /></button>
      </div>
      <div class="divider" />
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-primary">What's on your mind?</span>
        </label>
        <textarea
          placeholder="Type here"
          class="textarea textarea-bordered h-24"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <MediaFileUploaderComponent />
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
export default {
  components: { IconArrowRight, MediaFileUploaderComponent },
};
</script>
