<template>
  <FileUpload/>
</template>

<script>
import FileUpload from './components/FileUpload.vue';
export default {
  name: 'App',
  components: {
    FileUpload
  }
}
</script>

<style>
#app {
  font-family: Helvetica;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
