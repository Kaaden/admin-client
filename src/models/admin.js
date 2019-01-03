import * as service from "../services/service"
import { message } from "antd";
import { routerRedux } from "dva/router"
export default {

  namespace: 'admin',

  state: {
    logoImg: "",
    auth: "",
  },

  reducers: {
    saveLogin(state, { payload }) {
      let auth = payload

      return { ...state, auth }
    },
    saveImg(state, { payload }) {
      return { ...state, logoImg: payload };
    },
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
    }
  },


  subscriptions: {
    setup({ dispatch, history, query }) {
      return history.listen(async ({ pathname, search, query }) => {
        // let auth = window.sessionStorage.getItem("auth")
      })
    },
  },
};
