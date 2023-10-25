<template>
  <img src="../mediaFade.png" class="w-full h-full fixed top-0 left-0" />
  <div class="corporation">
    <div class="corporation-body">
      <!-- Enterprise Title -->
      <p class="text-primary w-full my-2 text-4xl sm:text-6xl font-bold z-10">
        Corporations
      </p>
      <p class="text-gray-400 w-full text-sm my-2 z-10">
        Support corporations fighting for climate culture 🏢
      </p>

      <!-- Search Bar -->
      <div class="form-control w-5/6 mt-4 z-10">
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
        <CompanyCatalogCard
          v-for="(corporation, index) in showCorporations"
          :id="corporation.id"
          :companyName="corporation.companyName"
          :companyDescription="corporation.companyDescription"
          :photoUrl="corporation.photoUrl"
          :ranking="index"
        />
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
import CompanyCatalogCard from "../../components/companies/CompanyCatalogCard.vue";
export default {
  components: { CompanyCatalogCard },
  data() {
    return {
      cursor: 8,
      corporations: [],
      showCorporations: [],
      cards: [
        {
          id: 1,
          title: "Public Hygiene Council",
          desc: "Join us to make a meaningful contribution towards a cleaner Singapore",
          src: "src/views/corporation/kcs-2020-masthead-qigonga5e3b435b581616488cfff000004b801.png",
        },
        {
          id: 2,
          title: "NEWater",
          desc: "Be part of our efforts to make drinking water reusable and sustainable",
          src: "src/views/corporation/NEWater Visitor Centre.webp",
        },
        {
          id: 3,
          title: "Ocean Purpose Project",
          desc: "OCEAN PURPOSE PROJECT AIMS to solve the ocean pollution crisis and promote ocean conservation at scale.",
          src: "src/views/corporation/opp.jpeg",
        },
        {
          id: 4,
          title: "Willing Hearts SG",
          desc: "At Willing Hearts, we provide for the needy by offering them with food cooked in our centralised kitchen, which is managed by volunteers like you.",
          src: "src/views/corporation/20200817_Willing-Hearts_CCH0927-scaled.jpeg",
        },
        {
          id: 5,
          title: "World Vision",
          desc: "Global Aid Organisation In Nearly 100 Countries. Join Us To Provide Support To Children.",
          src: "src/views/corporation/Special_Gift_Hero.png",
        },
        {
          id: 6,
          title: "YMCA",
          desc: "YMCA of Singapore is a volunteer-based Christian organisation that seeks to serve and impact all members of the community, regardless of race, language or religion, through programmes, services and enterprises to develop the body, mind and spirit.",
          src: "src/views/corporation/ymca_4.jpeg",
        },
      ],
      searchQuery: "",
      filteredCards: [],
    };
  },

  async created() {
    await this.queryPaginate();
  },
  async mounted() {
    await this.queryPaginate();
  },
  methods: {
    onSearch: function (event) {
      const currVal = event.target.value;
      if (currVal === "") {
        this.showCorporations = this.corporations;
        return;
      }
      this.showCorporations = this.corporations.filter(
        (item) =>
          item.companyName.toLowerCase().includes(currVal.toLowerCase()) ||
          item.companyDescription.toLowerCase().includes(currVal.toLowerCase())
      );
    },
    queryPaginate: async function () {
      const enterpriseRef = collection(db, "account");
      const q = query(enterpriseRef, where("accountType", "==", "corporation"));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      let corporations = [];
      querySnapshot.forEach((doc) => {
        corporations.push({ ...doc.data(), id: doc.id });
      });

      this.corporations = corporations;
      this.showCorporations = corporations;
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

/* .corporation {
          border: 1px solid red;
          margin-left:0;
      } */

.corporation-body {
  /* border: 1px solid black; */
  font-size: 5rem;
  text-align: center;
  margin: auto;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* padding:100px; */
  /* background-image: url('src/views/corporation/1920_plants1.jpeg'); */
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
