<template>
    <div id="home">
      <!-- Start Slider Area -->
      <div id="main-carousel" class="carousel slide">
        <div class="hero-section">
          <div class="container-fluid">
            <div class="hero-content">
              <div class="row">
                <div class="slider-captions">
                  <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-10">
                        <h1 class="text-uppercase">Abood Bus Service Limited</h1>
                        <p>Book our Trip Now</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-5">
                  <div class="ticket-form-section">
                    <div class="ticket-form">
                      <form @submit.prevent="searchBus" id="busSearchForm">
                        <div class="row">
                          <!-- Departure Input -->
                          <div class="col-lg-12 col-md-6 col-sm-6">
                            <label for="from" class="searchcity-label" :style="{ fontWeight: 'bold' }">Departure</label>
                            <div class="input-group">
                              <input
                                type="text"
                                v-model="departure"
                                class="form-control"
                                placeholder="Search or Select City"
                                @input="filterDepartureOptions"
                                @focus="toggleDropdown('departure')"
                              />
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512" 
                                style="width: 16px; height: 16px; fill: #555;" 
                                @click="toggleDropdown('departure')">
                                <path d="M256 294.1L126.1 164.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l144 144c9.4 9.4 24.6 9.4 33.9 0l144-144c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L256 294.1z"/>
                              </svg>
                              <ul v-if="showDepartureDropdown" class="custom-dropdown">
                                <li
                                  v-for="(option, index) in filteredDepartureOptions"
                                  :key="index"
                                  class="dropdown-item"
                                  @click="selectDeparture(option)"
                                >
                                  {{ option.city }}
                                </li>
                              </ul>
                            </div>
                          </div>

                          <!-- Destination Input -->
                          <div class="col-lg-12 col-md-6 col-sm-6">
                            <label for="to" class="searchcity-label" :style="{ fontWeight: 'bold' }">Destination</label>
                            <div class="input-group">
                              <input
                                type="text"
                                v-model="destination"
                                class="form-control"
                                placeholder="Search or Select City"
                                @input="filterDestinationOptions"
                                :disabled="isLoadingDestination"
                                @focus="toggleDropdown('destination')" 
                                ref="destinationInput"
                              />
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512" 
                                style="width: 16px; height: 16px; fill: #555;" 
                                @click="toggleDropdown('destination')">
                                <path d="M256 294.1L126.1 164.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l144 144c9.4 9.4 24.6 9.4 33.9 0l144-144c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L256 294.1z"/>
                              </svg>

                              <!-- Loading Spinner -->
                              <div v-if="isLoadingDestination" class="loading-spinner">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="width: 24px; height: 24px;">
                                  <circle cx="25" cy="25" r="20" stroke="gray" stroke-width="5" fill="none"/>
                                  <circle cx="25" cy="25" r="20" stroke="blue" stroke-width="5" fill="none" stroke-dasharray="126.92" stroke-dashoffset="126.92">
                                    <animate attributeName="stroke-dashoffset" values="126.92;0" dur="1s" keyTimes="0;1" repeatCount="indefinite" />
                                  </circle>
                                </svg>
                              </div>

                              <ul v-if="showDestinationDropdown" class="custom-dropdown">
                                <li
                                  v-for="(option, index) in filteredDestinationOptions"
                                  :key="index"
                                  class="dropdown-item"
                                  @click="selectDestination(option)"
                                >
                                  {{ option.city }}
                                </li>
                              </ul>
                            </div>
                          </div>

                          <!-- Date Input -->
                          <div class="col-lg-12 col-md-6 col-sm-6">
                            <label for="date" class="searchcity-label" :style="{ fontWeight: 'bold' }">Date</label>
                            <input type="date" v-model="date" class="form-control" :min="minDate" required />
                          </div>

                          <div>
                            <b>Currently, Payments are exclusively accepted through MPESA & YAS only!</b>
                          </div>

                          <div>
                            <button type="submit">SEARCH BUS</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-lg-7 col-sm-12">
                  <a
                    href="https://play.google.com/store/apps/details?id=tz.co.eafrica.abood"
                  >
                    <img
                      src="@/assets/images/google-play-icon-transparent-6.png"
                      width="200px"
                      alt="Google Play"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/us/app/abood-bus-passenger-app/id1672754974"
                  >
                    <img
                      src="@/assets/images/app-store-icon-transparent-6.png"
                      width="200px"
                      alt="App Store"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      departure: "",
      destination: "",
      date: "",
      departureOptions: [],
      destinationOptions: [],
      filteredDepartureOptions: [],
      filteredDestinationOptions: [],
      showDepartureDropdown: false,
      showDestinationDropdown: false,
      departureId: null,
      destinationId: null,
      isLoadingDeparture: false,
      isLoadingDestination: false,
      minDate: "",
    };
  },
  methods: {
    async fetchDepartureCities() {
      this.isLoadingDeparture = true;
      try {
        const response = await axios.get("https://aboodbus.co.tz/passenger/boarding-cities");
        this.departureOptions = response.data.data.cities || [];
        this.filteredDepartureOptions = [...this.departureOptions];
      } catch (error) {
        console.error("Error fetching departure cities:", error);
      } finally {
        this.isLoadingDeparture = false;
      }
    },

    async fetchDestinationCities(departureId) {
      this.isLoadingDestination = true;
      try {
        const response = await axios.get(`https://aboodbus.co.tz/passenger/${departureId}/dropping-cities`);
        this.destinationOptions = response.data.data.cities || [];
        this.filteredDestinationOptions = [...this.destinationOptions];
      } catch (error) {
        console.error("Error fetching destination cities:", error);
      } finally {
        this.isLoadingDestination = false;
      }
    },

    toggleDropdown(type) {
      if (type === "departure") {
        this.showDepartureDropdown = !this.showDepartureDropdown;
        this.showDestinationDropdown = false;
      } else if (type === "destination") {
        this.showDestinationDropdown = !this.showDestinationDropdown;
        this.showDepartureDropdown = false;
      }
    },

    filterDepartureOptions() {
      const searchInput = this.departure.toLowerCase();
      this.filteredDepartureOptions = this.departureOptions.filter(option =>
        option.city.toLowerCase().includes(searchInput)
      );
      this.showDepartureDropdown = true;
    },

    filterDestinationOptions() {
      const searchInput = this.destination.toLowerCase();
      this.filteredDestinationOptions = this.destinationOptions.filter(option =>
        option.city.toLowerCase().includes(searchInput)
      );
      this.showDestinationDropdown = true;
    },

    selectDeparture(option) {
      this.departure = option.city;
      this.departureId = option.id;
      this.showDepartureDropdown = false;
      this.destination = "";
      this.fetchDestinationCities(option.id);

      // Auto-focus on destination input after selecting departure
      this.$nextTick(() => {
        this.$refs.destinationInput.focus();
      });
    },

    selectDestination(option) {
      this.destination = option.city;
      this.destinationId = option.id;
      this.showDestinationDropdown = false;
    },

    searchBus() {
      if (!this.departure || !this.destination || !this.date) {
        let missingFields = [];
        if (!this.departure) missingFields.push('Departure');
        if (!this.destination) missingFields.push('Destination');
        if (!this.date) missingFields.push('Date');
        
        alert('Please fill in the following fields: ' + missingFields.join(', '));
        return;
      }
      this.$router.push({
        name: "journeyPage",
        query: {
          boarding_city_id: this.departureId,
          dropping_city_id: this.destinationId,
          departure_date: this.date,
        },
      });
    },

  },

  mounted() {
    this.fetchDepartureCities();
    this.minDate = new Date().toISOString().split("T")[0];
    this.date = this.minDate;
  },
};
</script>


<style scoped>
.custom-dropdown {
  display: block;
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  z-index: 10;
  margin-left: 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  left: 0; /* Align dropdown content to the left */
}

.dropdown-item {
  padding: 10px 15px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #e7e7e7;
  color: #333;
}

.toggle-icon {
  color: #3498db; 
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;
  margin-left: 10px;
  margin-top: 5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>