<template>
    <footer id="footer">
      <div class="footer-top">
        <div class="containe-fluid">
          <div class="row">
            <div class="col-lg-3 col-md-6 footer-info">
              <a href="#" class="logo-footer">
                <img src="@/assets/images/logo-full.svg" alt="" class="img-fluid" />
              </a>
            </div>
  
            <div class="col-lg-3 col-md-6 footer-contact">
              <h4>Our Address</h4>
              <div class="contact-info">
                <div>
                  <p class="text-uppercase">Abood Bus Service Limited</p>
                  <p>P.O.Box 127 Morogoro, Tanzania</p>
                </div>
              </div>
            </div>
  
            <div class="col-lg-3 col-md-6 footer-newsletter">
              <h4>Catch Us</h4>
              <div class="social-links">
                <div>
                  <a
                    href="https://www.facebook.com/people/Abood-Bus-Service/100083366377565/"
                    class="facebook"
                    ><i class="fa fa-facebook"></i></a
                  ><span>Facebook</span>
                </div>
                <div>
                  <a href="https://www.instagram.com/aboodbustz/" class="instagram"
                    ><i class="fa fa-instagram"></i></a
                  ><span>Instagram</span>
                </div>
              </div>
            </div>
  
            <div class="col-lg-3 col-md-6 footer-contact">
              <h4>Get Abood Bus App</h4>
              <div class="row">
                <a
                  href="https://play.google.com/store/apps/details?id=tz.co.eafrica.abood"
                >
                  <img
                    src="@/assets/images/google-play-icon-transparent-6.png"
                    width="140px"
                    alt=""
                  />
                </a>
                <a
                  href="https://apps.apple.com/us/app/abood-bus-passenger-app/id1672754974"
                >
                  <img
                    src="@/assets/images/app-store-icon-transparent-6.png"
                    width="140px"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="footer-bottom text-center">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="copyright text-center">
                © {{ currentYear }} All rights reserved by ABOOD BUS SERVICE LTD
              </div>
            </div>
            <div class="col-lg-3"></div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterSection",
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  