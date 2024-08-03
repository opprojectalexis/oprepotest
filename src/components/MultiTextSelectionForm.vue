<template>
    <div class="multi-text-selection-form">
      <div class="question-container">
        <h3 class="question">{{ question }}</h3>
      </div>
      <div class="text-options">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="text-option"
          :class="{ selected: selectedOptions.includes(index) }"
          @click="selectOption(index)"
        >
          {{ option.text }}
        </div>
      </div>
      <button class="btn btn-primary mt-3" @click="validate">Validate</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MultiTextSelectionForm',
    props: {
      question: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      pageId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        selectedOptions: []
      };
    },
    methods: {
      selectOption(index) {
        if (this.selectedOptions.includes(index)) {
          this.selectedOptions = this.selectedOptions.filter(i => i !== index);
        } else {
          this.selectedOptions.push(index);
        }
      },
      validate() {
        if (this.selectedOptions.length > 0) {
          const selectedOptionNumbers = this.selectedOptions.map(index => this.options[index].number);
          this.$emit('validate', { pageId: this.pageId, answer: selectedOptionNumbers });
        } else {
          alert('Please select at least one option before validating.');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .multi-text-selection-form {
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
  
  .text-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .text-option {
    margin: 10px;
    padding: 10px 20px;
    border: 2px solid transparent;
    cursor: pointer;
    background-color: #f8f9fa;
    border-radius: 5px;
  }
  
  .text-option.selected {
    border-color: blue; /* Change this color as needed */
  }
  
  .btn {
    width: 80%;
    max-width: 400px;
  }
  </style>
  