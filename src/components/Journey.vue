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
                            <h1 class="text-uppercase">Abood Bus Service Limited</h1>
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
                                        <ul v-if="showDepartureDropdown" class="custom-dropdown">
                                            <li v-for="(option, index) in filteredDepartureOptions"
                                                :key="index"
                                                class="dropdown-item"
                                                @click="selectDeparture(option)">
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
                                            <div v-if="isLoadingDestination" class="loading-spinner-two">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="width: 24px; height: 24px;">
                                                    <!-- Outer circle (gray border) -->
                                                    <circle cx="25" cy="25" r="20" stroke="gray" stroke-width="5" fill="none"/>
                                                    
                                                    <!-- Inner spinning circle (changed to red) -->
                                                    <circle cx="25" cy="25" r="20" stroke="#96000c" stroke-width="5" fill="none" stroke-dasharray="126.92" stroke-dashoffset="126.92">
                                                        <animate attributeName="stroke-dashoffset" values="126.92;0" dur="1s" keyTimes="0;1" repeatCount="indefinite" />
                                                    </circle>
                                                </svg>
                                            </div>
                                        </div>
                                        <ul v-if="showDestinationDropdown" class="custom-dropdown">
                                            <li v-for="(option, index) in filteredDestinationOptions"
                                                :key="index"
                                                class="dropdown-item"
                                                @click="selectDestination(option)">
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
                                    <button type="submit" class="search-button">Search</button>
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
            <div class="loading-spinner"></div>
        </div>
      <section id="bus-selection" class="bus-selection">
            <div v-if="errorMessage" class="alert alert-warning text-center">
                {{ errorMessage }}
            </div>
            <div class="bus-list" v-else>
                <div class="container">
                    <div class="bus-list-content transition-section"
                        v-for="(bus, index) in busData"
                        :key="index"
                        :class="{'col-12': true}"
                        @click="bookTicket(bus)">
                        
                        <div class="row w-100">
                            <div class="col-md-2">
                                <div class="bus-f-icn col-md-12 col-sm-12" style="text-align: center">
                                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.89 65.19" style="width: 60px;">
                                        <defs>
                                        </defs>
                                        <path class="cls-1" d="M53.33,62.47H7.33c-2.79,0-5.05-2.27-5.05-5.05V8.35C2.28,3.75,6.03,0,10.63,0H50.03c4.6,0,8.35,3.75,8.35,8.35V57.42c0,2.79-2.27,5.05-5.05,5.05ZM10.63,4c-2.4,0-4.35,1.95-4.35,4.35V57.42c0,.58,.47,1.05,1.05,1.05H53.33c.58,0,1.05-.47,1.05-1.05V8.35c0-2.4-1.95-4.35-4.35-4.35H10.63Z"></path>
                                        <path class="cls-1" d="M56.38,47.53H4.28c-1.1,0-2-.9-2-2s.9-2,2-2H56.38c1.1,0,2,.9,2,2s-.9,2-2,2Z"></path>
                                        <g>
                                            <rect class="cls-1" x="10.78" y="52.33" width="6.06" height="3"></rect>
                                            <rect class="cls-1" x="42.47" y="52.33" width="6.06" height="3"></rect>
                                        </g>
                                        <g>
                                            <rect class="cls-1" x="9.92" y="59.19" width="6.34" height="6"></rect>
                                            <rect class="cls-1" x="43.06" y="59.19" width="6.34" height="6"></rect>
                                        </g>
                                        <g>
                                            <path class="cls-1" d="M57.89,32.87c-1.66,0-3-1.34-3-3v-8.04c0-1.66,1.34-3,3-3s3,1.34,3,3v8.04c0,1.66-1.34,3-3,3Z"></path>
                                            <path class="cls-1" d="M3,32.87c-1.66,0-3-1.34-3-3v-8.04c0-1.66,1.34-3,3-3s3,1.34,3,3v8.04c0,1.66-1.34,3-3,3Z"></path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div class="col-md-10  col-sm-1">
                                <div class="pricing-error w-100">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <div class="options">
                                                <div class="custom_class">
                                                    <div class="active row text-center">
                                                        <div class="col-md-4">
                                                            <div class="price" style="font-size: 18px;font-weight: bold;color: black;text-align: center">{{ bus.origin_city }}</div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="price" style="font-size: 14px;color: black;text-align: center">
                                                                (via: {{ bus.via }})
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="price" style="font-size: 18px;font-weight: bold;color: black;text-align: center">{{ bus.destination_city }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="custom_class row text-center">
                                                    <div class="col-md-4">
                                                        <div class="price" style="font-size: 12px;text-align: center;color: #c8302c;font-weight: bold">
                                                            {{ bus.departure }}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="price" style="font-size: 14px;color: red;text-align: center">
                                                            {{ bus.distance }}, {{ bus.approximate_hours }}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="price" style="font-size: 12px;text-align: center;color: #c8302c;font-weight: bold">
                                                            {{ bus.arrival }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="custom_class text-center">
                                                    <div class="col-12">
                                                        <div class="price" style="font-size: 14px;font-weight: bold;color: black;text-align: center">
                                                        Boarding Point & Time
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="custom_class text-center">
                                                    <div class="col-12">
                                                        <div class="price" style="font-size: 12px;text-align: center;color: #c8302c;font-weight: bold">
                                                            {{ bus.origin_point }} ({{ bus.departure }})
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <a class="btn btn-sm btn-outline-inf" style="font-size: 14px;padding: 2px;min-width: 150px;margin-bottom: 4px;background-color: #29aae1">Tsh {{bus.amount}}</a><br>
                                            <span>{{ bus.available_seats }} Seats Left</span>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                            <div class="bottom-box" style="background-color: #f4f5f5; padding: 4px;">
                                                <div class="bus-feature">
                                                    <div class="bus-f-details d-flex align-items-center">
                                                        <div class="bus-f-title">
                                                            <div class="bus-f-icn">
                                                                <span class="fw-bold">Amenities: </span>
                                                            </div>
                                                        </div>
                                                        <div class="bus-f-icn">
                                                    <svg version="1.1" id="Layer_1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                                                    </svg>
                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <div class="bus-f-icn">
                                                    <svg viewBox="0 0 1024 1024" class="icon" width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                    <path d="M87.495111 189.041778h844.458667v544.631466H87.495111z" fill="#3276c3"></path>
                                                    <path d="M144.2816 246.078578h730.885689v430.535111H144.2816z" fill="#E6E6E6"></path>
                                                    <path d="M598.698667 246.078578L303.479467 676.625067H179.848533l295.2192-430.546489zM740.113067 246.078578L444.882489 676.625067h-80.384l295.2192-430.546489z" fill="#FFFFFF"></path>
                                                    <path d="M707.447467 803.862756H311.990044c-34.599822 0-62.646044 28.194133-62.646044 62.953244h520.749511c0.011378-34.759111-28.046222-62.953244-62.646044-62.953244z" fill="#3276c3"></path>
                                                    <path d="M362.894222 733.661867h293.671822v70.212266H362.894222z" fill="#3276c3"></path>
                                                    <path d="M931.953778 174.2848H227.077689c-8.112356 0-14.688711 6.599111-14.688711 14.7456s6.576356 14.756978 14.688711 14.756978H917.276444v515.117511H102.183822V203.798756h80.509156c8.112356 0 14.688711-6.610489 14.688711-14.756978s-6.576356-14.756978-14.688711-14.756978H87.495111c-8.100978 0-14.677333 6.599111-14.677333 14.756978v544.631466c0 8.135111 6.576356 14.7456 14.688711 14.7456h260.721778v40.698312h-36.226845c-42.643911 0-77.323378 34.861511-77.323378 77.710222 0 8.135111 6.576356 14.7456 14.688712 14.7456h520.749511c8.112356 0 14.677333-6.610489 14.677333-14.7456 0-42.848711-34.690844-77.710222-77.334756-77.710222h-36.215466v-40.698312H931.953778c8.112356 0 14.677333-6.610489 14.677333-14.7456V189.041778c0-8.157867-6.576356-14.756978-14.677333-14.756978zM753.106489 852.0704H266.331022a48.071111 48.071111 0 0 1 45.659022-33.439289h395.457423a48.036978 48.036978 0 0 1 45.659022 33.439289z m-111.240533-62.953244H377.582933V748.430222h264.2944v40.686934h-0.011377z" fill=""></path>
                                                    <path d="M875.178667 540.603733c8.112356 0 14.677333-6.599111 14.677333-14.756977V246.089956c0-8.146489-6.564978-14.756978-14.677333-14.756978H144.270222c-8.112356 0-14.688711 6.610489-14.688711 14.756978v430.535111c0 8.135111 6.576356 14.7456 14.688711 14.7456h730.908445c8.112356 0 14.677333-6.610489 14.677333-14.7456v-103.560534c0-8.157867-6.564978-14.756978-14.677333-14.756977s-14.688711 6.599111-14.688711 14.756977v88.803556H158.958933V260.835556h701.531023v265.0112c0 8.157867 6.576356 14.756978 14.688711 14.756977z" fill=""></path>
                                                    <path d="M396.822756 590.859378c8.100978 0 14.677333-6.610489 14.677333-14.756978V361.358222h55.796622c8.112356 0 14.688711-6.610489 14.688711-14.756978s-6.576356-14.756978-14.688711-14.756977H323.743289c-8.112356 0-14.688711 6.610489-14.688711 14.756977s6.576356 14.756978 14.688711 14.756978h58.402133v214.755556c0 8.135111 6.576356 14.7456 14.677334 14.7456zM556.612267 386.9696l-16.827734-45.511111a14.665956 14.665956 0 0 0-18.875733-8.692622 14.779733 14.779733 0 0 0-8.647111 18.966755l16.827733 45.499734a14.688711 14.688711 0 0 0 18.864356 8.692622 14.768356 14.768356 0 0 0 8.658489-18.955378zM597.105778 581.245156c2.139022 5.779911 7.623111 9.614222 13.755733 9.614222s11.616711-3.834311 13.755733-9.614222l84.844089-229.512534c2.821689-7.634489-1.046756-16.122311-8.647111-18.966755s-16.054044 1.058133-18.875733 8.692622L610.861511 533.731556l-40.686933-110.091378a14.677333 14.677333 0 0 0-18.875734-8.692622 14.779733 14.779733 0 0 0-8.658488 18.966755l54.465422 147.330845z" fill=""></path>
                                                    </g>
                                                    </svg>
                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <div class="bus-f-icn">
                                                    <svg version="1.1" id="Layer_1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                    <rect x="366.333" y="109.101" style="fill:#DFDFE2;" width="111.366" height="95.234"></rect>
                                                    <rect x="420.752" y="109.101" style="fill:#D7D6D9;" width="56.958" height="95.234"></rect>
                                                    <path style="fill:#2B292C;" d="M405.236,265.149V450.44c0,16.592-13.5,30.092-30.092,30.092H207.787 c-22.482,0-40.774-18.291-40.774-40.772v-32.785h-33.78v32.785c0,39.835,32.407,72.241,72.242,72.241h169.669 c33.945,0,61.56-27.616,61.56-61.56V265.149H405.236z"></path>
                                                    <rect x="18.996" style="fill:#3276c3;" width="261.177" height="422.703"></rect>
                                                    <g>
                                                    <rect x="18.996" y="291.481" style="fill:#DFDFE2;" width="261.177" height="31.468"></rect>
                                                    <rect x="131.758" y="348.124" style="fill:#DFDFE2;" width="35.664" height="31.468"></rect>
                                                    </g>
                                                    <rect x="149.768" y="0.004" style="fill:#3276c3;" width="130.405" height="422.703"></rect>
                                                    <rect x="149.768" y="291.481" style="fill:#DFDFE2;" width="130.405" height="31.468"></rect>
                                                    <rect x="149.768" y="348.124" style="fill:#D7D6D9;" width="17.643" height="31.468"></rect>
                                                    <g>
                                                    <rect x="400.655" y="138.408" style="fill:#57565C;" width="15.438" height="13.321"></rect>
                                                    <rect x="425.326" y="138.408" style="fill:#57565C;" width="15.438" height="13.321"></rect>
                                                    </g>
                                                    <rect x="351.04" y="172.866" style="fill:#3276c3;" width="141.954" height="108.01"></rect>
                                                    <rect x="420.752" y="172.866" style="fill:#3276c3;" width="72.251" height="108.02"></rect>
                                                    <polygon style="fill:#DFDFE2;" points="205.145,144.791 152.416,144.791 157.136,138.412 188.86,94.125 163.075,76.087 93,176.259 145.071,176.259 142.364,180.545 110.063,232.113 123.209,240.759 123.209,240.759 123.209,240.759 136.355,249.403 "></polygon>
                                                    <polygon style="fill:#D7D6D9;" points="205.146,144.79 149.772,228.999 149.772,95.101 163.073,76.084 188.856,94.126 157.136,138.412 152.416,144.79 "></polygon>
                                                    </g></svg>
                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div class="bus-f-icn">
                                                    <svg width="20" height="20" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                    <g>
                                                    <path class="st0" d="M335.809,396.062c-8.578-15.013-14.048-57.457,1.467-100.87c3.114-8.728,6.604-19.142,8.886-30.189 c4.588-22.289,3.338-42.619-4.045-65.916c-4.454-14.084-11.156-29.049-20.494-45.759c-11.953-21.382-25.246-84.177-21.141-91.952 c4.781-6.376,2.916-15.6-0.025-23.804c5.342-3.84,8.609-10.039,8.609-16.831C309.066,9.302,299.757,0,288.317,0h-64.63 c-11.44,0-20.742,9.302-20.742,20.742c0,6.792,3.26,12.991,8.602,16.831c-2.94,8.204-4.817,17.416-0.096,23.694 c4.184,7.89-9.103,70.686-21.062,92.062c-9.339,16.704-16.046,31.669-20.501,45.753c-7.383,23.296-8.633,43.628-4.038,65.922 c2.275,11.059,5.77,21.472,8.892,30.196c15.502,43.41,10.033,85.85,1.454,100.862c-8.518,14.905-29.502,77.41,2.681,98.455 C202.583,510.014,227.557,512,246.67,512l9.338-0.061l9.339,0.061c19.106,0,44.074-1.986,67.781-17.482 C365.299,473.478,344.327,410.967,335.809,396.062z M229.398,50.654c0.163-1.02,0.706-3.338,2.536-8.077h48.138 c1.871,4.847,2.402,7.141,2.566,8.029c-3.87,6.35-6.146,18.774,1.92,55.327c1.17,5.312,2.534,10.885,4.014,16.396h-65.137 c1.478-5.511,2.843-11.084,4.014-16.39C235.496,69.478,233.25,57.023,229.398,50.654z"></path>
                                                    </g>
                                                    </g></svg>
                                                    </div>
                                                    <div class="bus-f-icn">
                                                    <svg fill="#3276c3" viewBox="-12.35 0 122.88 122.88" width="20" height="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="enable-background:new 0 0 98.18 122.88" xml:space="preserve">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                    <g>
                                                    <path d="M21.58,24.97c0-1.01,0.82-1.82,1.82-1.82c1.01,0,1.82,0.82,1.82,1.82v33.33c0,1.01-0.82,1.82-1.82,1.82H1.82 C0.82,60.13,0,59.31,0,58.31V3.92c0-1.07,0.44-2.05,1.15-2.77l0.01-0.01C1.88,0.44,2.85,0,3.93,0H21.3c1.07,0,2.06,0.44,2.77,1.16 l0,0c0.71,0.71,1.15,1.69,1.15,2.77v4.62c0,1.01-0.82,1.82-1.82,1.82c-1.01,0-1.82-0.82-1.82-1.82V3.92c0-0.07-0.03-0.14-0.08-0.2 l0,0l0,0c-0.05-0.05-0.12-0.08-0.2-0.08H3.93c-0.08,0-0.15,0.03-0.2,0.08L3.72,3.73c-0.05,0.05-0.08,0.12-0.08,0.2v52.56h17.94 V24.97L21.58,24.97z M21.57,99.88L0.21,59.15c-0.46-0.89-0.12-1.98,0.77-2.45c0.27-0.14,0.56-0.21,0.84-0.21v-0.01h94.53 c1.01,0,1.82,0.82,1.82,1.82c0,0.07,0,0.14-0.01,0.21c-0.51,21.74-11.17,27.86-20.14,33c-5.24,3.01-9.83,5.64-10.69,11.21 l-0.01,0.05c-0.33,2.18-0.15,4.68,0.54,7.51c0.72,2.95,1.99,6.27,3.84,9.96c0.45,0.9,0.08,1.99-0.82,2.44 c-0.26,0.13-0.54,0.19-0.81,0.19l-57.06,0c-1.01,0-1.82-0.82-1.82-1.82c0-0.35,0.1-0.68,0.28-0.96L21.57,99.88L21.57,99.88z M4.83,60.13l20.39,38.89c0.26,0.5,0.28,1.11,0.01,1.65l-9.28,18.57h51.24c-1.3-2.89-2.25-5.59-2.86-8.09 c-0.81-3.32-1.01-6.29-0.61-8.91l0.01-0.06c1.13-7.3,6.43-10.34,12.48-13.81c7.92-4.54,17.29-9.92,18.26-28.23H4.83L4.83,60.13z M23.61,101.68c-1.01,0-1.82-0.82-1.82-1.82c0-1.01,0.82-1.82,1.82-1.82H43.5c1.01,0,1.82,0.82,1.82,1.82 c0,1.01-0.82,1.82-1.82,1.82H23.61L23.61,101.68z M25.21,58.58c-0.15,0.99-1.08,1.68-2.07,1.53c-0.99-0.15-1.68-1.08-1.53-2.07 c0.29-1.88,0.76-3.58,1.42-5.07c0.69-1.55,1.58-2.86,2.67-3.93c3.54-3.46,8.04-3.38,12.34-3.3c0.38,0.01,0.75,0.01,1.72,0.01 l38.96,0c9.24-0.06,19.48-0.13,19.43,13c0,1-0.81,1.81-1.81,1.81s-1.81-0.81-1.81-1.81c0.04-9.48-8.28-9.42-15.78-9.37 c-1.13,0.01-1.1,0.02-1.77,0.02H39.77l-1.78-0.03c-3.56-0.06-7.29-0.13-9.75,2.28c-0.77,0.75-1.39,1.68-1.89,2.79 C25.83,55.6,25.45,56.98,25.21,58.58L25.21,58.58z M15.33,11.17c2.83,0,5.12,2.29,5.12,5.12c0,2.83-2.29,5.12-5.12,5.12 c-2.83,0-5.12-2.29-5.12-5.12C10.21,13.46,12.51,11.17,15.33,11.17L15.33,11.17z M20.45,18.11c-1.01,0-1.82-0.82-1.82-1.82 c0-1.01,0.82-1.82,1.82-1.82h12.28c1.01,0,1.82,0.82,1.82,1.82c0,1.01-0.82,1.82-1.82,1.82H20.45L20.45,18.11z"></path>
                                                    </g>
                                                    </g>
                                                    </svg>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bottom-box-2 text-center mt-3">
                                                <button 
                                                v-if="!selectedBus || selectedBus.bus_id !== bus.bus_id" 
                                                class="btn btn-lg btn-danger w-100" 
                                                @click="bookTicket(bus)">
                                                BOOK TICKET
                                            </button>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="selectedBus && selectedBus.bus_id === bus.bus_id">
                            <div v-if="isSkeletonLoading" class="row seat-map-container">
                                <div class="col-12 col-md-6 mt-2">
                                <div class="skeleton skeleton-seat-map mx-md-3 p-3 border rounded shadow-sm bg-white">
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
                                <div class="skeleton skeleton-bus-info p-3 border rounded shadow-sm bg-light">
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
                                <div class="seat-map mx-md-3 p-3 border rounded shadow-sm bg-white">
          
                                    <div class="row1" style="margin-top: 25px; display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
                                        <!-- Icon and Text for Zinazopatikana -->
                                        <div class="icon-container" style="text-align: center;">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"
                                                    viewBox="0 0 100 125" width="70" height="70" xml:space="preserve" style="padding: 10px; margin: 4px 4px; border-radius: 5px;">
                                                    <path d="M76.531,40.06c-1.672,0-3.026,1.355-3.026,3.027v20.687c-0.187,0.063-0.374,0.116-0.555,0.204  
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
                                                            C28.276,35.357,30.802,38.163,30.802,41.573z" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
                                                </svg>
                                            <div>Zinazopatikana</div>
                                        </div>
    
                                        <!-- Icon and Text for Unazochagua -->
                                        <div class="icon-container" style="text-align: center;">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"
                                                viewBox="0 0 100 125" width="70" height="70" xml:space="preserve" style="padding: 10px; margin: 4px 4px; border-radius: 5px;">
                                                <path d="M76.531,40.06c-1.672,0-3.026,1.355-3.026,3.027v20.687c-0.187,0.063-0.374,0.116-0.555,0.204  
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
                                                        C28.276,35.357,30.802,38.163,30.802,41.573z" fill="#28ABE2" stroke="#000000" stroke-width="2" />
                                            </svg>
                                            <div>Unazochagua</div>
                                        </div>
    
                                        <!-- Icon and Text for Haipatikani -->
                                        <div class="icon-container" style="text-align: center;">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"
                                                    viewBox="0 0 100 125" width="70" height="70" xml:space="preserve" style="padding: 10px; margin: 4px 4px; border-radius: 5px;">
                                                    <path d="M76.531,40.06c-1.672,0-3.026,1.355-3.026,3.027v20.687c-0.187,0.063-0.374,0.116-0.555,0.204  
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
                                                            C28.276,35.357,30.802,38.163,30.802,41.573z" fill="#CB252B" stroke="#000000" stroke-width="2" />
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
                                                <h6 class="cockpit-heading">{{ data.bus_schedule.origin_city }} - {{ data.bus_schedule.destination_city }} ({{data.bus_schedule.via}} )
                                                <br>
                                                Chagua Siti</h6>
                                                <!-- <div class="moving-text">
                                                    {{ data.bus_schedule.origin_city }} - {{ data.bus_schedule.destination_city }} ({{ data.bus_schedule.via }})
                                                </div> -->
                                            </div>
                                            <!-- <input type="hidden" name="schedule_id" :value="scheduleId" /> -->
                                            <input type="hidden" name="from_city_id" :value="origin_city_id" />
                                            <input type="hidden" name="to_city_id" :value="destination_city_id" />
                                            <input type="hidden" name="bus_id" :value="busId" />
                                            <ol class="cabin fuselage" v-if="data.seatMatrix.length">
                                                <li class="row row--driver">
                                                    <ol class="seats driver-seats" type="A">
                                                        <li class="seat driver-seat">
                                                            <img src="@/assets/images/drive-wheel1.svg" alt="Driver Icon" class="driver-icon" />
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li v-for="(row, rowIndex) in data.seatMatrix" 
                                                    :key="'row-' + rowIndex" 
                                                    :class="'row row--' + (rowIndex + 1)">
                                                    <template v-if="rowIndex === 13">
                                                        <ol class="seatsL" type="A">
                                                            <li v-for="(seat, colIndex) in row" 
                                                                :key="'seat-' + rowIndex + '-' + colIndex" 
                                                                class="seatL">
                                                                
                                                                <template v-if="seat">
                                                                    <svg 
                                                                        xmlns="http://www.w3.org/2000/svg" 
                                                                        version="1.1" 
                                                                        x="0px" 
                                                                        y="0px" 
                                                                        viewBox="0 0 100 125" 
                                                                        width="100" 
                                                                        height="100" 
                                                                        xml:space="preserve" 
                                                                        :class="{'selected-seat': seat.selected, 'disabled-seat': seat.disabled}" 
                                                                        @click="toggleSeatSelection(seat)">
                                                                        
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
                                                                            stroke-width="2" />
                                                                        <text x="50%" y="35%" font-size="14" text-anchor="middle" fill="black" font-family="Arial" dy=".3em">{{ seat.label }}</text>
                                                                    </svg>
                                                                </template>
                                                                <template v-else>
                                                                    <div class="empty-seat"></div>
                                                                </template>
                                                            </li>
                                                        </ol>
                                                    </template>
                                                    <template v-else>
                                                        <ol class="seats" type="A">
                                                            <li v-for="(seat, colIndex) in row" 
                                                                :key="'seat-' + rowIndex + '-' + colIndex" 
                                                                class="seat">
                                                                
                                                                <template v-if="seat">
                                                                    <template v-if="seat.value !== 'TOILET' && seat.value !== 'DOOR'">
                                                                        <svg 
                                                                            xmlns="http://www.w3.org/2000/svg" 
                                                                            version="1.1" 
                                                                            x="0px" 
                                                                            y="0px" 
                                                                            viewBox="0 0 100 125" 
                                                                            width="200" 
                                                                            height="200" 
                                                                            xml:space="preserve" 
                                                                            :class="{'selected-seat': seat.selected, 'disabled-seat': seat.disabled}" 
                                                                            @click="toggleSeatSelection(seat)">
                                                                            
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
                                                                                stroke-width="2" />
                                                                            <text x="50%" y="35%" font-size="14" text-anchor="middle" fill="black" font-family="Arial" dy=".3em">{{ seat.label }}</text>
                                                                        </svg>
                                                                    </template>
                                                                    <template v-else>
                                                                    <label :for="seat.id" :style="{backgroundColor: seat.value === 'TOILET' ? 'red' : 'red', color: 'white', fontSize: '8px'}">
                                                                        {{ seat.label }}
                                                                    </label>
                                                                </template>
                                                                </template>
                                                                <!-- <template v-else>
                                                                    <div class="empty-seat"></div>
                                                                </template> -->
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
                                            <a class="nav-link" 
                                                :class="{ 'active-tab': activeTab === 'departure', 'inactive-tab': activeTab !== 'departure' }" 
                                                @click="activeTab = 'departure'">
                                                Kupandia
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" 
                                                :class="{ 'active-tab': activeTab === 'destination', 'inactive-tab': activeTab !== 'destination' }" 
                                                @click="activeTab = 'destination'">
                                                Kushukia
                                            </a>
                                        </li>
                                    </ul>

                                    <!-- Tab Content -->
                                    <div class="tab-content p-3 border rounded shadow-sm bg-light">
                                        <!-- Departure City Selection -->
                                        <div v-if="activeTab === 'departure'">
                                            <h5 class="text-center">Chagua sehemu ya Kupandia</h5>
                                            <div class="city-list">
                                                <div v-for="point in data.boarding_points" :key="point.id" class="city-item">
                                                    <!-- Ensuring only one radio button can be selected in the departure tab -->
                                                    <input 
                                                        type="radio" 
                                                        v-model="selectedDeparture" 
                                                        :value="point.id" 
                                                        :id="'departure-' + point.id"
                                                        @change="handleDepartureSelection"
                                                    >
                                                    <label :for="'departure-' + point.id">{{ point.point_name }}</label>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Destination Selection -->
                                        <div v-if="activeTab === 'destination'">
                                            <h5 class="text-center">Chagua sehemu ya Kushukia</h5>
                                            <div class="city-list">
                                                <div v-for="point in data.dropping_points" :key="point.id" class="city-item">
                                                    <!-- Ensuring only one radio button can be selected in the destination tab -->
                                                    <input 
                                                        type="radio" 
                                                        v-model="selectedDestination" 
                                                        :value="point.id" 
                                                        :id="'destination-' + point.id"
                                                        @change="handleDestinationSelection"
                                                    >
                                                    <label :for="'destination-' + point.id">{{ point.point_name }}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div  
                                        v-if="showProceedButton"  
                                        class="row"  
                                        style="margin-bottom: 10px; margin-top: 5px; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: center;"  
                                    >  
                                        <button  
                                            type="button"  
                                            class="form-control"  
                                            style="background-color: #09496e; color: #f8f8f8; width: 200px; height: auto"  
                                            id="cf-submit"  
                                            @click="proceedToBooking"  
                                            :disabled="seatisLoading || !selectedDeparture || !selectedDestination" 
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
  import axios from 'axios';

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
                via: ""
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
        activeTab: 'departure', 
        selectedDeparture: null,
        selectedDestination: null, 
        isLoadingDestination: false,
        isSkeletonLoading: false,
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
            seat_id: this.selectedSeatIds,
            bus_id: this.selectedBusIds[0],  // Only one bus_id should be selected
            schedule_id: this.selectedScheduleIds[0],  // Only one schedule_id should be selected
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

            // Pre-fill city names based on stored IDs
            this.fillCityNames();

            this.fetchBusData();
        }
    },
    methods: {
        async fetchDepartureCities() {
        try {
            const response = await fetch("https://aboodbus.co.tz/passenger/boarding-cities");
            const data = await response.json();
            this.departureOptions = data.data.cities || [];
            this.filteredDepartureOptions = [...this.departureOptions];

            // Pre-fill the departure city
            this.fillCityNames();
        } catch (error) {
            console.error("Error fetching departure cities:", error);
        }
        },
        async fetchDestinationCities(departureId) {
            this.isLoadingDestination = true;
            try {
                const response = await fetch(`https://aboodbus.co.tz/passenger/${departureId}/dropping-cities`);
                const data = await response.json();
                this.destinationOptions = data.data.cities || [];
                this.filteredDestinationOptions = [...this.destinationOptions];

                this.fillCityNames();
            } catch (error) {
                console.error("Error fetching destination cities:", error);
            }  finally {
            this.isLoadingDestination = false;  
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
        const selectedDeparture = this.departureOptions.find(city => city.id === this.departureId);
        if (selectedDeparture) {
            this.departure = selectedDeparture.city;
        }
        const selectedDestination = this.destinationOptions.find(city => city.id === this.destinationId);
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
            const formData = new FormData();
            formData.append("boarding_city_id", this.departureId);
            formData.append("dropping_city_id", this.destinationId);
            formData.append("departure_date", this.date);

            try {
                const response = await fetch("https://aboodbus.co.tz/passenger/bus-itinerary", {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();

                if (!response.ok) {
                    if (response.status === 400) {
                        this.errorMessage = result.message || "Invalid request. Please check your input.";
                    } else {
                        this.errorMessage = "Error fetching bus data. Please try again.";
                    }
                    this.busData = [];
                    return;
                }

                this.busData = result.data.bus_schedules || [];
                
                if (this.busData.length === 0) {
                    this.errorMessage = "No route available.";
                }

            } catch (error) {
                console.error("Error:", error);
                this.errorMessage = "Network error. Please check your connection.";
            } finally {
                this.isLoading = false;
            }
        },
        async bookTicket(bus) {
            if (this.selectedBus && this.selectedBus.bus_id === bus.bus_id) {
                // console.log("You have already initiated booking for this bus.");
                return; 
            } else {
                this.selectedBus = bus;
                this.data.busSeats = [];
                this.data.bus_schedule = {};
                this.data.boarding_points = {};
                this.data.dropping_points = {};
                this.seatsLimit = 0; 
                this.showProceedButton = false;
                this.selectedBookingIds = [];
                this.selectedSeatIds = [];
            }

            // console.log("Booking ticket for Bus:", bus);  
            // this.isLoading = true;  
            this.isSkeletonLoading = true;
            this.errorMessage = "";  

            const requestBody = {  
                schedule_id: bus.schedule_id,  
                bus_id: bus.bus_id  
            };  

            try {  
                // console.log("Sending request to API with payload:", requestBody);  
                const response = await fetch("https://aboodbus.co.tz/passenger/bus-chart", {  
                    method: "POST",  
                    headers: { "Content-Type": "application/json" },  
                    body: JSON.stringify(requestBody),  
                });  

                const result = await response.json();  
                // console.log("API Response:", result);  

                if (response.ok) {  
                    // console.log("Seat Data Retrieved Successfully:", result.data);  
                    this.data.busSeats = result.data.bus_seats;  
                    this.data.bus_schedule = result.data.bus_schedule || {};  
                    this.seatsLimit = result.data.seats_limit || 0;  
                    this.data.boarding_points = result.data.boarding_points || {};
                    this.data.dropping_points = result.data.dropping_points || {};
        
                    this.buildMatrix();   
                } else {  
                    console.error("Error booking ticket:", result);  
                    this.errorMessage = result.message || "Failed to retrieve seat data.";  
                }  
            } catch (error) {  
                console.error("Network Error:", error);  
                this.errorMessage = "Something went wrong, please try again.";  
            } finally {  
                // this.isLoading = false;  
                this.isSkeletonLoading= false;
            }  
        },

        buildMatrix() {
        if (!this.data || !Array.isArray(this.data.busSeats) || this.data.busSeats.length === 0) {
            console.error("busSeats is undefined, not an array, or empty");
            this.data.seatMatrix = [];
            return;
        }

        let seatMap = new Map();
        let maxRow = 0, maxCol = 0;

        this.data.busSeats.forEach(seat => {
            const row = parseInt(seat.row, 10);
            const col = parseInt(seat.column, 10);

            if (col === 3 && row !== 14) return; // Skip unwanted seats

            maxRow = Math.max(maxRow, row);
            maxCol = Math.max(maxCol, col);

            if (!seatMap.has(row)) {
                seatMap.set(row, new Map());
            }

            seatMap.get(row).set(col, {
                id: seat.bus_seat_id,
                value: seat.seat_name,
                label: seat.seat_name,
                name: seat.seat_name,
                disabled: seat.hold_status !== 0,
                booking_id: seat.booking_id,
                bus_id: seat.bus_id,
                schedule_id: seat.schedule_id
            });
        });

        for (let row = 1; row <= maxRow; row++) {
            if (!seatMap.has(row)) {
                seatMap.set(row, new Map());
            }
            for (let col = 1; col <= maxCol; col++) {
                if (col === 3 && row !== 14) continue; // Skip unwanted column 3 rows

                if (!seatMap.get(row).has(col)) {
                    seatMap.get(row).set(col, null); // Mark as empty seat
                }
            }
        }

        const specialSeats = [
            { row: 6, col: 1, type: "TOILET", className: "toilet-seat" },
            { row: 7, col: 1, type: "DOOR", className: "door-seat" }
        ];

        specialSeats.forEach(({ row, col, type, className }) => {
            if (!seatMap.has(row)) {
                seatMap.set(row, new Map());
            }
            seatMap.get(row).set(col, {
                id: type,
                value: type,
                label: type,
                disabled: true,
                class: className,
            });
        });

        this.data.seatMatrix = Array.from(seatMap.keys())
            .sort((a, b) => a - b)
            .map(row => Array.from({ length: maxCol }, (_, i) => {
                const colIndex = i + 1;
                if (colIndex === 3 && row !== 14) return undefined; // Skip unwanted column 3 rows
                return seatMap.get(row).get(colIndex) ?? null; // Use null for missing seats
            }).filter(item => item !== undefined));

        // console.log(this.data.seatMatrix);
    },
        toggleSeatSelection(seat) {
        if (seat.disabled) return;
        
        seat.selected = !seat.selected;
        
        if (seat.selected) {
            this.selectedBookingIds.push(seat.booking_id);
            this.selectedSeatIds.push(seat.id);
            
            if (!this.selectedBusIds.includes(seat.bus_id)) {
                this.selectedBusIds = [seat.bus_id]; // Ensure only one bus_id
            }
            
            if (!this.selectedScheduleIds.includes(seat.schedule_id)) {
                this.selectedScheduleIds = [seat.schedule_id]; // Ensure only one schedule_id
            }
        } else {
            this.selectedBookingIds = this.selectedBookingIds.filter(id => id !== seat.booking_id);
            this.selectedSeatIds = this.selectedSeatIds.filter(id => id !== seat.id);
            
            // Check if any selected seats remain with this bus_id/schedule_id
            if (!this.selectedSeatIds.length) {
                this.selectedBusIds = [];
                this.selectedScheduleIds = [];
            }
        }
        
        // Enforce seat limit
        if (this.selectedSeatIds.length > this.seatsLimit) {
            alert(`You can only select up to ${this.seatsLimit} seats.`);
            this.toggleSeatSelection(seat); // Deselect the last selected seat
        }
        
        this.showProceedButton = this.selectedSeatIds.length > 0;
    },

    async proceedToBooking() {
    // Check if the departure point is selected
    if (!this.selectedDeparture) {
        alert("Please select a departure point.");
        return; 
    }

    // Check if the destination point is selected
    if (!this.selectedDestination) {
        alert("Please select a destination point.");
        return; 
    }

    // Check if at least one seat is selected
    if (this.selectedSeatIds.length === 0) {
        alert("Please select at least one seat to proceed.");
        return;
    }

    // Set loading state
    this.seatisLoading = true;

    // Prepare the payload for the API request
    const payload = {
        booking_id: this.selectedBookingIds,
        seat_id: this.selectedSeatIds,
    };

    try {
        // Make the API request to hold the seats
        await axios.post("https://aboodbus.co.tz/passenger/hold-seats", payload, {
            headers: { "Content-Type": "application/json" },
        });

        // Navigate to the booking details page with relevant query parameters
        this.$router.push({
            name: "BookingDetails",
            query: {
                bus_id: this.selectedBusIds[0] || "",
                schedule_id: this.selectedScheduleIds[0] || "",
                booking_id: this.selectedBookingIds.join(","),
                seat_id: this.selectedSeatIds.join(","),
                departure: this.selectedDeparture,
                destination: this.selectedDestination,
            },
        });
    } catch (error) {
        // Log the error message in case of failure
        alert(error.response?.data?.message || "Failed to hold seats. Please try again.");
    } finally {
        // Reset loading state
        this.seatisLoading = false;
    }
},
    // Handle selection of departure city
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
background-color: #28ABE2 !important; 
color: black !important;
}

.inactive-tab {
background-color: white !important;
color: black !important; 
}

.city-list {
display: flex;
flex-direction: column;
gap: 2px!important; 
}

.city-item {
display: flex;
align-items: center;
gap: 5px!important;
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
background-color: rgba(0, 0, 0, 0.5); /* semi-transparent dark background */
display: flex;
justify-content: center;
align-items: center;
z-index: 9999;
}

/* The loading spinner container */
.loading-spinner {
position: relative;
width: 70px;
height: 70px;
background: rgba(255, 255, 255, 0.8); /* light, translucent background for contrast */
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Pseudo-elements for the spinner rings */
.loading-spinner::before,
.loading-spinner::after {
content: '';
position: absolute;
border: 4px solid transparent;
border-radius: 50%;
animation: spin 1.5s linear infinite;
}

/* Outer ring using your primary color */
.loading-spinner::before {
width: 100%;
height: 100%;
border-top-color: #3498db; /* primary blue */
}

/* Inner ring using your secondary color */
.loading-spinner::after {
width: 70%;
height: 70%;
top: 15%;
left: 15%;
border-bottom-color: #CB252B; /* secondary red */
animation-duration: 1s;
}

/* Keyframes for rotation */
@keyframes spin {
0% {
transform: rotate(0deg);
}
100% {
transform: rotate(360deg);
}
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
color: rgba(30, 30, 30, .4);
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
background: #f4f5f5!important;
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
.seat-map-container{
margin-top: 10px!important;
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

  /* Skeleton Button */
  .skeleton-button {
    width: 200px;
    height: 40px;
    margin: 10px auto;
    border-radius: 6px;
  }

  /* Responsive Adjustments */
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
