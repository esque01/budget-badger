import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import CreateAccount from './pages/Account/CreateAccount';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/Landing/LandingPage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <AuthProvider>
              <Routes>
                  <Route path='/' element={<Login />}></Route>
                  <Route path='/signup' element={<CreateAccount />}></Route>
                  <Route path='/landing' element={<LandingPage />}></Route>
              </Routes>
            </AuthProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
