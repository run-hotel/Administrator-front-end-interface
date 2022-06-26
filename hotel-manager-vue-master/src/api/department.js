import request from '@/utils/request'

const URL = 'op/depart'

export function add(form) {
  return request({
    url: URL,
    method: 'post',
    data: form
  })
}


export function getAll(pageNum, pageSize, search) {
  return request({
    url: URL +'/getAll',
    method: 'post',
    data: {
      pageNum,
      pageSize,
      search
    }
  })
}

export function getById(data) {
  return request({
    url: URL + '/' +data,
    method: 'get',

  })
}

export function update(data) {
  return request({
    url: URL ,
    method: 'put',
    data: data
  })
}

export function del(data) {
  return request({
    url: URL+'/'+data ,
    method: 'delete',
    data: {
      departmentId: data
    }
  })
}


export function deleteBatchDept(ids) {
  return request({
    url: URL + '/deleteBatch/'+ids,
    method: 'post',

  })
}

