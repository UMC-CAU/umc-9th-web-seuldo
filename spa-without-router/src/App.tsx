import './App.css'

const HomePage = () => <h1>슬도 페이지</h1>;
const AboutPage = () => <p> 저는 UMC 9기 수강생 슬도입니다 </p>;
const ProjectsPage = () => <h1>프로젝트 페이지</h1>;
const ContactPage = () => <p>https://github.com/UMC-CAU/umc-9th-web-seuldo</p>
const NotFound = () => <h1>Not Found</h1>;

function NavBar(){
  return (
    <nav className='flex justify-center gap-5 border-b bg-gray-300 mb-5'>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/projects">Projects</a>
      <a href="/contact">Contact</a>
    </nav>
  )
}

function App() {
  const { pathname } = window.location;

  let Page;
  switch (pathname) {
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
      <NavBar/>
      {Page}
    </>
  )
  
}

export default App;
