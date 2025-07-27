// import { useEffect } from 'react'

// export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
//   useEffect(() => {
//     const timeout = setTimeout(() => onClose(), 3000)
//     return () => clearTimeout(timeout)
//   }, [])

//   return (
//     <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md animate-fade-in">
//       {message}
//     </div>
//   )
// }

import { useEffect } from 'react'

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(() => onClose(), 3000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="toast">
      {message}
    </div>
  )
}

