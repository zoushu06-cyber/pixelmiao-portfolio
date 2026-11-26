/**
 * MiSans 字体子集化（双层）
 * ------------------------------------------------------------------
 * 原始 OTF 每个 6.2MB，三个字重共 18.7MB，是首屏最大的传输负担。
 *
 * 这里输出两套子集：
 *   1) MiSans-{w}-subset.woff2 —— 只含「站点源码里实际出现的字符」+ ASCII + 常用标点，
 *      作为主字体（家族名 MiSans）。首屏通常只下载这三个小文件。
 *   2) MiSans-{w}-full.woff2   —— 站点字符 + GB2312 一级常用汉字（3755 字），
 *      作为罕用字兜底（家族名 MiSans-Fallback）。只有主字体缺字时浏览器才会下载它。
 *
 * 两层叠在 font-family 里：'MiSans', 'MiSans-Fallback', 系统字体。
 * 两者字形完全一致（同一字体的不同子集），所以混排不会有视觉差异。
 *
 * 用法：npm run fonts:subset
 * 注意：新增文案后重跑本脚本，新字会进入 subset；若新字不在 GB2312 一级内，
 *      仍会回退到系统字体（可看作安全网，不会出现豆腐块）。
 */
import fs from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
/** 原始 OTF 放在构建目录之外，避免被打包进 public */
const SRC_FONT_DIR = path.join(ROOT, 'assets/fonts-src');
const OUT_DIR = path.join(ROOT, 'public/fonts');

/** 递归收集源码文件 */
function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (/\.(tsx?|jsx?|css|html|json)$/.test(entry.name)) acc.push(p);
  }
  return acc;
}

/** GB2312 一级汉字（3755 个常用字，覆盖日常用字 99% 以上） */
function gb2312Level1() {
  let out = '';
  for (let hi = 0xb0; hi <= 0xd7; hi++) {
    for (let lo = 0xa1; lo <= 0xf9; lo++) {
      try {
        out += new TextDecoder('gb18030').decode(new Uint8Array([hi, lo]));
      } catch {}
    }
  }
  return out;
}

/** 常用全角标点与符号 */
const PUNCT = '　、。，．·；：？！…—～｜「」『』【】〔〕（）《》〈〉“”‘’％＋－×÷＝￥＃＠＆＊／＼＾＿｀｛｝［］　№℃±';
/** ASCII 可打印区 */
const ASCII = Array.from({ length: 95 }, (_, i) => String.fromCharCode(0x20 + i)).join('');
/**
 * 源码里以转义形式出现、扫描不到字面的字符（扫描源码只会拿到 "\u00A0" 这段文本）。
 * 这些必须显式补上，否则浏览器会去下兜底字体。
 */
const EXTRA = [
  '\u00A0', // 不换行空格（BlurText 用它替代普通空格）
  '\u2007', '\u202F', // 数字空格 / 窄不换行空格
  '\u200B', '\u200C', '\u200D', '\uFEFF', // 零宽字符
  '\u00B7', '\u2022', '\u25CF', '\u25CB', // 间隔号 / 圆点
  '\u2013', '\u2014', '\u2015', '\u2212', // 各种破折号与减号
  '\u2018', '\u2019', '\u201C', '\u201D', // 弯引号
  '\u00A9', '\u00AE', '\u2122', // © ® ™
  '\u00B0', '\u2032', '\u2033', // 度 分 秒
  '\u2190', '\u2191', '\u2192', '\u2193', // 箭头
  '\u00D7', '\u00F7', '\u2264', '\u2265' // × ÷ ≤ ≥
].join('');

/** 站点实际用到的字符 */
const siteChars = new Set();
for (const file of walk(SRC_DIR)) {
  for (const ch of fs.readFileSync(file, 'utf8')) siteChars.add(ch);
}

const clean = str => [...new Set(str)].filter(ch => ch.codePointAt(0) >= 0x20 || ch === '\t').join('');

const baseText = clean([...siteChars, ...ASCII, ...PUNCT, ...EXTRA].join(''));
const fullText = clean(baseText + gb2312Level1());

const weights = [
  ['MiSans-Light.otf', 'MiSans-Light'],
  ['MiSans-Regular.otf', 'MiSans-Regular'],
  ['MiSans-Medium.otf', 'MiSans-Medium']
];

const fmt = n => `${(n / 1024).toFixed(0)} KB`;
let totalIn = 0;
let totalBase = 0;
let totalFull = 0;

for (const [src, base] of weights) {
  const input = fs.readFileSync(path.join(SRC_FONT_DIR, src));

  const subset = await subsetFont(input, baseText, { targetFormat: 'woff2' });
  fs.writeFileSync(path.join(OUT_DIR, `${base}-subset.woff2`), subset);

  const full = await subsetFont(input, fullText, { targetFormat: 'woff2' });
  fs.writeFileSync(path.join(OUT_DIR, `${base}-full.woff2`), full);

  totalIn += input.length;
  totalBase += subset.length;
  totalFull += full.length;
  console.log(
    `${base.padEnd(16)} 原始 ${fmt(input.length).padStart(9)} → 主 ${fmt(subset.length).padStart(7)} / 兜底 ${fmt(full.length).padStart(7)}`
  );
}

console.log(`\n站点字符 ${siteChars.size} 个 | 主字体字符 ${[...baseText].length} 个 | 兜底字符 ${[...fullText].length} 个`);
console.log(`原始合计 ${fmt(totalIn)}`);
console.log(`首屏只下主字体：${fmt(totalBase)}（-${(100 - (totalBase / totalIn) * 100).toFixed(1)}%）`);
console.log(`触发兜底时才会额外下载：${fmt(totalFull)}`);
