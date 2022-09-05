import { Model } from 'dva';

const model: Model = {
  namespace: 'count',
  state: 0,
  reducers: {
    add(count) {
      return count + 1;
    },
    minus(count) {
      return count - 1;
    },
  },
};

export default model;
