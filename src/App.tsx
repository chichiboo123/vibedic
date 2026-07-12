import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ToastProvider } from './components/common/ToastProvider';
import { HomePage } from './pages/HomePage';
import { UIListPage } from './pages/UIListPage';
import { UIDetailPage } from './pages/UIDetailPage';
import { UXListPage } from './pages/UXListPage';
import { UXDetailPage } from './pages/UXDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ComparePage } from './pages/ComparePage';
import { SearchPage } from './pages/SearchPage';
import { SavedPage } from './pages/SavedPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ui" element={<UIListPage />} />
          <Route path="ui/:slug" element={<UIDetailPage />} />
          <Route path="ux" element={<UXListPage />} />
          <Route path="ux/:slug" element={<UXDetailPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
