<template>
    <div>
      <HeroSection />
      <AboutUsSection />
      <RoutesSection />
      <OtherservicesSection />
    </div>
  </template>
  
  <script>
  import HeroSection from "@/components/sections/HeroSection.vue"; 
  import AboutUsSection from "@/components/sections/AboutUsSection.vue";
  import RoutesSection from "@/components/sections/RoutesSection.vue"; 
  import OtherservicesSection from "@/components/sections/OtherservicesSection.vue"; 

  export default {
    name: "HomePage",
    components: {
      HeroSection,
      AboutUsSection,
      RoutesSection,
      OtherservicesSection,
    },
  };
  </script>
  

  
  <style scoped>
   .form-control {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #9ebfff;
        height: 40px;
    }

    .ticket-form input {
        border: none;
        border-bottom: 1px solid #9ebfff;
        background-color: transparent;
        margin: .5em 0;
        width: 100%;
        height: 40px;
    }

    .price-body ul li {
        color: #fff;
        /*display: block;*/
        font-weight: 400;
        font-size: 18px;
        text-transform: uppercase;
        /* border-bottom: 1px solid #eee; */
        padding: 10px;
    }
    
  </style>
  