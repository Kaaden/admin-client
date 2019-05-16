import request from '../utils/request';
// const addr = "http://127.0.0.1:4000"
const host = "http://kaaden.orrzt.com/api"

export const getBing = (body) => {
  return request({
    method: "post",
    url: `${host}/getBing`,
    data: body,
  })
}
export const Login = (body) => {
  return request({
    method: "post",
    url: `${host}/login`,
    data: body,
  })
}
export const getTags = (body) => {
  return request({
    method: "post",
    url: `${host}/getTags`,
    data: body,
  })
}
export const changeTags = (body) => {
  return request({
    method: "post",
    url: `${host}/changeTags`,
    data: body,
  })
}
export const DelTags = (body) => {
  return request({
    method: "post",
    url: `${host}/delTags`,
    data: body,
  })
}


export const addContent = (body) => {
  return request({
    method: "post",
    url: `${host}/addContent`,
    data: body,
  })
}
export const delContent = (body) => {
  return request({
    method: "post",
    url: `${host}/delContent`,
    data: body,
  })
}
export const updateUser = (body) => {
  return request({
    method: "post",
    url: `${host}/updateUser`,
    data: body,
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
    data: body,
  })
}
export const detail = (body) => {
  return request({
    method: "post",
    url: `${host}/getDetail`,
    data: body,
  })
}
export const findImg = (body) => {
  return request({
    method: "post",
    url: `${host}/findImg`,
    data: body,
  })
}
