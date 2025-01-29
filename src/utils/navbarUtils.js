export default {
    handlePreloader() {
      window.onload = () => {
        const preloader = document.querySelector(".preloader");
        if (preloader) {
          preloader.classList.add("fade-out");
          setTimeout(() => preloader.remove(), 1000);
        }
      };
    },
  
    initParallax() {
      const parallaxInit = () => {
        const parallaxElements = ["#parallax-one", "#happy-clients"];
        parallaxElements.forEach((selector) => {
          const el = document.querySelector(selector);
          if (el) {
            // Add parallax effect
          }
        });
      };
      parallaxInit();
    },
  
    handleNavigationScroll(topMenuHeight) {
      const topMenu = document.getElementById("main-menu");
      if (!topMenu) return;
  
      const menuItems = topMenu.querySelectorAll("a");
      const scrollItems = Array.from(menuItems).map((item) => {
        const section = document.querySelector(item.getAttribute("href"));
        return section || null;
      });
  
      menuItems.forEach((menuItem) => {
        menuItem.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = menuItem.getAttribute("href").substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - topMenuHeight + 1,
              behavior: "smooth",
            });
          }
        });
      });
  
      window.addEventListener("scroll", () => {
        const fromTop = window.scrollY + topMenuHeight;
        let currentId = "";
        scrollItems.forEach((section) => {
          if (section && section.offsetTop < fromTop) {
            currentId = section.id;
          }
        });
  
        menuItems.forEach((menuItem) => {
          menuItem.parentElement.classList.remove("active");
          if (menuItem.getAttribute("href") === `#${currentId}`) {
            menuItem.parentElement.classList.add("active");
          }
        });
      });
    },
  
    hideMobileMenu() {
      const navLinks = document.querySelectorAll(".navbar-nav li a");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse) {
            navbarCollapse.classList.remove("show");
          }
        });
      });
    },
  
    handleNavBackground() {
      window.addEventListener("scroll", () => {
        const mainNav = document.querySelector(".main-nav");
        if (mainNav) {
          if (window.scrollY >= 600) {
            mainNav.classList.add("black-nav");
          } else {
            mainNav.classList.remove("black-nav");
          }
        }
      });
    },
  
    handleSearch() {
      const searchIcon = document.querySelector(".fa-search");
      const searchClose = document.querySelector(".search-close");
      const search = document.querySelector(".search");
  
      if (searchIcon && searchClose && search) {
        searchIcon.addEventListener("click", () => {
          search.classList.add("search-toggle");
        });
  
        searchClose.addEventListener("click", () => {
          search.classList.remove("search-toggle");
        });
      }
    },
  
    setSliderHeight() {
      const slideHeight = window.innerHeight;
      const carouselItems = document.querySelectorAll("#main-carousel .item");
  
      carouselItems.forEach((item) => {
        item.style.height = `${slideHeight}px`;
      });
  
      window.addEventListener("resize", () => {
        carouselItems.forEach((item) => {
          item.style.height = `${slideHeight}px`;
        });
      });
    },
  
    loadMoreItems(size_li, x) {
      const productList = document.getElementById("product-list");
      if (!productList) return;
  
      const items = productList.querySelectorAll("li");
      size_li = items.length;
  
      items.forEach((item, index) => {
        if (index < x) {
          item.style.display = "list-item";
        }
      });
  
      const loadMoreBtn = document.getElementById("loadMore");
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
          x = x + 4 <= size_li ? x + 4 : size_li;
          items.forEach((item, index) => {
            if (index < x) {
              item.style.display = "list-item";
            }
          });
          if (x === size_li) {
            loadMoreBtn.style.display = "none";
          }
        });
      }
    },
  };
  