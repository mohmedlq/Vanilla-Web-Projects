import { useState } from 'react'
import StopWatch from './Stop_Watch/StopWatch'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<StopWatch/>
    </>
  )
}

export default App
