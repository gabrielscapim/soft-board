import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

export type ContentEditableTextProps = {
  style?: React.CSSProperties
  className?: string
  text: string | null
  editable?: boolean
  visible?: boolean
  fullWidth?: boolean
  placeholder?: string
  inline?: boolean
  onBlur?: (text: string) => void
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  onTextChange?: (text: string) => void
}

export function ContentEditableText (props: ContentEditableTextProps) {
  const {
    style,
    className,
    editable = true,
    visible = true,
    text,
    onBlur,
    onClick,
    onTextChange,
    fullWidth = true,
    placeholder,
    inline = true
  } = props

  const [isEditing, setIsEditing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.innerText !== text) {
      ref.current.innerText = text || ''
    }
  }, [text])

  useEffect(() => {
    if (!editable) {
      setIsEditing(false)
    }
  }, [editable])

  const handleDoubleClick = () => {
    if (isEditing) return
    setIsEditing(editable)

    requestAnimationFrame(() => {
      if (ref.current) {
        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(ref.current)
        selection?.removeAllRanges()
        selection?.addRange(range)
        ref.current.focus()
      }
    })
  }

  const handleBlur = () => {
    setIsEditing(false)
    onBlur?.(ref.current?.innerText || '')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((inline || event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.currentTarget.blur()
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      event.currentTarget.blur()
      return
    }

    if (!event.metaKey) return
    if (event.key === 'i' || event.key === 'b' || event.key === 'u') {
      event.preventDefault()
    }
  }

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const newValue = (event.target as HTMLDivElement).innerText
    if (ref.current && !newValue) {
      ref.current.innerHTML = ''
    }
    onTextChange?.(newValue)
  }

  return (
    <div
      style={style}
      className={clsx(
        'block',
        isEditing ? 'cursor-text!' : 'cursor-default',
        visible ? 'inline-block' : 'hidden',
        fullWidth && 'w-full',
        className,
        'empty:before:opacity-40',
        'empty:before:content-[attr(data-placeholder)]'
      )}
      data-placeholder={placeholder}
      ref={ref}
      spellCheck={false}
      contentEditable={editable && isEditing}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onClick={onClick}
    />
  )
}
