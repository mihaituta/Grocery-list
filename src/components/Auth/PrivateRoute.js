import React, { useContext } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { AuthContext } from './Auth'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? <RouteComponent {...routeProps} /> : navigate('/login')
      }
    />
  )
}

export default PrivateRoute
