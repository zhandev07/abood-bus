<template>
    <section id="our-trip" class="routes-section">
      <div class="container-fluid">
        <div class="section-header">
          <h2>ROUTES</h2>
        </div>
        <div class="routes-content">
          <div class="routes-list">
            <!-- <p class="router-description">
            At our intercity bus services, we offer a wide range of destinations
            for you to choose from. Whether you're traveling for business or
            pleasure, we've got you covered. Our trips include popular destinations
            such as:
          </p> -->
          <div class="route-card" v-for="(route, index) in routes" :key="index">
            <img :src="route.image" :alt="route.name" class="route-image" />
            <h4>{{ route.name }}</h4>
          </div>



          </div>
          <div class="routes-map">
            <img src="@/assets/images/map-svg.svg" alt="Map of Routes" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "RoutesSection",
    data() {
      return {
        routes: [
          { name: "Arusha", image: require('@/assets/images/arusha.jpg') },
          { name: "Bukoba", image: require('@/assets/images/bukoba.jpg') },
          { name: "Dar es Salaam", image: require('@/assets/images/Dest1.jpg') },
          { name: "Iringa", image: require('@/assets/images/iringa.jpg') },
          { name: "Mara", image: require('@/assets/images/mara.jpg') },
          { name: "Mbeya", image: require('@/assets/images/mbeya.jpg') },
          { name: "Morogoro", image: require('@/assets/images/morogoro.jpg') },
          { name: "Moshi", image: require('@/assets/images/moshi.jpg') },
          { name: "Mwanza", image: require('@/assets/images/mwanza.jpg') },
          { name: "Tanga", image: require('@/assets/images/tanga.jpg') },
          { name: "Tarime", image: require('@/assets/images/tarime.jpg') },
          { name: "Tunduma", image: require('@/assets/images/tunduma.jpg') },
        ]
      };
    }
  };
  </script>
  

  <style scoped>
  #our-trip {
      background-image: url('@/assets/images/hero-section-bg.jpg');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      color: #fff;
      padding: 20px 0;
      text-align: center;
  }

.section-header {
    text-align: left; 
}

.section-header h2 {
    font-size: 28px;
    /* margin-bottom: 15px; */
    color: #131316;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
}

.section-header, .router-description {
    font-size: 1.5rem;
    color: #131316;
    /* margin-bottom: 30px; */
    line-height: 1.3;
}

.routes-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.routes-map {
    flex: 1;
    max-width: 45%;
    animation: fadeIn 1.5s ease-in-out;
}

.routes-map img {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
    transition: transform 0.3s;
}

.routes-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}
.route-card {
    display: flex;
    align-items: center;
    background: #ffffff;
    color: #b71c1c;
    border-radius: 12px;
    padding: 15px;
    width: 250px;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.route-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.route-image {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 15px;
}

.route-card h4 {
    font-size: 1.2rem;
    color: #000000;
    margin: 0;
}

/* Keyframe Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .routes-content {
        flex-direction: column;
    }

    .routes-map {
        max-width: 100%;
    }

    .routes-list {
        gap: 15px;
    }

    .route-card {
        width: 100%;
    }
}

  </style>
  