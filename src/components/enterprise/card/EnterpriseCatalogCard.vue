<template>

  <div class="card w-96 bg-base-100 my-5 mx-2 shadow-xl justify-self-center">
    <figure><img class="w-full h-64" src={{src}}  /></figure>
    <div class="card-body">
      <h2 class="card-title text-primary" style="margin-bottom: 10px">{{title}}
        <div class="badge badge-primary text-white">{{ ranking }}</div>
      </h2>
      
      <p style="margin-bottom: 10px; text-align: left">{{desc}}</p>
      <div class="card-actions justify-end pb-0">
        <router-link
          v-bind:to="'/company/' + id"
          class="btn btn-primary"
        >
        Find Out More
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>

export default{
  name:'EnterpriseCatalogCard',
  props:[
    'id',
    'title',
    'desc',
    'src',
    'ranking',
  ]
      
}
</script>

<style>
 /* .cards {
    padding-top: 3rem;
    display: flex;
    width: 100%;
    align-content: center;

    padding-bottom: 3rem;
    padding-left: 3rem;
    padding-right: 3rem;

    
  }
  
  .card-body p {
    font-size: small;
  }  */
</style>

