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
/**
 * 收藏文章
 */

export const collectArticeById = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data:{
      target
    }
  })
}
/**
 * 取消收藏文章
 */

export const cancelCollectArticeById = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}
/**
 * 点赞文章
 */

export const addLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data:{
      target
    }
  })
}
/**
 * 取消点赞文章
 */

export const cancelAddLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}
