<template>
    <div class="audio-form">
      <div class="question-container">
        <h3 class="question">{{ question }}</h3>
      </div>
      <audio controls class="audio-player">
        <source :src="audioSrc" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <input type="text" v-model="inputText" class="form-control my-3" placeholder="Enter text">
      <button class="btn btn-primary" @click="validate">Validate</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AudioForm',
    props: {
      audioSrc: {
        type: String,
        required: true
      },
      question: {
        type: String,
        required: true
      },
      pageId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        inputText: ''
      }
    },
    methods: {
      validate() {
        this.$emit('validate', { pageId: this.pageId, answer: this.inputText });
      }
    }
  }
  </script>
  
  <style scoped>
  .audio-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    text-align: center;
  }
  
  .question-container {
    width: 80%;
    max-width: 600px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .question {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .audio-player {
    margin-bottom: 20px;
  }
  
  .form-control {
    width: 80%;
    max-width: 400px;
  }
  
  .btn {
    width: 80%;
    max-width: 400px;
  }
  </style>
  