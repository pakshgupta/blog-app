import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Posts from './pages/Posts.jsx'
import WritePost from './pages/WritePost.jsx'
import SinglePost from './pages/SinglePost.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/all-blogs' element={<Posts/>}/>
        <Route path='/post/:id' element={<SinglePost/>}/>
        <Route path='/write' element={<WritePost/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>

      </Routes>
    </Router>
 
  )
}

export default App