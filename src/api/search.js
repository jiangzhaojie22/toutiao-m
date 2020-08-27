/**
 * 联想请求模块
 */
import request from '@/utils/request'

/**
 * 请求获取联想数据
 */

export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    // params!对象!用来传递query查询参数,这里params=params所以简写为params
    params:{
      q
    }
  })
}
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    // params!对象!用来传递query查询参数,这里params=params所以简写为params
    params
  })
}
