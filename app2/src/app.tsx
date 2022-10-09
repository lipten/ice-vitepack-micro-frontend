let mountModule;
export async function bootstrap() {
  console.log('bootstrap App2');
}

export async function mount(props) {
  mountModule = await import('./bootstrap');
  mountModule.render(props);
}

export async function unmount(props) {
  mountModule.destroy(props.container);
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 独立启动时调用获取环境变量
  import('./bootstrap').then((module) => {
    module.render();
  });
}
