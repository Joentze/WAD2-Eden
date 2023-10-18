<template>

    <div class='enterprise_page_body'>
      <!-- <p>Enterprise ID: {{ $route.params.enterpriseId }}</p> -->
      <div v-if="enterprise" class="grid grid-cols-2 sm:grid-cols-1">
        <!-- <h2>{{ enterprise.title }}</h2>
        <p>{{ enterprise.desc }}</p> -->
        <img class="image w-full opacity-50" :src="enterprise.src"/>
        <p class="title text-primary text-4xl font-bold">{{enterprise.title}}</p>
        <router-link
                v-bind:to="'../chat/:enterpriseId/:companyId'"
                class="button_position btn btn-primary"
              >
                Chat With Us!
        </router-link>
      </div>

      <div class="stats shadow stats-vertical lg:stats-horizontal shadow">
        
        <div class="stat place-items-center">
          <div class="stat-title">Page Views</div>
          <div class="stat-value">31K</div>
          <div class="stat-desc">From January 1st to February 1st</div>
        </div>
        
        <div class="stat place-items-center">
          <div class="stat-title">Volunteers</div>
          <div class="stat-value text-secondary">4,200</div>
          <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>
        
        <div class="stat place-items-center">
          <div class="stat-title">New Sign Ups</div>
          <div class="stat-value">1,200</div>
          <div class="stat-desc">↘︎ 90 (14%)</div>
        </div>
        
      </div>

      <p class="description text-neutral-content text-xl text-justify">{{ enterprise.fulldesc }}</p> 


    </div>

    <footer class="footer p-10 text-neutral-content stats-vertical lg:stats-horizontal">
      <aside>
        <!-- <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg> -->
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img src="src/views/enterprise/download.png" />
          </div>
        </div>
        <p><strong>{{enterprise.title}}</strong><br/>{{enterprise.phrase}}</p>
      </aside> 
      <nav>
        <header class="footer-title">{{enterprise.title}}'s Socials</header> 
        <div class="grid grid-flow-col gap-4">
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> 
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
        </div>
      </nav>
    </footer>

