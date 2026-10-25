# ZHBOWiki

Minecraft 服务端插件文档站。一个仓库承载首页、插件仓库与插件详情页。

**在线站点：<https://zhaobuobuo114.github.io/>**

## 启动

```bash
npm install
npm run dev        # http://127.0.0.1:5199
npm run build:site # 输出 dist-site/，用于本地预览
npm run preview
```

## 发布

推送到 `main` 后由 GitHub Actions 自动构建并部署，不需要本地提交构建产物，也不需要 Token。

```bash
git push origin main
```

- Pages 发布源：GitHub Actions
- 工作流：[.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- 手动重跑：仓库 Actions 页面选择 “Deploy GitHub Pages” → Run workflow

## 父子页面

- `/` 首页
- `/plugins` 插件仓库（父级）
- `/plugins/<slug>` 插件详情（子级）
- 其他地址 → 站内 404

`npm run build:site` 会为 `src/siteMap.js` 中登记的每个路由生成独立 `index.html` 与 `404.html`，直接访问、刷新、分享都返回 200。

- 新增顶级页面：在 `src/App.jsx` 加路由，并在 `src/siteMap.js` 的 `STATIC_ROUTES` 登记
- 新增插件：只改 `src/data/plugins.js`，详情页入口会自动生成

## 结构

```text
src/
├─ App.jsx
├─ siteMap.js
├─ pages/          Landing / Plugins / PluginDetail / NotFound
├─ components/     SiteHeader / RepoCard / LangSwap / Splash / BackgroundFX / Controls / Logo
├─ hooks/          useLiquidLight / useGlassHover
├─ data/plugins.js
├─ i18n/index.js
├─ index.css
└─ store.jsx
scripts/gen-pages.mjs
.github/workflows/deploy.yml
```

## 调试参数

- `?static=1`：跳过开场动画与动效
- `?splashstatic=1`：开场定格在结束态
- `?lang=zh|en`：强制语言