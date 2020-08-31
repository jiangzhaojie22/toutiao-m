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
    url: '/app/v1_1/articles',
    // params!对象!用来传递query查询参数,这里params=params所以简写为params
    params
  })
}
/**
 * 请求获取文章
 */

export const getArticleById = article_id => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${article_id}`
  })
}
