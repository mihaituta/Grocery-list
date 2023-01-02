import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/Auth/Auth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <section>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </section>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
