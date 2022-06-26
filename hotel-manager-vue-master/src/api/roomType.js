import request from '@/utils/request'
import { deleteBatch } from './roomInfo'

const URL = 'op/room-type'

export function addRoomType(form) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: form
  })
}

export function editRoomType(form) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: form
  })
}

export function delRoomType(typeId) {
  return request({
    url: URL + '/delete/'+typeId,
    method: 'post',
    data: {
    }
  })
}

//批量删除
export function deleteBatchRoomType(ids) {
  return request({
    url: URL + '/deleteBatch/'+ids,
    method: 'post',

  })
}


export function getRoomTypeById(typeId) {
  return request({
    url: URL + '/'+typeId,
    method: 'post',
    data: {
    }
  })
}

/*export function getAllRoomType() {
  return request({
    url: URL,
    method: 'post'
  })
}*/

export function getAllRoomType(pageNum,pageSize,search) {
  return request({
    url: URL,
    method: 'post',
    data:{
      pageNum,
      pageSize,
      search
    }
  })
}
