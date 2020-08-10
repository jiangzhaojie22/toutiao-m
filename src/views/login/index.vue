<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="submitForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-msm-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'loginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误!'
          }
        ]
      },
      isCountDownShow: false // 倒计时展示
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 组件中必须通过this.$toast调用Toast组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间,为0持续展示
      })
      // 3.提交表单请求登录
      // try,catch捕获错误信息,try里面的代码一定是成功的catch里面一定是失败的
      try {
        const { data } = await login(user)
        console.log(data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功!')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误!')
        } else {
          this.$toast.fail('登陆失败,请稍后重试!')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    async onSendSms() {
      // 1.校验手机号
      console.log('onSendSms')
      try {
        await this.$refs.submitForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        console.log('验证失败', err)
        return
      }
      // 2.显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功!')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast.fail('发送频繁,请稍后重试')
        } else {
          this.$toast.fail('发送失败,请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
}
.send-msm-btn {
  background-color: #ededed;
  width: 152px;
  height: 46px;
  line-height: 46px;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
}
.login-btn {
  background-color: #6db4fb;
  border: none;
}
</style>
