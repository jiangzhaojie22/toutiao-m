<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
        class="search-form"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    />
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- 搜索历史记录 -->
    <search-history v-else />
  </div>
</template>

<script>
import { Toast } from 'vant'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import searchSuggestion from './components/search-suggestion'

export default {
  name: 'searchIndex',
  components: {
    searchHistory,
    searchResult,
    searchSuggestion,
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false /* 控制搜索结果的展示 */,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.searchText = val
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
  },
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
