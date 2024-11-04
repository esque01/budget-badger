import { Route, Routes, HashRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import CreateAccount from './pages/Account/CreateAccount';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<CreateAccount />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
