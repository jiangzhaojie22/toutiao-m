<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('delete-all-histories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="searchItemClick(item, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  components: {},
  props: {
    // Prop 数据
    //  Prop 是受父组件数据影响的
    //    如果是普通数据（数字、字符串、布尔值）绝对不能修改
    //    即便改了也不会传导给父组件
    //
    //    如果是引用类型数据（数组、对象）
    //        可以修改，例如 [].push(xxx)，对象.xxx = xxx
    //        不能重新赋值, xxx = []
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    searchItemClick(item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('onsearch',item)
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
