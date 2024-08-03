<template>
  <div class="multi-image-selection-form">
    <div class="image-options">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="image-option"
        :class="{ selected: selectedImages.includes(index) }"
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
  name: 'MultiImageSelectionForm',
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
      selectedImages: []
    };
  },
  methods: {
    selectImage(index) {
      if (this.selectedImages.includes(index)) {
        this.selectedImages = this.selectedImages.filter(i => i !== index);
      } else {
        this.selectedImages.push(index);
      }
    },
    validate() {
      if (this.selectedImages.length > 0) {
        const selectedImageNumbers = this.selectedImages.map(index => this.images[index].number);
        this.$emit('validate', { pageId: this.pageId, answer: selectedImageNumbers });
      } else {
        alert('Please select at least one image before validating.');
      }
    }
  }
}
</script>

<style scoped>
.multi-image-selection-form {
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
  justify-content: center;
  margin-bottom: 20px;
}

.image-option {
  margin: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-option.selected {
  border-color: blue; /* Change this color as needed */
}

.option-image {
  max-width: 200px;

  max-width: 200px;
  object-fit: contain;
}

.btn {
  width: 80%;
  max-width: 400px;
}
</style>
