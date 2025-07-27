import { Navbar } from './Navbar'
import React from 'react'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">{children}</main>
    </div>
  )
}