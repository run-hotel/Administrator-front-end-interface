import request from '@/utils/request'

const URL = 'op/check-in'

export function checkIn(data) {
  return request({
    url: URL + '/in',
    method: 'post',
    data: data
  })
}

export function checkOut(roomNumber) {
  return request({
    url: URL + '/out',
    method: 'post',
    data: {
      roomNumber: roomNumber
    }
  })
}

export function getCheckinAll(currentNum,pageSize,search) {
  return request({
    url: URL ,
    method: 'post',
    data: {
      roomNumber: currentNum,
      pageSize:pageSize,
      search:search
    }
  })
}
