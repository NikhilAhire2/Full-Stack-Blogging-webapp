
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProtectedRoute = ({children}) => {
  const { user } = useSelector(store => store.auth)

  if (!user) {
   
 // fire toast
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default ProtectedRoute
