/**
 * 作品数据层 —— 整个网站唯一需要「填内容」的地方
 * ------------------------------------------------------------------
 * 往 works 里加对象，列表页 / 首页精选 / 首页案例卡 / 详情页会自动出内容。
 * 数据结构对应即时设计「作品集-2027」画板：
 *   showcase         -> 作品案例卡片（画板 121:109 卡片区）
 *   detail.intro     -> 二级页面1 项目介绍（画板 126:1）
 *   detail.cases     -> 二级页面2 项目案例总览（画板 127:29）
 *   detail.content   -> 二级页面3 详细内容（画板 127:73）
 */

export type WorkCategory = '品牌视觉' | '数字产品' | '动效交互' | '创意开发' | '空间影像';

export interface WorkSection {
  heading: string;
  body: string;
  image?: string;
}

/** 一项「数字 + 说明」，如 200+ / 图标 */
export interface WorkStat {
  value: string;
  label: string;
}

/** 首页作品案例卡片（预览图 + 右侧信息 + 两处跳转入口） */
export interface WorkShowcase {
  /** 左侧预览图 */
  preview: string;
  title: string;
  date: string;
  desc: string;
  tags: string[];
  stats: WorkStat[];
  live: { text: string; url: string };
  /** 底部「系统详情：… →」链接文字 */
  detailText: string;
}

/** 详情页 · 项目介绍段的三段编号说明 */
export interface WorkChapter {
  no: string;
  kicker: string;
  title: string;
  body: string;
}

/** 详情页 · 项目案例总览卡片 */
export interface WorkCaseCard {
  category: string;
  title: string;
  desc: string;
  /** 可选封面图，未提供时沿用占位渐变 */
  cover?: string;
  /** 点击该卡片时联动到底部缩略条展示的原型图 */
  prototypes?: Array<{ label: string; image: string }>;
  prototypeNote?: string;
}

/** 详情页 · 模块地图中的一个模块 */
export interface WorkModule {
  no: string;
  title: string;
  desc: string;
}

/** 详情页 · 详细内容段 */
export interface WorkDetailContent {
  /** 顶部「还有」标签 */
  more: Array<{ title: string; desc: string }>;
  mapTitle: string;
  modules: WorkModule[];
  /** 底部原型缩略卡：label 为下方文字，image 为原型截图 */
  prototypes: Array<{ label: string; image?: string }>;
  prototypeNote: string;
  backLabel: string;
}

/** 详情页完整内容（三段视图） */
export interface WorkDetail {
  /** 顶栏左侧标题（画板 126:2） */
  topbar: string;
  /** 顶栏右侧切换提示（画板 126:6） */
  topbarHint: string;
  eyebrow: string;
  title: string;
  desc: string;
  stats: WorkStat[];
  chapters: WorkChapter[];
  cases: WorkCaseCard[];
  content: WorkDetailContent;
}

export interface Work {
  /** URL 标识：/works/:slug，必须唯一 */
  slug: string;
  title: string;
  en?: string;
  category: WorkCategory;
  year: string;
  client?: string;
  role?: string;
  /** 是否出现在首页精选 */
  featured?: boolean;
  /** 卡片主题色，用于占位渐变与详情页氛围 */
  accent?: string;
  summary?: string;
  cover?: string;
  content?: WorkSection[];
  tags?: string[];
  externalUrl?: string;
  /** 首页作品案例卡片 */
  showcase?: WorkShowcase;
  /** 三段式详情页内容 */
  detail?: WorkDetail;
}

