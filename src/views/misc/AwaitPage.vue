<template>
  <canvas id="canvas3d" />
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
