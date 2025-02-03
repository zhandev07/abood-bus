<template>
    <div>
      <HeroSection />
      <AboutUsSection v-if="isDesktop"/>
      <RoutesSection v-if="isDesktop"/>
      <OtherservicesSection v-if="isDesktop"/>
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
    data() {
      return {
        isDesktop: true
      };
    },
    mounted() {
      this.checkScreenSize();
      window.addEventListener("resize", this.checkScreenSize);
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.checkScreenSize);
    },
    methods: {
      checkScreenSize() {
        this.isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      }
    }
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
  