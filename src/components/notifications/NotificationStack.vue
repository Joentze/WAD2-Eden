<script setup lang="ts">
import { useNotification } from "../../stores/notificationStore";
import { TransitionRoot } from "@headlessui/vue";
const notificationStore = useNotification();
function clearAll() {
  notificationStore.$patch({ content: [] });
}
</script>
<template>
  <TransitionRoot
    :show="notificationStore.display"
    enter="transition-opacity duration-75"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-150"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div class="toast" v-if="notificationStore.display">
      <NotificationCard
        v-for="(notification, index) in notificationStore.content"
        :title="notification.title"
        :description="notification.description"
        :type="notification.type"
        :index="index"
      />

      <button
        class="btn btn-sm"
        @click="clearAll()"
        v-if="notificationStore.content.length > 0"
      >
        Clear All
      </button>
    </div>
  </TransitionRoot>
</template>
<script lang="ts">
import NotificationCard from "./NotificationCard.vue";
export default {
  components: { NotificationCard },
};
</script>
