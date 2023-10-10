<script setup lang="ts">
import { useNotification } from "../../stores/notificationStore";
import { TransitionRoot } from "@headlessui/vue";
const notificationStore = useNotification();
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
      <div v-for="notification in notificationStore.content" class="text-black">
        {{ notification.title }}
      </div>
    </div>
  </TransitionRoot>
</template>
<script lang="ts"></script>
