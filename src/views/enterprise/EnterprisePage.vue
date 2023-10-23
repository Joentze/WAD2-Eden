<script setup lang="ts"></script>
<template>
  <div class="w-full h-screen flex flex-col p-4">
    <div class="flex flex-row gap-8">
      <div>
        <div class="avatar" v-if="data.photoUrl.length > 0">
          <div class="sm:w-36 w-16 rounded-full border">
            <img :src="data.photoUrl" />
          </div>
        </div>
        <div class="avatar placeholder" v-else>
          <div
            class="bg-neutral-focus text-neutral-content rounded-full sm:w-36 w-16 border text-xl"
          >
            <span>{{ data.companyName[0].toUpperCase() }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:gap-4 grow">
        <a
          :href="data.siteUrl"
          class="text-lg sm:text-4xl text-primary font-bold hover:underline"
        >
          {{ data.companyName }}
        </a>
        <p class="text-gray-400">{{ data.email }}</p>
        <p class="text-gray-400">{{ data.phoneNo }}</p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="tabs">
      <a v-if="tabState === 'about'" class="tab tab-lifted tab-active">About</a>
      <a @click="setTabState('about')" v-else class="tab tab-lifted">About</a>
      <a v-if="tabState === 'media'" class="tab tab-lifted tab-active">Media</a>
      <a @click="setTabState('media')" v-else class="tab tab-lifted">Media</a>
      <a v-if="tabState === 'projects'" class="tab tab-lifted tab-active"
        >Projects</a
      >
      <a v-else class="tab tab-lifted" @click="setTabState('projects')"
        >Projects</a
      >
    </div>
    <div class="flex flex-col sm:p-8 pt-10 gap-8" v-if="tabState === 'about'">
      <p class="text-3xl text-primary font-bold">About Us</p>
      <p class="text-lg text-gray-500 text-justify">
        {{ data.companyDescription }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { getAccountData } from "../../firebaseHelpers/accountHandler.ts";
import { getMedias } from "../../firebaseHelpers/mediaHelpers.ts";
export default {
  async mounted() {
    await this.getEnterpriseData();
    await this.getMedias();
  },
  async created() {
    await this.getEnterpriseData();
    await this.getMedias();
  },
  methods: {
    setTabState: function (state: string) {
      this.tabState = state;
    },
    getMedias: async function () {
      this.medias = await getMedias(this.$route.params.enterpriseId);
      console.log(this.medias);
    },
    getProjects: async function () {},
    getEnterpriseData: async function () {
      this.data = await getAccountData(this.$route.params.enterpriseId);
      console.log(this.data);
    },
  },

  data() {
    return {
      data: {},
      medias: [],
      projects: [],
      tabState: "about",
    };
  },
};
</script>
