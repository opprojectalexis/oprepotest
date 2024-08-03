<template>
  <div class="d-flex vh-100">
    <div class="container align-self-center text-center">
      <div class="row justify-content-center align-items-center">
        <div class="col-auto">
          <button class="btn btn-primary btn-lg px-5" @click="startQuizz">Start</button>
        </div>
        <div class="col-auto">
          <input type="number" v-model="seconds" class="form-control input-lg mb-3" placeholder="Enter seconds" style="width: auto;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resetSession } from '../store/session';

export default {
  name: 'HomeView',
  data() {
    return {
      seconds: 0
    };
  },
  methods: {
    startQuizz() {
      resetSession();
      console.log('Session reset. Starting quizz...');
      this.$router.push({ path: '/quizz/1', query: { seconds: this.seconds } });
    }
  }
}
</script>

<style>
.d-flex {
  background-image: url('/public/img/luffybg3.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}
.input-lg {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
}
</style>
