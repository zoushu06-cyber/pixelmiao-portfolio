import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';

/**
 * 路由骨架
 * /            首页（全屏叙事）—— 同步引入，保证首屏最快
 * /works       作品列表（数据为空时自动渲染占位）
 * /works/:slug 作品详情（模板已就绪）
 * /about       关于
 * /contact     联系
 * 除首页外的页面按路由懒加载，首包只留首屏真正要用的代码。
 */
const WorksPage = lazy(() => import('@/pages/WorksPage'));
const WorkDetailPage = lazy(() => import('@/pages/WorkDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
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
