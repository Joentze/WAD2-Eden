<script setup>
import { useFirebaseAuth } from "vuefire";
const auth = useFirebaseAuth();
</script>
<template>
  <img src="../mediaFade.png" class="w-full h-full fixed top-0 left-0" />
  <div class="flex flex-col gap-8 w-full h-full pt-10">
    <div
      class="flex flex-row gap-2 m-auto w-full sm:w-4/6 pb-6 border-b-2 z-20"
      v-if="auth.currentUser !== null"
    >
      <div class="grow flex flex-col">
        <p class="text-3xl text-primary font-bold grow">Make a Post</p>
        <p class="text-sm text-gray-400">
          Influence climate culture by sharing a post!
        </p>
      </div>
      <MediaPosterModal />
    </div>
    <div
      class="flex flex-row gap-2 m-auto w-full sm:w-4/6 pb-6 border-b-2"
      v-else
    >
      <div class="grow flex flex-col">
        <p class="text-3xl text-primary font-bold grow">Latest Post</p>
      </div>
    </div>

    <div
      class="flex flex-col justify-center items-center gap-8 z-10"
      id="posts"
    >
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
      <div id="endLine" />
    </div>
  </div>
</template>
<script>
// import list of activity posts
// v-for the list and create the below cards accordingly

import MediaCatalogCard from "../../components/media/MediaCatalogCard.vue";
import MediaPosterModal from "../../components/media/MediaPosterModal.vue";
import { getAllMedias } from "../../firebaseHelpers/mediaHelpers.ts";
export default {
  components: { MediaCatalogCard, MediaPosterModal },
  async created() {
    await this.getMedias();
  },
  async mounted() {
    await this.getMedias();
    let endLine = document.getElementById("endLine");
    let observer = new IntersectionObserver(async (items) => {
      this.getNo += 10;
      await this.getMedias();
    });
    observer.observe(endLine);
  },
  methods: {
    getMedias: async function () {
      this.medias = await getAllMedias(this.getNo);
      console.log(this.medias);
    },
  },
  data() {
    return {
      getNo: 10,
      medias: [],
      postMedia1: ["https://static.mothership.sg/1/2019/09/Gai-Gai-1.jpg"],
      postMedia2: [
        "https://static1.straitstimes.com.sg/s3fs-public/styles/large30x20/public/articles/2023/03/10/20230308344561551d0489a7-eaed-4472-9cf0-9428d6c03914.jpg?VersionId=ZY0b39Jp3PEBsk7c.fTAtOI1P2mNgUaI",
        "https://www.sg101.gov.sg/images/connexionsg/2023/singapore%20world%20water%20day.png",
      ],
    };
  },
};
</script>
