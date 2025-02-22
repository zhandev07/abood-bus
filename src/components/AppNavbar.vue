<template>
  <header id="navigation" data-aos="fade-down">
    <nav class="navbar main-nav navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/#home">
          <img src="@/assets/images/abood_icons.svg" alt="Brand Logo">
        </router-link>
        <button 
          class="navbar-toggler" 
          type="button" 
          @click="toggleNavbar"
          aria-expanded="isNavbarOpen.toString()" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible Menu -->
        <div 
          class="collapse navbar-collapse navbar-right" 
          :class="{ show: isNavbarOpen, 'menu-open': isNavbarOpen }"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/#home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/#about-us">About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/#our-trip">Routes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/#our-services">Services</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/#contact">Contact Us</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>



<script>
import NavbarUtils from "@/utils/navbarUtils"; 

export default {
  name: "AppNavbar",
  data() {
    return {
      topMenuHeight: 0,
      size_li: 0,
      x: 4,
      isNavbarOpen: false,
    };
  },
  mounted() {
    NavbarUtils.handlePreloader();
    NavbarUtils.initParallax();
    NavbarUtils.handleNavigationScroll(this.topMenuHeight);
    NavbarUtils.hideMobileMenu();
    NavbarUtils.handleNavBackground();
    NavbarUtils.handleSearch();
    NavbarUtils.setSliderHeight();
    NavbarUtils.loadMoreItems(this.size_li, this.x);
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen; 
    }
  }
};
</script>
<style scoped>
.navbar-toggler:focus {
  outline: none; 
  box-shadow: none; 
}

.navbar-toggler {
  border: none; 
  background-color: transparent; 
}

</style>
