import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-center gap-3 mb-6'>
      <NavLink to="/" style={({ isActive }) =>
          isActive ? { fontWeight: 'bold', color: 'green' } : {color: 'gray'}
        }>
        홈
      </NavLink>
            <NavLink to="/movies/popular" style={({ isActive }) =>
          isActive ? { fontWeight: 'bold', color: 'green' } : {color: 'gray'}
        }>
        인기 영화
      </NavLink>
            <NavLink to="/movies/now_playing" style={({ isActive }) =>
          isActive ? { fontWeight: 'bold', color: 'green' } : {color: 'gray'}
        }>
        상영 중
      </NavLink>
            <NavLink to="/movies/top_rated" style={({ isActive }) =>
          isActive ? { fontWeight: 'bold', color: 'green' } : {color: 'gray'}
        }>
        평점 높은
      </NavLink>
            <NavLink to="/movies/upcoming" style={({ isActive }) =>
          isActive ? { fontWeight: 'bold', color: 'green' } : {color: 'gray'}
        }>
        개봉 예정
      </NavLink>
    </nav>    
  );
};

export default Navbar;