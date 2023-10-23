<script setup></script>
<template>
  <div
    class="card sm:w-1/2 w-full bg-base-100 shadow-xl justify-self-center border border-2"
  >
    <div class="card-body">
      <div class="flex flex-row gap-4">
        <h2 class="card-title text-primary grow">
          <div class="avatar" v-if="creatorPhotoUrl.length > 0">
            <div class="w-8 rounded-full border">
              <img :src="creatorPhotoUrl" />
            </div>
          </div>
          <div class="avatar placeholder" v-else>
            <div
              class="bg-neutral-focus text-neutral-content rounded-full w-8 border"
            >
              <span>{{ createdBy[0].toUpperCase() }}</span>
            </div>
          </div>
          <a class="hover:underline" :href="'/' + creatorType + '/' + id">{{
            createdBy
          }}</a>
        </h2>
        <div v-if="tagOne" class="badge badge-primary text-white m-auto">
          {{ tagOne }}
        </div>
      </div>
      <p class="text-gray-500 line-clamp-3" v-if="seeMore === false">
        {{ postDescription }}
      </p>
      <p class="text-gray-500" v-if="seeMore === true">
        {{ postDescription }}
      </p>
      <button
        @click="() => (seeMore = !seeMore)"
        class="btn btn-sm btn-ghost text-gray-300 hover:text-gray-600"
        v-if="postDescription.length > 270 && seeMore === false"
      >
        See More
      </button>
      <button
        @click="() => (seeMore = !seeMore)"
        class="btn btn-sm btn-ghost text-gray-300 hover:text-gray-600"
        v-if="postDescription.length > 270 && seeMore === true"
      >
        See Less
      </button>
    </div>

    <div class="w-full carousel -mt-4 rounded-box">
      <div v-for="post in postImages" class="carousel-item w-full">
        <img :src="post" class="w-full p-1 rounded-box" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    creatorId: String,
    creatorType: String,
    createdBy: String,
    creatorPhotoUrl: String,
    postTitle: String,
    postDescription: String,
    tagOne: String,
    postImages: Array,
  },
  data() {
    return {
      seeMore: false,
    };
  },
};
</script>
