<script setup lang="ts">
import { ref } from "vue";
import {
  ProjectType,
  setProjectCompleted,
} from "../../firebaseHelpers/projectHelpers.ts";
import { useAuthStore } from "../../stores/authStore.ts";
import { collection, query, where, onSnapshot, and } from "firebase/firestore";
import { db } from "../../firebase.ts";
const authStore = useAuthStore();
const q = query(
  collection(db, "projects"),
  and(
    where("creatorId", "==", authStore.getData.uid),
    where("completed", "==", false)
  )
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
  <div class="flex flex-col min-h-screen overflow-y-scroll">
    <div class="flex flex-row">
      <div class="flex-grow flex font-black sm:text-3xl text-2xl">
        <p class="my-auto text-primary ml-4">Project Dashboard 👨🏽‍💻</p>
      </div>
      <ProjectPoster />
    </div>
    <p class="ml-4 text-sm text-gray-300">
      Double click on project to see applicants
    </p>
    <div class="divider" />
    <div class="grow mb-16 flex flex-col">
      <div class="overflow-x-auto grow" v-if="projects.length > 0">
        <table class="table z-1 grow">
          <thead>
            <tr class="text-gray-300">
              <th class="">Name</th>
              <th class="text-center">Start Date</th>
              <th class="text-center">End Date</th>
              <th class="text-center">Tag</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects"
              class="hover"
              @dblclick="
                redirectToApplications(project.id, project.projectTitle)
              "
            >
              <th class="text-primary font-normal w-full">
                {{ project.projectTitle }}
              </th>

              <td class="text-xs text-gray-400">
                {{ formatDDMMYYYY(project.projectStart) }}
              </td>
              <td class="text-xs text-gray-400">
                {{ formatDDMMYYYY(project.projectEnd) }}
              </td>
              <td>
                <span class="badge badge-md badge-primary text-white">{{
                  project.projectTag
                }}</span>
              </td>
              <td class="z-10">
                <div class="dropdown dropdown-end">
                  <label
                    tabindex="0"
                    class="btn m-1 btn-square btn-sm text-gray-400 btn-ghost"
                    ><IconDotsVertical
                  /></label>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-primary"
                  >
                    <li>
                      <a @click="setProjectCompleted(project.id)"
                        >Mark as "Complete"</a
                      >
                    </li>
                  </ul>
                </div>
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
import IconDotsVertical from "../../components/icons/IconDotsVertical.vue";
export default {
  components: { ProjectPoster, IconEarth, IconDotsVertical },
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
