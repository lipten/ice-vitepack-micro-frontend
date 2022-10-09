import React, { createElement } from 'react';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { Link } from 'ice';
import { renderRoutes } from 'react-router-config';
import { asideMenuConfig } from './menuConfig';
import microStart from '../../microConfig';
import { useMount } from 'ahooks';

const loopMenuItem = (menus) =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: createElement(icon),
    children: children && loopMenuItem(children),
  }));

export default function BasicLayout(props) {
  const { location } = props;
  useMount(() => {
    // 容器挂载后再启动微前端
    microStart();
  });
  return (
    <ProLayout
      title="icejs & antd"
      style={{
        minHeight: '100vh',
      }}
      location={{
        pathname: location.pathname,
      }}
      menuDataRender={() => loopMenuItem(asideMenuConfig)}
      menuItemRender={(item, defaultDom) => {
        if (!item.path) {
          return defaultDom;
        }
        return <Link to={item.path}>{defaultDom}</Link>;
      }}
    >
      <div style={{ minHeight: '60vh' }} id="container">
        {/* {renderRoutes(route.routes)} */}
      </div>
    </ProLayout>
  );
};
