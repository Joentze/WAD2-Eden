<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const scrollPosition = ref(0);

// const handleScroll = () => {
//   scrollPosition.value = window.scrollY;
//   console.log(window.scrollY);
// };

// onMounted(() => {
//   window.addEventListener("scroll", handleScroll);
// });

// onUnmounted(() => {
//   window.removeEventListener("scroll", handleScroll);
// });
</script>
<template>
  <div class="fixed h-16 top-0 left-0 w-full p-4 z-10 flex flex-row">
    <div class="grow" />
    <button
      class="shadow shadow-lg shadow-gray-600 btn w-48 btn bg-slate-600/50 hover:bg-slate-600/50 hover:text-slate-200 text-slate-400 border-gray-400 border-2 backdrop-blur-md"
      @click="redirectToLogin"
    >
      Start Eden Here
    </button>
  </div>
  <canvas
    id="canvas3d"
    class="fixed top-0 left-0 h-full z-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black"
  >
  </canvas>
  <div class="absolute z-5 text-white h-fit flex flex-col w-full" id="part1">
    <div class="flex flex-row h-screen">
      <div class="w-1/2 flex flex-col h-full">
        <div class="ml-24 my-auto ml-32 my-auto" id="text-section-1">
          <p class="text-6xl font-bold text-gray-400">There is no</p>
          <p class="text-8xl font-bold text-white drop-shadow-xl">
            Planet No. 2
          </p>
          <p class="mt-12 text-justify text-gray-300 text-lg w-5/6">
            The Earth is dying, there is no plan B. Sea levels are rising,
            animals are suffering. We need to do something.
          </p>
          <a
            class="btn btn-primary mt-6 w-32"
            href="https://www.un.org/en/climatechange"
            >SEE WHY?</a
          >
        </div>
      </div>
    </div>

    <div class="flex flex-row-reverse h-screen" id="part2">
      <div class="w-1/2 flex flex-col h-full">
        <div class="ml-24 my-auto ml-32 my-auto" id="text-section-2">
          <p class="text-6xl font-bold text-gray-400">Climate Action</p>
          <p class="text-8xl font-bold text-white drop-shadow-xl">NOW.</p>
          <p class="mt-12 text-justify text-gray-300 text-lg w-5/6">
            Taking action now can help preserve the planet for future
            generations and ensure a sustainable and resilient future for all.
            We need to change
            <u
              class="text-underline-8 decoration-2 hover:decoration-4 ease-in duration-200"
              >culture</u
            >
            and values.
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-row h-screen" id="part3">
      <div class="w-1/2 flex flex-col h-full">
        <div class="ml-24 my-auto ml-32 my-auto" id="text-section-3">
          <p class="text-6xl font-bold text-gray-400">Restoring...</p>
          <p class="text-8xl font-bold text-white drop-shadow-xl">Our Eden</p>

          <p class="mt-12 text-justify text-gray-300 text-lg w-5/6">
            Eden aims to connect the largest corporations with social
            enterprises to instill climate action. By setting culture, we can
            save the planet <u>together</u>.
          </p>
        </div>
      </div>
    </div>
    <div class="flex h-screen" id="part4">
      <div class="m-auto flex flex-col gap-4" id="text-section-4">
        <p class="text-5xl font-bold text-primary mt-80 m-auto">Join now.</p>
        <p class="text-xl text-gray-300 m-auto w-96 text-center">
          Cultivate climate action by engaging with corporations. Sign up and
          change the world now.
        </p>
        <div class="flex gap-4 m-auto mt-16">
          <button
            class="shadow shadow-lg shadow-gray-600 btn w-48 btn bg-slate-600/50 hover:bg-slate-600/50 hover:text-slate-200 text-slate-400 border-gray-400 border-2"
            @click="redirectToProjects"
          >
            See Projects
          </button>
          <button
            class="shadow shadow-lg shadow-gray-600 btn w-48 btn-primary"
            @click="redirectToSignup"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
html {
  background: black;
}
</style>
<script lang="ts">
import { Application } from "@splinetool/runtime";
import IconEdenTitle from "../../components/icons/IconEdenTitle.vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
export default {
  setup() {},

  components: { IconEdenTitle },
  methods: {
    redirectToProjects: function () {
      this.$router.push("/projects");
    },
    redirectToLogin: function () {
      this.$router.push("/login");
    },
    redirectToSignup: function () {
      this.$router.push("/signup");
    },
    toLogin: function () {
      this.$router.push("login");
    },
    loadSpline: function () {
      const canvas = document.getElementById("canvas3d");
      const spline = new Application(canvas);
      spline
        .load("https://prod.spline.design/i7XBB-iLa0TQnANF/scene.splinecode")
        .then(() => {
          const earth = spline.findObjectByName("Earth");
          gsap.registerPlugin(ScrollTrigger);
          gsap.to(earth.position, { x: 60 });
          let textSection1 = document.getElementById("text-section-1");

          let textSection2 = document.getElementById("text-section-2");
          gsap.to(textSection2, { opacity: 0 });
          let textSection3 = document.getElementById("text-section-3");
          gsap.to(textSection3, { opacity: 0 });
          let textSection4 = document.getElementById("text-section-4");
          gsap.to(textSection4, { opacity: 0 });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#part2",
                start: "top center",
                end: "bottom bottom",
                scrub: true,
              },
            })
            .to(earth.position, { x: -60 })
            .to(textSection2, { opacity: 1 })
            .to(earth.scale, { x: 1.2, y: 1.2, z: 1.2 });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#part3",
                start: "top center",
                end: "bottom bottom",

                scrub: true,
              },
            })
            .to(earth.position, { x: 60 })
            .to(textSection3, { opacity: 1 });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#part4",
                start: "top center",
                end: "bottom bottom",

                scrub: true,
              },
            })
            .to(earth.position, { x: 0, y: 30 })
            .to(earth.scale, { x: 0.6, y: 0.6, z: 0.6 })
            .to(textSection4, { opacity: 1 });
        });
    },
  },

  mounted() {
    this.loadSpline();
  },
};
</script>
