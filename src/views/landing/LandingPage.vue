<script setup lang="ts"></script>
<template>
  <canvas id="canvas3d"></canvas>
  <div class="z-10 w-full h-full flex flex-col">
    <p class="text-white">Scroll To Save Earth</p>
  </div>
</template>
<style>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
<script lang="ts">
import { Application } from "@splinetool/runtime";
import IconEdenTitle from "../../components/icons/IconEdenTitle.vue";
export default {
  components: { IconEdenTitle },
  methods: {
    toLogin: function () {
      this.$router.push("login");
    },
    loadSpline: function () {
      const canvas = document.getElementById("canvas3d");
      console.log(canvas);
      const app = new Application(canvas);
      app.load("https://prod.spline.design/HZAITb2DIAVng87t/scene.splinecode");
    },
  },
  mounted() {
    this.loadSpline();
  },
};
</script>
