/**
 * 全站文案 / 品牌配置
 * ------------------------------------------------------------------
 * 换品牌、换名字、换文案、换联系方式，只改这一个文件即可。
 * 页面组件里不写死任何文案。
 */

export interface NavItem {
  label: string;
  en: string;
  to: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  en: string;
}

export interface CapabilityItem {
  no: string;
  title: string;
  en: string;
  desc: string;
  tags: string[];
}

/** 能力清单（收起态列表 + 展开态详情），对应即时设计「作品集-2027」15 个能力画板 */
export interface CapabilityDetail {
  /** CASE 编号 + 分类，如「CASE 01 / 品牌系统」 */
  eyebrow: string;
  /** 标题 —— 用户在设计稿里改好的原文，不改动 */
  title: string;
  /** 副标题，如「标志・规范・延展」 */
  sub: string;
  /** 描述段落 */
  desc: string;
  /** 三个能力标签 */
  tags: string[];
}

/**
 * 能力每屏对应的全屏大图（目前为占位视觉）。
 * 每一屏取 3 张，后续把这里换成真实项目截图路径即可，无需改组件。
 */
export const capabilitySlides = [
  '/images/capability-slides/slide-01.svg',
  '/images/capability-slides/slide-02.svg',
  '/images/capability-slides/slide-03.svg',
  '/images/capability-slides/slide-04.svg',
  '/images/capability-slides/slide-05.svg',
  '/images/capability-slides/slide-06.svg'
];

/** 指定屏的专属大图（键为 capabilityList 的下标）；未指定的屏使用通用图 */
export const capabilitySlideOverrides: Record<number, string[]> = {
  // CASE 01 / 产品包装设计：7 张茶叶包装实拍，顺序按用户给定 01 → 07
  // （三盒 / 四盒 / 芳原茶礼 / 茶语山岚 / 雪夜 / 花溪 / 月麓）
  0: [
    '/images/capability-slides/tea-package-01.webp',
    '/images/capability-slides/tea-package-02.webp',
    '/images/capability-slides/tea-package-03.webp',
    '/images/capability-slides/tea-package-04.webp',
    '/images/capability-slides/tea-package-05.webp',
    '/images/capability-slides/tea-package-06.webp',
    '/images/capability-slides/tea-package-07.webp'
  ],
  // CASE 02 / 3D 产品渲染：9 张镜头 / 灯具 / 设备渲染图，顺序按用户给定 01 → 09
  // （镜头+滤镜 / 白色设备群 / 蓝色投影 / 手持镜头 / 双镜头+光圈片 / 镜头组+相机 / 爆炸图 / 轨道灯 / 全系合影）
  1: [
    '/images/capability-slides/3d-render-01.webp',
    '/images/capability-slides/3d-render-02.webp',
    '/images/capability-slides/3d-render-03.webp',
    '/images/capability-slides/3d-render-04.webp',
    '/images/capability-slides/3d-render-05.webp',
    '/images/capability-slides/3d-render-06.webp',
    '/images/capability-slides/3d-render-07.webp',
    '/images/capability-slides/3d-render-08.webp',
    '/images/capability-slides/3d-render-09.webp'
  ],
  // CASE 03 / 企业画册、品牌手册：4 张画册样机实拍，顺序按用户给定 01 → 04
  // （防爆画册 2 张 + 产品选型画册 2 张）
  2: [
    '/images/capability-slides/brochure-01.webp',
    '/images/capability-slides/brochure-02.webp',
    '/images/capability-slides/brochure-03.webp',
    '/images/capability-slides/brochure-04.webp'
  ],
  // CASE 04 / 展会展览视觉设计：KEENYODA 展台三视图 + BESUN 广交会展厅四版
  3: [
    '/images/capability-slides/exhibition-01.webp',
    '/images/capability-slides/exhibition-02.webp',
    '/images/capability-slides/exhibition-03.webp',
    '/images/capability-slides/exhibition-04.webp',
    '/images/capability-slides/exhibition-05.webp'
  ],
  // CASE 05 / 品牌海报：6 张品牌海报，顺序按用户给定（海报 06 / 01 / 02 / 03 / 04 / 05）
  4: [
    '/images/capability-slides/brand-poster-01.webp',
    '/images/capability-slides/brand-poster-02.webp',
    '/images/capability-slides/brand-poster-03.webp',
    '/images/capability-slides/brand-poster-04.webp',
    '/images/capability-slides/brand-poster-05.webp',
    '/images/capability-slides/brand-poster-06.webp'
  ],
  // CASE 06 / 主题 KV 视觉：会议接待主视觉 3 版（深蓝金 / 红金 / 蓝白）
  5: [
    '/images/capability-slides/kv-01.webp',
    '/images/capability-slides/kv-02.webp',
    '/images/capability-slides/kv-03.webp'
  ],
  // CASE 07 / 字体设计：3 组字形提案（奔赴好时光 / 夏日终章 / 在野生活）
  6: [
    '/images/capability-slides/type-design-01.webp',
    '/images/capability-slides/type-design-02.webp',
    '/images/capability-slides/type-design-03.webp'
  ],
  // CASE 08 / 电商主图、商品详情页：3 张（接近开关详情页 2 组 + 主图三宫格）
  7: [
    '/images/capability-slides/ecommerce-01.webp',
    '/images/capability-slides/ecommerce-02.webp',
    '/images/capability-slides/ecommerce-03.webp'
  ],
  // CASE 09 / 网页视觉、易拉宝、名片等线下物料：6 张（网页 3 + 易拉宝 2 + 名片 1）
  8: [
    '/images/capability-slides/web-visual-01.webp',
    '/images/capability-slides/web-visual-02.webp',
    '/images/capability-slides/web-visual-03.webp',
    '/images/capability-slides/rollup-01.webp',
    '/images/capability-slides/rollup-02.webp',
    '/images/capability-slides/namecard-01.webp'
  ],
  // 图标屏（原 CASE 11）：首页关键图标 / 底部标签图标 / 其他图标三栏总览
  9: ['/images/capability-slides/icon-design-01.webp'],
  // 软件客户端界面设计屏：5 张（智慧家居中控 / CRM 数据看板 / 客户列表 / 环境监测平台 / 室内环境大屏）
  10: [
    '/images/capability-slides/client-ui-01.webp',
    '/images/capability-slides/client-ui-02.webp',
    '/images/capability-slides/client-ui-03.webp',
    '/images/capability-slides/client-ui-04.webp',
    '/images/capability-slides/client-ui-05.webp'
  ]
};

