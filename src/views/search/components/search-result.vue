<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="啊哦~数据出小差了~"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in articles"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'searchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data: res } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        })
        // 随机失败测试
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdf')
        // }
        const { results } = res.data
        // 2.将数据push到数据数组中
        this.articles.push(...results)
        // 3.将loading状态关闭
        this.loading = false
        // 4.判断是否还有数据，如果有继续加载下一个页码数据，如果没有，将finished设置为true
        if (results.length) {
          this.page++
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
