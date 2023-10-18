<template>
  <div
    class="card w-96 bg-base-100 my-5 mx-2 shadow-xl justify-self-center"
    v-for="card in filteredCards"
    v-bind:key="card.id"
  >
    <figure><img class="w-full h-64" v-bind:src="card.src" /></figure>
    <div class="card-body">
      <h2 class="card-title text-primary" style="margin-bottom: 10px">
        {{ card.title }}
      </h2>
      <p style="margin-bottom: 10px; text-align: left">
        {{ card.desc }}
      </p>
      <div class="card-actions justify-end pb-0">
        <router-link
          v-bind:to="'/enterprise/' + card.id"
          class="btn btn-primary"
        >
          Find Out More
        </router-link>
      </div>
    </div>
  </div>
</template>
