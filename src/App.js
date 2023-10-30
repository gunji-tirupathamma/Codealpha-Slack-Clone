import React from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chat/Chat';
import Login from './components/LoginPage/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import { useStateValue } from './components/StateProvider/StateProvider';


function App() {

  const[{user},dispatch]=useStateValue()

  return (
    <div className='app'>
      <Router>
        {!user? 
        (
          <Login />
        ):(
          <>
            <Header />
            <div className='app-body'>
                <Sidebar /> 
                <Routes>
                    <Route path="/room/:roomId" element={<Chat />}/>
                    
                    <Route path="/" element={<h1>Welcome</h1>} />
                </Routes>
            </div>
          </>
        )}
      </Router>  
    </div>
  )
}

export default App
