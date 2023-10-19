<template>
<div class="companies">
    <div class="companies-body">
        <!-- Companies Title -->
    <p class="text-primary w-full my-5 font-bold">Companies</p>
    <p class="text-secondary text-lg">Discover the Eco-Conscious Initiatives Embarked</p>
    <br>

    <!-- Search Bar -->
    <div class="form-control w-5/6">
          <div class="input-group shadow-lg">
            <input
              type="text"
              placeholder="Search…"
              class="input input-bordered input-success input-primary w-full"
              v-model="searchQuery"
            />
            <button class="btn btn-square bg-success" @click="search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

    </div>
    </div>
    <div class="cards grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
        <EnterpriseCatalogCard 
            v-for="card in cards"
            :id="card.id"
            :title="card.title"
            :desc="card.desc"
            :src="card.src"
            :ranking="card.ranking"/>
    </div>
</template>


<script>
    import EnterpriseCatalogCard from '/Users/germaine/Documents/WAD2-Eden/src/components/enterprise/card/EnterpriseCatalogCard.vue'

    export default{
        name:'CompanyCatalog',
        components:{
            EnterpriseCatalogCard,
        },
        data() {
            return {
            cards: [
                {
                id: 1,
                title: "BlueSG",
                desc: "BlueSG is a Singaporean company providing electric car sharing and electric car charging services.",
                src: "images/blueSG.png",
                ranking: "#1",
                },
                {
                id: 2,
                title: "Prophet",
                desc: "Prophet is an integrated growth consulting firm that specializes in strategy, transformation, innovation, branding, marketing, and design.",
                src: "src/views/enterprise/NEWater Visitor Centre.webp",
                ranking: "#2",
                },
                {
                id: 3,
                title: "Uniqlo",
                desc: "Uniqlo Co., Ltd. is a Japanese casual wear designer, manufacturer and retailer.",
                src: "src/views/enterprise/opp.jpeg",
                ranking: "#3",
                },
                {
                id: 4,
                title: "H&M",
                desc: "H&M is a multinational clothing company based in Sweden that focuses on fast-fashion clothing. ",
                src: "src/views/enterprise/20200817_Willing-Hearts_CCH0927-scaled.jpeg",
                ranking: "#4",
                },
                {
                id: 5,
                title: "Apple",
                desc: "Apple Inc (Apple) designs, manufactures, and markets smartphones, tablets, personal computers, and wearable devices.",
                src: "src/views/enterprise/Special_Gift_Hero.png",
                ranking: "#5",
                },
                {
                id: 6,
                title: "Nike",
                desc: "Nike, Inc. (stylized as NIKE) is an American athletic footwear and apparel corporation headquartered near Beaverton, Oregon, United States.",
                src: "src/views/enterprise/ymca_4.jpeg",
                ranking: "#6",
                },
            ],
            searchQuery: "",
            filteredCards: [],
            };
        },
        created() {
            this.filteredCards = this.cards;
        },
        methods: {
            search() {
            const query = this.searchQuery.toLowerCase();
            this.filteredCards = this.cards.filter((card) => {
                const title = card.title.toLowerCase();
                const description = card.desc.toLowerCase();
                return title.includes(query) || description.includes(query);
            });
            },
        },
        }

</script>
  
  <style>
  .form-control {
    width: 83.33%;
    margin: auto;
    justify-content: center;
  }
  
  
  .companies-body {
   
    font-size: 5rem;
    text-align: center;
    margin: auto;
    margin-top: 5rem;
    
  }
  
  </style>
  

