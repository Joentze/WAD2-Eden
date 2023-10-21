<template>
  <div v-if="company">
    
    <CompanyStats 
    
      :projectsCompleted="company.projectsCompleted"
      :employees="company.employees"
      :esgRating="company.esgRating"
    />

    <p class="title text-primary text-4xl font-bold">{{company.title}}</p>
    <img class="image w-full opacity-50" :src="company.src"/>
  </div>
</template>

<script>

import CompanyStats from '/src/components/companies/CompanyStats.vue'

    export default{
        name:'CompanyPage',
        components:{
            CompanyStats,
        },
   
        data() {
            return {
            data: [
                {
                id: 1,
                title: "BlueSG",
                desc: "BlueSG is a Singaporean company providing electric car sharing and electric car charging services.",
                src: "src/views/company/images/blueSG.png",
                ranking: "#1",
                projectsCompleted:"50",
                employees:"400",
                esgRating:"80%",
                },
                {
                id: 2,
                title: "Prophet",
                desc: "Prophet is an integrated growth consulting firm that specializes in strategy, transformation, innovation, branding, marketing, and design.",
                src: "src/views/company/images/Prophet_Featuredimage_0121.png",
                ranking: "#2",
                projectsCompleted:"30",
                employees:"500",
                esgRating:"78%",
                },
                {
                id: 3,
                title: "Uniqlo",
                desc: "Uniqlo Co., Ltd. is a Japanese casual wear designer, manufacturer and retailer.",
                src: "src/views/company/images/uniqlo.jpeg",
                ranking: "#3",
                projectsCompleted:"40",
                employees:"1000",
                esgRating:"70%",
                },
                {
                id: 4,
                title: "H&M",
                desc: "H&M is a multinational clothing company based in Sweden that focuses on fast-fashion clothing. ",
                src: "src/views/company/images/HM-Share-Image.jpg",
                ranking: "#4",
                projectsCompleted:"60",
                employees:"400",
                esgRating:"60%",
                },
                {
                id: 5,
                title: "Apple",
                desc: "Apple Inc (Apple) designs, manufactures, and markets smartphones, tablets, personal computers, and wearable devices.",
                src: "src/views/company/images/apple.jpeg",
                ranking: "#5",
                projectsCompleted:"70",
                employees:"4100",
                esgRating:"60%",
                },
                {
                id: 6,
                title: "Nike",
                desc: "Nike, Inc. (stylized as NIKE) is an American athletic footwear and apparel corporation headquartered near Beaverton, Oregon, United States.",
                src: "src/views/company/images/nike.webp",
                ranking: "#6",
                projectsCompleted:"3",
                employees:"6000",
                esgRating:"40%",
                },
            ],
            company:null,
            };
        },
        created(){
    this.loadCompany();
    console.log(this.$route.params.companyId);
  },
  methods: {
    loadCompany(){
        const id = this.$route.params.companyId;
        const company = this.data.find((company) => company.id.toString() === id);
        this.company = company;
        console.log(company);
        console.log(company.src);
    }
  },
};
        
</script>
