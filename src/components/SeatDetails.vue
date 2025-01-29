<template>
  <section id="team_old" class="booking-details card-text" style="padding: 20px;">
    <div class="container">
      <div class="bus-list-content">
        <div class="row">
          <!-- Left side: Seat Details -->
          <div class="col-md-6 col-sm-12">
            <div v-if="paymentSuccess" class="success-message">
              <h3>Payment Successful!</h3>
            </div>
            <div v-else>
              <div v-if="bookingDetails && Object.keys(bookingDetails).length" class="pricing-error">
                <div class="title">
                  <a href="/shop"><u>YOUR BOOKING DETAILS:</u></a>
                </div>
                <div class="price-box">
                  <div class="price">
                    {{ bookingDetails.origin_city }} - {{ bookingDetails.destination_city }}
                    <span>(via :{{ bookingDetails.via }})</span>
                  </div>
                </div>
                <ul class="options">
                  <li class="active">
                    <span><i class="fa fa-check"></i></span>BUS #:
                    <a style="color:#000;font-weight: bold">{{ bookingDetails.bus }} ({{bookingDetails.bus_class}})</a>
                  </li>
                  <li class="active">
                    <span><i class="fa fa-check"></i></span>TRIP DATE:
                    <a style="color:#000;font-weight: bold">{{ bookingDetails.departure_date }}</a>
                  </li>
                  <li class="active">
                    <span><i class="fa fa-check"></i></span>REPORTING TIME:
                    <a style="color:#000;font-weight: bold">{{ bookingDetails.reporting_time }}</a>
                  </li>
                  <li class="active">
                    <span><i class="fa fa-check"></i></span>DEPARTURE TIME:
                    <a style="color:#000;font-weight: bold">{{ bookingDetails.departure_time_in_en }}</a>
                  </li>
                  <li class="active">
                    <span><i class="fa fa-check"></i></span>Status:
                    <a style="color:#000;font-weight: bold">{{ bookingDetails.status }}</a>
                  </li>
                </ul>
                <div class="bottom-box">
                  <a class="more">Booking has {{ bookingDetails.no_of_tickets }} Tickets</a>
                  <div class="rating-box">
                    <div style="width: 100%" class="rating"></div>
                  </div>
                  <a class="btn btn-danger" style="font-size: 10px">Payment is to be done within 10 minutes.</a>
                </div>
              </div>
              <div v-else>
                <p style="color: red; font-weight: bold;">No booking details available.</p>
              </div>
            </div>
          </div>
          <!-- Right side: Payment Instructions -->
        <div class="col-md-6 col-sm-12">
          <div class="thumbnail">
            <div class="image-container" style="display: flex; justify-content: center; align-items: center; height: 100%;">
              <img src="/images/mpesa_logo.png" alt="M-Pesa Logo">
            </div>
            <div class="caption">
              <h3>Lipia Sasa:</h3>
              <ol>
                <li><b>1.</b> Piga <b><em>*150*00#</em></b></li>
                <li><b>2.</b> Chagua 4 - Lipa kwa M-pesa</li>
                <li><b>3.</b> Chagua 4 - Weka Nambari ya Kampuni. ({{ paymentDetails.companyNumber }})</li>
                <li><b>4.</b> Weka <b>{{ paymentDetails.paymentCode }}</b>.</li>
                <li><b>5.</b> Weka Namba ya Kumbukumbu ya Malipo.<br> 
                  <b><em>(Kumbukumbu # ni )</em></b>
                </li>
                <li><b>6.</b> Weka Kiasi. <br> 
                  <b><em>(Weka kiasi hiki {{ bookingDetails.fare }})</em></b>
                </li>
                <li><b>7.</b> Weka Namba ya Siri.</li>
                <li><b>8.</b> Bonyeza 1 Kukamilisha Malipo.</li>
              </ol>
              <p style="font-weight: bold">
                <em>
                  Utapata SMS ya Uthibitisho wa malipo kutoka mtandao husika na SMS ya Ticket yako 
                  itatumwa kwenye namba uliyoweka ya Abira yenye jina ABOOD BUS
                </em>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SeatDetails',
  data() {
    return {
      paymentSuccess: false, 
    };
  },
  computed: {
    ...mapGetters({
      bookingDetails: 'bookingDetails',
    }),
    paymentDetails() {
      return {
        companyNumber: "993355",
        paymentCode: "993355",
        referenceNumber: "ABDWV1RNFQML",
        amount: "50,000",
      };
    },
  },
  created() {
    setTimeout(() => {
      // Simulating payment success or failure
      this.paymentSuccess = false; 
    }, 3000);
  }
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
  background-color: #28a745; /* Green for success */
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
  background-color: #dc3545!important;
  border: none;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
}

.pricing-error .btn-danger:hover {
  background-color: #c82333 !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .pricing-error, .success-message {
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

</style>
