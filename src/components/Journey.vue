<template>
  <div>
    <div id="home">
      <div id="main-carousel" class="carousel slide" data-ride="carousel">
        <div class="hero-section">
          <div class="container-fluid">
            <div class="hero-content">
              <div class="row">
                <div class="slider-captions">
                  <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-10">
                        <h1 class="text-uppercase">
                          Abood Bus Service Limited
                        </h1>
                        <p>Book Your Trip Now</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="search-container">
                    <div class="search-card">
                      <form @submit.prevent="handleSearch" class="search-bar">
                        <!-- Departure Input -->
                        <div class="input-wrapper">
                          <input
                            type="text"
                            v-model="departure"
                            class="input-field"
                            placeholder="Search or Select City"
                            @input="filterDepartureOptions"
                            @focus="filterDepartureOptions"
                          />
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

                        <!-- Destination Input -->
                        <div class="input-wrapper">
                          <div class="input-container">
                            <input
                              type="text"
                              v-model="destination"
                              class="input-field"
                              placeholder="Search or Select City"
                              @input="filterDestinationOptions"
                              @focus="filterDestinationOptions"
                            />
                            <!-- Loading Spinner -->
                            <div
                              v-if="isLoadingDestination"
                              class="loading-spinner-two"
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

                        <!-- Date Input -->
                        <div class="input-wrapper">
                          <input
                            type="date"
                            v-model="date"
                            class="input-field date-input"
                            required
                            :min="minDate"
                          />
                        </div>

                        <!-- Search Button -->
                        <button type="submit" class="search-button">
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-card">
        <img
          src="@/assets/images/Aboodloader.gif"
          alt="Loading..."
          class="loading-gif"
        />
        <!-- <p class="loading-text">Loading, please wait...</p> -->
      </div>
    </div>

    <section id="bus-selection" class="bus-selection">
      <div v-if="errorMessage" class="alert alert-warning text-center">
        {{ errorMessage }}
      </div>
      <div class="bus-list" v-else>
        <div class="container">
          <div
            class="bus-list-content transition-section"
            v-for="(bus, index) in busData"
            :key="index"
            :class="{ 'col-12': true }"
            @click="bookTicket(bus)"
          >
            <div id="busContainer">
              <div id="allBusListContainer">
                <div id="busSection_0_0">
                  <div class="row my-2">
                    <div class="col-md-6 text-start">
                      <div
                        class="d-inline-block me-3"
                        style="
                          padding: 8px 16px;
                          border-radius: 12px;
                          background-color: #28abe2;
                          font-size: 1.1rem;
                        "
                      >
                        <strong style="color: #fff"
                          >TSH.{{ bus.amount }}</strong
                        >
                      </div>
                      <span
                        style="
                          border-right: 3px solid #696969;
                          margin-left: 20px;
                          margin-right: 20px;
                        "
                      ></span>
                      <div
                        class="d-inline-block"
                        :style="{
                          padding: '8px 16px',
                          borderRadius: '12px',
                          backgroundColor: '#' + bus.bg_colour,
                          fontSize: '1.1rem',
                        }"
                      >
                        <strong style="color: #fff">{{ bus.bus_class }}</strong>
                      </div>
                    </div>
                    <div class="col-md-6 text-end">
                      <div class="d-inline-block">
                        <svg
                          width="50px"
                          height="50px"
                          viewBox="0 0 72 72"
                          id="emoji"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="color">
                            <path
                              fill="#D0CFCE"
                              d="M49.2446,52.5931H29.9128c-0.5523,0-1,0.4477-1,1V57.5c0,1.3807,1.1193,2.5,2.5,2.5h17.8318 c0.5523,0,1-0.4477,1-1v-5.4069C50.2446,53.0408,49.7969,52.5931,49.2446,52.5931z"
                            />
                            <path
                              fill="#9B9B9A"
                              d="M50.5779,46.6676H28.5796c-0.5523,0-1,0.4477-1,1v3.4069c0,1.6569,1.3431,3,3,3h17.9983 c1.6568,0,3-1.3431,3-3v-3.4069C51.5779,47.1153,51.1301,46.6676,50.5779,46.6676z"
                            />
                            <path
                              fill="#61B2E4"
                              d="M33.917,43.1837l-9.2373-29.4265c-0.1654-0.5269-0.7266-0.82-1.2535-0.6546l-5.1587,1.6194 c-0.527,0.1654-0.82,0.7266-0.6546,1.2536l9.2372,29.4264c0.1654,0.527,0.7267,0.82,1.2536,0.6546l5.1587-1.6193 C33.7893,44.2718,34.0824,43.7106,33.917,43.1837z"
                            />
                            <path
                              fill="#61B2E4"
                              d="M52.91,43.22v3.93c0,0.55-0.45,1-1,1H27.25c-0.56,0-1-0.45-1-1v-3.66l-8.64-27.51 c-0.16-0.53,0.13-1.09,0.66-1.26l5.16-1.62c0.52-0.16,1.08,0.13,1.25,0.66l8.94,28.46h18.29C52.46,42.22,52.91,42.67,52.91,43.22z"
                            />
                            <path
                              fill="#92D3F5"
                              d="M29.4966,24.3829l-3.3355-10.6257c-0.1654-0.5269-0.7266-0.82-1.2536-0.6546l-1.0688,0.3355 c-0.527,0.1654-0.82,0.7267-0.6546,1.2536l3.3355,10.6257c0.1654,0.5269,0.7266,0.82,1.2536,0.6546l1.0688-0.3355 C29.369,25.4711,29.662,24.9098,29.4966,24.3829z"
                            />
                            <path
                              fill="#9B9B9A"
                              d="M46.0288,33.3353h-17.072C28.4284,33.3353,28,33.7636,28,34.292v2.5306 c0,0.5284,0.4284,0.9568,0.9568,0.9568h17.072c0.5284,0,0.9568-0.4284,0.9568-0.9568V34.292 C46.9856,33.7636,46.5572,33.3353,46.0288,33.3353z"
                            />
                          </g>
                          <g id="hair" />
                          <g id="skin" />
                          <g id="skin-shadow" />
                          <g id="line">
                            <path
                              fill="none"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="2"
                              d="M50.24,53.5698c0,0.01,0,0.01,0,0.02v5.41c0,0.55-0.44,1-1,1H31.41c-1.3799,0-2.5-1.12-2.5-2.5v-3.91c0-0.01,0-0.01,0-0.02 c0.48,0.31,1.05,0.5,1.67,0.5h18C49.19,54.0698,49.76,53.8798,50.24,53.5698z"
                            />
                            <path
                              fill="none"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="2"
                              d="M51.58,48.1498v2.92c0,1.05-0.54,1.96-1.34,2.5c-0.48,0.31-1.05,0.5-1.66,0.5h-18c-0.62,0-1.19-0.19-1.67-0.5 c-0.8-0.54-1.33-1.46-1.33-2.5v-2.92H51.58z"
                            />
                            <path
                              fill="none"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="2"
                              d="M28.84,25.6398l-0.39,0.12l-0.68,0.21c-0.52,0.17-1.09-0.13-1.25-0.65l-3.34-10.63c-0.16-0.52,0.13-1.09,0.66-1.25l0.49-0.16h0.01 l0.5699-0.18c0.52-0.16,1.09,0.1299,1.25,0.66l3.34,10.62C29.66,24.9098,29.37,25.4698,28.84,25.6398z"
                            />
                            <path
                              fill="none"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="2"
                              d="M52.91,43.2198v3.93c0,0.55-0.45,1-1,1H27.25c-0.56,0-1-0.45-1-1v-3.66l-8.64-27.51c-0.16-0.53,0.13-1.09,0.66-1.2599l5.16-1.62 c0.15-0.05,0.3-0.05,0.45-0.03c0.06,0.01,0.11,0.03,0.16,0.05c0.11,0.03,0.2,0.09,0.29,0.16l-0.49,0.16 c-0.53,0.16-0.82,0.73-0.66,1.25l3.34,10.63c0.16,0.52,0.73,0.82,1.25,0.65l0.68-0.21l2.38,7.58h-1.87c-0.53,0-0.96,0.42-0.96,0.95 v2.53c0,0.53,0.43,0.96,0.96,0.96h3.27l1.39,4.44h18.29C52.46,42.2198,52.91,42.6697,52.91,43.2198z"
                            />
                            <path
                              fill="none"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="1.9136"
                              d="M46.99,34.2897v2.53c0,0.53-0.43,0.96-0.96,0.96H28.96c-0.53,0-0.96-0.43-0.96-0.96v-2.53c0-0.53,0.43-0.95,0.96-0.95h17.07 C46.56,33.3398,46.99,33.7598,46.99,34.2897z"
                            />
                          </g>
                        </svg>
                        <small class="mt-1" style="color: #464646"
                          >51 Seats Left</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-12 text-center">
                      <span class="fw-bold" style="font-size: 1.1rem">{{
                        start_city
                      }}</span>
                      <span class="mx-2">-</span>
                      <span class="fw-bold" style="font-size: 1.1rem">{{
                        end_city
                      }}</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 d-flex align-items-center mb-2">
                      <svg
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 60.89 65.19"
                        width="30"
                        height="30"
                        style="padding-right: 5px"
                        class="img-fluid me-2"
                        alt="Bus Icon"
                      >
                        <path
                          class="cls-1"
                          d="M53.33,62.47H7.33c-2.79,0-5.05-2.27-5.05-5.05V8.35C2.28,3.75,6.03,0,10.63,0H50.03c4.6,0,8.35,3.75,8.35,8.35V57.42c0,2.79-2.27,5.05-5.05,5.05ZM10.63,4c-2.4,0-4.35,1.95-4.35,4.35V57.42c0,.58,.47,1.05,1.05,1.05H53.33c.58,0,1.05-.47,1.05-1.05V8.35c0-2.4-1.95-4.35-4.35-4.35H10.63Z"
                        ></path>
                        <path
                          class="cls-1"
                          d="M56.38,47.53H4.28c-1.1,0-2-.9-2-2s.9-2,2-2H56.38c1.1,0,2,.9,2,2s-.9,2-2,2Z"
                        ></path>
                        <g>
                          <rect
                            class="cls-1"
                            x="10.78"
                            y="52.33"
                            width="6.06"
                            height="3"
                          ></rect>
                          <rect
                            class="cls-1"
                            x="42.47"
                            y="52.33"
                            width="6.06"
                            height="3"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            class="cls-1"
                            x="9.92"
                            y="59.19"
                            width="6.34"
                            height="6"
                          ></rect>
                          <rect
                            class="cls-1"
                            x="43.06"
                            y="59.19"
                            width="6.34"
                            height="6"
                          ></rect>
                        </g>
                        <g>
                          <path
                            class="cls-1"
                            d="M57.89,32.87c-1.66,0-3-1.34-3-3v-8.04c0-1.66,1.34-3,3-3s3,1.34,3,3v8.04c0,1.66-1.34,3-3,3Z"
                          ></path>
                          <path
                            class="cls-1"
                            d="M3,32.87c-1.66,0-3-1.34-3-3v-8.04c0-1.66,1.34-3,3-3s3,1.34,3,3v8.04c0,1.66-1.34,3-3,3Z"
                          ></path>
                        </g>
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <circle
                          cx="4.78114"
                          cy="4.78114"
                          r="4.78114"
                          fill="#38B548"
                        />
                      </svg>
                      <span class="ps-2 text-dark"
                        >Bus No-
                        <label id="busPlateNumber_0_0">{{
                          bus.bus
                        }}</label></span
                      >
                    </div>
                    <div class="col-12">
                      <p id="busType_0_0" class="mb-0 mx-4 text-dark">
                        2x2 -------------------------------- |
                        <span style="color: #d55b4c" id="busVia_0_0">
                          {{ bus.via }}</span
                        >
                      </p>
                    </div>
                  </div>
                  <div class="row text-dark mt-2">
                    <div class="col-lg-4">
                      <span id="deptTime_0_0" class="fw-bold">
                        {{ bus.origin_point }} ({{ bus.departure }})
                      </span>
                    </div>
                    <div class="col-lg-4">
                      <span id="journeyDurationText_0_0" class="p-2">
                        <img
                          src="images/timebar1.png"
                          width="40"
                          alt="Time Start"
                        />
                        <span style="color: #333333">
                          {{ bus.distance }} - {{ bus.approximate_hours }}</span
                        >
                        <img
                          src="/images/timebar2.png"
                          width="40"
                          alt="Time End"
                        />
                      </span>
                    </div>
                    <div class="col-lg-4">
                      <input
                        type="hidden"
                        value="09:00"
                        id="journeyDuration_0_0"
                      />
                      <span id="arrTime_0_0" class="fw-bold">
                        {{ bus.destination_point }}({{ bus.arrival }})
                      </span>
                    </div>
                  </div>

                  <div class="col-12">
                    <hr />
                  </div>
                  <div class="row pb-3">
                    <div class="col-md-9 col-12 mb-2">
                      <div
                        class="bottom-box"
                        style="background-color: #f4f5f5; padding: 4px"
                      >
                        <div class="bus-feature">
                          <div class="bus-f-details d-flex align-items-center">
                            <div class="bus-f-title">
                              <div class="bus-f-icn">
                                <span class="fw-bold">Amenities:</span>
                              </div>
                            </div>
                            <div
                              class="bus-f-icn"
                              v-for="service in bus.bus_services"
                              :key="service"
                            >
                              <svg
                                v-if="service === 'AC'"
                                version="1.1"
                                id="Layer_1"
                                width="20"
                                height="20"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512 512"
                                xml:space="preserve"
                                fill="#000000"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <rect
                                    x="366.333"
                                    y="109.101"
                                    style="fill: #dfdfe2"
                                    width="111.366"
                                    height="95.234"
                                  ></rect>
                                  <rect
                                    x="420.752"
                                    y="109.101"
                                    style="fill: #d7d6d9"
                                    width="56.958"
                                    height="95.234"
                                  ></rect>
                                  <path
                                    style="fill: #2b292c"
                                    d="M405.236,265.149V450.44c0,16.592-13.5,30.092-30.092,30.092H207.787 c-22.482,0-40.774-18.291-40.774-40.772v-32.785h-33.78v32.785c0,39.835,32.407,72.241,72.242,72.241h169.669 c33.945,0,61.56-27.616,61.56-61.56V265.149H405.236z"
                                  ></path>
                                  <rect
                                    x="18.996"
                                    style="fill: #3276c3"
                                    width="261.177"
                                    height="422.703"
                                  ></rect>
                                  <g>
                                    <rect
                                      x="18.996"
                                      y="291.481"
                                      style="fill: #dfdfe2"
                                      width="261.177"
                                      height="31.468"
                                    ></rect>
                                    <rect
                                      x="131.758"
                                      y="348.124"
                                      style="fill: #dfdfe2"
                                      width="35.664"
                                      height="31.468"
                                    ></rect>
                                  </g>
                                  <rect
                                    x="149.768"
                                    y="0.004"
                                    style="fill: #3276c3"
                                    width="130.405"
                                    height="422.703"
                                  ></rect>
                                  <rect
                                    x="149.768"
                                    y="291.481"
                                    style="fill: #dfdfe2"
                                    width="130.405"
                                    height="31.468"
                                  ></rect>
                                  <rect
                                    x="149.768"
                                    y="348.124"
                                    style="fill: #d7d6d9"
                                    width="17.643"
                                    height="31.468"
                                  ></rect>
                                  <g>
                                    <rect
                                      x="400.655"
                                      y="138.408"
                                      style="fill: #57565c"
                                      width="15.438"
                                      height="13.321"
                                    ></rect>
                                    <rect
                                      x="425.326"
                                      y="138.408"
                                      style="fill: #57565c"
                                      width="15.438"
                                      height="13.321"
                                    ></rect>
                                  </g>
                                  <rect
                                    x="351.04"
                                    y="172.866"
                                    style="fill: #3276c3"
                                    width="141.954"
                                    height="108.01"
                                  ></rect>
                                  <rect
                                    x="420.752"
                                    y="172.866"
                                    style="fill: #3276c3"
                                    width="72.251"
                                    height="108.02"
                                  ></rect>
                                  <polygon
                                    style="fill: #dfdfe2"
                                    points="205.145,144.791 152.416,144.791 157.136,138.412 188.86,94.125 163.075,76.087 93,176.259 145.071,176.259 142.364,180.545 110.063,232.113 123.209,240.759 123.209,240.759 123.209,240.759 136.355,249.403 "
                                  ></polygon>
                                  <polygon
                                    style="fill: #d7d6d9"
                                    points="205.146,144.79 149.772,228.999 149.772,95.101 163.073,76.084 188.856,94.126 157.136,138.412 152.416,144.79 "
                                  ></polygon>
                                </g>
                              </svg>
                              <svg
                                v-if="service === 'USB & Charging System'"
                                fill="#3276c3"
                                width="20px"
                                height="20px"
                                viewBox="0 0 64 64"
                                style="
                                  fill-rule: evenodd;
                                  clip-rule: evenodd;
                                  stroke-linejoin: round;
                                  stroke-miterlimit: 2;
                                "
                                version="1.1"
                                xml:space="preserve"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:serif="http://www.serif.com/"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                              >
                                <g id="Expanded">
                                  <path
                                    d="M44.343,41.6c-0,-0 -0.528,1.296 -1.027,2.519c-0.687,1.687 0.122,3.613 1.809,4.302l0.002,0.001c0.375,0.153 0.666,0.462 0.797,0.845c0.132,0.384 0.091,0.806 -0.112,1.157c-0.722,1.25 -1.457,2.523 -1.457,2.523c-0.276,0.478 -0.112,1.09 0.366,1.366c0.478,0.276 1.09,0.112 1.366,-0.366c-0,0 0.735,-1.273 1.457,-2.523c0.492,-0.852 0.591,-1.874 0.273,-2.804c-0.319,-0.93 -1.023,-1.678 -1.934,-2.049l-0.001,-0.001c-0.665,-0.272 -0.985,-1.031 -0.713,-1.697c-0,0 1.026,-2.518 1.026,-2.518c0.208,-0.512 -0.038,-1.096 -0.549,-1.304c-0.511,-0.208 -1.095,0.038 -1.303,0.549Zm-25.857,-0c-0,-0 -0.528,1.296 -1.026,2.519c-0.688,1.687 0.122,3.613 1.809,4.302l0.001,0.001c0.376,0.153 0.667,0.462 0.798,0.845c0.131,0.384 0.09,0.806 -0.113,1.157c-0.721,1.25 -1.457,2.523 -1.457,2.523c-0.276,0.478 -0.112,1.09 0.366,1.366c0.478,0.276 1.09,0.112 1.366,-0.366c0,0 0.736,-1.273 1.457,-2.523c0.492,-0.852 0.591,-1.874 0.273,-2.804c-0.318,-0.93 -1.023,-1.678 -1.933,-2.049l-0.002,-0.001c-0.665,-0.272 -0.984,-1.031 -0.713,-1.697c-0,0 1.026,-2.518 1.026,-2.518c0.208,-0.512 -0.038,-1.096 -0.549,-1.304c-0.511,-0.208 -1.095,0.038 -1.303,0.549Zm12.928,-0c0,-0 -0.528,1.296 -1.026,2.519c-0.688,1.687 0.122,3.613 1.809,4.302l0.002,0.001c0.375,0.153 0.666,0.462 0.797,0.845c0.131,0.384 0.09,0.806 -0.112,1.157c-0.722,1.25 -1.457,2.523 -1.457,2.523c-0.276,0.478 -0.112,1.09 0.366,1.366c0.478,0.276 1.09,0.112 1.366,-0.366c-0,0 0.735,-1.273 1.457,-2.523c0.491,-0.852 0.591,-1.874 0.272,-2.804c-0.318,-0.93 -1.023,-1.678 -1.933,-2.049l-0.001,-0.001c-0.666,-0.272 -0.985,-1.031 -0.714,-1.697c0,0 1.026,-2.518 1.026,-2.518c0.209,-0.512 -0.037,-1.096 -0.548,-1.304c-0.512,-0.208 -1.096,0.038 -1.304,0.549Zm-28.414,-27.047l-0,14.5c0,0.168 0.042,0.327 0.115,0.466l2.126,6.737c0.526,1.665 2.07,2.797 3.815,2.797l45.888,-0c1.745,-0 3.289,-1.132 3.815,-2.797l2.126,-6.737c0.073,-0.139 0.115,-0.298 0.115,-0.466l-0,-14.5c-0,-1.657 -1.343,-3 -3,-3l-52,-0c-1.657,-0 -3,1.343 -3,3Zm15.453,22.5l0.766,-2c-0,-0 25.562,-0 25.562,-0l0.766,2l-27.094,-0Zm17.645,-9.053l22.902,-0l-0,-6.447l-11,-0l-0,2.5c-0,0.552 -0.448,1 -1,1l-7.789,-0c-0.769,1.227 -1.842,2.245 -3.113,2.947Zm-20.098,-6.447l-11,-0l-0,6.447l22.902,-0c-1.271,-0.702 -2.344,-1.72 -3.113,-2.947l-7.789,-0c-0.552,-0 -1,-0.448 -1,-1l-0,-2.5Zm16,-7.5c3.587,-0 6.5,2.912 6.5,6.5c0,3.587 -2.913,6.5 -6.5,6.5c-3.587,-0 -6.5,-2.913 -6.5,-6.5c0,-3.588 2.913,-6.5 6.5,-6.5Zm1.538,9.018c0.115,-0.128 0.09,-0.329 -0.052,-0.424c-0.428,-0.288 -0.94,-0.475 -1.49,-0.475c-0.549,0 -1.059,0.187 -1.487,0.473c-0.143,0.095 -0.168,0.296 -0.053,0.424l1.333,1.486c0.111,0.123 0.303,0.123 0.414,0l1.335,-1.484Zm-1.541,-2.135c0.898,0 1.727,0.298 2.395,0.798c0.118,0.087 0.28,0.078 0.378,-0.031l0.477,-0.531c0.108,-0.12 0.096,-0.31 -0.03,-0.408c-0.892,-0.692 -2.007,-1.133 -3.22,-1.133c-1.212,-0 -2.326,0.44 -3.216,1.13c-0.127,0.098 -0.138,0.288 -0.031,0.407l0.476,0.532c0.098,0.109 0.261,0.119 0.378,0.031c0.668,-0.498 1.495,-0.795 2.393,-0.795Zm-0,-2.577c1.56,0 2.991,0.546 4.119,1.451c0.116,0.093 0.281,0.083 0.381,-0.028l0.43,-0.477c0.106,-0.119 0.096,-0.306 -0.028,-0.407c-1.339,-1.095 -3.042,-1.845 -4.902,-1.845c-1.858,-0 -3.559,0.747 -4.896,1.839c-0.124,0.101 -0.135,0.288 -0.028,0.407l0.429,0.478c0.099,0.111 0.265,0.121 0.381,0.028c1.127,-0.902 2.555,-1.446 4.114,-1.446Zm27.003,1.194l-0,-5c-0,-0.553 -0.448,-1 -1,-1l-21.179,-0c0.957,0.66 1.772,1.512 2.39,2.5l7.789,-0c0.552,-0 1,0.447 1,1l-0,2.5l11,-0Zm-31.821,-6l-21.179,-0c-0.552,-0 -1,0.447 -1,1l-0,5l11,-0l-0,-2.5c-0,-0.553 0.448,-1 1,-1l7.789,-0c0.618,-0.988 1.433,-1.84 2.39,-2.5Z"
                                    id="Wifi"
                                  />
                                </g>
                              </svg>
                              <svg
                                v-if="service === 'TV'"
                                viewBox="0 0 1024 1024"
                                class="icon"
                                width="20"
                                height="20"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    d="M87.495111 189.041778h844.458667v544.631466H87.495111z"
                                    fill="#3276c3"
                                  ></path>
                                  <path
                                    d="M144.2816 246.078578h730.885689v430.535111H144.2816z"
                                    fill="#E6E6E6"
                                  ></path>
                                  <path
                                    d="M598.698667 246.078578L303.479467 676.625067H179.848533l295.2192-430.546489zM740.113067 246.078578L444.882489 676.625067h-80.384l295.2192-430.546489z"
                                    fill="#FFFFFF"
                                  ></path>
                                  <path
                                    d="M707.447467 803.862756H311.990044c-34.599822 0-62.646044 28.194133-62.646044 62.953244h520.749511c0.011378-34.759111-28.046222-62.953244-62.646044-62.953244z"
                                    fill="#3276c3"
                                  ></path>
                                  <path
                                    d="M362.894222 733.661867h293.671822v70.212266H362.894222z"
                                    fill="#3276c3"
                                  ></path>
                                  <path
                                    d="M931.953778 174.2848H227.077689c-8.112356 0-14.688711 6.599111-14.688711 14.7456s6.576356 14.756978 14.688711 14.756978H917.276444v515.117511H102.183822V203.798756h80.509156c8.112356 0 14.688711-6.610489 14.688711-14.756978s-6.576356-14.756978-14.688711-14.756978H87.495111c-8.100978 0-14.677333 6.599111-14.677333 14.756978v544.631466c0 8.135111 6.576356 14.7456 14.688711 14.7456h260.721778v40.698312h-36.226845c-42.643911 0-77.323378 34.861511-77.323378 77.710222 0 8.135111 6.576356 14.7456 14.688712 14.7456h520.749511c8.112356 0 14.677333-6.610489 14.677333-14.7456 0-42.848711-34.690844-77.710222-77.334756-77.710222h-36.215466v-40.698312H931.953778c8.112356 0 14.677333-6.610489 14.677333-14.7456V189.041778c0-8.157867-6.576356-14.756978-14.677333-14.756978zM753.106489 852.0704H266.331022a48.071111 48.071111 0 0 1 45.659022-33.439289h395.457423a48.036978 48.036978 0 0 1 45.659022 33.439289z m-111.240533-62.953244H377.582933V748.430222h264.2944v40.686934h-0.011377z"
                                    fill=""
                                  ></path>
                                  <path
                                    d="M875.178667 540.603733c8.112356 0 14.677333-6.599111 14.677333-14.756977V246.089956c0-8.146489-6.564978-14.756978-14.677333-14.756978H144.270222c-8.112356 0-14.688711 6.610489-14.688711 14.756978v430.535111c0 8.135111 6.576356 14.7456 14.688711 14.7456h730.908445c8.112356 0 14.677333-6.610489 14.677333-14.7456v-103.560534c0-8.157867-6.564978-14.756978-14.677333-14.756977s-14.688711 6.599111-14.688711 14.756977v88.803556H158.958933V260.835556h701.531023v265.0112c0 8.157867 6.576356 14.756978 14.688711 14.756977z"
                                    fill=""
                                  ></path>
                                  <path
                                    d="M396.822756 590.859378c8.100978 0 14.677333-6.610489 14.677333-14.756978V361.358222h55.796622c8.112356 0 14.688711-6.610489 14.688711-14.756978s-6.576356-14.756978-14.688711-14.756977H323.743289c-8.112356 0-14.688711 6.610489-14.688711 14.756977s6.576356 14.756978 14.688711 14.756978h58.402133v214.755556c0 8.135111 6.576356 14.7456 14.677334 14.7456zM556.612267 386.9696l-16.827734-45.511111a14.665956 14.665956 0 0 0-18.875733-8.692622 14.779733 14.779733 0 0 0-8.647111 18.966755l16.827733 45.499734a14.688711 14.688711 0 0 0 18.864356 8.692622 14.768356 14.768356 0 0 0 8.658489-18.955378zM597.105778 581.245156c2.139022 5.779911 7.623111 9.614222 13.755733 9.614222s11.616711-3.834311 13.755733-9.614222l84.844089-229.512534c2.821689-7.634489-1.046756-16.122311-8.647111-18.966755s-16.054044 1.058133-18.875733 8.692622L610.861511 533.731556l-40.686933-110.091378a14.677333 14.677333 0 0 0-18.875734-8.692622 14.779733 14.779733 0 0 0-8.658488 18.966755l54.465422 147.330845z"
                                    fill=""
                                  ></path>
                                </g>
                              </svg>
                              <svg
                                v-if="service === 'Soft Drinks & Snacks'"
                                fill="#3276c3"
                                height="20px"
                                width="20px"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 444.657 444.657"
                                xml:space="preserve"
                              >
                                <path
                                  id="XMLID_419_"
                                  d="M235.728,163.136c-2.744,2.724-7.177,2.706-9.899-0.038c-15.087-15.205-35.19-23.578-56.604-23.578
                                c-43.971,0-79.745,35.773-79.745,79.744c0,43.972,35.773,79.745,79.745,79.745c21.414,0,41.517-8.374,56.605-23.58
                                c2.722-2.744,7.154-2.762,9.899-0.038c2.744,2.723,2.762,7.155,0.038,9.899c-17.737,17.875-41.369,27.719-66.543,27.719
                                c-51.691,0-93.745-42.054-93.745-93.745c0-51.69,42.054-93.744,93.745-93.744c25.175,0,48.806,9.844,66.542,27.717
                                C238.49,155.98,238.472,160.413,235.728,163.136z M383.617,410.604c0,18.776-15.277,34.053-34.055,34.053
                                c-10.794,0-20.731-5.171-27.055-13.422c-6.322,8.251-16.259,13.422-27.054,13.422c-18.777,0-34.055-15.276-34.055-34.053V274.62
                                c0-3.25,2.236-6.072,5.399-6.814c8.981-2.109,15.5-10.32,15.5-19.525c0-9.165-6.462-17.347-15.384-19.5
                                c-0.907-0.196-1.749-0.568-2.488-1.078c-0.003-0.003-0.006-0.005-0.009-0.007c-0.001,0-0.002-0.001-0.003-0.001
                                c-0.438-0.304-0.837-0.654-1.192-1.045c-1.112-1.222-1.799-2.84-1.822-4.616v-0.001c0,0,0-0.01-0.001-0.015v-0.007v-0.012v-0.011
                                v-0.009v-0.014c0-0.002,0-0.005,0-0.005c0-0.01,0-0.017,0-0.023v-46.557c0-17.955,11.24-33.334,27.055-39.471v-33.792
                                c0-3.866,3.134-7,7-7h54.108c3.866,0,7,3.134,7,7v33.791c15.813,6.137,27.055,21.517,27.055,39.472v46.557
                                c0,3.249-2.235,6.071-5.398,6.814c-8.98,2.11-15.499,10.323-15.499,19.527s6.519,17.416,15.499,19.526
                                c3.163,0.743,5.398,3.565,5.398,6.814v16.878c0,3.866-3.134,7-7,7s-7-3.134-7-7v-11.83c-12.382-5.256-20.897-17.672-20.897-31.388
                                c0-13.717,8.516-26.135,20.897-31.391v-41.509c0-15.615-12.704-28.318-28.319-28.318h-37.578c-15.616,0-28.32,12.703-28.32,28.318
                                v39.557h54.159c3.866,0,7,3.134,7,7s-3.134,7-7,7h-39.39c3.875,5.571,6.13,12.284,6.13,19.342c0,13.719-8.517,26.136-20.899,31.39
                                v34.558h70.189c3.866,0,7,3.134,7,7s-3.134,7-7,7h-70.189v82.378c0,11.058,8.996,20.053,20.055,20.053
                                c8.938,0,16.879-6.028,19.311-14.659c0.85-3.018,3.603-5.102,6.737-5.102h2.012c3.135,0,5.888,2.084,6.737,5.102
                                c2.433,8.631,10.373,14.659,19.312,14.659c11.059,0,20.055-8.995,20.055-20.053c0-3.866,3.134-7,7-7
                                S383.617,406.738,383.617,410.604z M302.454,133.081c0.42-0.013,0.843-0.019,1.266-0.019h37.578c0.423,0,0.845,0.006,1.265,0.019
                                v-23.963h-13.054v5.036c0,3.866-3.134,7-7,7s-7-3.134-7-7v-5.036h-13.055V133.081z M243.189,396.095c0,3.866-3.134,7-7,7H42.915
                                c-3.866,0-7-3.134-7-7V42.432c0-3.866,3.134-7,7-7h43.523V7c0-3.866,3.134-7,7-7h50.524c3.866,0,7,3.134,7,7v28.432h144.569
                                c3.866,0,7,3.134,7,7v26.822c0,3.866-3.134,7-7,7s-7-3.134-7-7V49.432H49.915v339.663h186.274
                                C240.055,389.095,243.189,392.229,243.189,396.095z M100.438,35.432h36.524V14H125.7v4.239c0,3.866-3.134,7-7,7s-7-3.134-7-7V14
                                h-11.262V35.432z M170.18,212.264h-1.912c-3.866,0-7,3.134-7,7s3.134,7,7,7h1.912c3.866,0,7-3.134,7-7
                                S174.046,212.264,170.18,212.264z M346.458,207.558c3.866,0,7-3.134,7-7v-18.793c0-11.722-9.536-21.258-21.257-21.258
                                c-3.866,0-7,3.134-7,7s3.134,7,7,7c4.001,0,7.257,3.256,7.257,7.258v18.793C339.458,204.424,342.592,207.558,346.458,207.558z
                                M405.347,372.237c-5.548,10.841-16.557,17.575-28.73,17.575c-8.148,0-15.94-4.27-22.297-10.451c-4.34-3.582-9.897-6.444-15.481-6.444
                                c-5.502,0-10.893,2.85-15.253,6.444c-6.243,6.181-14.133,10.451-22.297,10.451c-12.174,0-23.182-6.734-28.73-17.575
                                c-5.181-9.362-6.167-20.446-4.433-30.533c1.734-10.086,6.575-19.618,14.313-26.722c3.239-3.018,6.953-5.577,10.766-7.418
                                c0.69-0.38,1.391-0.73,2.096-1.027c5.07-2.533,10.626-4.056,16.557-5.048c10.133-1.56,20.053-2.176,30.004-3.594
                                c13.103-2.764,26.231-8.538,38.724-16.577c-6.269-7.467-14.049-14.325-21.406-20.48c-7.497-6.006-16.077-11.205-25.46-15.129
                                c-11.392-4.912-23.736-8.727-36.205-11.68c-12.466-2.946-25.355-5.69-38.173-6.785c-14.24-1.195-29.458,0.595-43.521,6.135
                                c-5.214,2.702-9.93,6.431-14.068,10.46c-8.72,7.632-17.473,16.278-26.054,24.815c-2.757,2.607-5.421,5.304-8.227,8.129
                                c-3.466,3.633-6.699,7.598-9.728,11.603c-3.251,4.688-5.605,9.732-7.226,14.851c-2.364,6.951-4.116,14.38-4.059,21.731
                                c0.073,8.167,2.429,16.117,6.25,23.283c3.708,6.743,8.867,12.68,14.33,17.557c8.098,7.563,17.551,13.492,27.393,16.354
                                c9.666,2.704,19.805,4.01,29.569,5.42c7.704,1.316,15.253,3.014,22.508,5.236c10.224,2.77,20.581,5.883,30.473,9.264
                                c10.057,3.347,20.536,7.593,30.42,12.717c1.349,0.673,2.688,1.46,4.024,2.273c5.953,4.079,11.338,8.498,16.319,13.524
                                c9.724,10.556,17.664,23.747,19.647,37.42C401.18,351.057,400.295,362.185,405.347,372.237z M157.212,58.916c0,5.25-4.249,9.5-9.5,9.5
                                s-9.5-4.249-9.5-9.5s4.249-9.5,9.5-9.5C152.963,49.416,157.212,53.666,157.212,58.916z M267.758,119.739c0,5.25-4.249,9.5-9.5,9.5
                                s-9.5-4.249-9.5-9.5s4.249-9.5,9.5-9.5S267.758,114.489,267.758,119.739z"
                                />
                              </svg>
                              <svg
                                v-if="service === 'Toilet'"
                                fill="#3276c3"
                                viewBox="-12.35 0 122.88 122.88"
                                width="20"
                                height="20"
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                style="enable-background: new 0 0 98.18 122.88"
                                xml:space="preserve"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <g>
                                    <path
                                      d="M21.58,24.97c0-1.01,0.82-1.82,1.82-1.82c1.01,0,1.82,0.82,1.82,1.82v33.33c0,1.01-0.82,1.82-1.82,1.82H1.82 C0.82,60.13,0,59.31,0,58.31V3.92c0-1.07,0.44-2.05,1.15-2.77l0.01-0.01C1.88,0.44,2.85,0,3.93,0H21.3c1.07,0,2.06,0.44,2.77,1.16 l0,0c0.71,0.71,1.15,1.69,1.15,2.77v4.62c0,1.01-0.82,1.82-1.82,1.82c-1.01,0-1.82-0.82-1.82-1.82V3.92c0-0.07-0.03-0.14-0.08-0.2 l0,0l0,0c-0.05-0.05-0.12-0.08-0.2-0.08H3.93c-0.08,0-0.15,0.03-0.2,0.08L3.72,3.73c-0.05,0.05-0.08,0.12-0.08,0.2v52.56h17.94 V24.97L21.58,24.97z M21.57,99.88L0.21,59.15c-0.46-0.89-0.12-1.98,0.77-2.45c0.27-0.14,0.56-0.21,0.84-0.21v-0.01h94.53 c1.01,0,1.82,0.82,1.82,1.82c0,0.07,0,0.14-0.01,0.21c-0.51,21.74-11.17,27.86-20.14,33c-5.24,3.01-9.83,5.64-10.69,11.21 l-0.01,0.05c-0.33,2.18-0.15,4.68,0.54,7.51c0.72,2.95,1.99,6.27,3.84,9.96c0.45,0.9,0.08,1.99-0.82,2.44 c-0.26,0.13-0.54,0.19-0.81,0.19l-57.06,0c-1.01,0-1.82-0.82-1.82-1.82c0-0.35,0.1-0.68,0.28-0.96L21.57,99.88L21.57,99.88z M4.83,60.13l20.39,38.89c0.26,0.5,0.28,1.11,0.01,1.65l-9.28,18.57h51.24c-1.3-2.89-2.25-5.59-2.86-8.09 c-0.81-3.32-1.01-6.29-0.61-8.91l0.01-0.06c1.13-7.3,6.43-10.34,12.48-13.81c7.92-4.54,17.29-9.92,18.26-28.23H4.83L4.83,60.13z M23.61,101.68c-1.01,0-1.82-0.82-1.82-1.82c0-1.01,0.82-1.82,1.82-1.82H43.5c1.01,0,1.82,0.82,1.82,1.82 c0,1.01-0.82,1.82-1.82,1.82H23.61L23.61,101.68z M25.21,58.58c-0.15,0.99-1.08,1.68-2.07,1.53c-0.99-0.15-1.68-1.08-1.53-2.07 c0.29-1.88,0.76-3.58,1.42-5.07c0.69-1.55,1.58-2.86,2.67-3.93c3.54-3.46,8.04-3.38,12.34-3.3c0.38,0.01,0.75,0.01,1.72,0.01 l38.96,0c9.24-0.06,19.48-0.13,19.43,13c0,1-0.81,1.81-1.81,1.81s-1.81-0.81-1.81-1.81c0.04-9.48-8.28-9.42-15.78-9.37 c-1.13,0.01-1.1,0.02-1.77,0.02H39.77l-1.78-0.03c-3.56-0.06-7.29-0.13-9.75,2.28c-0.77,0.75-1.39,1.68-1.89,2.79 C25.83,55.6,25.45,56.98,25.21,58.58L25.21,58.58z M15.33,11.17c2.83,0,5.12,2.29,5.12,5.12c0,2.83-2.29,5.12-5.12,5.12 c-2.83,0-5.12-2.29-5.12-5.12C10.21,13.46,12.51,11.17,15.33,11.17L15.33,11.17z M20.45,18.11c-1.01,0-1.82-0.82-1.82-1.82 c0-1.01,0.82-1.82,1.82-1.82h12.28c1.01,0,1.82,0.82,1.82,1.82c0,1.01-0.82,1.82-1.82,1.82H20.45L20.45,18.11z"
                                    ></path>
                                  </g>
                                </g>
                              </svg>
                              <svg
                                v-if="service === 'First Aid Kit'"
                                fill="#3276c3"
                                height="20px"
                                width="20px"
                                version="1.1"
                                id="_x32_"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512 512"
                                xml:space="preserve"
                              >
                                <g>
                                  <path
                                    class="st0"
                                    d="M505.465,145.22c-6.322-14.934-16.828-27.578-30.072-36.536c-13.236-8.951-29.314-14.2-46.45-14.192h-70.23
                                    V75.574c0-10.095-2.06-19.803-5.785-28.604c-5.589-13.212-14.878-24.389-26.6-32.313C314.632,6.74,300.385,2.091,285.239,2.099
                                    h-58.478c-10.086,0-19.803,2.06-28.604,5.786c-13.212,5.588-24.396,14.878-32.313,26.598c-7.916,11.698-12.558,25.936-12.558,41.09
                                    v18.919H83.056c-11.413,0-22.392,2.329-32.329,6.536c-14.933,6.322-27.578,16.827-36.536,30.072
                                    C5.241,144.336-0.008,160.413,0,177.549v249.295c0,11.421,2.32,22.384,6.536,32.337c6.314,14.924,16.827,27.569,30.072,36.52
                                    c13.236,8.958,29.313,14.207,46.448,14.2h345.888c11.413,0.007,22.385-2.32,32.337-6.535c14.926-6.315,27.57-16.828,36.521-30.072
                                    c8.958-13.229,14.207-29.314,14.199-46.45V177.549C512,166.136,509.68,155.157,505.465,145.22z M190.722,75.574
                                    c0-5.028,1.01-9.724,2.826-14.026c2.723-6.44,7.317-11.981,13.079-15.872c5.777-3.884,12.612-6.133,20.134-6.141h58.478
                                    c5.027,0,9.716,1.01,14.017,2.826c6.449,2.715,11.981,7.317,15.873,13.079c3.891,5.777,6.141,12.604,6.141,20.134v18.919H190.722
                                    V75.574z M474.564,426.844c0,6.354-1.278,12.305-3.584,17.751c-3.449,8.16-9.258,15.162-16.544,20.087
                                    c-7.309,4.917-15.983,7.774-25.494,7.782H83.056c-6.353,0-12.297-1.279-17.751-3.583c-8.161-3.442-15.162-9.251-20.087-16.552
                                    c-4.917-7.292-7.774-15.974-7.782-25.486V236.643h437.129V426.844z M474.564,206.223H37.436v-28.674
                                    c0.008-6.346,1.278-12.297,3.584-17.751c3.44-8.162,9.258-15.162,16.551-20.088c7.294-4.917,15.976-7.774,25.486-7.782h345.888
                                    c6.354,0.008,12.297,1.278,17.751,3.584c8.162,3.442,15.162,9.258,20.088,16.544c4.917,7.301,7.766,15.983,7.782,25.494V206.223z"
                                  />
                                  <polygon
                                    class="st0"
                                    points="229.05,438.241 287.149,438.241 287.149,384.018 341.373,384.018 341.373,325.919 287.149,325.919 
                                    287.149,271.703 229.05,271.703 229.05,325.919 174.826,325.919 174.826,384.018 229.05,384.018 	"
                                  />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-12">
                      <button
                        v-if="
                          !selectedBus ||
                          selectedBus.schedule_id !== bus.schedule_id
                        "
                        type="button"
                        class="btn btn-danger w-100"
                        @click="bookTicket(bus)"
                        style="
                          height: 50px;
                          font-size: 1.2rem;
                          border-radius: 8px;
                        "
                      >
                        BOOK TICKET
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="selectedBus && selectedBus.schedule_id === bus.schedule_id"
            >
              <div v-if="isSkeletonLoading" class="row seat-map-container">
                <div class="col-12 col-md-6 mt-2">
                  <div
                    class="skeleton skeleton-seat-map mx-md-3 p-3 border rounded shadow-sm bg-white"
                  >
                    <div class="skeleton-row">
                      <div class="skeleton skeleton-icon"></div>
                      <div class="skeleton skeleton-text"></div>
                      <div class="skeleton skeleton-icon"></div>
                      <div class="skeleton skeleton-text"></div>
                      <div class="skeleton skeleton-icon"></div>
                      <div class="skeleton skeleton-text"></div>
                    </div>
                    <div class="skeleton skeleton-form"></div>
                  </div>
                </div>

                <!-- Right Section: Bus Info Skeleton -->
                <div class="col-12 col-md-6 mt-2">
                  <div
                    class="skeleton skeleton-bus-info p-3 border rounded shadow-sm bg-light"
                  >
                    <div class="skeleton skeleton-tabs">
                      <div class="skeleton skeleton-tab"></div>
                      <div class="skeleton skeleton-tab"></div>
                    </div>
                    <div class="skeleton skeleton-tab-content"></div>
                    <div class="skeleton skeleton-button"></div>
                  </div>
                </div>
              </div>
              <div v-else class="row seat-map-container">
                <div class="col-12 col-md-6 mt-2">
                  <div
                    class="seat-map mx-md-3 p-3 border rounded shadow-sm bg-white"
                  >
                    <div
                      class="row1 d-flex flex-column flex-md-row justify-content-center align-items-start gap-3"
                      style="margin-top: 25px"
                    >
                      <!-- Icon and Text for Zinazopatikana -->
                      <div class="icon-container text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 100 125"
                          width="70"
                          height="70"
                          xml:space="preserve"
                          style="padding: 10px; margin: 4px; border-radius: 5px"
                        >
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
                            fill="#FFFFFF"
                            stroke="#000000"
                            stroke-width="2"
                          />
                        </svg>
                        <div>Zinazopatikana</div>
                      </div>

                      <!-- Icon and Text for Unazochagua -->
                      <div class="icon-container text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 100 125"
                          width="70"
                          height="70"
                          xml:space="preserve"
                          style="padding: 10px; margin: 4px; border-radius: 5px"
                        >
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
                            fill="#28ABE2"
                            stroke="#000000"
                            stroke-width="2"
                          />
                        </svg>
                        <div>Unazochagua</div>
                      </div>

                      <!-- Icon and Text for Haipatikani -->
                      <div class="icon-container text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 100 125"
                          width="70"
                          height="70"
                          xml:space="preserve"
                          style="padding: 10px; margin: 4px; border-radius: 5px"
                        >
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
                        </svg>
                        <div>Haipatikani</div>
                      </div>
                    </div>

                    <form
                      method="post"
                      enctype="multipart/form-data"
                      action=""
                      class="wow fadeInUp"
                      id="contact-form"
                      role="form"
                      data-wow-delay="0.8s"
                    >
                      <div class="plane">
                        <div class="cockpit">
                          <h6 class="cockpit-heading">
                            {{ data.bus_schedule.origin_city }} -
                            {{ data.bus_schedule.destination_city }} ({{
                              data.bus_schedule.via
                            }}
                            )
                            <br />
                            Chagua Siti
                          </h6>
                          <!-- <div class="moving-text">
                                                    {{ data.bus_schedule.origin_city }} - {{ data.bus_schedule.destination_city }} ({{ data.bus_schedule.via }})
                                                </div> -->
                        </div>
                        <!-- <input type="hidden" name="schedule_id" :value="scheduleId" /> -->
                        <input
                          type="hidden"
                          name="from_city_id"
                          :value="origin_city_id"
                        />
                        <input
                          type="hidden"
                          name="to_city_id"
                          :value="destination_city_id"
                        />
                        <input
                          type="hidden"
                          name="schedule_id"
                          :value="busId"
                        />
                        <ol
                          class="cabin fuselage"
                          v-if="data.seatMatrix.length"
                        >
                          <li class="row row--driver">
                            <ol class="seats driver-seats" type="A">
                              <li class="seat driver-seat">
                                <img
                                  src="@/assets/images/drive-wheel1.svg"
                                  alt="Driver Icon"
                                  class="driver-icon"
                                />
                              </li>
                            </ol>
                          </li>
                          <li
                            v-for="(row, rowIndex) in data.seatMatrix"
                            :key="'row-' + rowIndex"
                            :class="'row row--' + (rowIndex + 1)"
                          >
                            <template v-if="rowIndex === 13">
                              <ol class="seatsL" type="A">
                                <li
                                  v-for="(seat, colIndex) in row"
                                  :key="'seat-' + rowIndex + '-' + colIndex"
                                  class="seatL"
                                >
                                  <template v-if="seat && seat.type">
                                    <template
                                      v-if="seat.type === 'passenger_seat'"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 100 125"
                                        width="100"
                                        height="100"
                                        xml:space="preserve"
                                        :class="{
                                          'selected-seat': seat.selected,
                                          'disabled-seat': seat.disabled,
                                        }"
                                        @click="toggleSeatSelection(seat)"
                                      >
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
                                          fill="#FFFFFF"
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
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>
                                    <template
                                      v-else-if="seat.type === 'toilet'"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 125"
                                        width="100"
                                        height="100"
                                        class="toilet-seat"
                                      >
                                        <text
                                          x="50%"
                                          y="50%"
                                          text-anchor="middle"
                                          fill="#fff"
                                          font-size="12"
                                        >
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>
                                    <template v-else-if="seat.type === 'door'">
                                      <!-- Render door SVG -->
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 125"
                                        width="100"
                                        height="100"
                                        class="door-seat"
                                      >
                                        <!-- Add your door SVG path here -->
                                        <text
                                          x="50%"
                                          y="50%"
                                          text-anchor="middle"
                                          fill="#fff"
                                          font-size="12"
                                        >
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>
                                    <!-- Add other types as needed -->
                                    <template v-else-if="seat.type === 'space'">
                                      <div class="empty-seat"></div>
                                    </template>
                                    <template v-else>
                                      <!-- Fallback for types like driver_seat, conductor_seat, cabinet, fridge, etc. -->
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 125"
                                        width="100"
                                        height="100"
                                        :class="{
                                          'selected-seat': seat.selected,
                                          'disabled-seat': seat.disabled,
                                        }"
                                        @click="toggleSeatSelection(seat)"
                                      >
                                        <!-- Fallback SVG Path -->
                                        <path
                                          d="M76.531,40.06c-1.672,0-3.026,1.355-3.026,3.027v20.687..."
                                          fill="#FFFFFF"
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
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>
                                  </template>
                                  <template v-else>
                                    <div class="empty-seat"></div>
                                  </template>
                                </li>
                              </ol>
                            </template>
                            <template v-else>
                              <ol class="seats" type="A">
                                <li
                                  v-for="(seat, colIndex) in row"
                                  :key="'seat-' + rowIndex + '-' + colIndex"
                                  class="seat"
                                >
                                  <template v-if="seat && seat.type">
                                    <!-- Passenger seat -->
                                    <template
                                      v-if="seat.type === 'passenger_seat'"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 125"
                                        width="200"
                                        height="200"
                                        xml:space="preserve"
                                        :class="{
                                          'selected-seat': seat.selected,
                                          'disabled-seat': seat.disabled,
                                        }"
                                        @click="toggleSeatSelection(seat)"
                                      >
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
                                          fill="#FFFFFF"
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
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>
                                    <template
                                      v-else-if="
                                        seat.type === 'toilet' ||
                                        seat.type === 'door'
                                      "
                                    >
                                      <template v-if="seat.type === 'toilet'">
                                        <svg
                                          id="Layer_1"
                                          data-name="Layer 1"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 122.88 109.91"
                                          width="200"
                                          height="200"
                                          :class="{
                                            'selected-seat': seat.selected,
                                            'disabled-seat': seat.disabled,
                                          }"
                                          @click="toggleSeatSelection(seat)"
                                        >
                                          <path
                                            class="cls-1"
                                            d="M30.39,35.84v66.43a4.87,4.87,0,0,1-4.85,4.86h0a4.88,4.88,0,0,1-4.86-4.86V63.21H18.77v39.06a4.87,4.87,0,0,1-4.85,4.86h0a4.88,4.88,0,0,1-4.86-4.86V35.84H7.37V60.25a3.7,3.7,0,0,1-3.69,3.68h0A3.7,3.7,0,0,1,0,60.25V34c0-4.27,1.44-7.27,4.05-9.24,4.5-3.39,26.72-3.39,31.22,0,2.62,2,4.07,5,4.06,9.24V60.25a3.7,3.7,0,0,1-3.68,3.68h0A3.7,3.7,0,0,1,32,60.25V35.84ZM53.51,2.78a2.81,2.81,0,0,1,5.62,0V107.13a2.81,2.81,0,0,1-5.62,0V2.78ZM115,33c.06.15.11.3.16.46l7.59,27a3.77,3.77,0,1,1-7.27,2L108,35.81l-.11,0H106.3v1.69l10,39.74h-10v25a4.87,4.87,0,0,1-4.85,4.86h0a4.88,4.88,0,0,1-4.85-4.86v-25H94.68v25a4.88,4.88,0,0,1-4.86,4.86h0A4.87,4.87,0,0,1,85,102.27v-25H74.38L85,36.48v-.64h-1.7l-.14,0L75.64,62.46a3.77,3.77,0,1,1-7.27-2L75.8,34l-.08,0c1.14-4.25,2.09-7.27,4.71-9.24,4.5-3.39,26.24-3.39,30.75,0C113.6,26.56,114,29,115,33ZM95.57,2.78a8.78,8.78,0,1,1-8.78,8.78,8.78,8.78,0,0,1,8.78-8.78Zm-75.91,0a8.78,8.78,0,1,1-8.78,8.78,8.78,8.78,0,0,1,8.78-8.78Z"
                                          />
                                        </svg>
                                      </template>
                                      <!-- For door, use the provided door SVG -->
                                      <template v-else>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 512 512"
                                          width="200"
                                          height="200"
                                          :class="{
                                            'selected-seat': seat.selected,
                                            'disabled-seat': seat.disabled,
                                          }"
                                          @click="toggleSeatSelection(seat)"
                                        >
                                          <path
                                            fill="#000000"
                                            d="M41 25v254h58.73l63.97 64H247V25H41zm224 0v318h83.3l64-64H471V25H265zM57 41h174v208H57V41zm224 0h174v208H281V41zM160 279h64v18h-64v-18zm128 0h64v18h-64v-18zM41 297v46h49.63l63.97 64h92.3v18h-99.7l-64.03-64H41v126h206V361h-90.7l-64.03-64H41zm378.7 0l-64 64H265v126h206V361h-42.2l-64 64h-99.7v-18h92.3l64-64H471v-46h-51.3z"
                                          />
                                        </svg>
                                      </template>
                                    </template>

                                    <!-- Driver seat -->
                                    <template
                                      v-else-if="seat.type === 'driver_seat'"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 125"
                                        width="200"
                                        height="200"
                                        class="driver-seat"
                                        @click="toggleSeatSelection(seat)"
                                      >
                                        <rect
                                          x="10"
                                          y="10"
                                          width="80"
                                          height="100"
                                          fill="#E0E0E0"
                                          stroke="#000"
                                          stroke-width="2"
                                        />
                                        <text
                                          x="50%"
                                          y="55%"
                                          text-anchor="middle"
                                          fill="black"
                                          font-size="14"
                                        >
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>

                                    <!-- Conductor seat -->
                                    <template
                                      v-else-if="seat.type === 'conductor_seat'"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 125"
                                        width="200"
                                        height="200"
                                        class="conductor-seat"
                                        @click="toggleSeatSelection(seat)"
                                      >
                                        <rect
                                          x="10"
                                          y="10"
                                          width="80"
                                          height="100"
                                          fill="#D0F0C0"
                                          stroke="#000"
                                          stroke-width="2"
                                        />
                                        <text
                                          x="50%"
                                          y="55%"
                                          text-anchor="middle"
                                          fill="black"
                                          font-size="14"
                                        >
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>

                                    <!-- Cabinet -->
                                    <template
                                      v-else-if="seat.type === 'cabinet'"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 125"
                                        width="200"
                                        height="200"
                                        class="cabinet-seat"
                                      >
                                        <rect
                                          x="20"
                                          y="20"
                                          width="60"
                                          height="85"
                                          fill="#C0C0C0"
                                          stroke="#000"
                                          stroke-width="2"
                                        />
                                        <text
                                          x="50%"
                                          y="60%"
                                          text-anchor="middle"
                                          fill="black"
                                          font-size="14"
                                        >
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>

                                    <!-- Fridge -->
                                    <template
                                      v-else-if="seat.type === 'fridge'"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 125"
                                        width="200"
                                        height="200"
                                        class="fridge-seat"
                                      >
                                        <rect
                                          x="15"
                                          y="15"
                                          width="70"
                                          height="95"
                                          fill="#A0C0FF"
                                          stroke="#000"
                                          stroke-width="2"
                                        />
                                        <text
                                          x="50%"
                                          y="60%"
                                          text-anchor="middle"
                                          fill="black"
                                          font-size="14"
                                        >
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>

                                    <!-- Space -->
                                    <template v-else-if="seat.type === 'space'">
                                      <!-- Do not render anything -->
                                    </template>

                                    <!-- Fallback for unknown seat types -->
                                    <template v-else>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 125"
                                        width="200"
                                        height="200"
                                        :class="{
                                          'selected-seat': seat.selected,
                                          'disabled-seat': seat.disabled,
                                        }"
                                        @click="toggleSeatSelection(seat)"
                                      >
                                        <path
                                          d="M76.531,40.06c-1.672,0-3.026,1.355-3.026,3.027v20.687c-0.187,0.063-0.374,0.116-0.555,0.204
              c-0.053,0.025-2.895,1.385-7.482,2.655c-1.46-1.023-3.315-1.48-5.205-1.115c-6.939,1.345-13.673,1.363-20.605,0.043
              c-1.869-0.353-3.704,0.095-5.154,1.101c-4.572-1.268-7.404-2.633-7.488-2.674c-0.17-0.084-0.345-0.134-0.519-0.194V43.086
              c0-1.671-1.355-3.027-3.027-3.027c-1.671,0-3.026,1.355-3.026,3.027v24.717c0,0.145,0.022,0.282,0.042,0.422
              c0.063,1.605,0.955,3.13,2.495,3.896c0.261,0.129,3.791,1.856,9.425,3.388c0.943,1.727,2.622,3.034,4.706,3.432
              c4.262,0.811,8.542,1.223,12.722,1.223c4.277,0,8.659-0.43,13.022-1.275c2.061-0.399,3.722-1.69,4.664-3.394
              c5.624-1.524,9.164-3.234,9.426-3.363c1.434-0.704,2.321-2.063,2.496-3.539c0.068-0.253,0.117-0.515,0.117-0.789V43.086
              C79.558,41.415,78.203,40.06,76.531,40.06z"
                                          fill="#FFFFFF"
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
                                          {{ seat.label }}
                                        </text>
                                      </svg>
                                    </template>
                                  </template>
                                  <template v-else>
                                    <div class="empty-seat"></div>
                                  </template>
                                </li>
                              </ol>
                            </template>
                          </li>
                        </ol>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-12 col-md-6 mt-2">
                  <div class="bus-info p-3 border rounded shadow-sm bg-light">
                    <ul class="nav nav-tabs">
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{
                            'active-tab': activeTab === 'departure',
                            'inactive-tab': activeTab !== 'departure',
                          }"
                          @click="activeTab = 'departure'"
                        >
                          Kupandia
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{
                            'active-tab': activeTab === 'destination',
                            'inactive-tab': activeTab !== 'destination',
                          }"
                          @click="activeTab = 'destination'"
                        >
                          Kushukia
                        </a>
                      </li>
                    </ul>
                    <div
                      class="tab-content p-3 border rounded shadow-sm bg-light"
                    >
                      <div v-if="activeTab === 'departure'">
                        <h5 class="text-center">Chagua sehemu ya Kupandia</h5>
                        <div class="city-list">
                          <div
                            v-for="point in data.boarding_points"
                            :key="point.id"
                            class="city-item"
                          >
                            <input
                              type="radio"
                              v-model="selectedDeparture"
                              :value="point.id"
                              :id="'departure-' + point.id"
                              @change="handleDepartureSelection"
                            />
                            <label :for="'departure-' + point.id"
                              >{{ point.point_name }} ({{ point.eta }})</label
                            >
                          </div>
                        </div>
                      </div>

                      <!-- Destination Selection -->
                      <div v-if="activeTab === 'destination'">
                        <h5 class="text-center">Chagua sehemu ya Kushukia</h5>
                        <div class="city-list">
                          <div
                            v-for="point in data.dropping_points"
                            :key="point.id"
                            class="city-item"
                          >
                            <input
                              type="radio"
                              v-model="selectedDestination"
                              :value="point.id"
                              :id="'destination-' + point.id"
                              @change="handleDestinationSelection"
                            />
                            <label :for="'destination-' + point.id"
                              >{{ point.point_name }} ({{ point.eta }})</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="showProceedButton"
                      class="row"
                      style="
                        margin-bottom: 10px;
                        margin-top: 5px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        justify-content: center;
                      "
                    >
                      <button
                        type="button"
                        class="form-control"
                        style="
                          background-color: #09496e;
                          color: #f8f8f8;
                          width: 200px;
                          height: auto;
                        "
                        id="cf-submit"
                        @click="proceedToBooking"
                        :disabled="
                          seatisLoading ||
                          !selectedDeparture ||
                          !selectedDestination
                        "
                      >
                        <span v-if="seatisLoading">Loading...</span>
                        <span v-else>PROCEED</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "JourneyPage",
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
      busData: [],
      routeId: null,
      isLoading: false,
      errorMessage: "",
      seatData: [],
      selectedBus: null,
      data: {
        busSeats: [],
        seatMatrix: [],
        seats_limit: "",
        icon_type: "",
        fare: "",
        bus_schedule: {
          departure_time: "",
          origin_city: "",
          destination_city: "",
          reporting_time: "",
          origin_point: "",
          bus: "",
          bus_class: "",
          origin_city_id: "",
          destination_city_id: "",
          via: "",
          sub_route_id: "",
          schedule_id: "",
        },
        boarding_points: {},
        dropping_points: {},
      },
      selectedBookingIds: [],
      selectedSeatIds: [],
      selectedBusIds: [],
      selectedScheduleIds: [],
      seatsLimit: 0,
      showProceedButton: false,
      seatisLoading: false,
      activeTab: "departure",
      selectedDeparture: null,
      selectedDestination: null,
      isLoadingDestination: false,
      isSkeletonLoading: false,
      start_city: "",
      end_city: "",
    };
  },
  computed: {
    boarding_city_id() {
      return this.$route.query.boarding_city_id || this.departureId;
    },
    dropping_city_id() {
      return this.$route.query.dropping_city_id || this.destinationId;
    },
    departureDate() {
      return this.$route.query.departure_date || this.date;
    },
    minDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const day = ("0" + today.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    selectedSeatsData() {
      return {
        booking_id: this.selectedBookingIds,
        // seat_id: this.selectedSeatIds,
        schedule_id: this.selectedScheduleIds[0],
      };
    },
  },
  created() {
    this.fetchDepartureCities();
    if (this.boarding_city_id) {
      this.fetchDestinationCities(this.boarding_city_id);
    }

    // Initialize form values from URL parameters
    if (this.boarding_city_id && this.dropping_city_id && this.departureDate) {
      this.departureId = parseInt(this.boarding_city_id);
      this.destinationId = parseInt(this.dropping_city_id);
      this.date = this.departureDate;
      this.fillCityNames();

      this.fetchBusData();
    }
  },
  methods: {
    async fetchDepartureCities() {
      try {
        const response = await fetch(
          "https://aboodbus.co.tz/passenger/boarding-cities"
        );
        const data = await response.json();
        this.departureOptions = data.data.cities || [];
        this.filteredDepartureOptions = [...this.departureOptions];
        this.fillCityNames();
      } catch (error) {
        console.error("Error fetching departure cities:", error);
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
        this.fillCityNames();
      } catch (error) {
        console.error("Error fetching destination cities:", error);
      } finally {
        this.isLoadingDestination = false;
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
    },
    selectDestination(option) {
      this.destination = option.city;
      this.destinationId = option.id;
      this.showDestinationDropdown = false;
    },
    clearDestination() {
      this.destination = "";
    },
    fillCityNames() {
      const selectedDeparture = this.departureOptions.find(
        (city) => city.id === this.departureId
      );
      if (selectedDeparture) {
        this.departure = selectedDeparture.city;
      }
      const selectedDestination = this.destinationOptions.find(
        (city) => city.id === this.destinationId
      );
      if (selectedDestination) {
        this.destination = selectedDestination.city;
      }
    },
    handleSearch() {
      if (!this.departureId || !this.destinationId || !this.date) {
        alert("Please select valid departure, destination, and date.");
        return;
      }
      this.fetchBusData();
    },
    async fetchBusData() {
      this.isLoading = true;
      this.errorMessage = "";
      this.routeId = null;

      const formData = new FormData();
      formData.append("boarding_city_id", this.departureId);
      formData.append("dropping_city_id", this.destinationId);
      formData.append("departure_date", this.date);

      try {
        const response = await fetch(
          "https://aboodbus.co.tz/passenger/schedules/bus-itineraries",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          if (response.status === 400) {
            this.errorMessage =
              result.message || "Invalid request. Please check your input.";
          } else {
            this.errorMessage = "Error fetching bus data. Please try again.";
          }
          this.busData = [];
          return;
        }
        // this.routeId = result.data.route_id || null;

        this.busData = result.data.bus_schedules || [];
        this.start_city = result.data.start_city || "";
        this.end_city = result.data.end_city || "";

        if (this.busData.length === 0) {
          this.errorMessage = "No route available.";
        }
      } catch (error) {
        console.error("Error:", error);
        this.errorMessage = "Network error. Please check your connection.";
      } finally {
        this.isLoading = false;
        this.$nextTick(() => {
          this.scrollToBusSelection();
        });
      }
    },
    async bookTicket(bus) {
      if (
        this.selectedBus &&
        this.selectedBus.schedule_id === bus.schedule_id &&
        this.selectedBus.sub_route.sub_route_id === bus.sub_route.sub_route_id
      ) {
        console.log("Booking already initiated for this bus:", bus);
        return;
      } else {
        this.selectedBus = bus;
        this.data.busSeats = [];
        this.data.bus_schedule = {};
        this.data.boarding_points = [];
        this.data.dropping_points = [];
        this.seatsLimit = 0;
        this.showProceedButton = false;
        this.selectedBookingIds = [];
        this.selectedSeatIds = [];
        console.log("New bus selected:", bus);
      }

      // Set loading state and reset error message
      this.isSkeletonLoading = true;
      this.errorMessage = "";

      // Prepare request payload using schedule_id and sub_route_id
      const requestBody = {
        schedule_id: bus.schedule_id,
        sub_route_id: bus.sub_route.sub_route_id,
      };

      console.log("Request payload for bus-chart:", requestBody);

      try {
        // Send POST request using axios
        const response = await axios.post(
          "https://aboodbus.co.tz/passenger/schedules/bus-chart",
          requestBody,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Response received:", response);
        if (response.status >= 200 && response.status < 300) {
          const result = response.data;
          console.log("Result data from bus-chart:", result.data);

          this.data.busSeats = result.data.bus_seats;
          this.data.bus_schedule = result.data.bus_schedule || {};
          this.seatsLimit = result.data.seats_limit || 0;
          this.data.boarding_points = result.data.boarding_points || [];
          this.data.dropping_points = result.data.dropping_points || [];

          // Set the default departure if one is flagged as default and not already set
          if (!this.selectedDeparture) {
            const defaultDeparture = this.data.boarding_points.find(
              (point) => point.is_default
            );
            if (defaultDeparture) {
              this.selectedDeparture = defaultDeparture.id;
            }
          }

          // Set the default destination if one is flagged as default and not already set
          if (!this.selectedDestination) {
            const defaultDestination = this.data.dropping_points.find(
              (point) => point.is_default
            );
            if (defaultDestination) {
              this.selectedDestination = defaultDestination.id;
            }
          }

          this.buildMatrix();
        } else {
          console.error("Error booking ticket:", response.data);
          this.errorMessage =
            response.data.message || "Failed to retrieve seat data.";
        }
      } catch (error) {
        console.error("Network Error:", error);
        this.errorMessage = "Something went wrong, please try again.";
      } finally {
        this.isSkeletonLoading = false;
        console.log(
          "Booking process finished. isSkeletonLoading:",
          this.isSkeletonLoading
        );
      }
    },
    buildMatrix() {
      if (
        !this.data ||
        !this.data.busSeats ||
        Object.keys(this.data.busSeats).length === 0
      ) {
        console.error("busSeats is undefined, not an object, or empty");
        this.data.seatMatrix = [];
        return;
      }

      // Use a Map to build the matrix by rows and columns
      let seatMap = new Map();
      let maxRow = 0,
        maxCol = 0;

      // Iterate over each row in busSeats
      Object.keys(this.data.busSeats).forEach((rowKey) => {
        const rowNum = parseInt(rowKey, 10);
        maxRow = Math.max(maxRow, rowNum);

        // Ensure we have a Map for this row
        if (!seatMap.has(rowNum)) {
          seatMap.set(rowNum, new Map());
        }

        // Iterate over each column (seat) in this row
        Object.keys(this.data.busSeats[rowKey]).forEach((colKey) => {
          const colNum = parseInt(colKey, 10);
          maxCol = Math.max(maxCol, colNum);

          const seat = this.data.busSeats[rowKey][colKey];
          // Put desired seat data into our map
          seatMap.get(rowNum).set(colNum, {
            id: seat.booking_id,
            value: seat.label,
            label: seat.label,
            price: seat.fare,
            disabled: !seat.is_available,
            booking_id: seat.booking_id,
            gender: seat.gender,
            seat_location: seat.seat_location,
            type: seat.type,
          });
        });
      });

      this.data.seatMatrix = Array.from(seatMap.keys())
        .sort((a, b) => a - b)
        .map((row) =>
          Array.from({ length: maxCol }, (_, i) => {
            const colIndex = i + 1;
            return seatMap.get(row).get(colIndex) || {};
          }).filter((seat) => Object.keys(seat).length > 0)
        );

      console.log("Seat matrix built:", this.data.seatMatrix);
    },

    toggleSeatSelection(seat) {
      if (seat.disabled) return;

      seat.selected = !seat.selected;
      console.log("Seat toggled:", seat.booking_id, "Selected:", seat.selected);

      if (seat.selected) {
        this.selectedBookingIds.push(seat.booking_id);
        console.log(
          "Added booking_id:",
          seat.booking_id,
          "Current selectedBookingIds:",
          this.selectedBookingIds
        );
        // this.selectedSeatIds.push(seat.id); // Original seat_id commented out

        if (!this.selectedBusIds.includes(seat.schedule_id)) {
          this.selectedBusIds = [seat.schedule_id];
          console.log("Updated selectedBusIds:", this.selectedBusIds);
        }

        if (!this.selectedScheduleIds.includes(seat.schedule_id)) {
          this.selectedScheduleIds = [seat.schedule_id];
          console.log("Updated selectedScheduleIds:", this.selectedScheduleIds);
        }
      } else {
        this.selectedBookingIds = this.selectedBookingIds.filter(
          (id) => id !== seat.booking_id
        );
        console.log(
          "Removed booking_id:",
          seat.booking_id,
          "Current selectedBookingIds:",
          this.selectedBookingIds
        );
        // this.selectedSeatIds = this.selectedSeatIds.filter(
        //   (id) => id !== seat.id
        // );
        // if (!this.selectedSeatIds.length) {
        if (!this.selectedBookingIds.length) {
          this.selectedBusIds = [];
          this.selectedScheduleIds = [];
          console.log(
            "Cleared selectedBusIds and selectedScheduleIds because no booking_ids remain."
          );
        }
      }
      // if (this.selectedSeatIds.length > this.seatsLimit) {
      if (this.selectedBookingIds.length > this.seatsLimit) {
        alert(`You can only select up to ${this.seatsLimit} seats.`);
        this.toggleSeatSelection(seat);
      }

      // this.showProceedButton = this.selectedSeatIds.length > 0;
      this.showProceedButton = this.selectedBookingIds.length > 0;
    },

    async proceedToBooking() {
      if (!this.selectedDeparture) {
        alert("Please select a departure point.");
        return;
      }

      if (!this.selectedDestination) {
        alert("Please select a destination point.");
        return;
      }

      if (this.selectedBookingIds.length === 0) {
        alert("Please select at least one seat to proceed.");
        return;
      }

      this.seatisLoading = true;

      const payload = {
        booking_id: this.selectedBookingIds,
        sub_route_id: this.data.bus_schedule.sub_route_id,
      };
      console.log("Payload for hold-seats:", payload);

      try {
        const response = await axios.post(
          "https://aboodbus.co.tz/passenger/hold-seats",
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Hold seats response:", response.data);

        const query = {
          // schedule_id: this.selectedScheduleIds[0] || "",
          schedule_id: this.data.bus_schedule.schedule_id,
          booking_id: this.selectedBookingIds.join(","),
          // seat_id: this.selectedSeatIds.join(","),
          sub_route_id: this.data.bus_schedule.sub_route_id,
          departure: this.selectedDeparture,
          destination: this.selectedDestination,
          // route_id: this.routeId,
        };

        console.log("Navigating to BookingDetails with query:", query);

        this.$router.push({
          name: "BookingDetails",
          query: query,
        });
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to hold seats. Please try again."
        );
      } finally {
        this.seatisLoading = false;
      }
    },

    handleDepartureSelection() {
      this.selectedDeparture = this.selectedDeparture || null;
      // this.checkButtonEnable();
    },
    handleDestinationSelection() {
      this.selectedDestination = this.selectedDestination || null;
      // this.checkButtonEnable();
    },
    // checkButtonEnable() {
    //     if (this.selectedDeparture && this.selectedDestination) {
    //         this.showProceedButton = true;
    //     } else {
    //         this.showProceedButton = false;
    //     }
    // },
    scrollToBusSelection() {
      const busSelection = document.getElementById("bus-selection");
      if (busSelection) {
        busSelection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setTimeout(() => {
          const busSelectionRetry = document.getElementById("bus-selection");
          if (busSelectionRetry) {
            busSelectionRetry.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            console.warn("bus-selection element not found.");
          }
        }, 500);
      }
    },
  },
};
</script>
<style scoped>
.nav-tabs .nav-link {
  cursor: pointer;
  color: black;
  font-weight: bold;
  padding: 10px 35px;
}

.active-tab {
  background-color: #28abe2 !important;
  color: black !important;
}

.inactive-tab {
  background-color: white !important;
  color: black !important;
}

.city-list {
  display: flex;
  flex-direction: column;
  gap: 2px !important;
}

.city-item {
  display: flex;
  align-items: center;
  gap: 5px !important;
  padding: 5px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.st0 {
  fill: #3276c3;
}
.cls-1 {
  fill: #29abe2;
}

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

@keyframes slideInFade {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bus-list-content {
  opacity: 0;
  transform: translateY(50px);
  animation: slideInFade 0.8s ease-out forwards;
  animation-delay: var(--animation-delay, 0s);
}
.seat-selection {
  display: none;
  transition: max-height 0.5s ease-out;
  overflow: hidden;
}

.seat-selection.open {
  display: block;
  max-height: 1000px;
}

.pricing {
  /*background-color: #fff;*/
  margin: 0 auto 10px;
  /*max-width: 270px;*/
  position: relative;
  text-align: left;
}

.pricing * {
  position: relative;
}

.pricing:before {
  /*background: #f7f7f7;*/
  /*background: rgba(30, 30, 30, .06);*/
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.pricing .title {
  line-height: 32px;
  padding: 17px 20px 21px;
}

.pricing .title a {
  color: #1e1e1e;
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  text-decoration: none;
}

.pricing .price-box {
  font-size: 12px;
  line-height: 1;
  overflow: hidden;
  padding: 0 20px 20px;
}

.pricing .price-box .icon {
  /*background: #fff;*/
  color: #181616;
  height: 60px;
  text-align: center;
  width: 60px;
  z-index: 1;
}

.pricing .price-box .icon i,
.pricing .price-box .icon .livicon {
  background: none;
  font-size: 30px;
  height: auto;
  line-height: 52px;
  margin: 0;
  width: auto;
}

.pricing .price-box .icon .livicon {
  height: 60px !important;
}

.pricing .price-box .icon .livicon svg {
  top: 0 !important;
  vertical-align: middle;
}

.pricing .price-box .price {
  font-size: 20px;
  font-weight: bold;
  margin: 13px 0 0;
  /*color: #999;*/
}

.pricing .price-box .price span {
  font-size: 12px;
}

.pricing .options {
  list-style: none;
  margin: 0;
  padding: 0;
}

.pricing .options .custom_class {
  /*border-top: 1px solid rgba(30, 30, 30, .1);*/
  /*color: #999;*/
  color: rgba(30, 30, 30, 0.4);
  line-height: 22px;
  padding: 5px;
  position: relative;
}

.pricing .options .custom_class span {
  color: #1e1e1e;
  display: none;
  left: 25px;
  line-height: 1;
  position: absolute;
  top: 16px;
}

.pricing .options .custom_class.active {
  color: #1e1e1e;
}

.pricing .options .custom_class.active span {
  display: block;
}

.pricing .bottom-box {
  /*border-top: 1px solid rgb(61, 10, 10);*/
  /* background: rgba(30, 30, 30, .05); */
  background: #f4f5f5 !important;
  overflow: hidden;
  padding: 4px;
}

.pricing .bottom-box-2 .btn {
  font-weight: bold;
  margin: 4px 0 0;
  width: 100%;
}

.bottom-box-2 {
  margin-top: 4px;
  /*border-top: 1px solid rgba(212, 7, 70, .1);*/
  /*background: rgba(212, 7, 70, .05);*/
}
.seat-map-container {
  margin-top: 10px !important;
  border-top: 1px solid #29abe2;
}
.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-container {
  position: relative;
  width: 100%;
}

.input-field {
  width: 100%;
  padding-right: 35px; /* Space for the spinner */
}

.loading-spinner-two {
  position: absolute;
  top: 50%;
  right: 10px; /* Adjust position inside input */
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
}
/* Global Skeleton Base */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
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

/* Container & Box Styles */
.skeleton-seat-map,
.skeleton-bus-info {
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Row for Icons and Text */
.skeleton-row {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

/* Skeleton Icon */
.skeleton-icon {
  width: 70px;
  height: 70px;
  border-radius: 5px;
}

/* Skeleton Text (under icons) */
.skeleton-text {
  width: 80px;
  height: 20px;
  border-radius: 4px;
}

/* Skeleton for Seat Map Form Area */
.skeleton-form {
  margin-top: 20px;
  height: 200px;
  border-radius: 6px;
}

/* Skeleton for Bus Info Area */
.skeleton-bus-info {
  padding: 1rem;
}

/* Skeleton Tabs Container */
.skeleton-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

/* Each Skeleton Tab */
.skeleton-tab {
  width: 100px;
  height: 30px;
  border-radius: 6px;
}

/* Skeleton Tab Content */
.skeleton-tab-content {
  height: 150px;
  border-radius: 6px;
}

.skeleton-button {
  width: 200px;
  height: 40px;
  margin: 10px auto;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .skeleton-icon {
    width: 60px;
    height: 60px;
  }
  .skeleton-text {
    width: 70px;
    height: 18px;
  }
  .skeleton-tab {
    width: 80px;
    height: 28px;
  }
  .skeleton-button {
    width: 180px;
    height: 38px;
  }
}
</style>
