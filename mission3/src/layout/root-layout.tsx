import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className='bg-black min-h-screen'>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;