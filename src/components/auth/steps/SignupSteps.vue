<script setup lang="ts">
defineProps({
  stepNo: { type: Number, required: true },
  setState: { type: Function },
});
</script>
<template>
  <ul class="steps steps-horizontal">
    <li v-if="stepNo >= 0" class="step step-primary" @click="setState(0)"></li>
    <li v-else class="step" @click="setState(0)"></li>
    <li v-if="stepNo >= 1" class="step step-primary" @click="setState(1)"></li>
    <li v-else class="step" @click="setState(1)"></li>
    <li v-if="stepNo >= 2" class="step step-primary" @click="setState(2)"></li>
    <li v-else class="step" @click="setState(2)"></li>
    <li v-if="stepNo >= 3" class="step step-primary" @click="setState(3)"></li>
    <li v-else class="step" @click="setState(3)"></li>
  </ul>
</template>
