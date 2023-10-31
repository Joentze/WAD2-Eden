<template>
  <div
    class="flex flex-col overflow-hidden rounded-lg border border-2 w-64 shadow-lg hover:shadow-xl transition duration-200 ease-in"
  >
    <div class="m-auto w-64">
      <canvas
        id="award-beach"
        class="h-64 bg-gradient-to-t from-blue-300 via-white to-white"
      />
    </div>
    <div class="h-fit p-4">
      <div class="flex flex-row gap-2">
        <span
          class="badge badge-primary p-4 badge-lg text-white font-bold bg-blue-300 border-none text-blue-600"
          >{{ count }} X</span
        >
        <span
          class="text-blue-500 font-bold text-xl grow text-right badge p-4 badge-lg border-2"
          >BEACH</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Application } from "@splinetool/runtime";
export default {
  props: {
    count: Number,
  },
  mounted() {
    this.loadSpline();
  },
  methods: {
    loadSpline: function () {
      const canvas = document.getElementById("award-beach");
      const spline = new Application(canvas);
      spline.load(
        "https://prod.spline.design/VGHznTC5QG0eREA7/scene.splinecode"
      );
    },
  },
};
</script>
