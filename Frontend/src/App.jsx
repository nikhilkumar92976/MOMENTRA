import LandingPage from './pages/LandingPage'
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount';
import LearnMore from './pages/LearnMore';

function App() {

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<CreateAccount/>}/>
      <Route path='/learmore' element={<LearnMore/>}/>


      {/* Example protected route */}
      {/* 
      <Route path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/> 
      */}
    </Routes>
  )
}

export default App
