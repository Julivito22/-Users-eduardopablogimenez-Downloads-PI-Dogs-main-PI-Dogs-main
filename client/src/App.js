import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './componentes/LandingPage';
import HomePage from './componentes/HomePage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/home" element={<HomePage/>} />
        
      </Routes>
    </div>
    </BrowserRouter>
  );
}


export default App;
