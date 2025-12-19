import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowUpIcon } from 'lucide-react'
import { useState } from 'react'

export type ChatContainerInputProps = {
  loading?: boolean
  onSendMessage?: (content: string) => void
}

export function ChatContainerInput (props: ChatContainerInputProps) {
  const { loading, onSendMessage } = props

  const [content, setContent] = useState('')

  const handleSendMessage = () => {
    onSendMessage?.(content.trim())
    setContent('')
  }

  return (
    <form className="border-t-1 flex flex-row items-center max-h-64">
      <Textarea
        placeholder="Talk with your board..."
        className="shadow-none flex-1 resize-none bg-transparent placeholder:text-muted-foreground h-full outline-none border-none p-3 focus-visible:border-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 rounded-none rounded-b-xl"
        value={content}
        onKeyDown={event => {
          if (event.key === 'Enter' && !event.shiftKey && !loading && content.trim()) {
            event.preventDefault()
            handleSendMessage()
          }
        }}
        onChange={event => setContent(event.target.value)}
      />
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="size-9 mx-4"
        disabled={loading || !content.trim()}
        onClick={() => {
          if (!loading && content.trim()) {
            handleSendMessage()
          }
        }}
      >
        <ArrowUpIcon />
      </Button>
    </form>
  )
}
