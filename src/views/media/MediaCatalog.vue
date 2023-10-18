<script>
// import list of activity posts
// v-for the list and create the below cards accordingly
import MediaCatalogCard from "../../components/media/MediaCatalogCard.vue";

export default {
  components: { MediaCatalogCard },
};
</script>
<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-2xl">
        <h1 class="text-5xl font-bold text-accent">
          Welcome to our Media Catalog!
        </h1>
        <p class="py-6 text-neutral-content">
          Scroll down to view recent posts by our corporations
        </p>
      </div>
    </div>
  </div>

  <div class="flex flex-col justify-center items-center">
    <MediaCatalogCard 
    companyName="LeafySG" 
    companyLogo="https://i.pinimg.com/736x/28/c3/52/28c352e5fc943372be17a199727ae05f.jpg"
    postTitle="Annual Beach Clean-Up"
    postDescription=" Save the world with us! Over the weekend, in collaboration with NEA,
          we, LeafySG, have organised our annual company wide beach clean-up! We
          are proud to announce that we have cleared a total of 5kg worth of
          beach trash!! #LoveSG #SavetheWorld #LeafySG"
    tagOne="Climate Action"
    tagTwo="Beach Clean-Up"
    postMedia="https://static.mothership.sg/1/2019/09/Gai-Gai-1.jpg"
    > 
    </MediaCatalogCard>
    <MediaCatalogCard 
    companyName=" Water4U" 
    companyLogo="https://st2.depositphotos.com/3487615/5722/v/450/depositphotos_57222633-stock-illustration-waterdrop-fresh-leaf-logo-design.jpg"
    postTitle="Water Conservation Education Campaign"
    postDescription="Learn about good water consumption practices at Water4U's education
          campaign! In a 3 day campaign from 1-3 Oct, Water4U organised a water
          conservation education campaign for all secondary school students.
          #Water4U #Waterisprecious"
    tagOne="Water Conservation"
    tagTwo="Education"
    postMedia="https://static1.straitstimes.com.sg/s3fs-public/styles/large30x20/public/articles/2023/03/10/20230308344561551d0489a7-eaed-4472-9cf0-9428d6c03914.jpg?VersionId=ZY0b39Jp3PEBsk7c.fTAtOI1P2mNgUaI"
    > 
    
    </MediaCatalogCard>
  </div>
</template>
