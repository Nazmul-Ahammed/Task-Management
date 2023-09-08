import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom/dist';
import Register from './Component/registration/registration';
import Login from './Component/login/login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
