import { Client } from '@/client'
import { PropsWithChildren } from 'react'
import { ClientContext } from './ClientContext'

export type ClientProviderProps = PropsWithChildren<{
  client: Client
}>

export function ClientProvider (props: ClientProviderProps) {
  const { client, children } = props

  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  )
}
