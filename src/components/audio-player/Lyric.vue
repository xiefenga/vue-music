<template>
  <div class="lyric-wrapper">
      <ul class="lyric">
          <li class="line" :class="{ active: curTime > line.time[0] && curTime < line.time[1] }" v-for="(line, index) in lyr" :key="line.text + index" v-scrollIntoView>
              {{ line.text }}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: {
    lyric: {
      type: String,
      required: true
    },
    curTime: {
      type: Number,
      required: true
    }
  },
  computed: {
    lyr () {
      const timeReg = /\[.*\]/g
      const times = this.lyric.match(timeReg)
      const lines = this.lyric.replace(timeReg, '').split('\n').slice(0, -1)
      lines.forEach((item, index) => {
        let time = null
        if (index !== lines.length - 1) {
          time = [this.handelTime(times[index].slice(1, -1)), this.handelTime(times[index + 1].slice(1, -1))]
        } else {
          time = [this.handelTime(times[index].slice(1, -1)), Infinity]
        }
        lines[index] = {
          time,
          text: item
        }
      })
      return lines
    }
  },
  methods: {
    handelTime (timeStr) {
      const t = timeStr.split(':')
      const m = Number(t[0])
      const s = Number(t[1])
      return m * 60 + s
    }
  },
  directives: {
    scrollIntoView: {
      update (el, binding) {
        if (el.className.includes('active')) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.lyric-wrapper{
	padding: 10px 0;
	.lyric {
    user-select: none;
    .line {
        font-weight: 700;
        padding: 5px;
        word-break: keep-all;
				&.active {
					color: #fa2800;
					font-size: 18px;
				}
    }
}
}
</style>
