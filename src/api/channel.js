/**
 * 文章请求模块
 */
import request from '@/utils/request'

/**
 * 请求获取文章列表数据
 * getAllChannels,
  addUserChannel,
  deleteUserChannel
 */

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
export const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
