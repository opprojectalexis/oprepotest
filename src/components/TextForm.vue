<template>
    <div class="text-form">
      <div class="question-container">
        <h3 class="question">{{ question }}</h3>
      </div>
      <input type="text" v-model="inputText" class="form-control my-3" placeholder="Enter text">
      <button class="btn btn-primary" @click="validate">Validate</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextForm',
    props: {
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
        // Emit an event with the input text
        this.$emit('validate', { pageId: this.pageId, answer: this.inputText });
      }
    }
  }
  </script>
  
  <style scoped>
  .text-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 30%; /* Adjust this value to position the form higher or lower */
    left: 50%;
    transform: translate(-50%, -30%);
    text-align: center;
  }
  
  .question-container {
    width: 80%;
    max-width: 600px;
    background-color: rgba(0, 0, 0, 0.5); /* Optional: to make the text stand out */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .question {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .form-control {
    width: 80%; /* Adjust the width as needed */
    max-width: 400px;
  }
  
  .btn {
    width: 80%;
    max-width: 400px;
  }
  </style>
  