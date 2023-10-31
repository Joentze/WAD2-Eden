<template>
  <div class="w-96 h-96 m-auto z-10 flex flex-col">
    <p class="text-3xl font-bold text-primary text-center mt-10 z-10">
      Thank you for signing up for <u>{{ $route.query.projectName }}</u
      >!
    </p>

    <canvas id="canvas3d" class="z-10" />
    <p class="text-gray-400 mt-2 z-10 m-auto">
      Checkout your
      <a
        class="underline cursor-pointer z-10"
        @click="
          () => {
            $router.push({ path: '/corporation-dashboard' });
          }
        "
        >Dashboard</a
      >
      to see application status.
    </p>
    <div class="m-auto flex flex-row gap-4 mt-10">
      <button
        class="btn"
        @click="
          () => {
            $router.go(-1);
          }
        "
      >
        Back
      </button>
      <button
        class="btn btn-primary"
        @click="
          () => {
            $router.push({ path: '/projects' });
          }
        "
      >
        Other Projects
      </button>
    </div>
  </div>
</template>

<script>
import { Application } from "@splinetool/runtime";
export default {
  methods: {
    loadSpline: function () {
      const canvas = document.getElementById("canvas3d");
      const spline = new Application(canvas);
      spline.load(
        "https://prod.spline.design/cV7mVdKp6ti7PDC7/scene.splinecode"
      );
    },
  },

  mounted() {
    this.loadSpline();
  },
};
</script>
