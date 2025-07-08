import { Client } from '@/client'
import { createContext } from 'react'

export const ClientContext = createContext<Client>(new Client())
