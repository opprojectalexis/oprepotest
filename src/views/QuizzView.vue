<template>
  <div :style="backgroundStyle" class="vh-100 position-relative">
    <QuestionCounter :currentQuestion="currentSession.currentQuestion" :totalQuestion="totalQuestion" />
    <div v-if="showTimer" class="timer">{{ formattedTime }}</div>
    <component 
      :is="currentComponent" 
      :question="question" 
      :imageSrc="imageSrc" 
      :images="images" 
      :options="options" 
      :audioSrc="audioSrc" 
      :pageId="currentSession.currentQuestion" 
      @validate="handleValidate"
    />
  </div>
</template>

<script>
import QuestionCounter from '../components/QuestionCounter.vue';
import ImageForm from '../components/ImageForm.vue';
import ImageSelectionForm from '../components/ImageSelectionForm.vue';
import MultiImageSelectionForm from '../components/MultiImageSelectionForm.vue';
import TextForm from '../components/TextForm.vue';
import TextSelectionForm from '../components/TextSelectionForm.vue';
import MultiTextSelectionForm from '../components/MultiTextSelectionForm.vue';
import AudioForm from '../components/AudioForm.vue';
import ImageTextSelectionForm from '../components/ImageTextSelectionForm.vue';
import MultiImageTextSelectionForm from '../components/MultiImageTextSelectionForm.vue';
import { loadSession, saveSession, saveTimer, loadTimer } from '../store/session';

export default {
  name: 'QuizzView',
  components: {
    QuestionCounter,
    ImageForm,
    ImageSelectionForm,
    MultiImageSelectionForm,
    TextForm,
    TextSelectionForm,
    MultiTextSelectionForm,
    AudioForm,
    ImageTextSelectionForm,
    MultiImageTextSelectionForm
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentSession: loadSession(),
      totalQuestion: 0,
      currentComponent: null,
      imageSrc: '',
      images: [],
      options: [],
      audioSrc: '',
      question: '',
      backgroundImages: [
        '/img/luffybg3.png',
        '/img/zorobg.png',
        '/img/franky.png'
      ],
      backgroundStyle: {},
      timer: null,
      remainingTime: 0,
      showTimer: false
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.remainingTime / 60);
      const seconds = this.remainingTime % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.checkAndRedirect();
        this.setRandomBackground();
        this.startTimer();
      }
    }
  },
  methods: {
    checkAndRedirect() {
      const currentQuestion = this.currentSession.currentQuestion;
      const requestedQuestion = Number(this.id);
      const answeredPages = this.currentSession.answers.map(a => a.pageId);

      if (answeredPages.includes(requestedQuestion)) {
        this.$router.push(`/quizz/${currentQuestion}`);
      } else {
        this.fetchQuizzData();
      }
    },
    async fetchQuizzData() {
      console.log(`Fetching data for question ${this.currentSession.currentQuestion}`);
      const response = await fetch('/quizz.json');
      const quizzData = await response.json();
      this.totalQuestion = quizzData.length;
      const currentData = quizzData.find(q => q.id === this.currentSession.currentQuestion);
      if (currentData) {
        this.currentComponent = currentData.component;
        this.imageSrc = currentData.imageSrc || '';
        this.images = currentData.images || [];
        this.options = currentData.options || [];
        this.audioSrc = currentData.audioSrc || '';
        this.question = currentData.question;
        console.log(`Loaded question ${this.currentSession.currentQuestion}:`, currentData);
      } else {
        console.log(`No data found for question ${this.currentSession.currentQuestion}`);
      }
    },
    handleValidate({ pageId, answer }) {
      console.log(`Validated answer for question ${pageId}:`, answer);
      this.currentSession.answers.push({ pageId, answer });
      this.currentSession.currentQuestion = pageId + 1;
      saveSession(this.currentSession);
      console.log('Current session:', JSON.stringify(this.currentSession, null, 2));
      const nextPageId = pageId + 1;
      if (nextPageId <= this.totalQuestion) {
        this.$router.push(`/quizz/${nextPageId}`);
      } else {
        this.$router.push('/result');
      }
    },
    setRandomBackground() {
      const randomImage = this.backgroundImages[Math.floor(Math.random() * this.backgroundImages.length)];
      this.backgroundStyle = {
        backgroundImage: `url(${randomImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        position: 'relative'
      };
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      const storedTime = loadTimer();
      const seconds = Number(this.$route.query.seconds);
      if (storedTime !== null) {
        this.remainingTime = storedTime;
      } else if (seconds > 0) {
        this.remainingTime = seconds * 50;
        saveTimer(this.remainingTime);
      }

      if (this.remainingTime > 0) {
        this.showTimer = true;
        this.timer = setInterval(() => {
          if (this.remainingTime > 0) {
            this.remainingTime -= 1;
            saveTimer(this.remainingTime);
          } else {
            clearInterval(this.timer);
          }
        }, 1000);
      } else {
        this.showTimer = false;
      }
    }
  },
  mounted() {
    this.setRandomBackground();
    this.checkAndRedirect();
    this.startTimer();
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style scoped>
.vh-100 {
  height: 100vh;
}

.timer {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}
</style>
