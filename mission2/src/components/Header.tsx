import { useTheme, THEME } from "../context/themeprovider";
import clsx from 'clsx'

function Header(){
  const {theme, toggleTheme} = useTheme()

  const isLightMode = theme === THEME.LIGHT;


  return(
    //<h1 className="todo-container__header">YONG TODO</h1>
    <>
      <button
        onClick={toggleTheme}
        className={clsx(
          'todo-container__header',
          isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
        )}
      >
        YONG TODO
      </button>
    </>
  )
}

export default Header