import React from 'react';
// import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Error } from './error/Error';
import { Header } from './header/Header';
import { Test } from '../components/test/Test';
import { Login } from '../feature/login/Login';
import { NewPassword } from '../feature/password_recovery/NewPassword';
import { PasswordRecovery } from '../feature/password_recovery/Password_recovery';
import { Profile } from '../feature/profile/Profile';
import { Registration } from '../feature/registration/Registration';

export const App = (): any => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={'/*'} element={<Error />} />
        <Route path="/password" element={<PasswordRecovery />} />
        <Route path="/entered" element={<NewPassword />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};
