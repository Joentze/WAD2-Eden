<template>
  <div
    class="card w-64 bg-base-100 my-5 mx-2 shadow-xl justify-self-center border border-2 pt-4 flex flex-col"
    v-bind:key="id"
  >
    <figure>
      <div class="avatar" v-if="photoUrl.length">
        <div class="w-36 rounded-full border">
          <img :src="photoUrl" />
        </div>
      </div>
      <div class="avatar placeholder" v-else>
        <div
          class="bg-neutral-focus text-neutral-content rounded-full w-36 border"
        >
          <span>{{ companyName[0].toUpperCase() }}</span>
        </div>
      </div>
    </figure>
    <div class="card-body text-center m-auto">
      <h2 class="card-title text-primary text-center m-auto text-xl">
        {{ companyName }}
      </h2>
      <p class="-mt-1 text-gray-500 line-clamp-3 text-center">
        {{ companyDescription }}
      </p>
      <div class="card-actions justify-end pb-0 mt-2">
        <router-link
          v-bind:to="'/corporation/' + id"
          class="btn btn-primary m-auto"
        >
          Find Out More
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    id: String,
    companyName: String,
    companyDescription: String,
    photoUrl: String,
    ranking: Number,
  },
  // ["id", "title", "desc", "src", "ranking"],
};
</script>
