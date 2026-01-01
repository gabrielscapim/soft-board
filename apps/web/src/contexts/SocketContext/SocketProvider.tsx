import { PropsWithChildren, useEffect, useRef } from 'react'
import { SocketContext } from './SocketContext'
import { io, Socket } from 'socket.io-client'
import { useAuthentication } from '../../hooks'
import { DEFAULT_API_BASE_URL } from '@/client'

export type SocketProviderProps = PropsWithChildren

export function SocketProvider (props: SocketProviderProps) {
  const socketRef = useRef<Socket | null>(null)

  const { authenticatedUser } = useAuthentication()

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(DEFAULT_API_BASE_URL, {
        withCredentials: true,
        autoConnect: false
      })
    }

    const socket = socketRef.current

    if (authenticatedUser) {
      if (!socket.connected) {
        socket.connect()
      }
    } else {
      if (socket.connected) {
        socket.disconnect()
      }
    }

    return () => {
      socket.disconnect()
    }
  }, [authenticatedUser])

  return (
    <SocketContext.Provider
      value={socketRef.current}
    >
      {props.children}
    </SocketContext.Provider>
  )
}
