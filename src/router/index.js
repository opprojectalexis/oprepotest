import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import QuizzView from '../views/QuizzView.vue';
import ResultView from '../views/ResultView.vue';
import { loadSession } from '../store/session';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/quizz/:id',
    name: 'QuizzView',
    component: QuizzView,
    props: true,
    beforeEnter: (to, from, next) => {
      const session = loadSession();
      const currentQuestion = session.currentQuestion;
      const requestedQuestion = Number(to.params.id);

      if (requestedQuestion <= currentQuestion && requestedQuestion > 0) {
        next();
      } else {
        next(`/quizz/${currentQuestion}`);
      }
    }
  },
  {
    path: '/result',
    name: 'ResultView',
    component: ResultView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
