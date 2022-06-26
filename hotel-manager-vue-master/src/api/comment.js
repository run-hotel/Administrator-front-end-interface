import request from '@/utils/request'

  const URL = 'comment'



export function getAll(pageNum, pageSize, roomType) {
  return request({
    url: URL +'/getAll',
    method: 'post',
    data: {
      pageNum,
      pageSize,
      roomType
    }
  })
}

