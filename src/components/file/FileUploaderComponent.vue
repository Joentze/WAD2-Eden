<script setup lang="ts">
// See https://vueuse.org/core/useFileDialog
const emit = defineEmits(["upload-image"]);
import { useFileDialog } from "@vueuse/core";
import { ref as storageRef } from "firebase/storage";
import { ref } from "vue";
import { useFirebaseStorage, useStorageFile } from "vuefire";
import { uuid } from "vue-uuid";
const storage = useFirebaseStorage();
const mountainFileRef = storageRef(storage, `images/${uuid.v4()}.jpg`);

const {
  url,
  // gives you a percentage between 0 and 1 of the upload progress
  uploadProgress,
  uploadError,
  // firebase upload task
  uploadTask,
  upload,
} = useStorageFile(mountainFileRef);

function uploadPicture() {
  const data = files.value?.item(0);
  if (data) {
    upload(data);
  }
  emit("upload-image", url);
}

const filename = ref<string>();
const { files, open, reset } = useFileDialog();
</script>

<template>
  <form
    @submit.prevent="uploadPicture"
    class="border border-1 rounded-lg overflow-hidden p-2 h-fit flex flex-col"
  >
    <div class="flex-grow" />
    <!-- disable the form while uploading -->
    <fieldset :disabled="!!uploadTask" class="flex flex-col">
      <button
        class="h-full text-primary"
        type="button"
        @click="open({ accept: 'image/*', multiple: false })"
      >
        <img v-if="url" :src="url" class="w-52 h-52 m-auto image-contain" />
        <div v-else class="flex">
          <IconCameraPlus class="m-auto" />
        </div>
        <template v-if="files?.length === 1" class="truncate">
          {{ files.item(0)!.name }}
        </template>
        <template v-else> Select one picture </template>
      </button>

      <br />

      <button class="btn btn-sm btn-primary border-none">Upload</button>
    </fieldset>
  </form>
</template>
<script lang="ts">
import IconCameraPlus from "../icons/IconCameraPlus.vue";
export default {
  components: { IconCameraPlus },
  data() {
    return {
      url: this.url,
    };
  },
};
</script>
