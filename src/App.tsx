import { Route, Routes, HashRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
