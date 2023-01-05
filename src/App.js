import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './components/auth/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import NotFound404 from './components/pages/NotFound404'
import ListsProvider from './store/ListsProvider'

function App() {
  return (
    <AuthContextProvider>
      <ListsProvider>
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
      </ListsProvider>
    </AuthContextProvider>
  )
}

export default App