/** 作品列表 —— 数据驱动，新增作品只需往这里加对象 */
export const works: Work[] = [
  {
    slug: 'qiwuyun',
    title: '企物云・智能化综合平台全案视觉',
    en: 'QIWU-PaaS',
    category: '数字产品',
    year: '2023',
    client: '深圳市企物云科技有限公司',
    role: '项目视觉负责人 / UI 规范 / 原型',
    featured: true,
    accent: '#2f6df6',
    cover: '/images/qiwuyun-preview.webp',
    summary: '把一套界面规范复用到 15 个子系统：监测大屏、PC 后台、小程序与官网。',
    tags: ['B 端 UI', '设计规范', '数据可视化', '多端一致'],

    /* ---- 首页作品案例卡片（画板 121:109） ---- */
    showcase: {
      preview: '/images/qiwuyun-showcase.webp',
      title: '企物云・智能化综合平台全案视觉',
      date: '2022.10 — 2023.02',
      desc: '智慧井盖、大气网格监测与智慧能源管理一体化平台，覆盖多端小程序、管理系统与官网。制定统一 UI 视觉规范，独立完成首页、功能页与数据可视化页面设计。',
      tags: ['B 端 UI', '设计规范', '多端一致'],
      stats: [
        { value: '200+', label: '图标' },
        { value: '98%', label: '视觉还原' },
        { value: '3端', label: '小程序 / 管理 / 官网' }
      ],
      live: { text: '已上线・qiwuiot.com ↗', url: 'https://qiwuiot.com' },
      detailText: '系统详情：大气网格・许可证・CRM 与自动化测试・可视化 →'
    },

    /* ---- 三段式详情页 ---- */
    detail: {
      /* 二级页面1 · 项目介绍（画板 126:1） */
      topbar: 'QIWU-PaaS・智能化综合平台全案视觉',
      topbarHint: '← → 切换・Esc 退出',
      eyebrow: '案例・平台全案 / 数据可视化',
      title: '企物云・智能化综合平台',
      desc: '从一个城市的大气网格起步，把同一套界面规范复用到 15 个子系统：监测大屏、PC 后台、小程序与官网，长成同一个品牌的同一副面孔。',
      stats: [
        { value: '15', label: '子系统' },
        { value: '3400+', label: '原型导出图' },
        { value: '7人/3个月', label: '单系统研发投入' },
        { value: '99.9%', label: '可用率验收指标' }
      ],
      chapters: [
        {
          no: '01',
          kicker: '要解决的问题',
          title: '监测要铺到街道，责任要落到人',
          body: '大气污染防治既是环保，也是民生。只有把监测点位铺到区县、街道、社区一级，做到监测无空白，污染来源才说得清；也只有把考核下沉到网格与责任人，数据才会真的被用起来。原来的设备数据、报表与处置流程散在几处，缺一个能同时装下监测、研判与执法的系统。'
        },
        {
          no: '02',
          kicker: '怎么搭',
          title: '先用「网格」立骨架，再排每一屏',
          body: '把城市拆成「市 → 区县 → 街道 → 社区 → 站点 → 设备 → 因子」的层级，所有页面围绕这套层级组织筛选与下钻：大屏看全局，地图看落点，报表看趋势，工单看处置。七个模块共用同一套导航、筛选器、图表与表格规范，研发按一份需求文档对齐，避免各页各说一套。'
        },
        {
          no: '03',
          kicker: '交付了什么',
          title: '从文档到原型，一套能直接开发的方案',
          body: '以产品经理身份编制需求文档、立项申请书与技术方案三份文件，同步输出功能列表与关键原型。系统按《环境信息》系列标准（HJ 718—729）设计，验收指标为可用率 99.9%、单次请求响应 900ms 内，功能覆盖主要竞品的 90% 以上。这套骨架随后被 15 个子系统反复借用。'
        }
      ],

      /* 二级页面2 · 项目案例总览（画板 127:29） */
      cases: [
        {
          category: '市政设施',
          title: '智慧井盖监测系统',
          desc: '井盖状态、报警与工单',
          cover: '/images/qiwuyun/manhole/cover.webp',
          prototypes: [
            { label: '实时数据', image: '/images/qiwuyun/manhole/01.webp' },
            { label: '设备总览', image: '/images/qiwuyun/manhole/02.webp' },
            { label: '设备管理', image: '/images/qiwuyun/manhole/03.webp' },
            { label: '工单管理', image: '/images/qiwuyun/manhole/04.webp' },
            { label: '报警配置', image: '/images/qiwuyun/manhole/05.webp' },
            { label: '报警配置・添加', image: '/images/qiwuyun/manhole/06.webp' },
            { label: '操作日志', image: '/images/qiwuyun/manhole/07.webp' },
            { label: '角色权限', image: '/images/qiwuyun/manhole/08.webp' },
            { label: '许可证管理', image: '/images/qiwuyun/manhole/09.webp' },
            { label: '部门管理', image: '/images/qiwuyun/manhole/10.webp' }
          ],
          prototypeNote: '界面原型・10 张，点击卡片切换系统，缩略条可左右拖动'
        },
        {
          category: '环境监测',
          title: '大气网格监测系统',
          desc: '实况一览、监测排行与数据补录',
          cover: '/images/qiwuyun/airgrid/cover.webp',
          prototypes: [
            { label: '全局地图', image: '/images/qiwuyun/airgrid/map.webp' },
            { label: '字典管理', image: '/images/qiwuyun/airgrid/dict.webp' },
            { label: '帮助文档', image: '/images/qiwuyun/airgrid/help.webp' },
            { label: '常见问题', image: '/images/qiwuyun/airgrid/faq.webp' },
            { label: '报警配置', image: '/images/qiwuyun/airgrid/alarm-config.webp' },
            { label: '数据分析', image: '/images/qiwuyun/airgrid/analytics.webp' },
            { label: '日常巡查计划', image: '/images/qiwuyun/airgrid/patrol-plan.webp' },
            { label: '气象条件分布', image: '/images/qiwuyun/airgrid/weather.webp' },
            { label: '污染过程分析', image: '/images/qiwuyun/airgrid/pollution.webp' },
            { label: '登录', image: '/images/qiwuyun/airgrid/login.webp' },
            { label: '站点人员权限', image: '/images/qiwuyun/airgrid/permissions.webp' },
            { label: '设备管理', image: '/images/qiwuyun/airgrid/devices.webp' },
            { label: '部门管理', image: '/images/qiwuyun/airgrid/departments.webp' }
          ],
          prototypeNote: '界面原型・13 张，点击卡片切换系统，缩略条可左右拖动'
        },
        { category: '能源管理', title: '能源监测系统', desc: '水、电、冷、热、蒸汽计量' },
        {
          category: '市政设施',
          title: '消防栓水压监测系统',
          desc: '水压、网关与区域分组',
          cover: '/images/qiwuyun/hydrant/cover.webp',
          prototypes: [
            { label: '区域分组', image: '/images/qiwuyun/hydrant/groups.webp' },
            { label: '成员管理', image: '/images/qiwuyun/hydrant/members.webp' },
            { label: '报警记录', image: '/images/qiwuyun/hydrant/alarm-log.webp' },
            { label: '报警配置', image: '/images/qiwuyun/hydrant/alarm-config.webp' },
            { label: '数据查询', image: '/images/qiwuyun/hydrant/data-query.webp' },
            { label: '添加', image: '/images/qiwuyun/hydrant/add.webp' },
            { label: '激活码', image: '/images/qiwuyun/hydrant/license-key.webp' },
            { label: '网关列表', image: '/images/qiwuyun/hydrant/gateways.webp' },
            { label: '角色管理', image: '/images/qiwuyun/hydrant/roles.webp' },
            { label: '许可证管理', image: '/images/qiwuyun/hydrant/licenses.webp' }
          ],
          prototypeNote: '界面原型・10 张，点击卡片切换系统，缩略条可左右拖动'
        },
        { category: '平台系统', title: '后台管理系统', desc: '设备类型、OTA 与备份恢复' },
        { category: '企业服务', title: '企业生态系统', desc: '平台提供讨论论坛' }
      ],

      /* 二级页面3 · 详细内容（画板 127:73）—— 逐字对齐设计稿节点 */
      content: {
        /* 顶部「还有」6 枚胶囊，两行排列（4 + 2），文字来自节点 131:1~131:17 */
        more: [
          { title: '反馈系统', desc: '意见反馈与常见问题' },
          { title: '消防栓水压监测系统', desc: '水压、网关与区域分组' },
          { title: '能源管理系统', desc: '水、电、冷、热、蒸汽计量' },
          { title: '后台管理系统', desc: '设备类型、OTA 与备份恢复' },
          { title: '企物生态系统', desc: '平台建设路线讨论稿' },
          { title: '通用智能化管理系统', desc: '通用版演示' }
        ],
        mapTitle: '模块地图・大气网格',
        modules: [
          { no: '01', title: '环境监测', desc: '实况一览、监测排行、数据查询与补遗' },
          { no: '02', title: '数据分析', desc: '均值 / 多站 / AQI / VOC 报表，同比环比' },
          { no: '03', title: '研判评估', desc: '污染过程、气象条件、目标达成分析' },
          { no: '04', title: '在线预警', desc: '城市整体情况、报警查询与统计' },
          { no: '05', title: '污染管控', desc: '污染源企业、巡查任务与网格考核' },
          { no: '06', title: '设备运维', desc: '运维计划、工单、日历与故障处置' },
          { no: '07', title: '系统管理', desc: '网格 / 站点 / 权限 / 报警配置' }
        ],
        prototypes: [
          { label: '实时数据', image: '/images/qiwuyun/manhole/01.webp' },
          { label: '设备总览', image: '/images/qiwuyun/manhole/02.webp' },
          { label: '设备管理', image: '/images/qiwuyun/manhole/03.webp' },
          { label: '工单管理', image: '/images/qiwuyun/manhole/04.webp' },
          { label: '报警配置', image: '/images/qiwuyun/manhole/05.webp' },
          { label: '报警配置・添加', image: '/images/qiwuyun/manhole/06.webp' },
          { label: '操作日志', image: '/images/qiwuyun/manhole/07.webp' },
          { label: '角色权限', image: '/images/qiwuyun/manhole/08.webp' },
          { label: '许可证管理', image: '/images/qiwuyun/manhole/09.webp' },
          { label: '部门管理', image: '/images/qiwuyun/manhole/10.webp' }
        ],
        prototypeNote: '界面原型・10 张，缩略条可左右拖动',
        backLabel: '返回项目列表 ↑'
      }
    }
  }
];

/** 首页 / 列表页展示的空位数量（作品不足时自动补齐） */
export const PLACEHOLDER_COUNT = 6;

/** 筛选分类，新增作品时按需扩展 */
export const workCategories: Array<'全部' | WorkCategory> = [
  '全部',
  '品牌视觉',
  '数字产品',
  '动效交互',
  '创意开发',
  '空间影像'
];

export const featuredWorks = (): Work[] =>
  works.filter(w => w.featured).length ? works.filter(w => w.featured) : works.slice(0, 4);

export const findWork = (slug?: string): Work | undefined => works.find(w => w.slug === slug);

/** 详情页「下一个项目」 */
export const nextWork = (slug?: string): Work | undefined => {
  if (!works.length) return undefined;
  const i = works.findIndex(w => w.slug === slug);
  return works[(i + 1 + works.length) % works.length];
};
