
import { Allroutes } from './Allroutes';
import './App.css';
// import Fileload from './components/Fileload';
import { BrowserRouter } from 'react-router-dom';
// import Header from './components/Header';


function App() {
  return (
    <>
      <BrowserRouter>
        <Allroutes />
      </BrowserRouter>
    </>
  );
}

export default App;
