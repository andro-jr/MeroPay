import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgetPassword from './pages/Signup';
import ResetPassword from './pages/Signup';
import EmailVerification from './pages/EmailVerification';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth/sign-in' element={<Login />} />
      <Route path='/auth/signup' element={<Signup />} />
      <Route path='/auth/about' element={<About />} />
      <Route path='/auth/forget-password' element={<ForgetPassword />} />
      <Route path='/auth/reset-password' element={<ResetPassword />} />
      <Route path='/auth/OtpVerification' element={<EmailVerification />} />
    </Routes>
  );
};

export default App;
