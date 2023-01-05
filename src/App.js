import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './components/auth/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import NotFound404 from './components/pages/NotFound404'
import { ListsContextProvider } from './store/ListsContextProvider'

function App() {
  return (
    <ListsContextProvider>
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
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </AuthContextProvider>
    </ListsContextProvider>
  )
}

export default App
