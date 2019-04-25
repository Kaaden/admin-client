import * as service from "../services/service"
import { message } from "antd";
import { routerRedux } from "dva/router"
export default {

  namespace: 'admin',

  state: {
    logoImg: window.sessionStorage.getItem("logoImg") || "",
    auth: "",
    collapsed: false,
    Tags: [],
    Tagstotal: 0,
    navtive: true,
    config: "",
    imgList: [],
  },

  reducers: {
    saveLogin(state, { payload }) {
      let auth = payload
      return { ...state, auth }
    },
    saveImg(state, { payload }) {
      if (payload) {
        window.sessionStorage.setItem("logoImg", payload)
      }
      return { ...state, logoImg: payload };
    },
    changeColl(state, { payload }) {
      return { ...state, collapsed: payload.collapsed };
    },
    saveTags(state, { payload }) {
      return { ...state, Tags: payload.list, Tagstotal: payload.total }
    },

    getSel(state, { payload }) {
      return { ...state, navtive: payload }
    },
    saveConfig(state, { payload }) {
      return { ...state, config: payload }
    },
    saveImgList(state, { payload }) {
      let imgList = []
      if (payload && payload.length) {
        imgList = payload
      }
      return { ...state, imgList }
    }

  },

  effects: {

    *featchImg({ payload }, { call, put }) {
      const { data } = yield call(service.getBing)
      if (data.isok) {
        yield put({ type: "saveImg", payload: data.data })
      }
    },
    *Login({ payload }, { call, put }) {
      const { data } = yield call(service.Login, { ...payload })
      if (data.isok) {
        window.sessionStorage.setItem("auth", JSON.stringify(data.data))
        yield put({ type: "saveLogin", payload: data.data })
        yield put(routerRedux.push({ pathname: "/home" }))
      } else {
        return message.error(data.msg)
      }
    },
    *getTags({ payload }, { call, put }) {
      const { data } = yield call(service.getTags, { ...payload })
      yield put({ type: "saveTags", payload: { list: data.data, total: data.total } })
    },
    *changeTags({ payload }, { call, put }) {
      const { data } = yield call(service.changeTags, { ...payload })
      if (!data.isok) {
        return message.error(data.msg)
      }
    },
    *DelTags({ payload }, { call, put }) {
      const { data } = yield call(service.DelTags, { ...payload })
      if (!data.isok) {
        return message.error(data.msg)
      }
    },

    *addContent({ payload }, { call, put }) {
      const { data } = yield call(service.addContent, { ...payload })
      return data.isok
    },
    * delContent({ payload }, { call, put }) {
      const { data } = yield call(service.delContent, { ...payload })
      return data.isok
    },
    * updateUSER({ payload }, { call, put }) {
      const { data } = yield call(service.updateUser, { ...payload })
      if (data.isok) {
        window.sessionStorage.setItem("auth", JSON.stringify(data.data))
        yield put({ type: "saveLogin", payload: data.data })
      }
    },
    * getConfig({ payload }, { call, put }) {
      const { data } = yield call(service.getConfig, { ...payload })
      if (data.isok) {
        yield put({ type: "saveConfig", payload: data.data })
      }
    },
    * updateConfig({ payload }, { call, put }) {
      const { data } = yield call(service.updateConfig, { ...payload })
      if (data.isok) {
        yield put({ type: "saveConfig", payload: data.data })
      }
    },
    * detail({ payload }, { call, }) {
      const { data } = yield call(service.detail, { ...payload })
      return data
    },
    * findImg(_, { call, put }) {
      const { data } = yield call(service.findImg)
      if (data.isok) {
        yield put({ type: "saveImgList", payload: data.data })
      }
    }
  },


  subscriptions: {
    setup({ dispatch, history, query }) {
      return history.listen(async ({ pathname, search, query }) => {
        if (history.location.pathname === '/') {
          window.sessionStorage.clear()
        }
      })
    },
  },
};
