<script setup></script>
<template>
  <br />
  <div
    class="card lg:w-6/12 bg-base-100 shadow-xl justify-self-center border border-2"
  >
    <div class="card-body">
      <div class="flex flex-row gap-4">
        <h2 class="card-title text-primary grow">
          <div class="avatar border border-2 rounded-full">
            <div class="w-8 rounded-full">
              <img :src="companyLogo" alt="" />
            </div>
          </div>
          {{ companyName }}
        </h2>
        <div class="badge badge-primary text-white m-auto">{{ tagOne }}</div>
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

    <div class="w-full carousel rounded-box">
      <div v-for="post in postMedia" class="carousel-item w-full">
        <img :src="post" class="w-full p-1 rounded-box" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    companyName: String,
    companyLogo: String,
    postTitle: String,
    postDescription: String,
    tagOne: String,
    postMedia: Array,
  },
  data() {
    return {
      seeMore: false,
    };
  },
};
</script>
