<template>
    <div id="about-us">
      <!-- Start Our Services -->
      <div class="container-fluid">
        <div class="services-section">
          <div class="section-title">
            <h2>About us</h2>
          </div>
          <div class="row">
            <div class="col-lg-5 col-sm-4">
              <div class="about-img">
                <img src="@/assets/images/hero-bg.jpeg" width="100%" alt="About Us Image" />
              </div>
            </div>
            <div class="col-lg-7 col-sm-8">
              <div class="service-paragraph" style="padding: 2px">
                <p>
                  Abood Bus Service Limited is a trailblazer in the field of intercity bus transportation in Tanzania. Founded in 1986, the company has built a solid reputation for quality and reliability, operating a fleet of more than 100 buses that serve the entire country, from the Northern to the Southern, Western and Eastern regions. At Abood Bus Service, we are committed to providing our passengers with the best possible experience.
                </p>
                <hr />
                <p>
                  Furthermore, we understand the importance of safety and reliability, and our team works tirelessly to ensure that each trip is safe, secure and worry-free.
                </p>
                <p class="text-uppercase">
                  Our buses are a perfect blend of luxury and comfort
                </p>
                <div class="bus-features">
                  <div class="row">
                    <div class="col-lg-3 col-m-6 col-sm-6 col-xs-6" v-for="feature in features" :key="feature.name">
                      <div class="bus-s-feature">
                        <img :src="feature.imgSrc" alt="" />
                        <p>{{ feature.name }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="why-choose-us">
        <div class="flex-container">
          <div class="row">
            <div class="section-title">
              <h2>Why choose us</h2>
            </div>
            <div class="col-lg-4 col-sm-12 col-md-6" v-for="(benefit, index) in benefits" :key="index">
              <div class="service-content">
                <div>
                  <img :src="benefit.imgSrc" alt="" />
                </div>
                <div>
                  <h3>{{ benefit.title }}</h3>
                  <p>{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "AboutUsSection",
  data() {
    return {
      features: [
        { name: 'Luxury seats', imgSrc: 'images/seat-icon.svg' },
        { name: 'Air-conditioning', imgSrc: 'images/ac-icon.svg' },
        { name: 'Charging Dock', imgSrc: 'images/usb-charger.svg' },
        { name: 'Toilet', imgSrc: 'images/toilet.svg' },
      ],
      benefits: [
        { title: 'Reliability', description: 'Get 24/7 support for your journey with us. Our friendly team is always available to assist with any needs or concerns.', imgSrc: 'images/reliability.svg' },
        { title: 'Route coverage', description: 'Explore more than 10 destinations with our intercity bus services. Safe, comfortable, and convenient travel at your fingertips.', imgSrc: 'images/destination-icon.svg' },
        { title: '24/7 Support', description: 'Get 24/7 support for your journey with us. Our friendly team is always available to assist with any needs or concerns.', imgSrc: 'images/24-7-support.svg' },
      ]
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
