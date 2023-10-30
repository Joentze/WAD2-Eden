<template>
  <canvas
    id="canvas3d"
    class="fixed top-0 left-0 h-full z-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black"
  />
  <div id="signupPage" class="z-10">
    <SignupCard />
  </div>
</template>
<script>
import SignupCard from "../../components/auth/SignupCard.vue";
import { Application } from "@splinetool/runtime";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
export default {
  mounted() {
    this.loadSpline();
  },
  methods: {
    loadSpline: function () {
      const canvas = document.getElementById("canvas3d");
      const spline = new Application(canvas);
      spline
        .load("https://prod.spline.design/i7XBB-iLa0TQnANF/scene.splinecode")
        .then(() => {
          const earth = spline.findObjectByName("Earth");
          console.log(earth);
          gsap.registerPlugin(ScrollTrigger);
          gsap.to(earth.position, { x: 70, y: -40 });
          gsap.to(earth.scale, { x: 1.2, y: 1.2, z: 1.2 });
        });
    },
  },
  components: { SignupCard },
};
</script>
<style>
#signupPage {
  position: absolute;
  top: 0;
  left: 0;

  /* background: black; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
