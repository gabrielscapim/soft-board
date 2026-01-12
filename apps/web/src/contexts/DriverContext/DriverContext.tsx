import { Driver } from 'driver.js'
import { createContext } from 'react'

export const DriverContext = createContext<Driver | null>(null)
