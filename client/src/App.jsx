import './App.css';
import Navabr from './Pages/Navabr';
import ContextPage, { userContext } from './Context/ContextPage';
import Home from './Pages/Home';
import About from './Pages/About';
import Menu from './Pages/Menu';
import { useContext } from 'react';

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
    <div className={`${theme ? 'bg-gray-900' : 'bg-purple-100/10'}`}>
      <Navabr />
      <Home />
      <About />
      <Menu />
    </div>
  );
}

export default App;
