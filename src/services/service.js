import request from '../utils/request';
import qs from "qs";
const addr = "http://127.0.0.1:80"
// const addr_service = "http://kaaden.orrzt.com"
const host = addr;
export function getBing(body) {
  return request({
    method: "post",
    url: `${host}/getBing`,
    data: qs.stringify(body),
  })
}
export function Login(body) {
  return request({
    method: "post",
    url: `${host}/login`,
    data: qs.stringify(body),
  })
}
export function getTags(body) {
  return request({
    method: "post",
    url: `${host}/tags`,
    data: qs.stringify(body),
  })
}
export function changeTags(body) {
  return request({
    method: "post",
    url: `${host}/changeTags`,
    data: qs.stringify(body),
  })
}
export function DelTags(body) {
  return request({
    method: "post",
    url: `${host}/delTags`,
    data: qs.stringify(body),
  })
}
export function getContent(body) {
  return request({
    method: "post",
    url: `${host}/getContent`,
    data: qs.stringify(body),
  })
} 
export function getEditor(body) {
  return request({
    method: "post",
    url: `${host}/getEditor`,
    data: qs.stringify(body),
  })
}