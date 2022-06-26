import request from '@/utils/request'

const URL = 'login'

export function login(data) {
  return request({
    url: URL + '/admin',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: URL + '/info',
    method: 'post',

  })
}

export function getByUsername(val) {
  return request({
    url: URL + '/withUsername',
    method: 'post',
    data: {
      username: val
    }
  })
}

export function update(data) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: data
  })
}


export function logout() {
  return request({
    url: URL + '/logout',
    method: 'post'
  })
}
