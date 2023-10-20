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
    (a, b) => (a.startDate as Timestamp) - (b.startDate as Timestamp)
  );
  applications.value = currData;
});
</script>
<template>
  <div class="w-full flex flex-col h-screen k">
    <p class="font-bold text-2xl text-primary">
      {{ $route.query.title }}
    </p>
    <div class="divider" />

    <div class="grow flex flex-col gap-2">
      <p class="text-lg text-gray-300">Applicants:</p>
      <div
        class="border border-2 rounded-lg p-4 bg-white shadow shadow-lg"
        v-for="application in applications"
      >
        <div class="flex flex-row gap-2">
          <div class="grow m-auto">
            <p class="font-bold text-primary">
              {{ application.companyName }}
            </p>
          </div>
          <div class="divider divider-horizontal mx-0" />
          <button
            class="btn btn-sm btn-error text-white"
            @click="onStatusUpdate(application.id, ApplicationStatus.REJECTED)"
          >
            REJECT
          </button>
          <button
            class="btn btn-sm btn-success"
            @click="onStatusUpdate(application.id, ApplicationStatus.APPROVED)"
          >
            APPROVE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  ApplicationStatus,
  updateProjectApplicationStatus,
} from "../../firebaseHelpers/projectHelpers.ts";
export default {
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
