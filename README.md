# PIXELMIAO · 作品集官网

参考小米官网的视觉语言搭建的全屏作品集官网框架：**大面积留白、超大字号、白 / 浅灰 / 深黑交替、极克制的橙色点睛、一屏一个主题**。作品内容暂时留空，版面已经排好，之后往数据层里填即可。

技术栈：Vite + React 19 + TypeScript + React Router 6 + 原生 CSS（无 UI 框架、无动效库依赖）。

## 启动

```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 本地预览生产构建
```

## 目录结构

```
src/
├── config/site.ts          # 全站文案、品牌、导航、联系方式 —— 改这里换内容
├── data/works.ts           # 作品数据（当前为空）+ 类型定义 —— 以后只填这里
├── hooks/                  # useInView / useScrollProgress
├── components/
│   ├── motion/             # 动效原语（见下方说明）
│   ├── layout/             # Header / Footer / Layout / ScrollProgress
│   ├── ui/                 # Section / Button / Marquee
│   └── works/              # WorkGrid / WorkCard / EmptyWorkSlot
├── pages/                  # 首页 / 作品 / 详情 / 关于 / 联系 / 404
├── styles/
│   ├── tokens.css          # 设计变量：配色、字号、间距、圆角（换肤只改这里）
│   ├── base.css            # reset + 排版工具类
│   ├── components.css      # 组件样式
│   └── pages.css           # 全屏区块样式
└── App.tsx                 # 路由表
```

## 怎么加作品（重点）

打开 `src/data/works.ts`，往 `works` 数组里加对象：

```ts
export const works: Work[] = [
  {
    slug: 'aurora-rebrand',              // 唯一，决定详情页地址 /works/aurora-rebrand
    title: 'AURORA 品牌焕新',
    en: 'AURORA REBRAND',
    category: '品牌视觉',
    year: '2027',
    client: 'AURORA',
    role: '视觉设计 / 动效',
    featured: true,                      // 出现在首页精选
    cover: '/images/aurora-cover.jpg',   // 图片放 public/images/，建议 16:10、2000px 宽
    accent: '#ff6900',
    summary: '一次关于光与秩序的品牌重塑。',
    content: [
      { heading: '背景', body: '……' },
      { heading: '方案', body: '……', image: '/images/aurora-01.jpg' }
    ],
    tags: ['品牌', 'VI', '动效']
  }
];
```

改动会自动生效在：首页精选、作品列表、分类筛选、详情页、页脚计数。**不需要改任何页面组件**。
作品不足时，网格会自动用「空位卡」补齐到 `PLACEHOLDER_COUNT` 个，不会出现空洞或错位。

## 怎么换品牌 / 文案

`src/config/site.ts` 集中了全部文字：品牌名、导航、首屏标题、统计数字、能力列表、理念、联系方式、页脚。改这一个文件即可，页面里没有写死的文案。

配色在 `src/styles/tokens.css`：

| 变量 | 用途 |
| --- | --- |
| `--accent` | 小米橙 `#ff6900`，全站点睛色 |
| `--ink` / `--paper` / `--white` | 深黑 / 浅灰 / 白三层底色 |
| `--fs-hero` / `--fs-display` | 超大标题字号（流式 clamp） |
| `--gutter` / `--section-y` | 留白尺度 |

## 页面与路由

| 路径 | 内容 |
| --- | --- |
| `/` | 6 个全屏区块：首屏 / 介绍+数据 / 精选作品 / 能力 / 理念 / CTA |
| `/works` | 全屏首屏 + 分类筛选 + 作品网格（空位占位）+ 底部引导 |
| `/works/:slug` | 作品详情模板：封面 / 元信息 / 内容分段 / 下一个项目；无数据时展示预留版式 |
| `/about` | 自述 / 工作原则 / 工具链 |
| `/contact` | 大字号 HELLO + 邮箱 + 社交 + 留言表单（前端演示，未接后端） |
| `*` | 404 |

新增页面：`src/pages/` 建文件 → `src/App.tsx` 加一行 `<Route>` → `src/config/site.ts` 的 `nav` 加一项。

## 动效说明

`src/components/motion/` 里的 `BlurText`、`Reveal`、`CountUp`、`ShinyText`、`SpotlightCard` 是参考本地
`D:/Downloads/react-bits-main`（React Bits，MIT）中同名组件效果做的**轻量重写**：保留逐字模糊入场、滚动淡入、数字滚动、扫光文字、鼠标跟随光晕的观感，去掉了 gsap / three / motion 等重型依赖，全部用 CSS 过渡 + IntersectionObserver + requestAnimationFrame 实现，构建体积更小、更可控。

如果以后想换成 React Bits 的完整版组件，直接替换 `src/components/motion/` 里的对应文件即可，页面调用方式保持一致。

表单目前只在前端做演示提交，接入真实后端时替换 `ContactPage.tsx` 的 `onSubmit` 即可。
