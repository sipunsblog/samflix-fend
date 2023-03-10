import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgetPw from './pages/ForgetPw';
import ResetPw from './pages/ResetPw';
import Validate from './Validate';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Streampage from './pages/Streampage';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Validate> <Home /> </Validate> } />
          <Route path='/home' element={ <Validate> <Home /> </Validate> } />
          <Route path='/register' element={ <Register/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetPW' element={<ForgetPw />} />
          <Route path='/resetPW' element={<ResetPw />} />
          <Route path='/play/:id' element={ <Validate>  <Streampage /> </Validate>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
