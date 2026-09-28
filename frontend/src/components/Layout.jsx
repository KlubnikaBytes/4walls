import Header from './Header';
import Footer from './Footer';
import ConsultationModal from './ConsultationModal';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ConsultationModal />
    </>
  );
}
