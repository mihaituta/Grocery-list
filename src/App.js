import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './components/Auth/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
