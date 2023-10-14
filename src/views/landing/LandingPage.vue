<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const scrollPosition = ref(0);

const handleScroll = () => {
  scrollPosition.value = window.scrollY;
  console.log(window.scrollY);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// onUnmounted(() => {
//   window.removeEventListener("scroll", handleScroll);
// });
</script>
<template>
  <canvas id="canvas3d"></canvas>
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
  setup() {},

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
