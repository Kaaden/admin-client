import request from '../utils/request';
import qs from "qs";
// const addr = "http://127.0.0.1:4000"
const addr = "http://kaaden.orrzt.com/api"
const host = addr;
export const getBing = (body) => {
  return request({
    method: "post",
    url: `${host}/getBing`,
    data: qs.stringify(body),
  })
}
export const Login = (body) => {
  return request({
    method: "post",
    url: `${host}/login`,
    data: qs.stringify(body),
  })
}
export const getTags = (body) => {
  return request({
    method: "post",
    url: `${host}/getTags`,
    data: qs.stringify(body),
  })
}
export const changeTags = (body) => {
  return request({
    method: "post",
    url: `${host}/changeTags`,
    data: qs.stringify(body),
  })
}
export const DelTags = (body) => {
  return request({
    method: "post",
    url: `${host}/delTags`,
    data: qs.stringify(body),
  })
}


export const addContent = (body) => {
  return request({
    method: "post",
    url: `${host}/addContent`,
    data: qs.stringify(body),
  })
}
export const delContent = (body) => {
  return request({
    method: "post",
    url: `${host}/delContent`,
    data: qs.stringify(body),
  })
}
export const updateUser = (body) => {
  return request({
    method: "post",
    url: `${host}/updateUser`,
    data: qs.stringify(body),
  })
}
export const getConfig = (body) => {
  return request({
    method: "post",
    url: `${host}/getConfig`
  })
}
export const updateConfig = (body) => {
  return request({
    method: "post",
    url: `${host}/updateConfig`,
    data: qs.stringify(body),
  })
}
export const detail = (body) => {
  return request({
    method: "post",
    url: `${host}/getDetail`,
    data: qs.stringify(body),
  })
}
export const findImg = (body) => {
  return request({
    method: "post",
    url: `${host}/findImg`,
    data: qs.stringify(body),
  })
}
