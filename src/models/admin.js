import * as service from "../services/service"
import { message } from "antd";
import { routerRedux } from "dva/router"
export default {

  namespace: 'admin',

  state: {
    logoImg: "",
    auth: "",
    collapsed: false,
    Tags: [],
    Tagstotal: 0,
    Content: [],
    Contentotal: 0,
    navtive: true,
  },

  reducers: {
    saveLogin(state, { payload }) {
      let auth = payload
      return { ...state, auth }
    },
    saveImg(state, { payload }) {
      return { ...state, logoImg: payload };
    },
    changeColl(state, { payload }) {
      return { ...state, collapsed: payload.collapsed };
    },
    saveTags(state, { payload }) {
      return { ...state, Tags: payload.list, Tagstotal: payload.total }
    },
    saveContent(state, { payload }) {
      if (payload.list.length) {
        payload.list.map((item) => {
          item.content = item.content.replace(/<[^>]+>/g, "")
          item.content = item.content.replace(/↵/g, "");
        })
      }
      return { ...state, Content: payload.list, Contentotal: payload.total }
    },
    getSel(state, { payload }) {
      return { ...state, navtive: payload }
    }
  },

  effects: {

    *featchImg({ payload }, { call, put }) {
      const { data } = yield call(service.getBing)
      if (data.isok) {
        yield put({ type: "saveImg", payload: data.url })
      }
    },
    *Login({ payload }, { call, put }) {
      const { data } = yield call(service.Login, { ...payload })
      if (data.isok) {
        window.sessionStorage.setItem("auth", JSON.stringify(data.info))
        yield put({ type: "saveLogin", payload: data.info })
        yield put(routerRedux.push({ pathname: "/home" }))
      } else {
        return message.error(data.msg)
      }
    },
    *getTags({ payload }, { call, put }) {
      const { data } = yield call(service.getTags, { ...payload, pagesize: 10 })
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
    *getContent({ payload }, { call, put }) {
      const { data } = yield call(service.getContent, { ...payload })
      if (data.isok) {
        yield put({ type: "saveContent", payload: { list: data.list, total: data.total } })
      } else {
        return message.error(data.msg)
      }
    },
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
