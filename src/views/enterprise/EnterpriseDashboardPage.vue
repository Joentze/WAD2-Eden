<script setup lang="ts">
import { ref } from "vue";
import { ProjectType } from "../../firebaseHelpers/projectHelpers.ts";
import { useAuthStore } from "../../stores/authStore.ts";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.ts";
const authStore = useAuthStore();
const q = query(
  collection(db, "projects"),
  where("creatorId", "==", authStore.getData.uid)
);
const projects = ref([]);

onSnapshot(q, (querySnapshot) => {
  const currData = [];
  querySnapshot.forEach((doc) => {
    currData.push({ ...doc.data(), id: doc.id });
  });
  currData.sort(
    (a, b) => (a.startDate as Timestamp) - (b.startDate as Timestamp)
  );
  projects.value = currData;
});
</script>
<template>
  <div class="flex flex-col min-h-screen overflow-y-scroll">
    <div class="flex flex-row">
      <div class="flex-grow flex font-black sm:text-3xl text-2xl">
        <p class="my-auto text-primary ml-4">Project Dashboard 👨🏽‍💻</p>
      </div>
      <ProjectPoster />
    </div>
    <div class="divider" />
    <div class="flex-grow mb-16 flex flex-col">
      <div class="overflow-x-auto" v-if="projects.length > 0">
        <table class="table z-1">
          <thead>
            <tr class="text-gray-300">
              <th class="">Name</th>
              <th class="text-center">Start Date</th>
              <th class="text-center">Tag</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects"
              class="hover"
              @click="redirectToApplications(project.id, project.projectTitle)"
            >
              <th class="text-primary font-normal w-full">
                {{ project.projectTitle }}
              </th>
              <td>{{ project.startDate }}</td>
              <td>
                <span class="badge badge-md badge-primary text-white">{{
                  project.projectTag
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="m-auto flex flex-col" v-if="projects.length === 0">
        <IconEarth class="text-gray-300 w-16 h-16 m-auto" />
        <p class="text-gray-300 m-auto w-64 text-center">
          You don't have any projects yet, click the "+" icon to start
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ProjectPoster from "../../components/enterprise/projects/ProjectPoster.vue";
import IconEarth from "../../components/icons/IconEarth.vue";
export default {
  components: { ProjectPoster, IconEarth },
  methods: {
    redirectToApplications: function (projectId: string, projectName: string) {
      this.$router.push({
        path: `/application/project/${projectId}`,
        query: {
          title: projectName,
        },
      });
    },
  },
};
</script>
