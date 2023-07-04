import { useState } from 'react'
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import { Routes, Route } from 'react-router-dom';
import ContextProvider from './ContextProvider';
import AuthGuard from './guards/AuthGuard';
import Home from './pages/Home';

function App() {

  return (
    <ContextProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>}></Route>
      </Routes>
    </ContextProvider>
  )
}

export default App
