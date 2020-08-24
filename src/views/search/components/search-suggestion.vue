<template>
  <div class="search-suggestion">
    <van-cell
      :title="suggestion"
      icon="search"
      v-for="(suggestion, index) in suggestions"
      :key="index"
    />
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载
import { debounce } from 'lodash'

export default {
  name: 'searchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当searchText发生改变时会调用handler函数
      // handler函数名是固定的
      // debounce函数:参数1:一个函数.参数2:延迟时间,单位毫秒
      // 返回值防抖之后的函数
      handler: debounce(function(value) {
        this.loadSearchSuggestion(value)
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败,请稍后重试!')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
