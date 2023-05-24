<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="video">Upload a video:</label>
      <input type="file" @change="onFileChange" />
      <button type="submit" :disabled="!file" :class="{ 'disabled': !file }">Upload</button>
    </form>
    <p v-if="link">Share this download link:</p>
    <a href="link" v-if="link">{{ link }}</a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: null,
      link: "",
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    onSubmit() {
      let formData = new FormData();

      formData.append("video", this.file);

      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/upload`, formData)
        .then((response) => {
          console.log(
            "File uploaded successfully. Server responded with:",
            response
          );
          this.link = response.data.url;
          console.log("Link:", this.link);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
@import "../assets/FileUpload.css";
button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
;
