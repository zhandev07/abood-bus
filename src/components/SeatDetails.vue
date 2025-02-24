<template>
  <section
    id="booking-details"
    class="booking-details card-text"
    style="padding: 20px"
  >
    <div>
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-card">
          <img
            src="@/assets/images/Aboodloader.gif"
            alt="Loading..."
            class="loading-gif"
          />
        </div>
      </div>
      <div v-else class="container">
        <div class="bus-list-content">
          <div v-if="paymentSuccess" class="row success-message">
            <div class="col-md-12 col-sm-12">
              <div class="alert alert-success" role="alert">
                <h3 class="alert-heading">Payment Successful!</h3>
                <p>
                  Your payment has been successfully processed. Your ticket
                  details will be sent to your phone shortly.
                </p>
              </div>

              <div v-if="ticketData" class="row">
                <div class="col-md-6 col-lg-4 mx-auto">
                  <div class="ticket-details card p-3 text-center">
                    <h4>Your Ticket</h4>
                    <img
                      :src="
                        'data:' +
                        ticketData.ticketDataType +
                        ';base64,' +
                        ticketData.ticketImage
                      "
                      alt="Ticket Image"
                      class="img-fluid ticket-img"
                    />
                    <a
                      :href="ticketData.ticketUrl"
                      target="_blank"
                      class="btn btn-primary mt-2"
                    >
                      Download Ticket
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="row">
              <!-- Left side: Booking Details -->
              <div class="col-md-6 col-sm-12">
                <div
                  v-if="bookingDetails && Object.keys(bookingDetails).length"
                  class="pricing-error"
                >
                  <div class="title">
                    <a href="/Home"><u>YOUR BOOKING DETAILS:</u></a>
                  </div>
                  <div class="price-box">
                    <div class="price">
                      Payment via: <strong>{{ bookingDetails.mno }}</strong>
                      <br />
                      Mobile Number:
                      <strong>{{
                        bookingDetails.payment_mobile_number
                      }}</strong>
                      <br />
                      Fare: <strong>Tsh {{ bookingDetails.fare }}</strong>
                    </div>
                  </div>
                  <ul class="options">
                    <li class="active">
                      <span><i class="fa fa-check"></i></span>
                      Payment Reference:
                      <a style="color: #000; font-weight: bold">
                        {{ bookingDetails.payment_reference }}
                      </a>
                    </li>
                    <li class="active">
                      <span><i class="fa fa-check"></i></span>
                      No of Tickets:
                      <a style="color: #000; font-weight: bold">
                        {{ bookingDetails.no_of_tickets }}
                      </a>
                    </li>
                    <li class="active">
                      <span><i class="fa fa-check"></i></span>
                      Status:
                      <a style="color: #000; font-weight: bold">
                        {{ bookingDetails.status }}
                      </a>
                    </li>
                  </ul>
                  <div class="bottom-box">
                    <a class="more">
                      Booking has {{ bookingDetails.no_of_tickets }} Ticket(s)
                    </a>
                    <div class="rating-box">
                      <div style="width: 100%" class="rating"></div>
                    </div>
                    <a class="btn btn-danger" style="font-size: 10px">
                      Payment is to be done within 10 minutes.
                    </a>
                  </div>
                </div>
                <div v-else>
                  <p style="color: red; font-weight: bold">
                    No booking details available.
                  </p>
                </div>
              </div>

              <!-- Right side: Payment Instructions -->
              <div class="col-md-6 col-sm-12">
                <div class="thumbnail">
                  <div
                    class="image-container"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100%;
                    "
                  >
                    <img src="/images/mpesa_logo.png" alt="M-Pesa Logo" />
                  </div>
                  <div class="caption">
                    <h3>Lipia Sasa:</h3>
                    <ol>
                      <li>
                        <b>1.</b> Piga <b><em>*150*00#</em></b>
                      </li>
                      <li><b>2.</b> Chagua 4 - Lipa kwa M-pesa</li>
                      <li>
                        <b>3.</b> Chagua 4 - Weka Nambari ya Kampuni. (<strong
                          >{{ paymentDetails.companyNumber }}</strong
                        >)
                      </li>
                      <li>
                        <b>4.</b> Weka
                        <strong>{{ paymentDetails.paymentCode }}</strong
                        >.
                      </li>
                      <li>
                        <b>5.</b> Weka Namba ya Kumbukumbu ya Malipo.
                        <br />
                        <b
                          ><em
                            >(Kumbukumbu # ni ){{
                              bookingDetails.payment_reference
                            }}</em
                          ></b
                        >
                      </li>
                      <li>
                        <b>6.</b> Weka Kiasi.
                        <br />
                        <b
                          ><em
                            >(Weka kiasi hiki Tsh {{ bookingDetails.fare }})</em
                          ></b
                        >
                      </li>
                      <li><b>7.</b> Weka Namba ya Siri.</li>
                      <li><b>8.</b> Bonyeza 1 Kukamilisha Malipo.</li>
                    </ol>
                    <p style="font-weight: bold">
                      <em>
                        Utapata SMS ya Uthibitisho wa malipo kutoka mtandao
                        husika na SMS ya Ticket yako itatumwa kwenye namba
                        uliyoweka ya Abira yenye jina ABOOD BUS.
                      </em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End of bus-list-content -->
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "SeatDetails",
  data() {
    return {
      paymentSuccess: false,
      isLoading: true,
      ticketData: null,
    };
  },
  computed: {
    ...mapGetters({
      bookingDetails: "bookingDetails",
    }),
    paymentDetails() {
      return {
        companyNumber: "993355",
        paymentCode: "993355",
      };
    },
  },
  created() {
    console.log(
      "Booking details from state (created hook):",
      this.bookingDetails
    );
    if (this.bookingDetails && this.bookingDetails.payment_reference) {
      setTimeout(() => {
        console.log("Timeout reached. Initiating payment status check...");
        this.checkPaymentStatus();
      }, 30000);
    } else {
      console.error(
        "Booking details or payment_reference is not available:",
        this.bookingDetails
      );
      this.isLoading = false;
    }
  },
  methods: {
    async checkPaymentStatus() {
      console.log(
        "In checkPaymentStatus. Current bookingDetails:",
        this.bookingDetails
      );

      if (!this.bookingDetails || !this.bookingDetails.payment_reference) {
        console.error("Payment reference not found in bookingDetails.");
        return;
      }

      const paymentReference = this.bookingDetails.payment_reference;
      // For testing
      // const paymentReference = "ABDWZYBSZ3Z4Y";

      console.log("Using payment_reference:", paymentReference);

      try {
        const response = await axios.post(
          "https://aboodbus.co.tz/passenger/v1.3/tickets-booking/payment-confirm",
          { payment_reference: paymentReference }
        );

        console.log("Payment status check response:", response);
        if (
          response.data?.code === 200 &&
          response.data.data &&
          response.data.data.length
        ) {
          this.paymentSuccess = true;
          this.ticketData = response.data.data[0];
          console.log("Payment status: PAID");
        } else {
          this.paymentSuccess = false;
          console.log(
            "Payment status is not PAID. Response data:",
            response.data
          );
        }
      } catch (error) {
        console.error("Payment status check error:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.pricing-error,
.thumbnail {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.success-message {
  /* background-color: #28a745; */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: white;
  margin-bottom: 20px;
}

.success-message h3 {
  font-weight: bold;
  font-size: 20px;
}

.pricing-error .title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.pricing-error .price-box .price {
  font-size: 18px;
  color: #555;
  font-weight: bold;
}

.pricing-error ul.options {
  list-style: none;
  padding-left: 0;
}

.pricing-error ul.options li {
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.pricing-error ul.options li .fa-check {
  color: green;
  margin-right: 8px;
}

.pricing-error .bottom-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.pricing-error .bottom-box .more {
  font-size: 14px;
  color: #007bff;
  margin-bottom: 10px;
}

.pricing-error .btn-danger {
  background-color: #dc3545 !important;
  border: none;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
}

.pricing-error .btn-danger:hover {
  background-color: #c82333 !important;
}

@media (max-width: 768px) {
  .pricing-error,
  .success-message {
    padding: 10px;
  }

  .pricing-error ul.options li {
    font-size: 14px;
  }

  .pricing-error .bottom-box .more {
    font-size: 12px;
  }

  .pricing-error .btn-danger {
    font-size: 12px;
  }
}

.skeleton-loading {
  padding: 20px;
}

.skeleton-bus-list-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* Each skeleton section mimics one of your content areas */
.skeleton-section {
  background-color: #e0e0e0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

/* Add a subtle animated shimmer effect */
.skeleton-section::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}

/* Skeleton element mimicking the title */
.skeleton-title {
  width: 50%;
  height: 24px;
  background-color: #ccc;
  margin: 10px;
  border-radius: 4px;
}

/* Skeleton for price box */
.skeleton-price-box {
  margin: 10px;
}
.skeleton-price {
  width: 40%;
  height: 20px;
  background-color: #ccc;
  border-radius: 4px;
  margin: 10px;
}

/* Skeleton for list options */
.skeleton-options {
  list-style: none;
  padding: 0 10px;
}
.skeleton-options li {
  margin: 5px 0;
}
.skeleton-option {
  width: 80%;
  height: 16px;
  background-color: #ccc;
  border-radius: 4px;
}

/* Skeleton for bottom box */
.skeleton-bottom-box {
  width: 60%;
  height: 20px;
  background-color: #ccc;
  margin: 10px;
  border-radius: 4px;
}

/* Skeleton for the thumbnail (image area) */
.skeleton-thumbnail {
  width: 100%;
  height: 200px;
  background-color: #ccc;
  border-radius: 4px;
}

/* Skeleton for caption elements */
.skeleton-caption {
  padding: 10px;
}
.skeleton-heading {
  width: 40%;
  height: 24px;
  background-color: #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
.skeleton-list-item {
  width: 90%;
  height: 16px;
  background-color: #ccc;
  border-radius: 4px;
  margin: 5px 0;
}
.skeleton-paragraph {
  width: 100%;
  height: 40px;
  background-color: #ccc;
  border-radius: 4px;
  margin-top: 10px;
}

/* Overlay covering the entire viewport */
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

/* Centered Card */
.loading-card {
  background: #fff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
  /* height: 200px; */
}

/* GIF Loader Styling */
.loading-gif {
  width: 100px; /* Adjust size as needed */
  height: auto;
  /* margin-bottom: 10px; */
}

/* Loading Text */
.loading-text {
  font-size: 16px;
  color: #333;
}
.ticket-details {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.ticket-img {
  max-width: 100%; /* Ensures it never overflows */
  height: auto; /* Keeps aspect ratio */
  border-radius: 5px;
}
</style>
