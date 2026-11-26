import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import WorksPage from '@/pages/WorksPage';
import WorkDetailPage from '@/pages/WorkDetailPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';

/**
 * 路由骨架
 * /            首页（全屏叙事）
 * /works       作品列表（数据为空时自动渲染占位）
 * /works/:slug 作品详情（模板已就绪）
 * /about       关于
 * /contact     联系
 * 新增页面：在 src/pages 建文件，然后在这里加一行 Route 即可
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="works" element={<WorksPage />} />
          <Route path="works/:slug" element={<WorkDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
