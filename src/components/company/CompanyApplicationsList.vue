<script setup lang="ts">
import { ref } from "vue";
import {
  ProjectType,
  deleteEvent,
} from "../../firebaseHelpers/projectHelpers.ts";
import { useAuthStore } from "../../stores/authStore.ts";
import {
  collection,
  query,
  where,
  onSnapshot,
  or,
  and,
} from "firebase/firestore";
import { db } from "../../firebase.ts";
const authStore = useAuthStore();
const q = query(
  collection(db, "applications"),
  and(
    where("companyId", "==", authStore.getData.uid),
    or(where("status", "==", "PENDING"), where("status", "==", "REJECTED"))
  )
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
  <div class="flex-grow mb-16 flex flex-col">
    <div class="m-auto flex flex-col" v-if="applications.length === 0">
      <IconPencilWrite class="text-gray-300 w-16 h-16 m-auto" />
      <p class="text-gray-300 m-auto w-64 text-center">
        You've got no applications yet, apply for a project to start!
      </p>
      <button
        class="btn btn-primary w-fit m-auto mt-4"
        @click="redirectToProjects()"
      >
        Go to Projects
      </button>
    </div>
    <div class="w-full" v-else>
      <table class="table w-full">
        <tr class="text-primary">
          <th>Project Name</th>
          <th>Applied On</th>
          <th>Status</th>
        </tr>
        <tr v-for="application in applications" class="hover">
          <td>{{ application.projectName }}</td>
          <td class="text-gray-400">
            {{ formatDDMMYYYY(application.appliedOn) }}
          </td>
          <td>
            <span
              v-if="application.status === 'APPROVED'"
              class="badge badge-success"
              >{{ application.status }}</span
            >
            <span
              v-if="application.status === 'PENDING'"
              class="badge badge-warning"
              >{{ application.status }}</span
            >
            <span
              v-if="application.status === 'REJECTED'"
              class="badge badge-error"
              >{{ application.status }}</span
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import IconPencilWrite from "../icons/IconPencilWrite.vue";
export default {
  components: { IconPencilWrite },
  methods: {
    redirectToProjects: function () {
      this.$router.push({ path: "/projects" });
    },
  },
};
</script>
