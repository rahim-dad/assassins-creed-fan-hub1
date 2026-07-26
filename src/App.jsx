import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Skeleton } from 'antd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AmbientBackground from './components/AmbientBackground';

const Home = lazy(() => import('./pages/Home'));
const Games = lazy(() => import('./pages/Games'));
const GameDetails = lazy(() => import('./pages/GameDetails'));
const Characters = lazy(() => import('./pages/Characters'));
const CharacterDetails = lazy(() => import('./pages/CharacterDetails'));
const Timeline = lazy(() => import('./pages/Timeline'));
const HistorySettings = lazy(() => import('./pages/HistorySettings'));
const Compare = lazy(() => import('./pages/Compare'));
const Favorites = lazy(() => import('./pages/Favorites'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageFallback = () => (
  <div className="container section">
    <Skeleton active paragraph={{ rows: 6 }} />
  </div>
);

function App() {
  return (
    <Layout style={{ background: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <AmbientBackground />
      <Navbar />
      <Layout.Content style={{ background: 'transparent' }}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetails />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/history" element={<HistorySettings />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout.Content>
      <Footer />
      <BackToTop />
    </Layout>
  );
}

export default App;
