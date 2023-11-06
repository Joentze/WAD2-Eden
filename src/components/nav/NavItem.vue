<script setup lang="ts">
import { RouterLink } from "vue-router";
defineProps<{
  icon: HTMLElement;
  label: string;
  link: string;
}>();
</script>
<template>
  <li @click="closeNav">
    <RouterLink :to="link">
      <a
        class="flex flex-row gap-2 text-accent"
        v-if="$route.fullPath.includes(link.toLowerCase())"
        ><component :is="icon"></component>
        {{ label }}
      </a>
      <a class="flex flex-row gap-2" v-else
        ><component :is="icon"></component>
        {{ label }}
      </a>
    </RouterLink>
  </li>
</template>
<script lang="ts">
export default {
  methods: {
    closeNav: function () {
      document.getElementById("my-drawer")?.click();
    },
  },
};
</script>
