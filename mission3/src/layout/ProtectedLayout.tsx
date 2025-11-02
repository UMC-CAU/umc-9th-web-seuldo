import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar';
 
const ProtectedLayout = () => {
    const{accessToken} = useAuth()
    if(!accessToken){
        return <Navigate to={"/login"} replace/>
    }

    return (
        <>
        <Navbar />
        <div className='bg-black min-h-screen'>
            <Outlet />
        </div>
        </>
    );
};

export default ProtectedLayout;