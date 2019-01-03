import request from '../utils/request';
const host = "http://kaaden.orrzt.com";
export function getBing (body) {
  return request({
      method: "post",
      url: `${host}/getBing`,
      data: body,
  })
}