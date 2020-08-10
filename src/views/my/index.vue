<template>
  <div class="my-container">
    <div class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar" round fit="cover" />
          <span class="name">黑马头条号</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <div class="count">7784</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">548</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">91548</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">158487</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myIndex',
  components: {},
  props: {},
  data() {
    return {
      msg: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    /* 缩放填充到整个背景当中 */
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      // padding会撑大盒子,盒子大小会计算宽高+padding边框
      padding: 76px 32px 23px;
      // border-box让padding计算在height之中
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border:4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count{
          font-size: 36px;
        }
        .text{
          font-size: 23px;
        }

      }
    }
  }
}
</style>
