import request from '../utils/request';
import qs from "qs";
const addr = "http://127.0.0.1:80"
// const addr_service = "http://kaaden.orrzt.com"
const host = addr;
export function getBing(body) {
  return request({
    method: "post",
    url: `${host}/getBing`,
    data:  qs.stringify(body),
  })
}
export function Login(body) {
  return request({
    method: "post",
    url: `${host}/login`,
    data: qs.stringify(body),
  })
}