import LandingPage from './pages/LandingPage'
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount';
import LearnMore from './pages/LearnMore';
import HomePage from './pages/HomePage'

function App() {

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <PublicRoute>
          <LandingPage />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/signup" element={
        <PublicRoute>
          <CreateAccount />
        </PublicRoute>
      } />
      <Route path='/learmore' element={<LearnMore/>}/>

      {/* Protected routes */}
      <Route path='/home' element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
