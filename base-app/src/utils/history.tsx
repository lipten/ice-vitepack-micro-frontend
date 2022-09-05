import { createBrowserHistory } from 'history';
import { Route } from 'react-router-dom';

const BowserHistory = createBrowserHistory();
export default BowserHistory;

let cacheHistory;
export const resolveHistory = (History) => {
  cacheHistory = History;
};

const resultHistory = {};
// 使用history来路由跳转
export const router = new Proxy(resultHistory, {
  get(_target, property) {
    return cacheHistory[property];
  },
}) as typeof BowserHistory;

// 放在BrowserRouter里接收props.history
export const ResolveHistory = () => {
  return (
    <Route
      component={(props) => {
        resolveHistory(props.history);
        return <></>;
      }}
    />
  );
};
