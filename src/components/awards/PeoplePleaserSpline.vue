<template>
  <div
    class="flex flex-col overflow-hidden rounded-lg border border-2 w-64 shadow-lg hover:shadow-xl transition duration-200 ease-in"
  >
    <div class="m-auto w-64">
      <canvas
        id="award-people"
        class="h-64 bg-gradient-to-t from-purple-300 via-white to-white"
      />
    </div>
    <div class="h-fit p-4">
      <div class="flex flex-row gap-2">
        <span
          class="badge badge-primary p-4 badge-lg text-white font-bold bg-purple-300 border-none text-purple-600"
          >{{ count }} X</span
        >
        <span
          class="text-purple-500 font-bold text-xl grow text-right badge p-4 badge-lg border-2"
          >PEOPLE</span
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
      const canvas = document.getElementById("award-people");
      const spline = new Application(canvas);
      spline.load(
        "https://prod.spline.design/uBP28Ep1pG73cf5F/scene.splinecode"
      );
    },
  },
};
</script>
