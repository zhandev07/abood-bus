<template>
  <section
    id="team_old"
    class="booking-details card-text"
    style="padding: 20px"
    data-aos="fade-up"
  >
    <div class="container">
      <div class="col-md-12">
        <div v-if="isLoading" class="row z-depth-1">
          <div class="col-md-8">
            <div class="col-md-12 mt-3 pt-3 passenger-details">
              <div class="skeleton-loader ticket-card">
                <span class="skeleton skeleton-text skeleton-title"></span>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="skeleton skeleton-text"></div>
                  </div>
                  <div class="col-lg-4 text-center">
                    <div class="skeleton skeleton-text"></div>
                  </div>
                  <div class="col-lg-4">
                    <div class="skeleton skeleton-text"></div>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-lg-6">
                    <div class="skeleton skeleton-input"></div>
                  </div>
                  <div class="col-lg-6">
                    <div class="skeleton skeleton-input"></div>
                  </div>
                </div>
                <div class="skeleton skeleton-input"></div>
                <div class="skeleton skeleton-input"></div>
              </div>
              <div class="skeleton-loader skeleton-input"></div>
              <div class="skeleton-loader skeleton-checkbox"></div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="col-md-12 py-3 price-details">
              <div class="skeleton skeleton-text skeleton-title"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-button"></div>
            </div>
          </div>
        </div>

        <div v-else class="row z-depth-1">
          <div class="col-md-8">
            <!-- <div class="col-md-12 journey-details">
              <div class="row">
                <div class="col-lg-4">
                  <small style="color: #4E4E4E;">{{ busSchedule.departure }}</small>
                  <div style="font-weight: 500;">{{ busSchedule.origin_city }} {{ busSchedule.departure_time_in_en }}</div>
                </div>
                <div class="col-lg-4 mt-2 mb-2" align="center">
                  <span>VIA {{ busSchedule.via }}</span>
                </div>
                <div class="col-lg-4">
                  <small style="color: #4E4E4E;">{{ busSchedule.arrival }}</small>
                  <div style="font-weight: 500;">{{ busSchedule.destination_city }} {{ busSchedule.arrival_time }}</div>
                </div>
              </div>
            </div> -->
            <!-- Passenger Details -->
            <div class="col-md-12 mt-3 pt-3 passenger-details">
              <form class="mt-3" @submit.prevent="submitForm">
                <div
                  v-for="(ticket, index) in tickets"
                  :key="index"
                  class="ticket-card"
                >
                  <span class="font-weight-bold ticket-title"
                    >Tiketi Siti # {{ ticket.seatNumber }}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      width="60"
                      height="60"
                      xml:space="preserve"
                    >
                      <!-- Seat Path -->
                      <path
                        d="M76.531,40.06c-1.672,0-3.026,1.355-3.026,3.027v20.687c-0.187,0.063-0.374,0.116-0.555,0.204  
                        c-0.053,0.025-2.895,1.385-7.482,2.655c-1.46-1.023-3.315-1.48-5.205-1.115c-6.939,1.345-13.673,1.363-20.605,0.043  
                        c-1.869-0.353-3.704,0.095-5.154,1.101c-4.572-1.268-7.404-2.633-7.488-2.674c-0.17-0.084-0.345-0.134-0.519-0.194V43.086  
                        c0-1.671-1.355-3.027-3.027-3.027c-1.671,0-3.026,1.355-3.026,3.027v24.717c0,0.145,0.022,0.282,0.042,0.422  
                        c0.063,1.605,0.955,3.13,2.495,3.896c0.261,0.129,3.791,1.856,9.425,3.388c0.943,1.727,2.622,3.034,4.706,3.432  
                        c4.262,0.811,8.542,1.223,12.722,1.223c4.277,0,8.659-0.43,13.022-1.275c2.061-0.399,3.722-1.69,4.664-3.394  
                        c5.624-1.524,9.164-3.234,9.426-3.363c1.434-0.704,2.321-2.063,2.496-3.539c0.068-0.253,0.117-0.515,0.117-0.789V43.086  
                        C79.558,41.415,78.203,40.06,76.531,40.06z M30.802,41.573l-0.001,19.084c0.602,0.234,1.334,0.506,2.211,0.797  
                        c2.347-1.188,5.09-1.592,7.712-1.097c6.316,1.206,12.261,1.191,18.604-0.04c2.646-0.513,5.384-0.109,7.736,1.076  
                        c0.808-0.27,1.493-0.521,2.068-0.742l0.01-19.079c0-3.41,2.526-6.215,5.801-6.708v-9.227c0-1.671-1.264-2.46-3.026-3.027  
                        c0,0-9.594-2.775-21.756-2.775c-12.164,0-22.132,2.775-22.132,2.775c-1.718,0.534-3.027,1.355-3.027,3.027v9.227  
                        C28.276,35.357,30.802,38.163,30.802,41.573z"
                        fill="#CB252B"
                        stroke="#000000"
                        stroke-width="2"
                      />
                      <text
                        x="50%"
                        y="35%"
                        font-size="14"
                        text-anchor="middle"
                        fill="black"
                        font-family="Arial"
                        dy=".3em"
                      >
                        {{ ticket.seatNumber }}
                      </text>
                    </svg>
                  </span>

                  <div class="row">
                    <div class="col-lg-4">
                      <div class="ticket-info">
                        Tarehe ya Safari:{{ ticket.journeyDate }}
                      </div>
                    </div>
                    <div class="col-lg-4 text-center">
                      <span class="ticket-info"
                        >Muda wa kuondoka :{{ ticket.departureTime }}</span
                      >
                    </div>
                    <div class="col-lg-4">
                      <div class="ticket-info">
                        Nauli:{{ ticket.payfare }} Tsh
                      </div>
                    </div>
                  </div>
                  <br />
                  <!-- <div class="row">
                    <div class="col-lg-6">
                      <label class="form-label">Kupandia <span class="text-danger">*</span></label>
                      <multiselect v-model="ticket.boardPointId" :options="boardPoints" label="name" track-by="id" placeholder="Chagua sehemu ya kupandia" class="form-control" required />
                    </div>
                    <div class="col-lg-6">
                      <label class="form-label">Kushukia <span class="text-danger">*</span></label>
                      <multiselect v-model="ticket.dropPointId" :options="dropPoints" label="name" track-by="id" placeholder="Chagua sehemu ya kushukia" class="form-control" required />
                    </div>
                  </div> -->

                  <div class="row">
                    <div class="col-lg-6">
                      <label class="form-label"
                        >Jinsia <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="ticket.gender"
                        :options="genderOptions"
                        label="name"
                        track-by="id"
                        placeholder="Chagua jinsia"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="col-lg-6">
                      <label class="form-label"
                        >Umri <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="ticket.age"
                        :options="ageOptions"
                        label="name"
                        track-by="id"
                        placeholder="Chagua kundi la umri"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div class="form-element form-input">
                    <input
                      class="form-element-field"
                      placeholder="Jina Kamili (Lazima)"
                      type="text"
                      v-model="ticket.fullName"
                      required
                    />
                    <div class="form-element-bar"></div>
                    <label class="form-element-label card-text"
                      >Jina Kamili <span class="text-danger">*</span></label
                    >
                  </div>

                  <div class="form-element form-input">
                    <input
                      class="form-element-field"
                      placeholder="Nambari ya simu (Lazima)"
                      type="number"
                      v-model="ticket.phoneNumber"
                      required
                    />
                    <div class="form-element-bar"></div>
                    <label class="form-element-label card-text"
                      >Nambari ya simu <span class="text-danger">*</span></label
                    >
                  </div>
                </div>

                <!-- Mobile Payment Number (Global) -->
                <div class="form-element form-input">
                  <input
                    class="form-element-field"
                    placeholder="Jaza Nambari ya simu"
                    type="number"
                    v-model="mobilePaymentNumber"
                    required
                  />
                  <div class="form-element-bar"></div>
                  <label class="form-element-label card-text"
                    >Namba ya Simu kwaajili ya Malipo
                    <span class="text-danger">*</span></label
                  >
                </div>

                <!-- Terms & Conditions -->
                <div class="form-element form-input">
                  <input type="checkbox" v-model="termsAccepted" required />
                  <label class="terms-label"
                    >Nakubaliana na vigezo na masharti ya ABOOD BUS
                    <span class="text-danger">*</span></label
                  >
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="col-md-12 py-3 price-details d-flex flex-column flex-md-row justify-content-between gap-2"
            >
              <div class="col-md-12 py-3 price-container">
                <h5 class="title text-center">Maelezo ya Bei</h5>
                <table class="table">
                  <tbody>
                    <!-- Display fares per seat -->
                    <tr v-for="seat in seatFares" :key="seat.seatNumber">
                      <td>Seat #{{ seat.seatNumber }}</td>
                      <td>TSH. {{ seat.fare.toFixed(2) }}</td>
                    </tr>

                    <!-- Bus number -->
                    <tr>
                      <td>Bus</td>
                      <td>{{ bus_number }}</td>
                    </tr>

                    <!-- Total payable amount -->
                    <tr>
                      <td><strong>Kiasi cha Kulipwa</strong></td>
                      <td>
                        <strong>TSH. {{ payableAmount.toFixed(2) }}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Button Container -->
                <div
                  class="d-flex flex-column flex-md-row justify-content-between gap-3 mt-3"
                >
                  <!-- "ENDELEA" button -->
                  <button
                    class="btn btn-success btn-lg flex-fill mb-2 mb-md-0"
                    type="submit"
                    @click="submitForm"
                    :disabled="isLoading"
                    style="font-weight: bold"
                  >
                    <span v-if="isLoadingbutton">Loading...</span>
                    <span v-else>ENDELEA</span>
                  </button>

                  <!-- "GHAIRI" button -->
                  <button
                    class="btn btn-danger btn-lg flex-fill"
                    type="button"
                    @click="ghairiForm"
                    :disabled="isLoadingGhairi"
                    style="font-weight: bold"
                  >
                    <span v-if="isLoadingGhairi">Loading...</span>
                    <span v-else>GHAIRI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Loading Overlay -->
    <!-- <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
    </div> -->
  </section>
  <div v-show="seatDetailsLoading" class="loading">
    <div class="loading-spinner"></div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: {
    Multiselect,
  },
  name: "BookingDetails",
  data() {
    return {
      seatFares: 0,
      bus_number: "",
      seatDetailsLoading: false,
      boardPoints: [],
      dropPoints: [],
      genderOptions: [],
      ageOptions: [],
      tickets: [],
      mobilePaymentNumber: "",
      termsAccepted: false,
      // busId: this.$route.query.bus_id || "",
      scheduleId: this.$route.query.schedule_id || "",
      departure: this.$route.query.departure || "",
      destination: this.$route.query.destination || "",
      // routeId: this.$route.query.route_id || "",
      sub_route_id: this.$route.query.sub_route_id || "",
      selectedSeatsData: {
        // We no longer use seat_id, only booking_id:
        booking_id: this.$route.query.booking_id
          ? this.$route.query.booking_id.split(",")
          : [],
      },
      data: {
        busSeats: [],
        bus_schedule: {},
        seatsLimit: 0,
        seatHoldingTime: 0,
        fare: 0,
        boardingPoints: [],
        droppingPoints: [],
        ages: [],
        genders: [],
      },
      totalExclTax: 0,
      payableAmount: 0,
      isLoadingbutton: false,
      isLoadingGhairi: false,
      isLoading: false,
      errorMessage: "",
    };
  },
  watch: {
    $route(to) {
      // Update all route-related properties including sub_route_id:
      // this.busId = to.query.bus_id || "";
      this.scheduleId = to.query.schedule_id || "";
      this.departure = to.query.departure || "";
      this.destination = to.query.destination || "";
      // this.routeId = to.query.route_id || "";
      this.sub_route_id = to.query.sub_route_id || "";
      this.selectedSeatsData = {
        booking_id: to.query.booking_id ? to.query.booking_id.split(",") : [],
      };
      this.fetchBookingDetails();
    },
  },

  created() {
    console.log("sub routeId:", this.sub_route_id);

    if (!this.scheduleId || this.selectedSeatsData.booking_id.length === 0) {
      this.$router.push({ name: "Home" });
      return;
    }

    this.fetchBookingDetails();
  },

  methods: {
    async fetchBookingDetails() {
      if (!this.scheduleId) {
        console.log("No scheduleId found, redirecting to Home.");
        this.$router.push({ name: "Home" });
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      try {
        const response = await axios.post(
          "https://aboodbus.co.tz/passenger/schedules/bus-chart",
          {
            schedule_id: this.scheduleId,
            sub_route_id: this.sub_route_id,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const result = response.data;
        console.log("API response result:", result);

        if (result.code === 200 && result.data) {
          // Convert the nested bus_seats object to an array of seat objects
          this.data.busSeats = result.data.bus_seats
            ? Object.values(result.data.bus_seats).flatMap((row) =>
                Object.values(row)
              )
            : [];
          console.log("busSeats:", this.data.busSeats);

          this.data.bus_schedule = result.data.bus_schedule || {};
          console.log("bus_schedule:", this.data.bus_schedule);

          this.seatsLimit = result.data.seats_limit || 0;
          console.log("seatsLimit:", this.seatsLimit);

          // Use fare from bus_schedule
          this.fare = this.data.bus_schedule.fare || 0;
          console.log("fare:", this.fare);

          // Process boarding and dropping points (using optional chaining and default empty arrays)
          this.boardPoints = (result.data.boarding_points || []).map((bp) => ({
            id: bp.id,
            name: `${bp.point_name} (${bp.eta})`,
          }));
          console.log("boardPoints:", this.boardPoints);

          this.dropPoints = (result.data.dropping_points || []).map((dp) => ({
            id: dp.id,
            name: `${dp.point_name} (${dp.eta})`,
          }));
          console.log("dropPoints:", this.dropPoints);

          // Use new property: age_groups instead of ages
          this.ageOptions = (result.data.age_groups || []).map((a) => ({
            id: a.id,
            name: a.name,
          }));
          console.log("ageOptions:", this.ageOptions);

          this.genderOptions = (result.data.genders || []).map((g) => ({
            id: g.id,
            name: g.name,
          }));
          console.log("genderOptions:", this.genderOptions);

          // Update the selected seats mapping using booking_id
          const selectedSeats = this.selectedSeatsData.booking_id
            .map((bookingId) => {
              const seat = this.data.busSeats.find(
                (s) => s.booking_id == bookingId
              );
              return seat
                ? {
                    id: seat.booking_id,
                    name: seat.seat_name || seat.label,
                    // Map is_available to a holdStatus: 1 if available, 0 if not
                    // holdStatus: seat.is_available ? 1 : 0,
                    bookingId: seat.booking_id,
                  }
                : null;
            })
            .filter((seat) => seat);
          console.log("selectedSeats:", selectedSeats);

          // If any selected seat is not available, redirect to Home.
          // if (selectedSeats.some((seat) => seat.holdStatus === 0)) {
          //   console.log(
          //     "One or more selected seats are no longer available. Redirecting to Home."
          //   );
          //   this.$router.push({ name: "Home" });
          //   return;
          // }

          // Update ticket details
          this.tickets = selectedSeats.map((seat) => ({
            seatNumber: seat.name,
            journeyDate: this.data.bus_schedule.departure_date || "",
            departureTime: this.data.bus_schedule.departure_time || "",
            bus_number: this.data.bus_schedule.bus || "",
            payfare: this.fare || "",
            boardPointId: null,
            dropPointId: null,
            gender: null,
            age: null,
            fullName: "",
            phoneNumber: "",
            bookingId: seat.bookingId,
          }));
          console.log("tickets:", this.tickets);

          // Store seat-wise fares
          this.seatFares = selectedSeats.map((seat) => ({
            seatNumber: seat.name,
            fare: this.fare, // Assume same fare for each seat
          }));
          console.log("seatFares:", this.seatFares);

          // Update total payable amount
          this.totalExclTax = this.seatFares.reduce(
            (total, seat) => total + seat.fare,
            0
          );
          this.payableAmount = this.totalExclTax;
          console.log("Total payable amount:", this.payableAmount);
        } else {
          console.error("Failed to fetch data:", result.message);
          this.errorMessage =
            result.message || "Error fetching booking details.";
        }
      } catch (error) {
        console.error("Fetch error:", error.response || error);
        this.errorMessage =
          error.response?.data?.message || "Failed to fetch booking details.";
      } finally {
        this.isLoading = false;
      }
    },

    async submitForm() {
      if (
        !this.mobilePaymentNumber ||
        !this.scheduleId ||
        !this.departure ||
        !this.destination ||
        this.tickets.some(
          (ticket) =>
            !ticket.phoneNumber ||
            !ticket.bookingId ||
            !ticket.age ||
            !ticket.fullName ||
            !ticket.gender
        )
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const payload = {
        payment_mobile_number: this.mobilePaymentNumber,
        schedule_id: "83183",
        // schedule_id: this.scheduleId,
        // sales_channel_id: "68768768768",
        // sub_route_id: this.sub_route_id,
        sub_route_id: 2323,
        bookings: this.tickets.map((ticket) => ({
          passenger_phone_number: ticket.phoneNumber,
          sub_route_id: "13",
          // sub_route_id: this.sub_route_id,
          // booking_id: 4881694,
          booking_id: ticket.bookingId,
          board_point_id: this.departure,
          dropping_point_id: this.destination,
          age_id: ticket.age?.id,
          full_name: ticket.fullName,
          gender_id: ticket.gender?.id,
        })),
      };
      console.log("Payment palyoad for ticket:", payload);
      this.isLoading = true;

      try {
        const response = await axios.post(
          "https://aboodbus.co.tz/passenger/v1.3/tickets-booking",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Server Response:", response.data);

        if (response.data.status === 200) {
          this.$store.dispatch("updateBookingDetails", response.data.data);

          this.$router.push({ name: "SeatDetails" });
        } else {
          alert(response.data.message || "Error submitting booking.");
        }
      } catch (error) {
        console.error("Booking submission error:", error);

        if (error.code === "ERR_NETWORK") {
          alert("Network error! Please check your internet connection.");
        } else {
          alert(error.response?.data?.message || "An error occurred.");
        }
      } finally {
        this.isLoading = false;
      }
    },

    async ghairiForm() {
      this.isLoadingGhairi = true;

      const plainData = JSON.parse(JSON.stringify(this.selectedSeatsData));
      const bookingIds = plainData.booking_id;

      if (bookingIds.length === 0) {
        alert("No bookings selected.");
        this.isLoadingGhairi = false;
        return;
      }

      const payload = {
        booking_ids: bookingIds,
      };

      try {
        const response = await axios.post(
          "https://aboodbus.co.tz/passenger/schedules/release-seats",
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          this.$router.push({ name: "Home" });
        } else {
          alert("Error releasing seats. Please try again.");
        }
      } catch (error) {
        console.error("Error releasing seats:", error);
        alert(error.response?.data?.message || "An error occurred.");
      } finally {
        this.isLoadingGhairi = false;
      }
    },
  },
};
</script>

<style scoped>
.journey-details,
.passenger-details,
.price-details {
  border-radius: 10px;
  border: 1px solid #cff0ff;
  padding: 15px;
}
.card-text {
  font-size: 16px;
  background-color: #ffffff;
  color: #000000;
  font-family: Arial, Helvetica, sans-serif;
  text-rendering: optimizeLegibility;
}
.ticket-card {
  border: 2px solid #cff0ff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.ticket-title {
  display: block;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #26aae1;
  margin-bottom: 15px;
}

.ticket-info {
  font-weight: 500;
  font-size: 16px;
}

.terms-label {
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.loading::before,
.loading::after {
  content: "";
  position: absolute;
  border: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.loading::before {
  border-top: 4px solid #3498db;
  width: 100%;
  height: 100%;
}

.loading::after {
  border-bottom: 4px solid #cb252b;
  width: 70%;
  height: 70%;
  animation-duration: 1s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 4px;
}
.skeleton-text {
  height: 16px;
  margin-bottom: 8px;
}
.skeleton-title {
  width: 60%;
  height: 20px;
}
.skeleton-input {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.skeleton-button {
  width: 100%;
  height: 50px;
}
.skeleton-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
