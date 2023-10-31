<template>
  <div
    class="card w-80 bg-base-100 h-96 my-5 mx-2 shadow-xl justify-self-center border border-2 flex flex-col"
    v-bind:key="id"
  >
    <figure>
      <img :src="projectImages[0]" />
    </figure>
    <div class="card-body flex flex-col">
      <div class="flex flex-row">
        <h2 class="card-title text-primary text-xl grow">
          {{ projectTitle }}
        </h2>
        <span class="badge badge-primary text-white m-auto">{{
          projectTag
        }}</span>
      </div>
      <p class="-mt-1 text-gray-500 line-clamp-3 text-left">
        {{ projectDescription }}
      </p>
      <div class="card-actions justify-end pb-0 mt-2 flex flex-row">
        <p class="text-sm text-primary text-left grow">
          by <span class="underline">{{ creatorName }}</span>
        </p>
        <a class="btn btn-square btn-ghost btn-sm" :href="'/project/' + id">
          <IconArrowRight class="text-gray-300" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: String,
    projectImages: Array,
    projectTitle: String,
    projectTag: String,
    projectDescription: String,
    creatorName: String,
  },
};
</script>
