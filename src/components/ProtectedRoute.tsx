import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'
import React from 'react'


export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const token = useAppSelector(state => state.auth.token)

  if (!token) {
    return <Navigate to="/auth" replace />
  }

  return children
}
