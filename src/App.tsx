import { Route, Routes } from 'react-router'
import './index.css'
import { BoardRoute } from './routes'

function App () {
  return (
    <Routes>
      <Route path="/" element={<BoardRoute />} />
    </Routes>
  )
}

export default App
