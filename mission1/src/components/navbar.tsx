import { NavLink } from 'react-router-dom';

const renderNavbar = (to : string, label :string) => (
  <NavLink to={to} style={({ isActive }) =>
    isActive ? { fontWeight: 'bold', color: 'green' } : {color: 'gray'}
  }> {label} </NavLink>
)

const Navbar = () => {
  return (
    <nav className='flex justify-center gap-3 mb-6'>
      {renderNavbar('/', '홈')}
      {renderNavbar('/movies/popular', '인기 영화')}
      {renderNavbar('/movies/now_playing', '상영 중')}
      {renderNavbar('/movies/top_rated', '평점 높은')}
      {renderNavbar('/movies/upcoming', '개봉 예정')}
    </nav>    
  );
};

export default Navbar;