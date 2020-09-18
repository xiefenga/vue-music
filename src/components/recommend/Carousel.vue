<template>
  <div class="carousel" v-loading="!banners.length">
      <el-carousel :interval="2000" type="card" height="200px" trigger="click">
        <el-carousel-item v-for="item in banners" :key="item.imageUrl">
          <el-image :src="item.imageUrl"></el-image>
          <h3 :style="{backgroundColor: item.titleColor}">{{ item.typeTitle }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      banners: []
    }
  },
  created () {
    api.getBanner().then(res => {
      const banners = res.banners
      banners.forEach(item => {
        const { imageUrl, titleColor, typeTitle, encodeId } = item
        this.banners.push({
          imageUrl,
          titleColor,
          typeTitle,
          encodeId
        })
      })
    })
  }
}
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  position: absolute;
  right: -5px;
  bottom: 2px;
  color: #fff;
  font-size: 14px;
  padding: 3px 10px;
  border-radius: 8px;
  opacity: .8;
  font-weight: 700;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
