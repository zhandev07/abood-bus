<template>
  <div id="home">
    <div id="main-carousel" class="carousel slide">
      <div class="hero-section">
        <div class="container-fluid">
          <div class="hero-content">
            <div class="row">
              <div class="slider-captions">
                <div class="col-lg-12" data-aos="fade-right">
                  <div class="row">
                    <div class="col-lg-10">
                      <h1 class="text-uppercase">Abood Bus Service Limited</h1>
                      <p>Book our Trip Now</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="ticket-form-section" data-aos="fade-down">
                  <div class="ticket-form">
                    <form @submit.prevent="searchBus" id="busSearchForm">
                      <div class="row">
                        <!-- Departure Input -->
                        <div class="col-lg-12 col-md-6 col-sm-6">
                          <label
                            for="from"
                            class="searchcity-label"
                            :style="{
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                            }"
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                                stroke="#96000c"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                                stroke="#96000c"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            Departure
                          </label>
                          <div class="input-group">
                            <input
                              type="text"
                              v-model="departure"
                              class="form-control"
                              placeholder="Search or Select City"
                              @input="filterDepartureOptions"
                              @focus="handleInputFocus($event, 'departure')"
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              style="width: 16px; height: 16px; fill: #555"
                              @click="toggleDropdown('departure')"
                            >
                              <path
                                d="M256 294.1L126.1 164.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l144 144c9.4 9.4 24.6 9.4 33.9 0l144-144c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L256 294.1z"
                              />
                            </svg>
                            <ul
                              v-if="showDepartureDropdown"
                              class="custom-dropdown"
                            >
                              <li
                                v-for="(
                                  option, index
                                ) in filteredDepartureOptions"
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
                          <label
                            for="to"
                            class="searchcity-label"
                            :style="{
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                            }"
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                                stroke="#96000c"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                                stroke="#96000c"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            Destination
                          </label>
                          <div class="input-group">
                            <input
                              type="text"
                              v-model="destination"
                              class="form-control"
                              placeholder="Search or Select City"
                              @input="filterDestinationOptions"
                              :disabled="isLoadingDestination"
                              @focus="handleInputFocus($event, 'destination')"
                              ref="destinationInput"
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              style="width: 16px; height: 16px; fill: #555"
                              @click="toggleDropdown('destination')"
                            >
                              <path
                                d="M256 294.1L126.1 164.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l144 144c9.4 9.4 24.6 9.4 33.9 0l144-144c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L256 294.1z"
                              />
                            </svg>

                            <!-- Loading Spinner -->
                            <div
                              v-if="isLoadingDestination"
                              class="loading-spinner"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                                style="width: 24px; height: 24px"
                              >
                                <!-- Outer circle (gray border) -->
                                <circle
                                  cx="25"
                                  cy="25"
                                  r="20"
                                  stroke="gray"
                                  stroke-width="5"
                                  fill="none"
                                />
                                <!-- Inner spinning circle (changed to red) -->
                                <circle
                                  cx="25"
                                  cy="25"
                                  r="20"
                                  stroke="#96000c"
                                  stroke-width="5"
                                  fill="none"
                                  stroke-dasharray="126.92"
                                  stroke-dashoffset="126.92"
                                >
                                  <animate
                                    attributeName="stroke-dashoffset"
                                    values="126.92;0"
                                    dur="1s"
                                    keyTimes="0;1"
                                    repeatCount="indefinite"
                                  />
                                </circle>
                              </svg>
                            </div>

                            <ul
                              v-if="showDestinationDropdown"
                              class="custom-dropdown"
                            >
                              <li
                                v-for="(
                                  option, index
                                ) in filteredDestinationOptions"
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
                          <label
                            for="date"
                            class="searchcity-label"
                            :style="{
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                            }"
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.96006 2C7.37758 2 7.71605 2.30996 7.71605 2.69231V4.08883C8.38663 4.07692 9.13829 4.07692 9.98402 4.07692H14.016C14.8617 4.07692 15.6134 4.07692 16.284 4.08883V2.69231C16.284 2.30996 16.6224 2 17.0399 2C17.4575 2 17.7959 2.30996 17.7959 2.69231V4.15008C19.2468 4.25647 20.1992 4.51758 20.899 5.15838C21.5987 5.79917 21.8838 6.67139 22 8V9H2V8C2.11618 6.67139 2.4013 5.79917 3.10104 5.15838C3.80079 4.51758 4.75323 4.25647 6.20406 4.15008V2.69231C6.20406 2.30996 6.54253 2 6.96006 2Z"
                                fill="#96000c"
                              />
                              <path
                                opacity="0.5"
                                d="M22 14V12C22 11.161 21.9873 9.66527 21.9744 9H2.00586C1.99296 9.66527 2.00564 11.161 2.00564 12V14C2.00564 17.7712 2.00564 19.6569 3.17688 20.8284C4.34813 22 6.23321 22 10.0034 22H14.0023C17.7724 22 19.6575 22 20.8288 20.8284C22 19.6569 22 17.7712 22 14Z"
                                fill="#96000c"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18.75 16.5C17.5074 16.5 16.5 17.5074 16.5 18.75C16.5 19.9926 17.5074 21 18.75 21C19.9926 21 21 19.9926 21 18.75C21 17.5074 19.9926 16.5 18.75 16.5ZM15 18.75C15 16.6789 16.6789 15 18.75 15C20.8211 15 22.5 16.6789 22.5 18.75C22.5 19.5143 22.2713 20.2252 21.8787 20.818L23.2803 22.2197C23.5732 22.5126 23.5732 22.9874 23.2803 23.2803C22.9874 23.5732 22.5126 23.5732 22.2197 23.2803L20.818 21.8787C20.2252 22.2713 19.5143 22.5 18.75 22.5C16.6789 22.5 15 20.8211 15 18.75Z"
                                fill="#96000c"
                              />
                            </svg>
                            Date
                          </label>
                          <input
                            type="date"
                            v-model="date"
                            class="form-control"
                            :min="minDate"
                            required
                          />
                        </div>

                        <div>
                          <b
                            >Currently, Payments are exclusively accepted
                            through MPESA & YAS only!</b
                          >
                        </div>

                        <div>
                          <button type="submit">SEARCH BUS</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-sm-12" data-aos="fade-up">
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
// import flatPickr from "vue-flatpickr-component";
// import "flatpickr/dist/flatpickr.css";

