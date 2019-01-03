import * as service from "../services/service"
export default {

  namespace: 'admin',

  state: {
    logoImg: ""
  },

  reducers: {
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
  },


  subscriptions: {},
};
