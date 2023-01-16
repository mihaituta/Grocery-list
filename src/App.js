import Home from './components/Pages/Home'
import Register from './components/Pages/Register'
import Login from './components/Pages/Login'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './components/Auth/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import NotFound404 from './components/Pages/NotFound404'
import { ListsContextProvider } from './store/ListsContextProvider'
import List from './components/Pages/List'

function App() {
  return (
    <ListsContextProvider>
      <AuthContextProvider>
        <Routes>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route
            exact
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/list/:urlId'
            element={
              <ProtectedRoute>
                <List />
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
