import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: "Home", component: () => import('@/views/HomePage.vue') },
  {
    path: '/journey',
    name: 'journeyPage', 
    component: () => import('@/components/Journey'), 
  },
  {
    path: '/booking-details',
    name: 'BookingDetails',
    component: () => import('@/components/BookDetails.vue'),
  },
  {
    path: '/seat-details',
    name: 'SeatDetails', 
    component: () => import('@/components/SeatDetails.vue'), 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      const section = document.querySelector(to.hash);
      if (section) {
        return {
          el: to.hash,
          behavior: 'smooth',
        };
      }
    }
    return { top: 0 };
  },
});

export default router;
