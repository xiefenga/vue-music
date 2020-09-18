<template>
  <div class="singers">
    <div class="filter">
      <div class="option"
        :class="{active: i == index}"
        v-for="(item, i) in options"
        :key="item.val + item.o"
        @click="handlerClick(item.val, i)"
      >
        {{ item.o }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      index: 0
    }
  },
  methods: {
    handlerClick (o, i) {
      if (i !== this.index) {
        this.index = i
        this.$emit('click', {
          type: this.type,
          data: o
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filter {
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;
  user-select: none;
  .option {
    margin: 0 3px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 10px;
    flex: 0 0 auto;
    &.active {
      color: #fff;
      background-color: red;
    }
  }
}
</style>
