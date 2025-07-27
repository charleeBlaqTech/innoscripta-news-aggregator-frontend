// import { Navbar } from './Navbar'
// import React from 'react'

// export const Layout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="min-h-screen bg-blue-50">
//       <Navbar />
//       <main className="py-8 px-4">{children}</main>
//     </div>
//   )
// }

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