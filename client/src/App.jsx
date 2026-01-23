import './App.css';
import Navabr from './Pages/Navabr';
import ContextPage, { userContext } from './Context/ContextPage';
import Home from './Pages/Home';
import About from './Pages/About';
import Menu from './Pages/Menu';
import { useContext } from 'react';
import Work from './Pages/Work';
import Skils from './Pages/Skils';
import Contact from './Pages/Contact';
import Project from './Pages/Project';

function App() {
  return (
    <ContextPage>
      <MainApp />
    </ContextPage>
  );
}

function MainApp() {
  const { theme} = useContext(userContext);

  return (
    <div className={`${theme ? 'bg-gray-950' : 'bg-purple-100/10'}`}>
      <Navabr />
      
      <Home />
      <div className="z-10 relative">
      <About />
      <Work/>
      <Skils/>
      <Project/>
      <Contact/>
      <Menu />
      </div>
    </div>
  );
}

export default App;
