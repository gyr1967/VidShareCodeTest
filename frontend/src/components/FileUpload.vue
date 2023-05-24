<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="file" @change="onFileChange">
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null
    }
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    onSubmit() {
      let formData = new FormData();
      
      formData.append('video', this.file);

      axios.post('http://localhost:3000/upload', formData)
        .then(response => {
          console.log('File uploaded successfully. Server responded with:', response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>
