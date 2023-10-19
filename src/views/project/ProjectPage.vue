<script setup lang="ts">
import { ref } from "vue";
import { db } from "../../firebase.ts";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { useRoute } from "vue-router";
const postData = ref(undefined);
const route = useRoute();

onSnapshot(doc(db, "projects", route.params.projectId), (doc) => {
  postData.value = doc.data();
});

const locationUrl = (address) => {
  return (
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyA0QRy8UHpLXE2zWyq3lj_NiP79IzC4zno&q=" +
    encodeURIComponent(address)
  );
};
const convertTimestampToDate = (timestamp: Timestamp) => {
  let date = timestamp.toDate();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Add leading zeros if necessary
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return the formatted date string using a template string
  return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
};
</script>

<template>
  <div class="sm:px-36 w-full h-full flex flex-col gap-4">
    <div class="flex flex-row p-4">
      <div class="grow">
        <p class="m-auto mt-4 text-2xl text-primary font-bold">
          {{ postData.projectTitle }}
        </p>
      </div>
      <ProjectAvatarGroup :joined="postData.joined" class="m-auto" />
    </div>
    <!-- <div class="divider sm:px-36"></div> -->
    <div class="w-full flex flex-col sm:flex-row gap-4">
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
      <div class="sm:w-96 w-full grow flex flex-col gap-6">
        <div
          class="rounded-lg border sm:w-96 w-full border-2 h-full shadow shadow-xl flex flex-col p-6 gap-4 bg-white"
        >
          <iframe
            class="rounded-lg w-full h-full border border-1"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :src="locationUrl(postData.projectAddress)"
          >
          </iframe>

          <div class="flex flex-row">
            <p class="text-xl text-primary font-bold grow">Details</p>
            <span class="badge badge-primary text-white">{{
              postData.projectTag
            }}</span>
          </div>

          <p class="text-sm text-primary flex flex-row">
            <span class="text-gray-400 grow">Address: </span
            >{{ postData.projectAddress }}
          </p>
          <p class="text-sm text-primary flex flex-row">
            <span class="text-gray-400 grow">Start: </span>
            <span class="badge shadow">{{
              convertTimestampToDate(postData.projectStart)
            }}</span>
          </p>
          <p class="text-sm text-primary flex flex-row">
            <span class="text-gray-400 grow">End: </span
            ><span class="badge shadow">{{
              convertTimestampToDate(postData.projectEnd)
            }}</span>
          </p>
          <div class="divider -my-0" />
          <p class="text-gray-300 text-sm">How many joining?</p>
          <div>
            <input
              type="range"
              min="0"
              max="100"
              value="25"
              class="range range-xs range-primary"
              step="25"
            />
            <div class="w-full flex justify-between text-xs px-2 text-gray-400">
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20+</span>
            </div>
          </div>
          <button class="btn btn-primary">Apply Now</button>
        </div>
      </div>
    </div>
    <div
      class="p-8 flex flex-col sm:flex-row gap-4 border border-2 bg-white shadow shadow-lg rounded-lg"
    >
      <div class="flex flex-col gap-4 grow">
        <div class="flex flex-row">
          <div class="grow">
            <p class="text-xl sm:text-2xl text-primary font-bold">About ✨</p>
          </div>
          <div class="flex flex-row gap-2">
            <div class="avatar" v-if="postData.creatorPhotoUrl">
              <div class="w-8 rounded-full">
                <img :src="creatorPhotoUrl" />
              </div>
            </div>
            <div class="avatar placeholder" v-else>
              <div
                class="bg-neutral-focus text-neutral-content rounded-full w-10"
              >
                <span class="text-lg">
                  {{ postData.creatorName[0].toUpperCase() }}</span
                >
              </div>
            </div>
            <p
              class="m-auto text-left w-full text-lg text-gray-400 text-xs sm:text-lg"
            >
              by {{ postData.creatorName }}
            </p>
          </div>
        </div>
        <div class="h-48 overflow-y-scroll">
          <p class="text-justify text-gray-500">
            {{ postData.projectDescription }}
          </p>
        </div>
      </div>
      <div class="divider sm:divider-horizontal"></div>
      <div id="joined" class="w-fit h-full">
        <div class="w-80 flex flex-col gap-2">
          <p class="font-bold text-primary text-xl">Who's Coming ✋🏼</p>
          <div class="h-48 mt-2 overflow-y-scroll flex flex-col gap-2">
            <div
              v-for="join in postData.joined"
              class="border-b-2 flex flex-row gap-4 p-2"
              @click="redirect(`/company/${join.companyId}`)"
            >
              <div class="avatar">
                <div class="w-10 rounded-full border border-2">
                  <img :src="join.companyPhotoUrl" />
                </div>
              </div>
              <a class="text-md text-primary font-bold mt-2">
                {{ join.companyName }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ProjectAvatarGroup from "../../components/project/ProjectAvatarGroup.vue";
import { useRouter } from "vue-router";
const router = useRouter();
export default {
  components: { ProjectAvatarGroup },
  methods: {
    redirect(path) {
      this.$router.push({ path });
    },
  },
};
</script>
