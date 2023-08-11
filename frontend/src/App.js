import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmailVerification from './pages/EmailVerification';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import HomeContents from './components/home/HomeContents';
import ReceiveExpenses from './components/home/ReceiveExpenses';
import Settings from './components/home/Settings';

const App = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Home />}>
        <Route path='/' element={<HomeContents />} />
        <Route path='/expense/to-receive' element={<ReceiveExpenses />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
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
