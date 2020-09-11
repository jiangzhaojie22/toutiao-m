<template>
  <div class="photoContainer">
    <img class="img" :src="img" alt="图片加载错误" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm">完成</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'updatePhotoIndex',
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      msg: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.photoContainer {
  background-color: #000;
  height: 100%;
  .img {
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel, .confirm{
      width: 120px;
      height: 105px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
