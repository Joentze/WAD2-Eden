<!-- <script setup lang="ts">
import { useAuthStore } from "../../stores/authStore";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase.ts";
import { ref } from "vue";
const authStore = useAuthStore();

console.log(authStore.getData);
</script> -->

<template>
  <img src="../mediaFade.png" class="w-full h-full fixed top-0 left-0" />
  <dialog id="my_modal_1" className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg text-primary">💬 A.I. says...</h3>
      <progress
        className="progress w-full progress-primary"
        v-if="llmLoadingStatus === 'PROCESSING'"
      ></progress>
      <div
        role="alert"
        className="alert alert-error"
        v-if="llmLoadingStatus === 'ERROR'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Task failed successfully.</span>
      </div>
      <p className="py-4" v-if="llmOutput !== ''">{{ llmOutput }}</p>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <div class="project">
    <div class="project-body">
      <!-- project Title -->
      <p
        class="text-primary w-full my-2 text-4xl sm:text-6xl font-bold z-10 fade-in"
      >
        Our Initiatives
      </p>
      <p class="text-gray-400 w-full text-sm my-2 z-10">
        Start on initiatives to shift climate culture 🌍
      </p>

      <!-- Search Bar -->
      <div class="form-control w-5/6 mt-4 z-10">
        <div class="join shadow shadow-lg">
          <input
            type="text"
            placeholder="🔎 Search…"
            class="input input-primary input-primary w-full join-item input-bordered"
            @input="onSearch"
            v-model="searchQuery"
          /><button
            class="btn btn-primary join-item"
            :disabled="isButtonDisabled"
            @click="async () => await createPrompt()"
          >
            Ask AI ✨
          </button>
        </div>
      </div>

      <!-- Cards -->
      <div
        class="cards grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center"
      >
        <div
          class="card w-80 bg-base-100 h-96 my-5 mx-2 shadow-xl justify-self-center border border-2 flex flex-col fade-in"
          v-for="card in showProjects"
          v-bind:key="card.id"
        >
          <figure class="h-48 overflow-hidden">
            <img :src="card.projectImages[0]" class="bg-cover bg-center" />
          </figure>
          <div class="card-body flex flex-col">
            <div class="flex flex-row gap-4">
              <h2 class="card-title text-primary text-xl grow truncate">
                {{ card.projectTitle }}
              </h2>
              <span class="badge badge-primary text-white m-auto">{{
                card.projectTag
              }}</span>
            </div>
            <p class="-mt-1 text-gray-500 line-clamp-3 text-left">
              {{ card.projectDescription }}
            </p>
            <div class="card-actions justify-end pb-0 mt-2 flex flex-row">
              <p class="text-sm text-primary text-left grow">
                by <span class="underline">{{ card.creatorName }}</span>
              </p>
              <a
                class="btn btn-square btn-ghost btn-sm"
                :href="'/project/' + card.id"
              >
                <IconArrowRight class="text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="scroll-line" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  query,
  orderBy,
  limit,
  startAt,
  collection,
  where,
  endAt,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase.ts";
