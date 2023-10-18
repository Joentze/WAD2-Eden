<script setup></script>
<template>
  <div class="card lg:w-6/12 bg-base-100 shadow-xl justify-self-center">
    <div class="card-body">
      <h2 class="card-title text-accent">
        <div class="avatar">
          <div class="w-20 rounded-full">
            <img :src="companyLogo" alt="" />
          </div>
        </div>
        {{ companyName }}
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <h3 class="text-accent">{{ postTitle }}</h3>
      <p class="text-base-content">
        {{ postDescription }}
      </p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">{{ tagOne }}</div>
        <div class="badge badge-outline">{{ tagTwo }}</div>
      </div>
    </div>
    <figure>
      <img class="p-1" :src="postMedia" alt="" />
    </figure>
  </div>
  <br>
</template>
<script>
export default {
  props: {
    companyName: String,
    companyLogo: String,
    postTitle: String,
    postDescription: String,
    tagOne: String,
    tagTwo: String,
    postMedia: String,
  },
};
</script>
