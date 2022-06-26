import request from '@/utils/request'

const URL = 'admin/operator'

export function add(form) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: form
  })
}

export function getAllDept() {
  return request({
    url: 'op/depart/getAll',
    method: 'get'

  })
}

export function getAll(pageNum, pageSize, search) {
  return request({
    url: URL,
    method: 'post',
    data: {
      pageNum,
      pageSize,
      search
    }
  })
}

export function getById(workerId) {
  return request({
    url: URL + '/' + workerId,
    method: 'post'

  })
}

export function update(data) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: data
  })
}

export function del(workerId) {
  return request({
    url: URL + '/delete/' + workerId,
    method: 'post'
  })
}

export function deleteBatch(ids) {
  return request({
    url: URL + '/deleteBatch/' + ids,
    method: 'post'

  })
}

export function uploadMessage() {
  return request({
    url: URL + '/import',
    method: 'post'

  })
}

export function downMessage() {
  return request({
    url: URL + '/export',
    method: 'get'
  })
}

export function getOperator(search) {
  return request({
    url: 'chat/worker',
    method: 'get',
    data: {
      search
    }
  })
}

