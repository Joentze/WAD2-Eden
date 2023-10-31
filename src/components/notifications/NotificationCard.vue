<script setup lang="ts">
defineProps({
  title: { type: String },
  description: { type: String },
  type: { type: String },
  index: { type: String, required: true },
});
import { useNotification } from "../../stores/notificationStore";
const notificationStore = useNotification();
function removeNotification(index: number) {
  notificationStore.remove(index);
}
</script>
<template>
  <div
    class="flex flex-row w-80 max-h-24 truncate rounded-md shadow shadow-lg p-2 border border-2 select-none bg-white"
  >
    <div class="flex-grow">
      <p class="text-primary font-bold">{{ title }}</p>
      <p class="text-clamp-2">{{ description }}</p>
    </div>
    <button
      class="btn btn-ghost btn-xs btn-square text-gray-400"
      @click="removeNotification(index)"
    >
      <IconRemove />
    </button>
  </div>
</template>
<script lang="ts">
import IconRemove from "../icons/IconRemove.vue";
export default {
  components: { IconRemove },
};
</script>
