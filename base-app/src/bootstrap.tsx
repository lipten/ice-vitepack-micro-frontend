import React, { Suspense, StrictMode } from 'react';
import { Spin } from 'antd';
import './global.less';

import { renderRoutes } from 'react-router-config';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import routes from '@/routes';
import { ResolveHistory } from '@/utils/history';
import { APP_MODE } from 'ice';
import dva from 'dva';
import createLoading from 'dva-loading';
import models from '@/models';
import { createBrowserHistory } from 'history';

window.IS_VITE = APP_MODE === 'vite';
console.log('baseapp: ', React.version)
const app = dva({
  history: createBrowserHistory(),
});
app.use(createLoading());

models.forEach((model) => {
  app.model(model);
});

app.router(() => (
  <StrictMode>
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <BrowserRouter>
        <ResolveHistory />
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        {renderRoutes(routes)}
      </BrowserRouter>
    </Suspense>
  </StrictMode>
));
app.start('#root');

// 像umi一样设置全局变量
if (!window.g_app) {
  window.g_app = app;
}