</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          logo:"src/views/enterprise/public.jpeg",
          title: "Public Hygiene Council",
          phrase:"Keeping Singapore Clean",
          desc: "Join us to make a meaningful contribution towards a cleaner Singapore",
          fulldesc:"The Public Hygiene Council (PHC) was formed in 2011 to promote good hygiene practices and to improve personal and public hygiene standards in Singapore. The Council, comprising representatives from multiple sectors, works to strengthen and coordinate community efforts to improve the cleanliness and hygiene standards in Singapore. It will also complement government's efforts in maintaining high standards of cleanliness and hygiene.",
          src: "https://www.honeywell.com/content/dam/honeywellbt/en/images/content-images/company/sustainability/hon-sustainability-2880x1440px.jpg",
        },
        {
          id: 2,
          logo:"src/views/enterprise/download.png",
          title: "NEWater",
          phrase:"Our Water, Our Future",
          desc: "Be part of our efforts to make drinking water reusable and sustainable",
          fulldesc:"Governed by PUB, PUB is a statutory board under the Ministry of Sustainability and the Environment (MSE). It is the national water agency, which manages Singapores water supply, water catchment, and used water in an integrated way. From April 2020, PUB also took on the responsibility of protecting our coastline from sea-level rise as the national coastal protection agency. PUB calls on everyone to play a part in conserving water, in keeping our waterways clean, and in caring for Singapore’s precious water resources. If we all do our little bit, there will be enough water for all our needs – for commerce and industry, for living, for life.",
          src: "src/views/enterprise/NEWater Visitor Centre.webp",
        },
        {
          id: 3,
          logo:"src/views/enterprise/opp logo.jpeg",
          title: "Ocean Purpose Project",
          phrase:"Start Today, Save Tomorrow",
          desc: "OCEAN PURPOSE PROJECT AIMS to solve the ocean pollution crisis and promote ocean conservation at scale.",
          fulldesc:"Ocean Purpose Project is a proudly Pasir Ris based social enterprise founded by Mathilda D'Silva in 2020. Our goal? To create a movement that drives ocean conservation and plastic pollution prevention via disruptive and creative projects at mass-scale impact. Our greatest award is the love and partnership we receive from the community of indigenous peoples, ecosystems, islanders, fishermen, cleaners and grassroots leaders who we serve on a daily basis- honouring the knowledge they possess of our coastlines. ",
          src: "src/views/enterprise/opp.jpeg",
        },
        {
          id: 4,
          logo:"src/views/enterprise/logo.png",
          title: "Willing Hearts SG",
          phrase:"We Care & Serve",
          desc: "At Willing Hearts, we provide for the needy by offering them with food cooked in our centralised kitchen, which is managed by volunteers like you.",
          fulldesc:"A secular, non-affiliated charity, Willing Hearts is wholly run by volunteers, apart from a handful of staff. It operates a soup kitchen that prepares, cooks and distributes about 7,000 daily meals to over 70 locations island wide, 365 days a year. Beneficiaries include the elderly, the disabled, low income families, children from single parent families or otherwise poverty stricken families, and migrant workers in Singapore. Willing Hearts is a registered as a society with the Ministry of Home Affairs since February 2005 and as a charity with the Ministry of Ministry of Social and Family Development since December 2008.",
          src: "src/views/enterprise/20200817_Willing-Hearts_CCH0927-scaled.jpeg",
        },
        {
          id: 5,
          logo:"src/views/enterprise/wv logo.png",
          title: "World Vision",
          phrase:"Our vision for every child, life in all its fullness.",
          desc: "Global Aid Organisation In Nearly 100 Countries. Join Us To Provide Support To Children.",
          fulldesc:"World Vision is a Christian humanitarian organisation dedicated to working with children, families, and their communities worldwide to reach their full potential by tackling the root causes of poverty and injustice. Working in nearly 100 countries around the world, we serve all people, regardless of religion, race, ethnicity, or gender. <br><br> World Vision was founded in 1950 by Robert Pierce, whose heart was deeply moved by the plight of children and families in the Korean War. Since then, World Vision has grown to embrace the larger issues of community development and advocacy for the poor in its mission to help children and their families build sustainable futures. At the centre of World Vision’s work is our heart to help communities build stronger and healthier relationships, as these are key to making or breaking poverty’s firm grip on the people. World Vision focuses on children because they are the best indicator of a community’s social health. When children are fed, sheltered, schooled, protected, valued, and loved, a community thrives. Beginning in Korea, its practical Christian values spread to other Asian countries, Africa and Latin America. In Singapore, World Vision’s history can be traced to its work in Indochina.",
          src: "src/views/enterprise/Special_Gift_Hero.png",
        },
        {
          id: 6,
          logo:"src/views/enterprise/ymca logo.png",
          title: "YMCA",
          phrase:"YMCA Strong",
          desc: "YMCA of Singapore is a volunteer-based Christian organisation that seeks to serve and impact all members of the community, regardless of race, language or religion, through programmes, services and enterprises to develop the body, mind and spirit.",
          fulldesc:"YMCA of Singapore serves local and overseas communities to enrich the lives of the less-privileged. YMCA also provides emergency financial assistance to needy families and provides purposeful work training opportunities for individuals with special needs. YMCA also reaches out to out-of-school youths and youths-at-risk to integrate them back into society with meaningful programmes and activities. YMCA aims to groom volunteers and build capacity in its volunteer corps. YMCA also seeks to build character and cultivate young adults into responsible community champions who are able to make positive contributions to the community. YMCA facilities corporations to embrace Corporate Social Responsibility.",
          src: "src/views/enterprise/ymca_4.jpeg",
        },
      ],
      enterprise:null,
    };
  },
  created(){
    this.loadEnterprise();
    console.log(this.$route.params.enterpriseId);
  },
  methods: {
    loadEnterprise(){
        const id = this.$route.params.enterpriseId;
        const enterprise = this.cards.find((card) => card.id == id);
        this.enterprise = enterprise;
        console.log(enterprise);
        console.log(enterprise.src);
    }
  },
};
</script>

<style>
        .enterprise_page_body {
            /* color:black; */
            margin-top:5rem;
        }

        .image{
            position:relative;
        }

        .button_position{
          position:absolute;
          right:200px
        }

        .title{
          position:absolute;
          left:200px;
        }

        .description{
          margin-top:75px;
          /* border:1px solid red; */
          padding-left:200px;
          padding-right:200px;
        }

        .stats{
          margin-top:60px;
          margin-left:200px;
          width:fit-content
        }

        .footer {
          position:bottom;
          margin-left:200px;
          margin-top:450px;
          margin-bottom:20px;
        }


        
</style>
