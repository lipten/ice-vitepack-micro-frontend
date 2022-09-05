export const importAssetsPath = (path: string) => {
  return window.IS_VITE ? new URL(`../../../src/assets/${path}`, import.meta.url).href : require(`../assets/${path}`);
};
