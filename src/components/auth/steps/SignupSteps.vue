<script setup lang="ts">
defineProps(["stepNo"]);
</script>
<template>
  <ul class="steps steps-horizontal">
    <li v-if="stepNo >= 0" class="step step-primary"></li>
    <li v-else class="step"></li>
    <li v-if="stepNo >= 1" class="step step-primary"></li>
    <li v-else class="step"></li>
    <li v-if="stepNo >= 2" class="step step-primary"></li>
    <li v-else class="step"></li>
    <li v-if="stepNo >= 3" class="step step-primary"></li>
    <li v-else class="step"></li>
  </ul>
</template>
