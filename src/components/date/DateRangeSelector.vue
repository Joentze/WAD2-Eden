<script setup lang="ts">
import { watch, ref } from "vue";
const emit = defineEmits(["emitDate"]);
const startDate = ref(dateFormat(new Date()));
const endDate = ref(dateFormat(new Date()));
function dateFormat(now) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
// watch(startDate, () => {});
const emitDates = () => {
  emit("emitDate", { startDate, endDate });
};
</script>

<template>
  <div class="flex flex-row gap-4">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text text-primary font-bold">Start Time</span>
      </label>
      <input
        type="datetime-local"
        class="input input-bordered text-primary"
        :min="dateFormat(new Date())"
        v-model="startDate"
        @change="emitDates"
      />
    </div>

    <span class="mt-12 text-gray-400">-</span>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text text-primary font-bold">End Time</span>
      </label>

      <input
        type="datetime-local"
        class="input input-bordered text-primary"
        :min="startDate"
        v-model="endDate"
        @change="emitDates"
      />
    </div>
  </div>
</template>
<!-- <script lang="ts"></script> -->