/**
 * 作品案例 · 品牌 VI 视觉系统展示
 * ------------------------------------------------------------------
 * 顶部信息下方依次接：标题栏（图1，2560×505）→ 12 张 VI 手册大图轮播。
 * 顺序严格按用户提供：光鹏装饰 01-04 → 精优达 封面/前言/目录/目录(1)-(5)。
 */
export const caseGallery = {
  /** 标题栏文案：与能力清单同一模板，由代码渲染（早期图片贴图 vi-title-bar.jpg 已弃用） */
  titleBarText: {
    eyebrow: '作品案例 / 平面落地',
    title: '品牌 VI 视觉系统',
    sub: '版式・印前・电商',
    desc: '图在屏幕上好看不算完，落到纸上不塌、上传到国际站不被压暗，才算做完。专色与烫印的位置、纸张的克重、详情页的阅读顺序，都在这一个环节里对齐。',
    tags: ['版式设计', '印前完稿', '1688 详情页']
  },
  images: [
    '/images/case-gallery/gp-vi-01.webp',
    '/images/case-gallery/gp-vi-02.webp',
    '/images/case-gallery/gp-vi-03.webp',
    '/images/case-gallery/gp-vi-04.webp',
    '/images/case-gallery/jy-vi-05-cover.webp',
    '/images/case-gallery/jy-vi-06-preface.webp',
    '/images/case-gallery/jy-vi-07-catalog.webp',
    '/images/case-gallery/jy-vi-08.webp',
    '/images/case-gallery/jy-vi-09.webp',
    '/images/case-gallery/jy-vi-10.webp',
    '/images/case-gallery/jy-vi-11.webp',
    '/images/case-gallery/jy-vi-12.webp'
  ]
};

