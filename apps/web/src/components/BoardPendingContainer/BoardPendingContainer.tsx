import { useBoard, useTeam } from '@/hooks'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import { SquareMousePointer } from 'lucide-react'
import { Spinner } from '../ui/spinner'

const messagesByStep: Record<'wireflows' | 'review' | string, string[]> = {
  wireflows: [
    'The board is generating your wireflows...',
    'Please hold on while we fetch your wireflows...',
    'Your wireflows are being prepared...'
  ],
  review: [
    'The board is generating your review...',
    'Please hold on while we fetch your review...',
    'Your review is being prepared...'
  ]
}

export function BoardPendingContainer () {
  const { team } = useTeam()
  const { board } = useBoard()

  const message = useRotatingMessages(messagesByStep[board?.step ?? 'wireflows'])

  return (
    <div className="min-h-svh w-screen flex flex-col gap-6 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Spinner variant="ring" size="32" />
        <span className="animate-pulse font-medium text-md">
          {message}
        </span>
      </div>
      <Button asChild variant="outline">
        <Link to={`/${team?.slug}/boards`}>
          <SquareMousePointer />
          Back to Boards
        </Link>
      </Button>
    </div>
  )
}

function useRotatingMessages (messages: string[], interval = 3000) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, interval)

    return () => clearInterval(id)
  }, [messages, interval])

  return messages[index]
}
