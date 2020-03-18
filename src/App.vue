<template>
  <div id="app">
    <!-- <button @click='btn'>点我啊</button> -->
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  methods: {
  btn(){
    this.$router.push('/login')
  }
},
}
</script>

<style>

</style>