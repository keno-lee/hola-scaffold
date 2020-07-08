<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png" />
    <img alt="Vue logo" src="../assets/media/logo.png" />
    <HelloWorld msg="china" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
