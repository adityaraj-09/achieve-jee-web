import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/home';
import LoginPage from './pages/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/auth" element={<LoginPage/>} />
      

    </Routes>
  );
}

export default App;
