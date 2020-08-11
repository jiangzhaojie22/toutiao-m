/**
 * 文章请求模块
 */
import request from '@/utils/request'

/**
 * 请求获取文章列表数据
 */

export const getArticles = params => {
  return request({
    method: 'GET',
    path: '/app/v1_1/articles',
    // params!对象!用来传递query查询参数
    params
  })
}
