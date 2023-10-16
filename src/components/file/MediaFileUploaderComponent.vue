<script setup lang="ts"></script>

<template>
  <img v-for="url in urls" :src="url" style="width: 100px; height: 100px" />
  <input
    type="file"
    class="file-input w-full max-w-xs mt-24"
    @change="uploadImages"
    multiple
  />
  <!-- <button class="btn btn-primary" @click="uploadImages">upload</button> -->
</template>
<script lang="ts">
import { uuid } from "vue-uuid";
import { storage } from "../../firebase.ts";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  methods: {
    uploadImages: async function (event) {
      Object.values(event.target.files).forEach(async (blob) => {
        const storageRef = ref(storage, `images/${uuid.v4()}.jpg`);
        const response = await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        this.urls.push(url);
      });
    },
  },

  data() {
    return {
      urls: [],
    };
  },
};
</script>