import {
  createNewPrompt,
  PromptStatus,
  PromptType,
} from "@/firebaseHelpers/promptHandler";
import IconArrowRight from "../../components/icons/IconArrowRight.vue";
export default {
  components: { IconArrowRight },
  data() {
    return {
      llmLoadingStatus: PromptStatus.PROCESSING,
      llmOutput: "",
      unsub: undefined,
      promptId: "",
      cursor: 8,
      projects: [],
      showProjects: [],
      cards: [
        {
          id: 1,
          title: "Public Hygiene Council",
          desc: "Join us to make a meaningful contribution towards a cleaner Singapore",
          src: "src/views/project/kcs-2020-masthead-qigonga5e3b435b581616488cfff000004b801.png",
        },
        {
          id: 2,
          title: "NEWater",
          desc: "Be part of our efforts to make drinking water reusable and sustainable",
          src: "src/views/project/NEWater Visitor Centre.webp",
        },
        {
          id: 3,
          title: "Ocean Purpose Project",
          desc: "OCEAN PURPOSE PROJECT AIMS to solve the ocean pollution crisis and promote ocean conservation at scale.",
          src: "src/views/project/opp.jpeg",
        },
        {
          id: 4,
          title: "Willing Hearts SG",
          desc: "At Willing Hearts, we provide for the needy by offering them with food cooked in our centralised kitchen, which is managed by volunteers like you.",
          src: "src/views/project/20200817_Willing-Hearts_CCH0927-scaled.jpeg",
        },
        {
          id: 5,
          title: "World Vision",
          desc: "Global Aid Organisation In Nearly 100 Countries. Join Us To Provide Support To Children.",
          src: "src/views/project/Special_Gift_Hero.png",
        },
        {
          id: 6,
          title: "YMCA",
          desc: "YMCA of Singapore is a volunteer-based Christian organisation that seeks to serve and impact all members of the community, regardless of race, language or religion, through programmes, services and projects to develop the body, mind and spirit.",
          src: "src/views/project/ymca_4.jpeg",
        },
      ],
      searchQuery: "",
      filteredCards: [],
    };
  },

  async created() {
    this.filteredCards = this.cards;
    await this.queryPaginate();
  },
  async mounted() {
    await this.queryPaginate();
  },
  computed: {
    isButtonDisabled() {
      return this.searchQuery.trim() === "";
    },
  },
  methods: {
    onSearch: function (event) {
      const currVal = event.target.value;
      if (currVal === "") {
        this.showProjects = this.projects;
        return;
      }
      this.showProjects = this.projects.filter(
        (item) =>
          item.projectTitle.toLowerCase().includes(currVal.toLowerCase()) ||
          item.projectDescription
            .toLowerCase()
            .includes(currVal.toLowerCase()) ||
          item.creatorName.toLowerCase().includes(currVal.toLowerCase()) ||
          item.projectTag.toLowerCase().includes(currVal.toLowerCase())
      );
    },
    createPrompt: async function () {
      console.log("creting prompt");
      this.promptId = await createNewPrompt({
        input: this.searchQuery,
        output: "",
        status: PromptStatus.PROCESSING,
      });
      console.log(this.promptId);
      this.searchQuery = "";
      document.getElementById("my_modal_1").showModal();
      onSnapshot(doc(db, "prompts", this.promptId), (doc) => {
        const { output, status } = doc.data() as PromptType;
        this.llmLoadingStatus = status;
        this.llmOutput = output;
      });
    },
    queryPaginate: async function () {
      const projectRef = collection(db, "projects");
      const q = query(projectRef, where("completed", "==", false));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      let projects = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        projects.push({ ...doc.data(), id: doc.id });
      });
      this.projects = projects;
      this.showProjects = projects;
    },
    search() {
      const query = this.searchQuery.toLowerCase();
      this.filteredCards = this.cards.filter((card) => {
        const title = card.title.toLowerCase();
        const description = card.desc.toLowerCase();
        return title.includes(query) || description.includes(query);
      });
    },
  },
};
</script>

<style>
.form-control {
  width: 83.33%;
  margin: auto;
  justify-content: center;
}

/* .project {
            border: 1px solid red;
            margin-left:0;
        } */

.project-body {
  /* border: 1px solid black; */
  font-size: 5rem;
  text-align: center;
  margin: auto;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* padding:100px; */
  /* background-image: url('src/views/project/1920_plants1.jpeg'); */
}

.cards {
  padding-top: 3rem;
  display: flex;
  width: 100%;
  margin: auto;
  /* align-items:center;
      justify-content:center; */
  /* padding:auto; */
  align-content: center;
  /* border:1px solid red; */
  padding-bottom: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
}

.card-body p {
  font-size: small;
}
</style>
