import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';  

const store = createStore({
  state: {
    bookingDetails: null,
  },
  mutations: {
    setBookingDetails(state, details) {
      state.bookingDetails = details;  
    },
  },
  actions: {
    updateBookingDetails({ commit }, details) {
      commit('setBookingDetails', details); 
    },
  },
  getters: {
    bookingDetails: (state) => state.bookingDetails,  
  },
  plugins: [
    createPersistedState({  
      storage: localStorage,
    }),
  ],
});

export default store;
