<template>
 
    <div class="stats stats-vertical lg:stats-horizontal shadow">
  
        <div class="stat">
          <div class="stat-title text-secondary">Projects Completed</div>
          <div class="stat-value text-primary">{{projectsCompleted}}</div>
          <div class="stat-desc">2021 - 2023</div>
        </div>
        
        <div class="stat">
          <div class="stat-title text-secondary">Employees Involved</div>
          <div class="stat-value text-primary">{{employees}}</div>
          <div class="stat-desc">↗︎ 400 (22%)</div>
        </div>
        
        <div class="stat">
          <div class="stat-title text-secondary">ESG Rating</div>
          <div class="stat-value text-primary">{{esgRating}}</div>
          <div class="stat-desc">↗︎ 90 (14%)</div>
        </div>
      </div>
      <br>      

</template>

<script>

export default{
  name:'CompanyStats',
  props:[
    'projectsCompleted',
    'employees',
    'esgRating'
  ]
      
}
</script>

<style>

</style>