export default {
  // components: { flatPickr },
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
      // dateConfig: {
      //   minDate: new Date(),
      //   dateFormat: "Y-m-d",
      // },
    };
  },
  methods: {
    async fetchDepartureCities() {
      this.isLoadingDeparture = true;
      try {
        const response = await axios.get(
          "https://aboodbus.co.tz/passenger/boarding-cities"
        );
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
        const response = await axios.get(
          "https://aboodbus.co.tz/passenger/dropping-cities",
          {
            params: { boarding_city_id: departureId },
          }
        );
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
      this.filteredDepartureOptions = this.departureOptions.filter((option) =>
        option.city.toLowerCase().includes(searchInput)
      );
      this.showDepartureDropdown = true;
    },

    filterDestinationOptions() {
      const searchInput = this.destination.toLowerCase();
      this.filteredDestinationOptions = this.destinationOptions.filter(
        (option) => option.city.toLowerCase().includes(searchInput)
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
        if (!this.departure) missingFields.push("Departure");
        if (!this.destination) missingFields.push("Destination");
        if (!this.date) missingFields.push("Date");

        alert(
          "Please fill in the following fields: " + missingFields.join(", ")
        );
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

    /**
     * On mobile devices, when the input is focused, wait a short time and scroll it into view.
     *
     * @param {Event} event
     * @param {String} type
     */
    handleInputFocus(event, type) {
      if (type === "departure") {
        this.showDepartureDropdown = true;
      } else if (type === "destination") {
        this.showDestinationDropdown = true;
      }
      setTimeout(() => {
        event.target.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    },
  },
  mounted() {
    this.fetchDepartureCities();
    this.minDate = new Date().toISOString().split("T")[0];
    this.date = this.minDate;
  },
  // mounted() {
  //   this.fetchDepartureCities();
  //   // this.minDate = new Date().toISOString().split("T")[0];
  //   this.date = this.minDate;
  //   this.date = new Date().toISOString().split("T")[0];
  // },
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
  left: 0;
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (max-width: 768px) {
  .ticket-form-section {
    padding-bottom: 150px; /* Adjust as needed to create extra space */
  }
}
</style>
