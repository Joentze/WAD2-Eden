<script setup lang="ts">
import { ref } from "vue";
import {
  ProjectType,
  deleteEvent,
} from "../../firebaseHelpers/projectHelpers.ts";
import { useAuthStore } from "../../stores/authStore.ts";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.ts";

const authStore = useAuthStore();
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

const onDelete = async (eventId: string) => {
  try {
    deleteEvent(eventId);
  } catch (e) {
    throw new Error(e.message);
  }
};
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
      <div
        v-for="event in events"
        v-if="events.length > 0"
        class="border border-2 rounded-lg p-4 bg-white shadow shadow-lg"
      >
        <div class="flex flex-row gap-2">
          <div class="grow m-auto">
            <p class="font-bold text-primary">
              {{ event.projectTitle }}
            </p>
            <p class="text-sm text-gray-400">
              Happening on:
              <span class="font-bold">{{
                formatDDMMYYYY(event.projectStart)
              }}</span>
            </p>
          </div>
          <span class="badge badge-primary text-white m-auto">{{
            event.projectTag
          }}</span>

          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-sm btn-square btn-ghost mt-1"
              ><IconDotsVertical class="text-gray-400"
            /></label>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 shadow shadow-lg border border-2 text-primary"
            >
              <li>
                <a @click="createCalendarEvent(event)"
                  >Add to Google Calendar</a
                >
              </li>
              <li>
                <a @click="deleteEvent(event.id)" class="text-error"
                  >Cancel Event</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="m-auto flex flex-col" v-if="events.length === 0">
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
import IconDotsVertical from "../../components/icons/IconDotsVertical.vue";
// import { google } from "googleapis";
export default {
  components: { IconCalendar, IconDotsVertical },
  methods: {
    dateFormat: function (now) {
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      return `${year}${month}${day}T${hours}${minutes}00Z`;
    },
    createCalendarEvent: function (projectData) {
      const {
        projectTitle,
        projectStart,
        projectEnd,
        projectAddress,
        projectDescription,
      } = projectData;

      let title = encodeURIComponent(projectTitle);
      let details = encodeURIComponent(projectDescription);
      let address = encodeURIComponent(projectAddress);
      let start = encodeURIComponent(this.dateFormat(projectStart.toDate()));
      let end = encodeURIComponent(this.dateFormat(projectEnd.toDate()));
      window.open(
        `https://calendar.google.com/calendar/event?action=TEMPLATE&dates=${start}/${end}&text=${title}&location=${address}&details=${details}`
      );
    },
  },
};
</script>
