# Tools & Guides — 维护说明

这是实验室工具操作指南的站点源码。线上地址（发布后）：

**https://VV1111.github.io/guidance/**

技术栈：[VitePress](https://vitepress.dev)（Markdown → 静态网页），GitHub Actions 自动构建，GitHub Pages 托管。
你只需要改 Markdown 文件；推送到 `main` 后 1–2 分钟自动上线。

```
guidance/
├─ docs/                      ← 站点内容（只需要关心这个目录）
│  ├─ index.md                ← 首页：工具列表
│  ├─ mocha/                  ← 每个工具一个文件夹，一页一个 .md
│  ├─ dicom2nifti/index.md
│  ├─ itksnap-dls/index.md
│  ├─ public/images/<tool>/   ← 截图（png / jpg）
│  └─ .vitepress/config.mts   ← 导航栏、侧边栏、视频地址前缀
├─ source-pdf/                ← 原来的 PDF 记录（存档用，不会发布）
├─ .github/workflows/deploy.yml  ← 自动构建发布
└─ README.md                  ← 本文件
```

---

## 一、首次发布（只做一次）

1. 在 GitHub 新建仓库：https://github.com/new
   仓库名 **guidance**，Public，不要勾选任何初始化文件。
2. 在本机终端推送：

   ```bash
   cd ~/research/guidance
   git remote add origin git@github.com:VV1111/guidance.git
   git push -u origin main
   ```

3. 打开仓库 **Settings → Pages**，在 *Build and deployment* 里把 **Source** 改为 **GitHub Actions**。
4. 到仓库的 **Actions** 标签页等 "Deploy site" 跑完（约 1 分钟），访问 https://VV1111.github.io/guidance/ 。

> 如果以后改了仓库名，同步修改 `docs/.vitepress/config.mts` 顶部的 `REPO`。

---

## 二、日常修改内容（三种方式）

**方式 1：直接在网页上改（最简单，不需要本机环境）**

- 打开线上任意一页，拉到底部点 **Edit this page on GitHub** → 进入 GitHub 的在线编辑器。
- 修改 Markdown，右上角 **Commit changes…** → 提交到 `main`。
- 1–2 分钟后自动上线。
- 上传截图：在 GitHub 仓库里进入 `docs/public/images/<tool>/`，点 **Add file → Upload files** 拖进去。

**方式 2：在线 VS Code**

- 在仓库页面按键盘 `.`（句号），会打开 github.dev，可以多文件编辑、拖拽上传图片，左侧 Source Control 提交。

**方式 3：本机预览后再提交**

```bash
cd ~/research/guidance
npm install        # 只需第一次
npm run dev        # 打开 http://localhost:5173/guidance/ 实时预览
git add -A && git commit -m "update mocha guide" && git push
```

---

## 三、写作规范（保持每页风格一致）

每个操作单元的固定结构：**一句目的 → 编号步骤 → 视频 → 补充提示**。

```md
## 在 3D 中新建中心线

::: steps
1. 设为 **New**。
2. 打开 **3D → Add Points**。
3. 在 3D 视图中沿血管点击。
4. 关闭 **Add Points**，段落即创建完成。
:::

<StepVideo src="mocha-3d-create.mp4" title="Create a centerline in 3D" />

::: tip 提示
补充说明放这里。
:::
```

- `::: steps` … `:::` 包住一个有序列表，会渲染成带圆圈数字和连线的步骤。步骤里可以放截图、子列表、代码块（缩进 3 个空格）。
- `::: tip 标题`、`::: warning 标题`、`::: info` 是提示框。
- 截图：`![说明文字](/images/mocha/xxx.png)`，下一行用 `*斜体*` 写图注。
- UI 元素用 **粗体**，按键用 `` `Ctrl` + `Z` ``，文件名/路径用 `` `反引号` ``。
- 新增一页：在工具文件夹新建 `.md`，然后在 `config.mts` 的 `sidebar` 里加一行。
- 新增一个工具：新建文件夹 + `index.md`，在 `config.mts` 的 `nav` 和 `sidebar` 各加一项，再在 `docs/index.md` 首页加一段。

---

## 四、视频：录制、压缩、上传

### 4.1 存放在哪（为什么不是放进仓库）

| 方案 | 费用 | 单文件上限 | 上传方式 | 说明 |
| --- | --- | --- | --- | --- |
| **GitHub Release（默认，已配置）** | 免费 | 2 GB | 网页拖拽 | 不占仓库体积，GitHub CDN 分发。本站默认方案 |
| Cloudflare R2 | 10 GB 内免费，流量免费 | 300 MB（网页上传） | 网页拖拽 | 视频总量超过几 GB、或想要更快加载时换它，只需改 `config.mts` 里的 `VIDEO_BASE` |
| YouTube（unlisted） | 免费 | — | 网页上传 | 播放体验最好，但中国大陆无法访问。组件已支持直接粘贴 YouTube 链接 |
| 放进 git 仓库 | — | 100 MB | — | **不推荐**：仓库会越来越大，Pages 总量限 1 GB |

### 4.2 上传到 GitHub Release（默认方案）

1. 第一次：仓库页面 → **Releases → Create a new release**，Tag 填 `videos`，标题随意（如 *Videos*），点 **Publish release**。
2. 以后每次：**Releases → videos → Edit release**，把 `.mp4` 拖到 *Attach binaries* 区域，点 **Update release**。
3. 在 Markdown 里只写文件名：

   ```md
   <StepVideo src="mocha-3d-create.mp4" title="Create a centerline in 3D" />
   ```

   完整地址会自动拼成 `https://github.com/VV1111/guidance/releases/download/videos/mocha-3d-create.mp4`。
4. 替换视频：先在 Release 页删掉旧文件，再上传同名新文件，Markdown 不用改。

文件命名建议：`<工具>-<页面>-<动作>.mp4`，全小写、用连字符，例如 `mocha-2d-anchor-insert.mp4`、`d2n-mode-a-batch.mp4`、`dls-connect.mp4`。

`<StepVideo>` 的 `src` 也可以是：
- 完整 URL（任何能直接访问的 mp4，或 YouTube 链接）；
- `/videos/xxx.mp4`（放在 `docs/public/videos/` 里的小文件，一般不建议）。

### 4.3 录制

- 每段视频对应**一个操作单元**，控制在 20 秒 – 2 分钟；长流程拆成几段。
- 录前把窗口调到 1920×1080 或 1600×900，关掉无关窗口；录制时鼠标动作慢一点，关键按钮前停顿半秒。
- macOS：`Cmd` + `Shift` + `5` → 录制选定区域；或 OBS。
- Windows：`Win` + `G`（Xbox Game Bar）；或 OBS。
- 不需要配音；需要说明的地方用文字步骤写清楚即可。

### 4.4 压缩（上传前必做）

屏幕录像压缩率很高，1 分钟通常只有 2–6 MB。

**HandBrake（图形界面）**：打开文件 → Preset 选 *Web → Vimeo YouTube 720p30* 或 *1080p30* → Start。

**ffmpeg（命令行，`brew install ffmpeg`）**：

```bash
ffmpeg -i input.mov -vf "scale=-2:1080,fps=30" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -an output.mp4
```

- `-crf 26`：数值越大文件越小（24–30 都可以）。
- `-an`：去掉音轨；有配音就删掉这个参数。
- `-movflags +faststart`：让视频在网页里边下边播，**必须保留**。

---

## 五、可选升级

- **可视化后台（所见即所得编辑 + 在线上传）**：可以给站点加 [Sveltia CMS](https://github.com/sveltia/sveltia-cms)（Decap CMS 的现代替代），在 `/admin/` 提供图形化编辑界面，提交直接写回 GitHub。需要额外创建一个 GitHub OAuth App 和一个 Cloudflare Worker 做登录中转，大约 15 分钟。网页编辑（方式 1）已经能覆盖绝大部分需求，建议先用一段时间再决定。
- **自定义域名**：Settings → Pages → Custom domain 填域名，并把 `config.mts` 的 `base` 改为 `'/'`。
- **中文版页面**：VitePress 支持多语言；需要时在 `docs/zh/` 下放中文 Markdown 并在 `config.mts` 配置 `locales`。
