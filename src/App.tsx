import './index.css'
import { BoardStateProvider } from './providers'
import { Layout } from './components/Layout'

function App () {
  return (
    <BoardStateProvider>
      <Layout />
    </BoardStateProvider>
  )
}

export default App
