<script setup lang="ts">
import { useNotification } from "../../stores/notificationStore";
const notificationStore = useNotification();
</script>
<template>
  <div class="toast" v-if="notificationStore.display">
    <div v-for="notification in notificationStore.content" class="text-black">
      {{ notification.title }}
    </div>
  </div>
</template>
<script lang="ts"></script>
