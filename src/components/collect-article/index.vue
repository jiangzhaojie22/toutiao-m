<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collected: value,
    }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { collectArticeById, cancelCollectArticeById } from '@/api/article'
export default {
  name: 'collectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          await cancelCollectArticeById(this.articleId)
        } else {
          await collectArticeById(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功!' : '取消收藏')
      } catch (err) {
        this.$toast('操作失败!请重试')
      }
      this.loading = false
    },
  },
}
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
