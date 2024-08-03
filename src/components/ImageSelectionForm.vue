<template>
    <div class="image-selection-form">
      <div class="image-options">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-option"
          :class="{ selected: selectedImageIndex === index }"
          @click="selectImage(index)"
        >
          <img :src="image.src" :alt="`Option ${image.number}`" class="option-image">
        </div>
      </div>
      <div class="question-container">
        <h3 class="question">{{ question }}</h3>
      </div>
      <button class="btn btn-primary mt-3" @click="validate">Validate</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageSelectionForm',
    props: {
      question: {
        type: String,
        required: true
      },
      images: {
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
        selectedImageIndex: null
      };
    },
    methods: {
      selectImage(index) {
        this.selectedImageIndex = index;
      },
      validate() {
        if (this.selectedImageIndex !== null) {
          const selectedImageNumber = this.images[this.selectedImageIndex].number;
          this.$emit('validate', { pageId: this.pageId, answer: selectedImageNumber });
        } else {
          alert('Please select an image before validating.');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .image-selection-form {
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
    margin-top: 20px; /* Adjusted to be below the images */
  }
  
  .question {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .image-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .image-option {
    margin: 10px;
    border: 2px solid transparent;
    cursor: pointer;
    height: 50vh; /* Fixed height similar to ImageForm */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .image-option.selected {
    border-color: blue; /* Change this color as needed */
  }
  
  .option-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .btn {
    width: 80%;
    max-width: 400px;
  }
  </style>
  