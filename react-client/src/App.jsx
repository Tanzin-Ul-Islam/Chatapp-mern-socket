import { useState } from 'react'
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import { Routes, Route } from 'react-router-dom';
import ContextProvider from './ContextProvider';
import AuthGuard from './guards/AuthGuard';
import Home from './pages/Home';
import Test from './pages/Test/Test';
function App() {

  return (
    <ContextProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>}></Route>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/test" element={<Test/>}></Route> */}
      </Routes>
    </ContextProvider>
  )
}

export default App
