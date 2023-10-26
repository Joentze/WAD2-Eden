<script setup lang="ts"></script>
<template>
  <div class="w-full h-screen flex flex-col p-4">
    <button class="btn btn-square btn-ghost mb-4" @click="$router.go(-1)">
      <IconArrowLeft class="text-gray-400" />
    </button>
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
      <a v-if="tabState === 'achievements'" class="tab tab-lifted tab-active"
        >Achievements</a
      >
      <a @click="setTabState('achievements')" v-else class="tab tab-lifted"
        >Achievements</a
      >
    </div>
    <div class="flex flex-col sm:p-8 pt-10 gap-8" v-if="tabState === 'about'">
      <p class="text-3xl text-primary font-bold">About Us</p>
      <p class="text-lg text-gray-500 text-justify">
        {{ data.companyDescription }}
      </p>
    </div>
    <div
      class="flex flex-col justify-center items-center gap-8 p-8"
      v-if="tabState === 'media'"
    >
      <p class="text-3xl text-primary font-bold w-full">Media Post</p>
      <MediaCatalogCard
        :v-if="medias.length > 0"
        v-for="media in medias"
        :creatorId="media.creatorId"
        :createdOn="media.createdOn"
        :postDescription="media.postDescription"
        :postImages="media.postImages"
        :createdBy="media.createdBy"
        :creatorPhotoUrl="media.creatorPhotoUrl"
        :creatorType="media.creatorType"
      >
      </MediaCatalogCard>
    </div>
    <div
      v-if="tabState === 'achievements'"
      class="flex flex-col justify-center items-center gap-8 p-8"
    >
      <p class="text-3xl text-primary font-bold w-full">Achievements 🏆</p>
      <div class="flex flex-col sm:flex-row gap-4">
        <TreeHuggerSpline :count="3" />
        <PeoplePleaserSpline :count="3" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  and,
  query,
  orderBy,
  limit,
  startAt,
  collection,
  where,
  endAt,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase.ts";
import { getAccountData } from "../../firebaseHelpers/accountHandler.ts";
import { getMedias } from "../../firebaseHelpers/mediaHelpers.ts";
import IconArrowLeft from "../../components/icons/IconArrowLeft.vue";
import ProjectCard from "../../components/project/ProjectCard.vue";
import MediaCatalogCard from "../../components/media/MediaCatalogCard.vue";
import TreeHuggerSpline from "../../components/awards/TreeHuggerSpline.vue";
import PeoplePleaserSpline from "../../components/awards/PeoplePleaserSpline.vue";
export default {
  components: {
    IconArrowLeft,
    ProjectCard,
    MediaCatalogCard,
    TreeHuggerSpline,
    PeoplePleaserSpline,
  },
  async mounted() {
    await this.getEnterpriseData();
    await this.getMedias();
    await this.getProjects();
  },
  async created() {
    await this.getEnterpriseData();
    await this.getMedias();
    await this.getProjects();
  },
  methods: {
    setTabState: function (state: string) {
      this.tabState = state;
    },
    getMedias: async function () {
      const medias = await getMedias(this.$route.params.corporationId);
      medias.reverse();
      this.medias = medias;
      console.log(this.medias);
    },
    getProjects: async function () {
      const projectRef = collection(db, "projects");
      const q = query(
        projectRef,
        and(
          where("completed", "==", false),
          where("creatorId", "==", this.$route.params.corporationId)
        )
      );
      const querySnapshot = await getDocs(q);

      let projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ ...doc.data(), id: doc.id });
      });
      this.projects = projects;
    },
    getEnterpriseData: async function () {
      this.data = await getAccountData(this.$route.params.corporationId);
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
