<script setup lang="ts">
import { JoinedType } from "../../firebaseHelpers/projectHelpers";
defineProps<{
  joined: JoinedType[];
}>();
</script>
<template>
  <div class="flex flex-row gap-2" v-if="joined.length > 0">
    <div class="avatar-group -space-x-4 overflow-visible">
      <div
        class="tooltip rounded-full"
        :data-tip="userJoin.companyName"
        v-for="userJoin in joined.slice(0, 3)"
      >
        <div
          class="avatar w-10 avatar rounded-full ring ring-primary ring-offset-gray-300"
          v-if="userJoin.companyPhotoUrl.length"
        >
          <div class="w-10 rounded-full border">
            <img :src="userJoin.companyPhotoUrl" />
          </div>
        </div>
        <div class="avatar placeholder" v-else>
          <div
            class="bg-neutral-focus text-neutral-content rounded-full w-10 border"
          >
            <span>{{ userJoin.companyName[0].toUpperCase() }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden sm:block m-auto">
      <a
        v-if="joined.length > 3"
        class="text-xs text-gray-400 hover:text-underline"
        href="#joined"
      >
        & {{ joined.length - joined.slice(-3).length }} others joined
      </a>
      <p v-else class="text-sm text-gray-400">joined</p>
    </div>
  </div>
  <div v-else>
    <span class="badge badge-primary text-white py-4 font-bold"
      >Join 1st 🎉</span
    >
  </div>
</template>
