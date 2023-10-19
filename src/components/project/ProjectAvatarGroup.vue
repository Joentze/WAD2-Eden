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
          class="w-10 avatar rounded-full ring ring-gray-300 ring-offset-gray-300"
        >
          <div class="w-10">
            <img :src="userJoin.companyPhotoUrl" />
          </div>
        </div>
      </div>
    </div>
    <div class="hidden sm:block m-auto">
      <p v-if="joined.length > 3" class="text-xs text-gray-400">
        & {{ joined.length - joined.slice(-3).length }} others joined
      </p>
      <p v-else class="text-sm text-gray-400">joined</p>
    </div>
  </div>
  <div v-else>
    <span class="badge badge-primary text-white">Be the first to join 🎉</span>
  </div>
</template>
