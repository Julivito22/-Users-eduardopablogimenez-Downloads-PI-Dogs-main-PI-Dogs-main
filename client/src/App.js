import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './componentes/LandingPage';
import HomePage from './componentes/HomePage';
import DetailPage from './componentes/DetailPage';
import FormPage from './componentes/FormPage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route exact path="/home/:id" element={<DetailPage/>} />
        <Route path="/dogs" element={<FormPage />} />
        
      </Routes>
    </div>
    </BrowserRouter>
  );
}


export default App;
