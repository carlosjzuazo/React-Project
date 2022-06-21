import React from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './page_paths/HomePage'
import { LoginPage } from './page_paths/LoginPage'
import { UserPage } from './page_paths/UserPage'
import { PostPage } from './page_paths/PostPage'
import { NotFoundPage } from './page_paths/NotFoundPage'
import { RegistrationPage } from './page_paths/RegistrationPage'

function App () {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <div className="App">
        <p>Hola, me llamo Carlos.</p>
      </div>
      <Footer />
    </main>
  )
}

export default App
