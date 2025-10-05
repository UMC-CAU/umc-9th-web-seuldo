import './App.css'
import { useState } from 'react';

const HomePage = () => <h1>슬도 페이지</h1>;
const AboutPage = () => <p> 저는 UMC 9기 수강생 슬도입니다 </p>;
const ProjectsPage = () => <h1>프로젝트 페이지</h1>;
const ContactPage = () => <p>https://github.com/UMC-CAU/umc-9th-web-seuldo</p>
const NotFound = () => <h1>Not Found</h1>;

function NavBar({setPath}){
  return (
    <nav className='flex justify-center gap-5 border-b bg-gray-300 mb-5'>
      <a href="/"
        onClick={(e) => {
        e.preventDefault()
        window.history.pushState({}, '', '/')
        setPath('/')
        }}
      >Home</a>
      <a href="/about"
        onClick={(e) => {
        e.preventDefault()
        window.history.pushState({}, '', '/about')
        setPath('/about')
        }}
      >About</a>
      <a href="/projects"
        onClick={(e) => {
        e.preventDefault()
        window.history.pushState({}, '', '/projects')
        setPath('/projects')
        }}
      >Projects</a>
      <a href="/contact"
        onClick={(e) => {
        e.preventDefault()
        window.history.pushState({}, '', '/contact')
        setPath('/contact')
        }}
      >Contact</a>
    </nav>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  let Page;
  switch (path) {
    case '/':
      Page = <HomePage />;
      break;
    case '/about':
      Page = <AboutPage />;
      break;
    case '/projects':
      Page = <ProjectsPage />;
      break;
    case '/contact':
      Page = <ContactPage />;
      break;
    default:
      Page = <NotFound />;
  }

  return (
    <>
      <NavBar setPath={setPath}/>
      {Page}
    </>
  )
  
}

export default App;
