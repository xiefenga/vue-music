<template>
  <div class="daily-image">
    <div class="weekday">
      {{ weekday }}
    </div>
    <div class="date">
      {{ date }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      day: '',
      date: ''
    }
  },
  computed: {
    weekday () {
      let day = ''
      switch (this.day) {
        case 1:
          day = '一'
          break
        case 2:
          day = '二'
          break
        case 3:
          day = '三'
          break
        case 4:
          day = '四'
          break
        case 5:
          day = '五'
          break
        case 6:
          day = '六'
          break
        case 7:
          day = '日'
          break
      }
      return `星期${day}`
    }
  },
  mounted () {
    const date = new Date()
    this.day = date.getDay()
    this.date = date.getDate()
  }
}
</script>

<style lang="less" scoped>
.daily-image {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #eee;
  text-align: center;
  user-select: none;
  .weekday {
    margin-top: 20px;
    color: #909399;
  }
  .date {
    font-size: 80px;
    margin-top: 10px;
  }
}
</style>
