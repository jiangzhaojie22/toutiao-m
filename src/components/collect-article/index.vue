<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collected: value,
    }"
  />
</template>

<script>
export default {
  name: 'collectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
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
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
