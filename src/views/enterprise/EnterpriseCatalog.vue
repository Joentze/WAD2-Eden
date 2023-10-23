<script lang="ts" setup></script>
<template>
  <div class="enterprise">
    <div class="enterprise-body">
      <!-- Enterprise Title -->
      <p class="text-primary w-full my-2 text-4xl sm:text-6xl font-bold">
        Social Enterprises
      </p>
      <p class="text-gray-400 w-full text-sm my-2">
        Join the fight against climate change with our social enterprises 🌍
      </p>

      <!-- Search Bar -->
      <div class="form-control w-5/6 mt-4">
        <div class="join shadow shadow-lg">
          <input
            type="text"
            placeholder="🔎 Search…"
            class="input input-primary input-primary w-full join-item input-bordered"
            @input="onSearch"
          />
        </div>
      </div>

      <!-- Cards -->
      <div
        class="cards grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center"
      >
        <div
          class="card w-64 bg-base-100 my-5 mx-2 shadow-xl justify-self-center border border-2 pt-4 flex flex-col"
          v-for="card in showEnterprises"
          v-bind:key="card.id"
        >
          <figure>
            <div class="avatar" v-if="card.photoUrl.length">
              <div class="w-36 rounded-full border">
                <img :src="card.photoUrl" />
              </div>
            </div>
            <div class="avatar placeholder" v-else>
              <div
                class="bg-neutral-focus text-neutral-content rounded-full w-36 border"
              >
                <span>{{ card.companyName[0].toUpperCase() }}</span>
              </div>
            </div>
          </figure>
          <div class="card-body text-center m-auto">
            <h2 class="card-title text-primary text-center m-auto text-xl">
              {{ card.companyName }}
            </h2>
            <p class="-mt-1 text-gray-500 line-clamp-3 text-center">
              {{ card.companyDescription }}
            </p>
            <div class="card-actions justify-end pb-0 mt-2">
              <router-link
                v-bind:to="'/enterprise/' + card.id"
                class="btn btn-primary m-auto"
              >
                Find Out More
              </router-link>
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
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase.ts";
export default {
  data() {
    return {
      cursor: 8,
      enterprises: [],
      showEnterprises: [],
      cards: [
        {
          id: 1,
          title: "Public Hygiene Council",
          desc: "Join us to make a meaningful contribution towards a cleaner Singapore",
          src: "src/views/enterprise/kcs-2020-masthead-qigonga5e3b435b581616488cfff000004b801.png",
        },
        {
          id: 2,
          title: "NEWater",
          desc: "Be part of our efforts to make drinking water reusable and sustainable",
          src: "src/views/enterprise/NEWater Visitor Centre.webp",
        },
        {
          id: 3,
          title: "Ocean Purpose Project",
          desc: "OCEAN PURPOSE PROJECT AIMS to solve the ocean pollution crisis and promote ocean conservation at scale.",
          src: "src/views/enterprise/opp.jpeg",
        },
        {
          id: 4,
          title: "Willing Hearts SG",
          desc: "At Willing Hearts, we provide for the needy by offering them with food cooked in our centralised kitchen, which is managed by volunteers like you.",
          src: "src/views/enterprise/20200817_Willing-Hearts_CCH0927-scaled.jpeg",
        },
        {
          id: 5,
          title: "World Vision",
          desc: "Global Aid Organisation In Nearly 100 Countries. Join Us To Provide Support To Children.",
          src: "src/views/enterprise/Special_Gift_Hero.png",
        },
        {
          id: 6,
          title: "YMCA",
          desc: "YMCA of Singapore is a volunteer-based Christian organisation that seeks to serve and impact all members of the community, regardless of race, language or religion, through programmes, services and enterprises to develop the body, mind and spirit.",
          src: "src/views/enterprise/ymca_4.jpeg",
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
  methods: {
    onSearch: function (event) {
      const currVal = event.target.value;
      if (currVal === "") {
        this.showEnterprises = this.enterprises;
        return;
      }
      this.showEnterprises = this.enterprises.filter(
        (item) =>
          item.companyName.toLowerCase().includes(currVal.toLowerCase()) ||
          item.companyDescription.toLowerCase().includes(currVal.toLowerCase())
      );
    },
    queryPaginate: async function () {
      const enterpriseRef = collection(db, "account");
      const q = query(enterpriseRef, where("accountType", "==", "enterprise"));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      let enterprises = [];
      querySnapshot.forEach((doc) => {
        enterprises.push({ ...doc.data(), id: doc.id });
      });
      this.enterprises = enterprises;
      this.showEnterprises = enterprises;
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

/* .enterprise {
          border: 1px solid red;
          margin-left:0;
      } */

.enterprise-body {
  /* border: 1px solid black; */
  font-size: 5rem;
  text-align: center;
  margin: auto;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* padding:100px; */
  /* background-image: url('src/views/enterprise/1920_plants1.jpeg'); */
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
