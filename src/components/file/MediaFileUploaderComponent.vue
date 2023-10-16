<script setup lang="ts"></script>

<template>
  <img v-for="url in urls" :src="url" style="width: 100px; height: 100px" />
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  methods: {
    getImages: function (event) {
      for (let [idx, file] of Object.entries(event.target.files)) {
        this.blobs.push(file);
        console.log(file);
      }
    },
    uploadImages: async function () {
      this.blobs.forEach(async (blob) => {
        const storageRef = ref(storage, `images/${uuid.v4()}.jpg`);
        const response = await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        this.urls.push(url);
      });
      console.log(this.urls);
    },
  },

  data() {
    return {
      blobs: [],
      urls: [],
    };
  },
};
</script>
