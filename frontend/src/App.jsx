import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import ManiCasadona from './pages/ManiCasadona';
import Ecospace from './pages/Ecospace';
import Properties from './pages/Properties';
import Services from './pages/Services';
import Interior from './pages/Interior';
import Investment from './pages/Investment';
import KnowledgeCentre from './pages/KnowledgeCentre';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import ManageSpace from './pages/ManageSpace';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="services" element={<Services />} />
          <Route path="interior" element={<Interior />} />
          <Route path="investment" element={<Investment />} />
          <Route path="knowledge" element={<KnowledgeCentre />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="mani-casadona" element={<ManiCasadona />} />
          <Route path="ecospace" element={<Ecospace />} />
          <Route path="manage-space" element={<ManageSpace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
