<script setup lang="ts">
import { ref } from "vue";
import { ProjectType } from "../../firebaseHelpers/projectHelpers.ts";
import { useAuthStore } from "../../stores/authStore.ts";
import { collection, query, where, onSnapshot, and } from "firebase/firestore";
import { db } from "../../firebase.ts";
import { useRoute } from "vue-router";
import {
  ApplicationStatus,
  updateProjectApplicationStatus,
} from "../../firebaseHelpers/projectHelpers.ts";
const route = useRoute();
const projectId = route.params.projectId;
const q = query(
  collection(db, "applications"),
  and(where("projectId", "==", projectId), where("status", "==", "PENDING"))
);
const applications = ref([]);

onSnapshot(q, (querySnapshot) => {
  const currData = [];
  querySnapshot.forEach((doc) => {
    currData.push({ ...doc.data(), id: doc.id });
  });
  currData.sort(
    (a, b) => (a.appliedOn as Timestamp) - (b.appliedOn as Timestamp)
  );
  applications.value = currData;
});
function formatDDMMYYYY(date: Timestamp) {
  date = date.toDate();
  var day = date.getDate();
  var month = date.getMonth() + 1; // the month starts from 0
  var year = date.getFullYear();

  // add leading zero if day or month is less than 10
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  var convertedDate = day + "/" + month + "/" + year;
  return convertedDate;
}
</script>
<template>
  <div class="w-full flex flex-col h-screen k">
    <div class="flex flex-row">
      <button class="btn btn-square btn-ghost" @click="$router.go(-1)">
        <IconArrowLeft class="text-gray-400" />
      </button>
      <p class="font-bold text-2xl text-primary grow text-right m-auto">
        {{ $route.query.title }}
      </p>
    </div>
    <div class="divider" />

    <div class="grow flex flex-col gap-2" v-if="applications.length > 0">
      <p class="text-md text-gray-300">Applicants:</p>
      <div
        class="border border-2 rounded-lg p-4 bg-white shadow shadow-lg"
        v-for="application in applications"
      >
        <div class="flex flex-row gap-2">
          <div class="m-auto">
            <div class="avatar" v-if="application.companyPhotoUrl.length">
              <div class="w-10 max-h-10 rounded-full border">
                <img :src="application.companyPhotoUrl" />
              </div>
            </div>
            <div class="avatar placeholder" v-else>
              <div
                class="bg-neutral-focus text-neutral-content rounded-full w-10 border"
              >
                <span>{{ application.companyName[0].toUpperCase() }}</span>
              </div>
            </div>
          </div>
          <div class="grow m-auto">
            <p class="font-bold text-primary">
              {{ application.companyName }}
            </p>
            <p class="text-gray-400 text-sm">
              Applying for: {{ application.pax }} Pax
            </p>
          </div>
          <div class="divider divider-horizontal mx-0" />
          <div class="m-auto flex sm:flex-row flex-col gap-2">
            <button
              class="btn btn-sm btn-error text-white"
              @click="
                onStatusUpdate(application.id, ApplicationStatus.REJECTED)
              "
            >
              REJECT
            </button>
            <button
              class="btn btn-sm btn-success"
              @click="
                onStatusUpdate(application.id, ApplicationStatus.APPROVED)
              "
            >
              APPROVE
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="grow flex flex-col">
      <div class="m-auto flex flex-col gap-2">
        <IconAd class="w-16 h-16 text-gray-300 m-auto" />
        <p class="m-auto text-gray-300 text-center">
          No outstanding applications for:<br />
          {{ $route.query.title }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  ApplicationStatus,
  updateProjectApplicationStatus,
} from "../../firebaseHelpers/projectHelpers.ts";
import IconAd from "../../components/icons/IconAd.vue";
import IconArrowLeft from "../../components/icons/IconArrowLeft.vue";
export default {
  components: { IconAd, IconArrowLeft },
  methods: {
    onStatusUpdate: async function (
      applicationId: string,
      applicationStatus: ApplicationStatus
    ) {
      try {
        await updateProjectApplicationStatus(applicationId, applicationStatus);
      } catch (e) {
        console.error(e);
        throw new Error(e.message);
      }
    },
  },
};
</script>
