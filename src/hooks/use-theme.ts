import { useEffect } from 'react'
import useLocalStorage from 'use-local-storage'

export function useTheme () {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')

  const handleChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme)
  }, [theme])

  return { handleChange }
}
