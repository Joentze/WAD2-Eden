<script setup lang="ts">
import { ref } from "vue";
import { ProjectType } from "../../firebaseHelpers/projectHelpers.ts";
import { useAuthStore } from "../../stores/authStore.ts";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.ts";
const authStore = useAuthStore();
const q = query(
  collection(db, "events"),
  where("companyId", "==", authStore.getData.uid)
);
const events = ref([]);
onSnapshot(q, (querySnapshot) => {
  const currData = [];
  querySnapshot.forEach((doc) => {
    currData.push({ ...doc.data(), id: doc.id });
  });
  currData.sort(
    (a, b) => (a.startDate as Timestamp) - (b.startDate as Timestamp)
  );
  events.value = currData;
});
console.log(events);
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-y-scroll">
    <div class="flex flex-col">
      <div class="flex-grow flex flex-col font-black sm:text-3xl text-2xl pl-4">
        <p class="mb-2 text-primary">Upcoming Events 📆</p>
        <p class="font-normal text-sm text-gray-400">
          The following are upcoming events for your organisation
        </p>
      </div>
    </div>
    <div class="divider" />
    <div class="flex-grow mb-16 flex flex-col">
      <div class="m-auto flex flex-col">
        <IconCalendar class="text-gray-300 w-16 h-16 m-auto" />
        <p class="text-gray-300 m-auto w-64 text-center">
          You don't have any projects yet, click the "+" icon to start
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import IconCalendar from "../../components/icons/IconCalendar.vue";
export default {
  components: { IconCalendar },
};
</script>
