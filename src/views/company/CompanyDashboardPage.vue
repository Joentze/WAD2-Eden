<script setup lang="ts"></script>

<template>
  <div class="flex flex-col min-h-screen overflow-y-scroll">
    <div class="flex flex-col">
      <div class="flex-grow flex flex-col font-black sm:text-3xl text-2xl pl-4">
        <p class="mb-2 text-primary">Your Dashboard 👨🏽‍💻</p>
        <p class="font-normal text-sm text-gray-400">
          The following are upcoming events for your organisation
        </p>
      </div>
    </div>
    <div class="divider" />
    <div class="tabs mb-4 w-full">
      <a
        class="tab tab-lifted tab-active text-primary font-bold"
        v-if="tabState === 'events'"
        >Events</a
      >
      <a class="tab tab-lifted" v-else @click="changeTabState">Events</a>
      <a
        class="tab tab-lifted tab-active text-primary font-bold"
        v-if="tabState === 'applications'"
        >Applications</a
      >
      <a class="tab tab-lifted" v-else @click="changeTabState">Applications</a>
    </div>
    <CompanyEventsList v-if="tabState === 'events'" />
    <CompanyApplicationsList v-if="tabState === 'applications'" />
  </div>
</template>
<script lang="ts">
import CompanyEventsList from "../../components/company/CompanyEventsList.vue";
import CompanyApplicationsList from "../../components/company/CompanyApplicationsList.vue";
export default {
  components: { CompanyEventsList, CompanyApplicationsList },
  methods: {
    changeTabState: function () {
      if (this.tabState === "events") {
        this.tabState = "applications";
      } else {
        this.tabState = "events";
      }
    },
  },
  data() {
    return { tabState: "events" };
  },
};
</script>
