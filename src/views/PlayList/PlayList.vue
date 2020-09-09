<template>
  <div class="playlist" :key="id">
    palylist {{ id }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: ''
    }
  },
  watch: {
    '$route.query.id' () {
      this.id = this.$route.query.id
    }
  },
  mounted () {
    this.id = this.$route.query.id
  }
}
</script>

<style>

</style>
