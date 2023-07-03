import { useState } from 'react'
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import { Routes, Route } from 'react-router-dom';
import ContextProvider from './ContextProvider';

function App() {

  return (
    <ContextProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
      </Routes>
    </ContextProvider>
  )
}

export default App
