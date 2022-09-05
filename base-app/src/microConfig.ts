import { registerMicroApps, start } from 'qiankun';


registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:6011',
    container: '#container',
    activeRule: '/home',
  },
  {
    name: 'app2',
    entry: '//localhost:6012',
    container: '#container',
    activeRule: '/dashboard',
  },
]);
// 启动 qiankun
export default start;