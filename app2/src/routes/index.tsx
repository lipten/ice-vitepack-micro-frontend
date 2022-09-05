import { lazy, ReactNode } from 'react';
import { Redirect, RedirectProps } from 'react-router-dom';

export interface IRouteConfig {
  // 路由路径
  path?: string;
  // 路由组件
  component?: any;
  exact?: boolean;
  // 路由信息
  title?: string;
  icon?: string;
  render?: () => JSX.Element;
  routes?: IRouteConfig[];
}

const layouts: IRouteConfig[] = [
  {
    component: lazy(() => {
      if (window.__POWERED_BY_QIANKUN__) {
        return import(/* webpackChunkName: 'basicLayout' */ '@/layouts/microBasicLayout');
      }
      return import(/* webpackChunkName: 'basicLayout' */ '@/layouts/BasicLayout');
    }),
    // exact: true,
    routes: [
      {
        path: '/dashboard',
        exact: true,
        component: lazy(() => import(/* webpackChunkName: 'dashboard' */ '@/pages/Dashboard')),
      },
    ],
  },
];
console.log(layouts);
export default layouts;
