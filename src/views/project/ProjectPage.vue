<script setup lang="ts">
import { ref } from "vue";
import { db } from "../../firebase.ts";
import { doc, onSnapshot } from "firebase/firestore";
import { useRoute } from "vue-router";
const postData = ref(undefined);
const route = useRoute();

onSnapshot(doc(db, "projects", route.params.projectId), (doc) => {
  postData.value = doc.data();
});
</script>

<template>
  <div class="flex flex-row p-4 sm:px-36">
    <div class="grow">
      <p class="m-auto mt-4 text-2xl text-primary font-bold">
        {{ postData.projectTitle }}
      </p>
    </div>
    <button class="btn btn-primary btn-square">+</button>
  </div>
  <div class="divider sm:px-36"></div>
  <div class="w-full p-4 sm:px-36 flex flex-col sm:flex-row gap-4">
    <div
      class="w-full sm:grow border border-2 rounded-lg m-auto max-h-[680px] overflow-hidden"
    >
      <div class="w-full h-full carousel">
        <div
          class="carousel-item w-full flex flex-col"
          v-for="image in postData.projectImages"
        >
          <img :src="image" class="m-auto bg-center" />
        </div>
      </div>
    </div>
    <div class="sm:w-96 w-full grow flex flex-col gap-4">
      <div class="rounded-lg border border-2 h-full shadow shadow-xl"></div>
      <div class="rounded-lg border border-2 sm:w-96 h-96 overflow-hidden">
        <iframe
          style="border: 0; width: 100%; height: 100%"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0QRy8UHpLXE2zWyq3lj_NiP79IzC4zno&q=Space+Needle,Seattle+WA"
        >
        </iframe>
      </div>
    </div>
  </div>
</template>
<script></script>
