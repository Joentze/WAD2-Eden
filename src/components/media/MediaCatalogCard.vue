<script setup></script>
<template>
  <br />
  <div class="card lg:w-6/12 bg-base-100 shadow-xl justify-self-center">
    <div class="card-body">
      <div class="flex flex-row">
        <h2 class="card-title text-primary flex-grow">
          <div class="avatar">
            <div class="w-12 rounded-full">
              <img :src="companyLogo" alt="" />
            </div>
          </div>
          {{ companyName }}
        </h2>
        <div class="badge badge-primary text-white m-auto">{{ tagOne }}</div>
      </div>
      <h3 class="text-primary">{{ postTitle }}</h3>
      <p class="text-base-content">
        {{ postDescription }}
      </p>
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
};
</script>
