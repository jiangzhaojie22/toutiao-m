<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="已显示全部评论"
    :error="error"
    error-text="加载失败，请点击重试!"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'commentList',
  components: {},
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.loading = true
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 获取文章的评论和获取评论的回复是同一个接口
        // 唯一的区别是接口参数不一样
        //    type
        //      a 文章的评论
        //      c 评论的回复
        //    source
        //      文章的评论，则传递文章的 ID
        //      评论的回复，则传递评论的 ID
        // 1. 请求获取数据
        const { data } = await getComments({
          type: 'a',
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit,
        })
        const { results } = data.data
        this.list.push(...results)
        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
