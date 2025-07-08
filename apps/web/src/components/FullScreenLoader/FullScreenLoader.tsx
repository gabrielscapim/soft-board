import { useState, useEffect } from 'react'
import { Progress } from '../ui/progress'

export function FullScreenLoader () {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (progress >= 100) return

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 5
        return newProgress > 100 ? 100 : newProgress
      })
    }, 150)

    return () => clearInterval(interval)
  }, [progress])

  return (
    <div className="min-h-svh w-screen flex items-center justify-center">
      <Progress value={progress} className="w-48" />
    </div>
  )
}