export const site = {
  /** 品牌标识（导航与页脚） */
  brand: 'PIXELMIAO',
  brandCn: '像素喵',
  brandMark: 'P.',

  /** 浏览器标题 / SEO */
  title: 'PIXELMIAO — 数字设计作品集',
  description: '数字体验、品牌视觉与创意开发作品集。把想象，做成看得见的体验。',

  /** 版本号 / 年份，用于角标 */
  year: 2027,
  edition: 'PORTFOLIO 2027',

  nav: [
    { label: '首页', en: 'HOME', to: '/' },
    { label: '作品', en: 'WORKS', to: '/works' },
    { label: '关于', en: 'ABOUT', to: '/about' },
    { label: '联系', en: 'CONTACT', to: '/contact' }
  ] satisfies NavItem[],

  /**
   * 首屏 —— 数据取自即时设计「作品集-2017 / 首屏」画板（节点 114:8）
   * 画板 2560×1440，此处文案与配色按读取到的原生属性还原。
   */
  hero: {
    /** 左上姓名 + 身份（画板 114:16 / 114:17 / 114:19） */
    logo: '邹术',
    logoEn: 'Joe',
    discipline: '资深视觉设计师 / UI / UX',
    /** 右上经验（画板 114:21 / 114:22） */
    count: '8',
    countLabel: '年经验',
    /** 超大标题（画板 114:23）：字号 280 / 幼圆 / 描边 #F5F1EA 3px */
    lines: ['设计无界'],
    outlineFrom: 2,
    /** 说明（画板 114:25）：MiSans 26 / #8E887F / 行高 44 */
    sub: '探寻视觉语言的无限维度。将色彩、空间与动态化作叙事载体，让设计不止是视觉呈现，更是可被感知的艺术叙事。',
    /** 按钮（画板 114:27） */
    cta: '看精选项目',
    /** 底部四栏（画板 116:4 / 116:3 / 116:2 / 116:1） */
    columns: [
      { no: '01', label: '品牌视觉' },
      { no: '02', label: '营销物料' },
      { no: '03', label: '动态视觉' },
      { no: '04', label: 'UI界面' }
    ],
    /** 右侧 PORTRAIT 信息栏（画板 114:41 – 114:54） */
    portrait: {
      title: 'PORTRAIT',
      email: '3132891787@qq.com',
      city: '深圳',
      role: '资深视觉设计师',
      sign: 'ZOU SHU·JOE',
      works: 'SELECTED WORKS·2026',
      lang: '中/英',
      backToTop: '返回顶部'
    }
  },

  /**
   * 工作经历 —— 数据取自即时设计「作品集-2017 / 工作经历」画板（节点 121:1）
   * 浅色底 #F5F8F7，两列岗位卡片，每段含 时间/公司/职位/概述/明细/技能标签
   */
  experience: {
    eyebrow: '01 / 工作经历',
    range: '2018 — 2026',
    jobs: [
      {
        period: '2023.03 — 2026.11',
        role: '视觉设计 / 产品视觉负责人',
        company: '深圳市冰晟光电科技有限公司',
        summary: '对外视觉体系的主要产出者：从一本画册的结构、一套包装的印制，到展台的一面墙、一条 15 秒的片子，都由一个人跟到落地。',
        details: [
          '品牌与物料：VI 延展、包装结构与印前文件、企业画册版式、海报与 KV、专柜与展陈主视觉，累计交付 50+；从提案、打样到印刷输出独立跟完。',
          '数字与三维：C4D + Octane 与 KeyShot 建模渲染、电商主图与详情页排版；短片剪辑与动态视觉演示的合成输出。',
          '协同与效率：与产品、外贸、供应商对接中英文物料；用 AI 与 Codex 做内部效率工具，把重复的排版与校验交给脚本，客户满意度 95%。'
        ],
        tags: ['产品渲染', '场景布光', '画册与详情页', '动态演示', '动画短片', '结构剖视']
      },
      {
        period: '2018.09 — 2023.03',
        role: '平面设计师',
        company: '深圳市精优达科技有限公司',
        summary: '从平面执行做到独立主导品牌视觉，为传感器产品线建立网页、PC 客户端与移动端共用的一套视觉规则。',
        details: [
          '品牌视觉：主导品牌 VI 优化与官网视觉升级，确立「专业、简约、科技感」的基调，重排页面层级与图片体系，上线后曝光 +30%、停留 +25%。',
          '多端界面：网页、小程序、PC 客户端界面与数据图表；累计设计 200 + 平台图标，切图标注与研发还原跟进，还原率稳定在 95% 以上。',
          '版式规范：整理字体、配色、间距与组件的最小规范集，新增页面按同一套规则延展，减少反复改稿。'
        ],
        tags: ['VI 延展', '包装', '展会视觉', '中英文版式', '官网视觉', '界面规范', 'KV 主视觉', '展陈设计']
      }
    ]
  },

  /**
   * 作品案例 —— 数据取自即时设计「作品集-2017 / 作品案例」画板（节点 121:109）
   * 深色底 #070908；画板里就是「筛选标签 + 作品位」，作品内容留空待填。
   */
  caseStudies: {
    eyebrow: '02',
    title: '作品案例',
    desc: '企物云 15 个子系统、3400+ 屏原型；精优达官网改版前后、23 张设计与原型；冰晟光电的产品 3D 渲染 9 组；品牌物料 6 套节气海报与双语产品页。',
    sign: 'SELECTED WORKS 2026',
    /** 画板筛选标签（第二项同名是设计稿里的原文，保留） */
    filters: [
      { label: '全部', count: '09' },
      { label: '品牌视觉', count: '03' },
      { label: '品牌视觉', count: '03' },
      { label: 'UI 界面', count: '02' },
      { label: '动态视觉', count: '01' }
    ]
  },

  /**
   * 能力清单 —— 对应即时设计「作品集-2027」里作品案例下方的能力画板，共 15 屏（CASE 01 → 15）。
   * 品牌 VI 视觉系统是独立展示区，不占用 CASE 序号。
   * 标题为用户在设计稿中改好的原文；eyebrow / 副标题 / 描述 / 标签均为重写文案。
   */
  capabilityList: [
    {
      eyebrow: 'CASE 01 / 包装落地',
      title: '产品包装设计',
      sub: '结构・材质・印前',
      desc: '包装不止是好看，更要在货架上站得住、在运输中护得住。从盒型结构、材质工艺到印前完稿，兼顾设计感与量产可行性，让每一个面都有该出现的信息。',
      tags: ['盒型结构', '材质工艺', '印前完稿']
    },
    {
      eyebrow: 'CASE 02 / 产品视觉',
      title: '3D 产品渲染',
      sub: '建模・布光・质感',
      desc: '用三维把产品最真实也最理想的一面呈现出来。从建模、材质到布光与后期，还原结构、交代质感，让画面在没有实物的场合也能说服人。',
      tags: ['三维建模', '场景布光', '材质表现']
    },
    {
      eyebrow: 'CASE 03 / 印刷物',
      title: '企业画册、品牌手册',
      sub: '网格・层级・阅读',
      desc: '用网格建立秩序，用层级引导阅读。把大量信息组织成可翻阅的节奏，让画册既讲得清公司，也经得起反复翻看；从版式到纸张、装订全程跟到成品。',
      tags: ['版式系统', '信息编排', '印刷跟进']
    },
    {
      eyebrow: 'CASE 04 / 空间视觉',
      title: '展会展览视觉设计',
      sub: '导视・物料・动线',
      desc: '把品牌从平面延伸到真实空间。围绕人的走动路线安排主视觉与信息节点，让展台在复杂环境里依然清晰、有记忆点，并成套落地物料。',
      tags: ['展陈视觉', '导视系统', '空间物料']
    },
    {
      eyebrow: 'CASE 05 / 主视觉',
      title: '品牌海报',
      sub: '概念・构图・传播',
      desc: '为一次传播找到能被记住的画面。从主题概念到构图、字体与色彩，提炼出一句视觉上的核心表达，再延展成海报、主图与系列物料。',
      tags: ['海报设计', '构图层级', '系列延展']
    },
    {
      eyebrow: 'CASE 06 / 主视觉',
      title: '主题 KV 视觉',
      sub: '标题・氛围・成套',
      desc: '会议、接待、节点活动的第一眼画面。用一句有分量的标题字撑住场面，再用背景光影、城市剪影与落款信息把层级排清楚；同一套版式换色换字，就能延展成整场现场物料。',
      tags: ['主题画面', '氛围光影', '成套延展']
    },
    {
      eyebrow: 'CASE 07 / 字形',
      title: '字体设计',
      sub: '笔形・字重・气质',
      desc: '为品牌设计专属的字形气质。调整笔画、重心与字重，让标题一眼可辨，同时保证在小字号和多语言场景下依旧清晰、统一。',
      tags: ['字形设计', '字重系统', '多语言适配']
    },
    {
      eyebrow: 'CASE 08 / 电商视觉',
      title: '电商主图、商品详情页',
      sub: '卖点・转化・规范',
      desc: '在有限的首屏里讲清产品为什么值得买。用主图抓住注意力，用详情页铺陈卖点与参数，遵循平台规范的同时保持品牌的一致性。',
      tags: ['电商主图', '详情排版', '卖点提炼']
    },
    {
      eyebrow: 'CASE 09 / 多媒介',
      title: '网页视觉、易拉宝、名片等线下物料',
      sub: '屏幕・纸张・一致',
      desc: '同一套语言跨越屏幕与纸张。网页讲究交互与适配，物料讲究材质与印刷，在两种媒介里维持一致的色彩、字体与气质。',
      tags: ['网页视觉', '线下物料', '跨媒介一致']
    },
    {
      eyebrow: 'CASE 11 / 图标',
      title: '功能图标、系统图标设计',
      sub: '语义・网格・统一',
      desc: '用小图形承担大信息量。以统一的网格、线宽与圆角建立规则，让数百枚图标成套、易识别，在不同尺寸下都保持清晰。',
      tags: ['功能图标', '图标规范', '网格系统']
    },
    {
      eyebrow: 'CASE 10 / 桌面端',
      title: '软件客户端界面设计',
      sub: '组件・流程・效率',
      desc: '面向长时间、高频使用的桌面软件，把复杂功能收进清晰的界面秩序。用组件和流程规范降低学习成本，让工具顺手而不是炫目。',
      tags: ['客户端界面', '组件规范', '操作效率']
    },
    {
      eyebrow: 'CASE 13 / 数据',
      title: '数据可视化图表设计',
      sub: '图表・仪表・可读',
      desc: '让数据自己说话。按数据关系选择合适的图表形式，用颜色、层级与标注突出重点，把复杂的系统状态压缩成一眼可读的界面。',
      tags: ['图表设计', '数据大屏', '信息层级']
    },
    {
      eyebrow: 'CASE 14 / 影像',
      title: '短视频剪辑、产品宣传片',
      sub: '分镜・节奏・成片',
      desc: '用镜头和节奏讲一个关于产品的短故事。从分镜、拍摄到剪辑、调色与合成，把功能点变成可被记住的画面与节拍。',
      tags: ['分镜脚本', '剪辑调色', '成片输出']
    },
    {
      eyebrow: 'CASE 15 / 动态',
      title: '动态演示、动效视觉、MG 演示动画',
      sub: '动效・演示・叙事',
      desc: '让复杂的机制随着时间被看懂。用 MG 动画、演示动效与节奏叙事，把抽象的流程转化成看得见的动态表达。',
      tags: ['MG 动画', '演示动效', '动态叙事']
    }
  ] satisfies CapabilityDetail[],

  intro: {
    eyebrow: '03 / 关于这个作品集',
    title: ['少一点修饰，', '多一点', '真正被记住的东西。'],
    body:
      '这里收录品牌、产品与交互相关的实践。每个项目都从问题出发，用清晰的视觉秩序和恰好的动效，把复杂的东西讲简单。作品正在陆续整理上架，先请随便逛逛。',
    stats: [
      { value: 8, suffix: '+', label: '年设计与开发经验', en: 'YEARS IN PRACTICE' },
      { value: 36, suffix: '', label: '个已上线项目', en: 'SHIPPED PROJECTS' },
      { value: 12, suffix: '', label: '个长期合作品牌', en: 'BRAND PARTNERS' }
    ] satisfies StatItem[]
  },

  works: {
    eyebrow: '04 / 精选作品',
    title: 'SELECTED\nWORKS',
    cn: '精选作品',
    desc: '作品位已就位，内容正在整理中。每一个空位，都留给下一个值得讲的项目。',
    notice: '作品正在整理中 · COMING SOON'
  },

  capabilities: {
    eyebrow: '05 / 能做什么',
    title: 'WHAT I DO',
    cn: '能力范围',
    items: [
      {
        no: '01',
        title: '品牌与视觉识别',
        en: 'BRAND & IDENTITY',
        desc: '从标志、字体到整套视觉语言，建立一致且能被记住的品牌气质。',
        tags: ['品牌策略', 'VI 系统', '视觉规范']
      },
      {
        no: '02',
        title: '数字产品体验',
        en: 'DIGITAL PRODUCT',
        desc: '官网、小程序与后台系统，把信息层级、交互与美感收进同一套秩序。',
        tags: ['Web / App', '设计系统', '用户体验']
      },
      {
        no: '03',
        title: '动效与交互',
        en: 'MOTION & INTERACTION',
        desc: '用克制的动态叙事引导视线，让界面有节奏，而不是有噪音。',
        tags: ['交互动效', '滚动叙事', '3D / 粒子']
      },
      {
        no: '04',
        title: '创意开发',
        en: 'CREATIVE DEVELOPMENT',
        desc: '从设计稿到可上线代码，把视觉细节一比一还原到真实浏览器里。',
        tags: ['React', 'WebGL', '前端工程']
      }
    ] satisfies CapabilityItem[]
  },

  manifesto: {
    eyebrow: '06 / 一点坚持',
    quote: ['好设计不喧哗，', '它只是让一切', '刚刚好。'],
    sign: '— PIXELMIAO DESIGN PRINCIPLE'
  },

  contact: {
    eyebrow: '07 / 开始合作',
    title: ['有个想法？', '一起把它', '做出来。'],
    desc: '项目合作、设计咨询，或者只是想打个招呼，都欢迎来信。',
    email: 'hello@pixelmiao.com',
    ctaLabel: '写封邮件',
    availability: '目前可接受新项目 · 2027 Q4',
    links: [
      { label: 'Behance', url: 'https://www.behance.net/' },
      { label: 'Dribbble', url: 'https://dribbble.com/' },
      { label: 'GitHub', url: 'https://github.com/' },
      { label: '微信公众号', url: '#' }
    ]
  },

  about: {
    eyebrow: '关于 / ABOUT',
    title: ['在设计与', '代码之间。'],
    lead: '我相信好看和好用从来不是两件事。',
    paragraphs: [
      '工作方式很简单：先弄清问题，再决定形式。不为了炫技加动效，不为了填满页面加内容。',
      '从品牌视觉到前端实现，尽量把整条链路握在手里，这样最终落在用户眼前的，才和设计稿里想的是同一个东西。',
      '这个网站本身就是一块自留地：结构先行，内容慢慢长。空着的作品位，是留给未来的。'
    ],
    principles: [
      { no: '01', title: '清晰优先', desc: '信息层级先于装饰，先让人看懂，再让人喜欢。' },
      { no: '02', title: '克制动效', desc: '动效负责引导与反馈，不负责抢戏。' },
      { no: '03', title: '细节到底', desc: '从字距到过渡曲线，最后一公里才算完成。' },
      { no: '04', title: '持续迭代', desc: '上线不是终点，好用是慢慢磨出来的。' }
    ],
    toolkit: ['Figma', 'React', 'TypeScript', 'WebGL / Three.js', 'After Effects', 'Blender', 'Vite']
  },

  footer: {
    slogan: 'MAKE SOMETHING\nWORTH REMEMBERING.',
    copyright: '© 2027 PIXELMIAO. ALL RIGHTS RESERVED.',
    note: 'Designed & built with care.'
  }
};
