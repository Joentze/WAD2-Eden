<script setup lang="ts"></script>

<template>
  <input
    type="file"
    class="file-input w-full max-w-xs mt-24"
    @change="getImages"
    multiple
  />
  <button class="btn btn-primary" @click="uploadImages">upload</button>
</template>
<script lang="ts">
import { uuid } from "vue-uuid";
import { storage } from "../../firebase.ts";
import { ref, uploadBytes } from "firebase/storage";
export default {
  methods: {
    getImages: function (event) {
      for (let [idx, file] of Object.entries(event.target.files)) {
        this.blobs.push(file);
      }
    },
    uploadImages: async function () {
      this.blobs.forEach(async (blob) => {
        const storageRef = ref(storage, `images/${uuid.v4()}.jpg`);
        await uploadBytes(storageRef);
      });
    },
  },

  data() {
    return {
      blobs: [],
    };
  },
};
</script>
