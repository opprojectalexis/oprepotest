<template>
    <div class="question-counter">
      {{ currentQuestion }} / {{ totalQuestion }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'QuestionCounter',
    props: {
      currentQuestion: {
        type: Number,
        required: true
      },
      totalQuestion: {
        type: Number,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .question-counter {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: white; /* Adapt to the theme */
    background-color: rgba(0, 0, 0, 0.5); /* Optional: to make the text stand out */
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem; /* Increase font size */
  }
  </style>
  