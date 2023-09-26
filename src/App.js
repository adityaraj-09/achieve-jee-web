import logo from './logo.svg';
import './App.css';
import { Route, Routes,Navigate } from "react-router-dom";
import HomePage from './pages/home';
import LoginPage from './pages/login';
import Quesionpage from './pages/quesionpage';
import ProtectedRoute from './components/protectedroute';

function App() {
  const isAuthenticated=localStorage.getItem("jwtToken")===null
  const ProtectedRoute=({children})=>{
    if(isAuthenticated){
        return <Navigate to="/login"/>
        
    }
    return children;
}
  return (
    <Routes>

     <Route path="/">
                <Route index element={<HomePage/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path="q"  element={<Quesionpage/>}/>
            </Route>
      
      

    </Routes>
  );
}

export default App;
