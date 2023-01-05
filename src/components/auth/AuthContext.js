import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { fbAuth, fbDB, setDoc, doc } from '../../store/firebase'
import ListsContext from '../../store/ListsContextProvider'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const listsCtx = useContext(ListsContext)

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(fbAuth, email, password)
      .then((res) => {
        if (res) {
          const userId = fbAuth.currentUser.uid
          try {
            setDoc(doc(fbDB, 'users', userId), {
              email: email,
            })
          } catch (err) {
            console.error('Error creating account: ', err)
          }
        }
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email already in use')
        }
      })
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(fbAuth, email, password)
  }

  const logout = () => {
    return signOut(fbAuth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (currentUser) => {
      setUser(currentUser)
      listsCtx.getLists()
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ createUser, user, logout, login }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
