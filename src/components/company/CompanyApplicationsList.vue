<script lang="ts">

</script>
<template>
  <div class="flex-grow mb-16 flex flex-col">
    <div class="m-auto flex flex-col">
      <IconPencilWrite class="text-gray-300 w-16 h-16 m-auto" />
      <p class="text-gray-300 m-auto w-64 text-center">
        You've got no applications yet, apply for a project to start!
      </p>
      <button
        class="btn btn-primary w-fit m-auto mt-4"
        @click="redirectToProjects()"
      >
        Go to Projects
      </button>
    </div>
  </div>
</template>
<script>
import IconPencilWrite from "../icons/IconPencilWrite.vue";
export default {
  components: { IconPencilWrite },
  methods: {
    redirectToProjects: function () {
      this.$router.push({ path: "/projects" });
    },
  },
};
</script>
