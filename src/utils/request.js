// 封装请求模块
import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'

// const JSONstr = '{"art_id": 1299262618262831104}'
// console.log(JSON.parse(JSONstr))
// console.log('这是JSONbig', JSONbig.parse(JSONstr))

const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://ttapi.research.itcast.cn/',

  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }

    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const {
    user
  } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log('config', config)
  // 一定要return config 否则请求发不出去了
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
export default request