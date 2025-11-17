import { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import AddItem from "./components/AddItem";
import './App.css'

function App() {

   const { user } = useAuthStore();
  

  return (
    <>
      <Register />
      {/* <Login /> */}
      {user ? <AddItem /> : <p className="text-center mt-10">Please log in to add items.</p>}
    </>
  )
}

export default App
