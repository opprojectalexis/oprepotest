<template>
    <div class="result-view">
      <div v-if="!allEvaluated" class="result-items-container">
        <div v-for="(answer, index) in unevaluatedAnswers" :key="index" class="result-item">
          <h3>Question {{ answer.pageId }}</h3>
          <p><strong>Question:</strong> {{ getQuestionText(answer.pageId) }}</p>
          <div v-if="hasImage(answer.pageId)" class="image-container">
            <img :src="getImageSrc(answer.pageId)" alt="Question Image" class="result-image">
          </div>
          <div v-if="hasImages(answer.pageId)" class="images-container">
            <div v-for="img in getImages(answer.pageId)" :key="img.src" class="result-image-selection" :class="{ 'selected': isSelected(answer.answer, img.number) }">
              <img :src="img.src" :alt="'Image ' + img.number" class="result-image" style="max-height: 200px;">
            </div>
          </div>
          <div v-if="hasAudio(answer.pageId)" class="audio-container">
            <audio :src="getAudioSrc(answer.pageId)" controls></audio>
          </div>
          <p><strong>Your Answer:</strong> {{ getTextAnswer(answer.pageId, answer.answer) }}</p>
          <p><strong>Correct Answer:</strong> {{ getCorrectAnswer(answer.pageId) }}</p>
          <div class="button-container">
            <button class="btn btn-success" @click="acceptAnswer(answer.pageId)">Accept</button>
            <button class="btn btn-danger" @click="rejectAnswer(answer.pageId)">Reject</button>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>Score: {{ acceptedAnswers.length }}/{{ currentSession.answers.length }}</h1>
      </div>
    </div>
  </template>
  
  <script>
  import { loadSession } from '../store/session';
  
  export default {
    name: 'ResultView',
    data() {
      return {
        currentSession: loadSession(),
        questions: [],
        evaluatedAnswers: [],
        acceptedAnswers: [],
        allEvaluated: false
      };
    },
    computed: {
      unevaluatedAnswers() {
        return this.currentSession.answers.filter(answer => !this.evaluatedAnswers.includes(answer.pageId));
      }
    },
    methods: {
      getCorrectAnswer(pageId) {
        const question = this.questions.find(q => q.id === pageId);
        return question ? question.reponse : 'No correct answer found';
      },
      getImageSrc(pageId) {
        const question = this.questions.find(q => q.id === pageId);
        return question ? question.imageSrc : '';
      },
      hasImage(pageId) {
        const question = this.questions.find(q => q.id === pageId);
        return question && question.imageSrc;
      },
      getImages(pageId) {
        const question = this.questions.find(q => q.id === pageId);
        return question ? question.images : [];
      },
      hasImages(pageId) {
        const question = this.questions.find(q => q.id === pageId);
        return question && question.images && question.images.length > 0;
      },
      getAudioSrc(pageId) {
        const question = this.questions.find(q => q.id === pageId);
        return question ? question.audioSrc : '';
      },
      hasAudio(pageId) {
        const question = this.questions.find(q => q.id === pageId);
        return question && question.audioSrc;
      },
      getQuestionText(pageId) {
        const question = this.questions.find(q => q.id === pageId);
        return question ? question.question : 'No question found';
      },
      getTextAnswer(pageId, answer) {
        const question = this.questions.find(q => q.id === pageId);
        if (question && question.options) {
          if (Array.isArray(answer)) {
            return answer.map(a => question.options.find(opt => opt.number === a).text).join(', ');
          } else {
            const option = question.options.find(opt => opt.number === answer);
            return option ? option.text : answer;
          }
        }
        return answer;
      },
      isSelected(answer, number) {
        if (Array.isArray(answer)) {
          return answer.includes(number);
        }
        return answer === number;
      },
      acceptAnswer(pageId) {
        this.evaluatedAnswers.push(pageId);
        this.acceptedAnswers.push(pageId);
        this.checkAllEvaluated();
      },
      rejectAnswer(pageId) {
        this.evaluatedAnswers.push(pageId);
        this.checkAllEvaluated();
      },
      checkAllEvaluated() {
        if (this.evaluatedAnswers.length === this.currentSession.answers.length) {
          this.allEvaluated = true;
        }
      }
    },
    async mounted() {
      const response = await fetch('/quizz.json');
      this.questions = await response.json();
    }
  }
  </script>
  
  <style scoped>
  .result-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
  
  .result-items-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .result-item {
    border: 1px solid #ccc;
    padding: 20px;
    margin: 10px;
    min-width: 900px; /* Minimum width for each item */
    max-width: 600px; /* Maximum width for each item */
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
    border-radius: 5px;
  }
  
  .image-container, .images-container, .audio-container {
    margin-bottom: 10px;
  }
  
  .result-image, .result-image-selection img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .result-image-selection.selected img {
    border-color: blue;
    border-width: 3px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .btn {
    margin: 5px;
  }
  </style>
  