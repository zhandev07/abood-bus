<template>
  <div id="our-services" data-aos="fade-up">
    <div class="container">
      <div class="section-title">
        <h2>Our Services</h2>
      </div>

      <div class="row">
        <!-- Left Section -->
        <div class="service-card">
          <div class="abood-image-section">
            <img
              src="@/assets/images/delivery1.jpg"
              alt="Courier Services"
              class="img-fluid"
            />
          </div>
          <div class="abood-text-section">
            <h3 class="text-uppercase">Courier Services</h3>
            <p>
              Make your deliveries easier with our new courier service! Our
              experienced drivers and top-notch vehicles ensure that your
              packages are handled with care and reach their destination safely
              and on time.
            </p>
            <!-- <router-link to="/book-now" class="btn btn-custom">Book Now</router-link> -->
          </div>
        </div>

        <!-- Middle Section -->
        <div class="service-card">
          <div class="abood-image-section">
            <img
              src="@/assets/images/DJI_20241029205045_0195_D-Enhanced-NR.jpg"
              alt="Tenders"
              class="img-fluid"
            />
          </div>
          <div class="abood-text-section">
            <h3 class="text-uppercase">Tenders</h3>
            <p>
              Need a bus for a special event or group trip? Our intercity bus
              company offers bus hire services for all your transportation
              needs.
            </p>
            <!-- <router-link to="/book-now" class="btn btn-custom">Book Now</router-link> -->
          </div>
        </div>

        <!-- Right Section -->
        <div class="service-card">
          <div class="abood-image-section">
            <img
              src="@/assets/images/luggage.png"
              alt="Luggage Services"
              class="img-fluid"
            />
          </div>
          <div class="abood-text-section">
            <h3 class="text-uppercase">Luggage Services</h3>
            <p>
              Travel with ease and leave the heavy lifting to us! Our luggage
              transportation service ensures your belongings are moved safely
              and efficiently.
            </p>
            <!-- <router-link to="/book-now" class="btn btn-custom">Book Now</router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherservicesSection",
};
</script>

<style scoped>
.section-title {
  text-align: center;
  margin-bottom: 40px;
}

h2 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.row {
  display: flex;
  gap: 10px; /* Gap between cards */
  justify-content: space-between;
}

.service-card {
  flex: 1 1 calc(33.333% - 10px); /* 3 equal-width cards with gap of 10px */
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.abood-image-section {
  position: relative;
  overflow: hidden;
}

.abood-image-section img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  transition: transform 0.3s ease-in-out;
}

.abood-text-section {
  padding: 20px;
  /* background-color: #f7f7f7; */
  text-align: center;
}

.abood-text-section h3 {
  font-size: 22px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
}

.abood-text-section p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.btn-custom {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5px;
}

.btn-custom:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .service-card {
    flex: 1 1 calc(50% - 10px); /* 2 cards per row on smaller screens */
  }

  .abood-image-section img {
    height: 150px;
  }

  .abood-text-section h3 {
    font-size: 20px;
  }

  .abood-text-section p {
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .service-card {
    flex: 1 1 100%; /* 1 card per row on very small screens */
  }

  .section-title h2 {
    font-size: 28px;
  }

  .abood-text-section h3 {
    font-size: 18px;
  }

  .abood-text-section p {
    font-size: 12px;
  }
}
</style>
