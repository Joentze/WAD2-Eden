<script setup lang="ts"></script>

<template>
  <div class="flex flex-row w-full mt-64">
    <div class="flex-grow overflow-x-scroll overflow-y-visible">
      <div class="w-fit flex flex-row gap-2 h-16">
        <div class="avatar mt-2" v-for="(url, idx) in urls">
          <div class="w-16 rounded-xl overflow-y-visible">
            <img :src="url" />
          </div>
          <button
            class="btn btn-xs btn-primary -mx-2 -my-2 z-2"
            @click="removeImage(idx)"
          >
            x
          </button>
        </div>
      </div>
    </div>
    <input
      type="file"
      class="file-input w-full max-w-xs file-input-xs m-auto"
      @change="uploadImages"
      multiple
    />
  </div>
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
    removeImage: function (index: number) {
      this.urls.splice(index, 1);
    },
  },

  data() {
    return {
      urls: [],
    };
  },
};
</script>
