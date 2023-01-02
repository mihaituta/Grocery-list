import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../Auth/Auth'

const Home = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/register')
        console.log('Signed out successfully')
      })
      .catch((error) => {
        // An error happened.
      })
  }

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser) {
      return navigate('/login')
    }
  }, [currentUser, navigate])

  return (
    <>
      <nav>
        <p>Welcome Home</p>

        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </>
  )
}

export default Home
