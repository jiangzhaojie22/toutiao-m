<template>
  <div class="article-list">
    <!--
      List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
     -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-duration="2000"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <articleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        >
        </articleItem>
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import articleItem from '@/components/article-item'
export default {
  name: 'articlelist',
  components: {
    articleItem
  },
  props: {
    // 接受传入的频道列表信息
    channel: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      list: [],
      loading: false, // 控制loading状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取数据的时间戳
      error: false, // 控制失败提示状态
      refreshing: false, // 刷新正在加载状态
      refreshSuccessText: '' // 下拉刷新成功提示文本
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 初始化或滚动到底部的时候会触发调用onLoad
    async onLoad() {
      // 1.请求获取数据
      try {
        const { data: res } = await getArticles({
          // 频道ID
          channel_id: this.channel.id,
          // timestamp简单来说就是页码
          // 请求第一页数据传当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(),
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1
        })

        // 随机失败测试
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdf')
        // }

        // 2.把请求结果放到list数组中
        const { results } = res.data
        // push合并数组,...是数组的展开符,等于result[0],result[1]...把数组里的元素全部拿出来
        this.list.push(...results)
        // 3.一次数据加载完成后要把加载状态结束
        // loading关闭之后才能触发下一次的加载更多
        this.loading = false
        // 判断数据是否全部加载完成,results没有长度则返回
        if (results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      // 1.请求获取数据
      try {
        const { data: res } = await getArticles({
          // 频道ID
          channel_id: this.channel.id,
          // timestamp简单来说就是页码
          // 请求第一页数据传当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: Date.now(), // 下拉刷新每次请求最新数据
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1
        })

        // // 随机失败测试
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdf')
        // }

        // 2.将数据追加到顶部列表,unshift是数组往前插入
        const { results } = res.data
        this.list.unshift(...results)
        // 3.关闭下拉刷新的loading状态
        this.refreshing = false
        // 4.更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功!更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败!'
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  // 百分比是相对父元素的
  // height: 100%;
  // 视口单位vh,vw.视口就是根据浏览器窗口大小的单位,不受父元素影响,1vh可视窗口高度的1%,比如窗口高度750px,则1vh=7.5px
  height: 79vh;
  // 溢出滚动
  overflow-y: auto;
}
</style>
