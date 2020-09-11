<template>
  <div class="updateBirthdayContainer">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="updateBirthday"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'updateBirthdayIndex',
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async updateBirthday() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示直至其他弹窗替换他
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({
          birthday: currentDate,
        })
        // 更行视图
        this.$emit('input', currentDate)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast('更新数据成功!')
      } catch (err) {
        this.$toast('更新数据失败!')
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
