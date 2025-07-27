
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

